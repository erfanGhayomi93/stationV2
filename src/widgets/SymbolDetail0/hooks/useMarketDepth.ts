import { useState, useRef } from 'react';
import { pushEngine } from 'src/ls/pushEngine';
import { Apis, useApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

let MESSAGE_IDS: any = [];

const useMarketDepth = () => {
    const serverLastTime = useRef(0);

    const [bids, setBids] = useState<{
        data: any;
        totalQuantity: number;
    }>({
        data: null,
        totalQuantity: 0,
    });

    const [asks, setAsks] = useState<{
        data: any;
        totalQuantity: number;
    }>({
        data: null,
        totalQuantity: 0,
    });

    /* Message ID */
    const storeMsgID = (id: any) => MESSAGE_IDS.push(+id);

    const hasMsgID = (id: any) => MESSAGE_IDS.indexOf(+id) !== -1;

    /* Delete a price order */
    const deleteAnOrderOnOrderbook = ({ data, totalQuantity }: any, row: any) => {
        /**
         * 3: Price
         * 4: Quantity
         * 6: Sequence Number
         */

        try {
            const newData = { ...data };

            Object.keys(newData).forEach((price) => {
                const priceRow = newData[price];
                const children = priceRow[3];
                const childrenLength = priceRow[2];

                for (let i = 0; i < childrenLength; i++) {
                    const child = children[i];

                    if (+child[6] === +row[6]) {
                        if (priceRow[2] - 1 === 0) {
                            delete newData[price];
                        } else {
                            children.splice(i, 1);

                            priceRow[1] = priceRow[1] - child[4];
                            priceRow[2] = priceRow[2] - 1;
                            priceRow[3] = children;
                            newData[price] = priceRow;
                        }

                        return {
                            data: newData,
                            totalQuantity: totalQuantity - child[4],
                        };
                    }
                }
            });

            return { data, totalQuantity };
        } catch (e) {
            console.log(e);
            return { data, totalQuantity };
        }
    };

    const deletionAPreciseOrder = (row: any) => {
        if (row[2] === 'buy') {
            setBids((bids) => deleteAnOrderOnOrderbook(bids || {}, row));
            return;
        }

        setAsks((asks) => deleteAnOrderOnOrderbook(asks || {}, row));
    };

    /* Delete previous price orders */
    const deletePreviousOrdersOnOrderbook = ({ data, totalQuantity }: any, row: any) => {
        try {
            const newData = { ...data };

            const prices = Object.keys(newData);
            let quantity = 0;

            if (row[2] === 'sell') {
                prices.forEach((price) => {
                    if (price <= row[3]) {
                        quantity += newData[price][1];
                        delete newData[price];
                    }
                });
            } else {
                prices.forEach((price) => {
                    if (price >= row[3]) {
                        quantity += newData[price][1];
                        delete newData[price];
                    }
                });
            }

            return {
                data: newData,
                totalQuantity: totalQuantity - quantity,
            };
        } catch (e) {
            console.log(e);
            return { data, totalQuantity };
        }
    };

    const deletionOfAllPreviousOrders = (row: any) => {
        if (row[2] === 'buy') {
            setBids((bids) => deletePreviousOrdersOnOrderbook(bids || {}, row));
            return;
        }

        setAsks((asks) => deletePreviousOrdersOnOrderbook(asks || {}, row));
    };

    /* Delete all orders */
    const deletionOfAllOrders = (row: any) => {
        if (row[2] === 'buy') {
            setBids({
                data: {},
                totalQuantity: 0,
            });
            return;
        }

        setAsks({
            data: {},
            totalQuantity: 0,
        });
    };

    /* Update a row */
    const updateRowOnOrderbook = ({ data, totalQuantity }: any, row: any) => {
        /**
         * 3: Price
         * 4: Quantity
         * 6: Sequence Number
         */
        try {
            const newData = { ...data };

            const price = row[3];
            const priceRow = newData[price];

            if (!priceRow) return { data, totalQuantity };

            const children = priceRow[3];
            for (let i = 0; i < priceRow[2]; i++) {
                const child = children[i];

                if (+child[6] === +row[6]) {
                    const oldQuantity = child[4];
                    child[4] = row[4];

                    const rowQuantity = newData[price][1];
                    newData[price][1] = Math.abs(rowQuantity - oldQuantity + row[4]);
                    newData[price][3] = children;

                    return {
                        data: newData,
                        totalQuantity: totalQuantity - oldQuantity + row[4],
                    };
                }
            }
        } catch (e) {
            console.log(e);
            return { data, totalQuantity };
        }

        return { data, totalQuantity };
    };

    const updateItemsOfOrderbook = (row: any) => {
        if (row[2] === 'buy') {
            setBids((bids) => updateRowOnOrderbook(bids || {}, row));
            return;
        }

        setAsks((asks) => updateRowOnOrderbook(asks || {}, row));
    };

    /* Store a row */
    const storeRowOnOrderbook = ({ data, totalQuantity }: any, row: any) => {
        /**
         * 3: Price
         * 4: Quantity
         */
        try {
            const newData = { ...data };
            const dataRow = newData[row[3]];

            if (dataRow) newData[row[3]] = [dataRow[0], dataRow[1] + row[4], dataRow[2] + 1, [...dataRow[3], row]];
            else newData[row[3]] = [row[3], row[4], 1, [row]];

            return {
                data: newData,
                totalQuantity: totalQuantity + row[4],
            };
        } catch (e) {
            console.log(e);
            return { data, totalQuantity };
        }
    };

    const addItemsToOrderbook = (row: any) => {
        if (row[2] === 'buy') {
            setBids((bids) => storeRowOnOrderbook(bids || {}, row));
            return;
        }

        setAsks((asks) => storeRowOnOrderbook(asks || {}, row));
    };

    const beautifyMarketRow = (stringifyRow: any) => {
        const marketDbRow = new Array(10);

        const row = stringifyRow.split('_');

        marketDbRow[0] = Number(row[1]); // msgId
        marketDbRow[1] = row[12].toLowerCase(); // Command
        marketDbRow[2] = row[3].toLowerCase(); // orderSide
        marketDbRow[3] = Number(row[4]); // orderPrice
        marketDbRow[4] = Number(row[5]); // orderQuantity
        marketDbRow[5] = row[6]; // typeOfMemberOrderOwner
        marketDbRow[6] = Number(row[7]); // orderSequenceNumber
        marketDbRow[7] = row[8]; // orderEntryDate
        marketDbRow[8] = row[9]; // timeOfEvent
        marketDbRow[9] = row[11].toLowerCase(); // commandType

        return marketDbRow;
    };

    const onChangeMarketDepth = ({ changedFields }: any) => {
        if (!('mddata' in changedFields)) return;

        const row = beautifyMarketRow(changedFields.mddata);

        if (hasMsgID(row[0])) return;
        storeMsgID(row[0]);

        try {
            /**
             * Commands:
             * Add
             * Update
             * Delete
             */
            if (row[1] === 'delete') {
                /**
                 * Type of "Delete" command:
                 * Deletion Of A Precise Order
                 * Deletion Of All Previous Orders
                 * Deletion Of All Orders
                 */

                if (row[9] === 'deletionofapreciseorder') return deletionAPreciseOrder(row);
                if (row[9] === 'deletionofallpreviousorders') return deletionOfAllPreviousOrders(row);
                if (row[9] === 'deletionOfallorders') return deletionOfAllOrders(row);
            }
            if (row[1] === 'add') return addItemsToOrderbook(row);
            if (row[1] === 'update') return updateItemsOfOrderbook(row);
        } catch (e) {
            console.log(e);
        }
    };

    const subscribeMarketDepth = (symbolISIN: any) => {
        const d = new Date();
        const t = d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();

        pushEngine.subscribe({
            id: 'MarketDepthSub',
            mode: 'RAW',
            adapterName: 'RamandRLCDData',
            items: ['mdt_' + serverLastTime.current + '_' + symbolISIN + '_' + t, symbolISIN],
            fields: ['mddata'],
            isSnapShot: 'no',
            onFieldsUpdate: onChangeMarketDepth,
        });
    };

    const unsubscribeMarketDepth = () => {
        pushEngine.unSubscribe('MarketDepthSub');
    };

    const onLoadData = ({ buyRow, lastTime, sellRow }: any) => {
        let totalBids = {};
        let totalAsks = {};

        /* BID */
        let totalBidQuantity = 0;
        const bLength = buyRow.length;
        for (let i = 0; i < bLength; i++) {
            const row = buyRow[i].items;
            // @ts-ignore
            totalBids[row[0]] = row;
            // @ts-ignore
            totalBids[row[0]] = row;
            totalBidQuantity += row[1];
        }

        /* ASK */
        let totalAskQuantity = 0;
        const sLength = sellRow.length;
        for (let i = 0; i < sLength; i++) {
            const row = sellRow[i].items;
            // @ts-ignore
            totalAsks[row[0]] = row;
            totalAskQuantity += row[1];
        }

        /* Store data */
        setBids({ data: totalBids || {}, totalQuantity: totalBidQuantity || 0 });
        setAsks({ data: totalAsks || {}, totalQuantity: totalAskQuantity || 0 });

        /* Subscribe market depth */
        serverLastTime.current = lastTime;
    };

    const fetchMarketDepth = (symbolISIN: any) =>
        new Promise((done, reject) => {
            const { apiRoutes } = useApiPath();
            const url = (Apis().MarketDepth.Get as string) + '?SymbolISIN=' + symbolISIN;
            const xhr = new XMLHttpRequest();
            xhr.open('get', url);

            xhr.onload = () => {
                const response = JSON.parse(xhr.response);
                done(response.result);
            };

            xhr.onerror = reject;

            xhr.send();
        });

    const fetchProcess = (symbolISIN: any) =>
        new Promise((done, reject) => {
            fetchMarketDepth(symbolISIN)
                .then((data) => {
                    onLoadData(data);
                    done(symbolISIN);
                })
                .catch(() => {
                    setBids({ data: {}, totalQuantity: 0 });
                    setAsks({ data: {}, totalQuantity: 0 });
                    reject();
                });
        });

    const resetData = () => {
        MESSAGE_IDS = [];

        setBids({ data: null, totalQuantity: 0 });
        setAsks({ data: null, totalQuantity: 0 });
    };

    return {
        actions: {
            fetch: fetchProcess,
            subscribe: subscribeMarketDepth,
            unsubscribe: unsubscribeMarketDepth,
            reset: resetData,
        },
        data: { bids, asks },
    };
};

export default useMarketDepth;
