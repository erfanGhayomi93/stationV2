import { useQueryMarketDepthV2 } from "@api/Symbol";
import { pushEngine } from "@LS/pushEngine";
import { subscribeMarketDepth } from "@LS/subscribes";
import { useEffect, useRef, useState } from "react";

type TDataState = Record<number, TBuySellRowMarketDepthItems> | null

// type TMarketDbRow = [number, string, string, number, number, string, number, string, string, string]

interface IState {
    data: TDataState
    totalQuantity: number;
}



export const useMarketDepth = (selectedSymbol: string) => {

    const serverLastTime = useRef<number>(0);

    const MESSAGE_IDS = useRef<number[]>([])

    const hasMsgID = (id: number) => MESSAGE_IDS.current.indexOf(+id) !== -1;

    const storeMsgID = (id: number) => MESSAGE_IDS.current = [...MESSAGE_IDS.current, id]

    const [isSubscribe, setIsSubscribe] = useState(false)



    const { data, isFetching, isSuccess } = useQueryMarketDepthV2(selectedSymbol)


    const [bids, setBids] = useState<IState>({
        data: null,
        totalQuantity: 0,
    });

    const [asks, setAsks] = useState<IState>({
        data: null,
        totalQuantity: 0,
    });


    const deletionOfAllPreviousOrders = (data: TDataState, totalQuantity: number, marketDbRow: string[]) => {
        const dataCopy = JSON.parse(JSON.stringify({ ...data }))
        const newData: TDataState = dataCopy;

        if (!newData) return {
            data: newData,
            totalQuantity: totalQuantity,
        }

        const prices = Object.keys(newData);
        let quantity = 0;

        if (marketDbRow[2] === 'sell') {
            prices.forEach((price) => {
                if (price <= marketDbRow[3]) {
                    quantity += newData[+price][1];
                    delete newData[+price];
                }
            });
        } else {
            prices.forEach((price) => {
                if (price >= marketDbRow[3]) {
                    quantity += newData[+price][1];
                    delete newData[+price];
                }
            });
        }

        return {
            data: newData,
            totalQuantity: totalQuantity - quantity,
        }

    }

    const deletionAPreciseOrder = (data: TDataState, totalQuantity: number, marketDbRow: string[]) => {
        const dataCopy = JSON.parse(JSON.stringify({ ...data }))
        const newData: TDataState = dataCopy;

        if (!newData) return {
            data: newData,
            totalQuantity: totalQuantity,
        }
        const seqNumDb = +marketDbRow[6]

        let totalQuantityCalc = totalQuantity;

        Object.keys(newData).forEach((price) => {
            const priceRow = newData[Number(price)];
            const children = priceRow[3];
            const childrenLength = priceRow[2];

            for (let i = 0; i < childrenLength; i++) {
                const child = children[i]
                const seqNumState = +child?.[6]

                if (seqNumState === seqNumDb) {
                    totalQuantityCalc = totalQuantity - +child[4]

                    if (priceRow[2] - 1 === 0) {
                        delete newData[+price];
                    } else {
                        children.splice(i, 1)
                        priceRow[1] = priceRow[1] - +child[4]
                        priceRow[2] = priceRow[2] - 1
                        priceRow[3] = children;
                        newData[+price] = priceRow
                    }
                }
            }

        })

        return {
            data: newData,
            totalQuantity: totalQuantityCalc
        }

    }

    const updateItemsOfOrderbook = (data: TDataState, totalQuantity: number, marketDbRow: string[]) => {
        const dataCopy = JSON.parse(JSON.stringify({ ...data }))
        const newData = dataCopy;

        const priceDB = Number(marketDbRow[3])
        const seqNumDb = +marketDbRow[6]
        const quantityDb = +marketDbRow[4]

        const priceRow = newData[priceDB]

        if (!priceRow) {
            console.log('newData', newData)
            console.log('priceDB', priceDB)
            console.log('there is no price row')
            return { data, totalQuantity }
        }

        let totalQuantityCalc = totalQuantity;

        const countState = priceRow[2]
        const childState = priceRow[3]

        for (let i = 0; i < countState; i++) {
            const child = childState[i]
            const seqNumState = +child[6]

            if (seqNumState === seqNumDb) {
                const oldQuantity = +child[4];
                child[4] = String(quantityDb);

                const rowQuantity = newData[priceDB][1];
                newData[priceDB][1] = Math.abs((rowQuantity - oldQuantity) + quantityDb);
                newData[priceDB][3] = childState;

                totalQuantityCalc = totalQuantity - oldQuantity + quantityDb
            }

        }

        return {
            data: newData,
            totalQuantity: totalQuantityCalc,
        }

    } 

    const addItemsToOrderbook = (data: TDataState, totalQuantity: number, marketDbRow: string[]) => {
        /**
       * 3: Price
       * 4: Quantity
       */
        console.log("inside addItemsToOrderbook")
        const dataCopy = JSON.parse(JSON.stringify({ ...data }))

        const newData = dataCopy;

        // const sideDB = String(marketDbRow[2])
        const priceDB = Number(marketDbRow[3])
        const volumeDb = Number(marketDbRow[4])

        const priceRow = newData[priceDB]

        const priceState = priceRow?.[0]
        const volumeState = priceRow?.[1]
        const countState = priceRow?.[2]
        const childState = priceRow?.[3]


        if (priceRow) {
            newData[priceDB] = [priceState, volumeState + volumeDb, countState + 1, [...childState, [...marketDbRow]]]
        } else {
            newData[priceDB] = [priceDB, volumeDb, 1, [...[marketDbRow]]]
        }

        return {
            data: newData,
            totalQuantity: totalQuantity + volumeDb,
        }

    }

    const beautifyMarketRow = (stringifyRow: string) => {
        const marketDbRow: string[] = []

        const row = stringifyRow.split('_');

        marketDbRow[0] = row[1]; // msgId
        marketDbRow[1] = row[12].toLowerCase(); // Command
        marketDbRow[2] = row[3].toLowerCase(); // orderSide
        marketDbRow[3] = row[4]; // orderPrice
        marketDbRow[4] = row[5]; // orderQuantity | orderVolume
        marketDbRow[5] = row[6]; // typeOfMemberOrderOwner
        marketDbRow[6] = row[7]; // orderSequenceNumber
        marketDbRow[7] = row[8]; // orderEntryDate
        marketDbRow[8] = row[9]; // timeOfEvent
        marketDbRow[9] = row[11].toLowerCase(); // commandType

        return marketDbRow;
    };

    const handleCommand = (
        command: string,
        commandType: string,
        marketDbRow: string[]
    ) => {
        try {
            const isBuyOrder = marketDbRow[2] === 'buy';
            const isSellOrder = marketDbRow[2] === 'sell';

            const updateOrderbook = (
                action: (data: TDataState, totalQuantity: number, row: string[]) => IState,
                setState: (stateUpdater: (state: IState) => IState) => void
            ) => {
                setState((state) => action(state.data, state.totalQuantity, marketDbRow));
            };


            const commandHandlers: Record<string, Record<string, () => void>> = {
                delete: {
                    deletionofapreciseorder: () => {
                        if (isBuyOrder) updateOrderbook(deletionAPreciseOrder, setBids);
                        if (isSellOrder) updateOrderbook(deletionAPreciseOrder, setAsks);
                    },
                    deletionofallpreviousorders: () => {
                        if (isBuyOrder) updateOrderbook(deletionOfAllPreviousOrders, setBids);
                        if (isSellOrder) updateOrderbook(deletionOfAllPreviousOrders, setAsks);
                    },
                    deletionofallorders: () => {
                        if (isBuyOrder) setBids({ data: null, totalQuantity: 0 });
                        if (isSellOrder) setAsks({ data: null, totalQuantity: 0 });
                    },
                },
                add: {
                    default: () => {
                        if (isBuyOrder) updateOrderbook(addItemsToOrderbook, setBids);
                        if (isSellOrder) updateOrderbook(addItemsToOrderbook, setAsks);
                    },
                },
                update: {
                    default: () => {
                        console.log('update')
                        if (isBuyOrder) updateOrderbook(updateItemsOfOrderbook, setBids);
                        if (isSellOrder) updateOrderbook(updateItemsOfOrderbook, setAsks);
                    },
                },
            };

            // Handle the command by finding the corresponding handler
            const handle = commandHandlers[command]?.[commandType] || commandHandlers[command]?.default;

            // If a handler exists, invoke it
            if (handle) handle();
        } catch (e) {
            console.log('Error in handleCommand of marketDepth:', e);
        }
    };


    const handleChangedFields = (mddata‌: string) => {
        if (!mddata‌) return;

        // const marketDbRow: string[] = beautifyMarketRow("iro1tamn0001_202410120001059670_Modification_buy_1140_25994_Client_7095_20241012_122741_iro1tamn0001sell709520241012_deletionofallorders_delete");
        const marketDbRow: string[] = beautifyMarketRow(mddata‌);

        const command = marketDbRow[1]
        const commandType = marketDbRow[9]

        // if (hasMsgID(Number(marketDbRow[0]))) return

        storeMsgID(Number(marketDbRow[0]))

        handleCommand(command, commandType, marketDbRow)

        //         try {
        //             if (command === "delete") {
        //                 if (commandType === 'deletionofapreciseorder') {
        // 
        //                     if (marketDbRow[2] === 'buy') {
        //                         setBids((bids) => deletionAPreciseOrder(bids.data, bids.totalQuantity, marketDbRow))
        //                     } else if (marketDbRow[2] === 'sell') {
        //                         setAsks((asks) => deletionAPreciseOrder(asks.data, asks.totalQuantity, marketDbRow))
        //                     }
        // 
        //                 }
        //                 else if (commandType === 'deletionofallpreviousorders') {
        // 
        //                     if (marketDbRow[2] === 'buy') {
        //                         setBids((bids) => deletionOfAllPreviousOrders(bids.data, bids.totalQuantity, marketDbRow))
        //                     } else if (marketDbRow[2] === 'sell') {
        //                         setAsks((asks) => deletionOfAllPreviousOrders(asks.data, asks.totalQuantity, marketDbRow))
        //                     }
        // 
        //                 } else if (commandType === 'deletionofallorders') {
        //                     console.log('1')
        //                     if (marketDbRow[2] === 'buy') {
        //                         setBids({ data: null, totalQuantity: 0 })
        //                     } else if (marketDbRow[2] === 'sell') {
        //                         setAsks({ data: null, totalQuantity: 0 })
        //                     }
        //                 }
        //             }
        //             if (command === "add") {
        //                 if (marketDbRow[2] === 'buy') {
        //                     setBids((bids) => addItemsToOrderbook(bids.data, bids.totalQuantity, marketDbRow))
        //                 } else if (marketDbRow[2] === 'sell') {
        //                     setAsks((asks) => addItemsToOrderbook(asks.data, asks.totalQuantity, marketDbRow))
        //                 }
        //             }
        //             else if (command === "update") {
        //                 if (marketDbRow[2] === 'buy') {
        //                     setBids((bids) => updateItemsOfOrderbook(bids.data, bids.totalQuantity, marketDbRow))
        //                 } else if (marketDbRow[2] === 'sell') {
        //                     setAsks((asks) => updateItemsOfOrderbook(asks.data, asks.totalQuantity, marketDbRow))
        //                 }
        //             }
        //         } catch (e) {
        //             console.log('error in handleChangedFields of marketDepth', e)
        //         }
    }

    const subscribeMarketDepthProcess = () => {
        subscribeMarketDepth(selectedSymbol, serverLastTime.current, ({ changedFields }) => {
            console.log("updatedFields", changedFields)
            handleChangedFields(changedFields.mddata)
            // handleChangedFields("fhn")
        })
    }


    useEffect(() => {
        if (data && isSubscribe) {
            subscribeMarketDepthProcess()
        }
        return () => pushEngine.unSubscribe(('MarketDepthSub'))

    }, [isSubscribe, data])



    const onLoadData = async (data: IMarketDepthRes) => {
        const totalBids: TDataState = {};
        const totalAsks: TDataState = {};

        let totalBidQuantity = 0;
        let totalAskQuantity = 0;

        const bidsLength = data.buyRow.length;
        const asksLength = data.sellRow.length;
        const maxLength = Math.max(bidsLength, asksLength);

        for (let i = 0; i < maxLength; i++) {
            if (i < bidsLength) {
                const bidRow = data.buyRow[i].items;
                totalBids[bidRow[0]] = bidRow;
                totalBidQuantity += bidRow[1];
            }

            if (i < asksLength) {
                const askRow = data.sellRow[i].items;
                totalAsks[askRow[0]] = askRow;
                totalAskQuantity += askRow[1];
            }
        }

        setBids({ data: totalBids, totalQuantity: totalBidQuantity });
        setAsks({ data: totalAsks, totalQuantity: totalAskQuantity });
        setIsSubscribe(true)
    };

    useEffect(() => {
        if (data) {
            onLoadData(data)
        }

    }, [data])

    useEffect(() => {
        console.log('bids', bids)
    }, [bids])

    useEffect(() => {
        console.log('asks', asks)
    }, [asks])



    return {
        actions: {
        },
        data:
            { bids, asks },
    }
}