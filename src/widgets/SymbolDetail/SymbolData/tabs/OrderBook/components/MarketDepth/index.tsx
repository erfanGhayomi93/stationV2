import React, { useCallback, useMemo } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import HalfRow from '../HalfRow';
import { useMarketDepthState } from '../../context';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { setDataBuySellAction, setPartDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { ComeFromKeepDataEnum } from 'src/constant/enums';

type HalfRowType = {
    price: number;
    volume: number;
    count: number;
    percent: number;
};

const MarketDepth = () => {
    //
    const {
        marketDepthData: { asks, bids, isLoading },
    } = useMarketDepthState();

    const dispatch = useAppDispatch()

    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            lowThreshold: data?.symbolData?.lowThreshold,
            highThreshold: data?.symbolData?.highThreshold,
        }),
    });

    const buyData = useMemo(() => {
        const data: HalfRowType[] = [];

        if (bids.data) {
            for (const key in bids.data) {
                if (Array.isArray(bids.data?.[key])) {
                    const tempObj: HalfRowType = { price: 0, volume: 0, count: 0, percent: 0 };
                    tempObj['price'] = bids.data[key][0];
                    tempObj['volume'] = bids.data[key][1];
                    tempObj['count'] = bids.data[key][2];
                    tempObj['percent'] = Number(bids.data[key][1]) / Number(bids.totalQuantity) || 0;
                    data.push(tempObj);
                }
            }
        }

        return data.sort((a, b) => +b.price - +a.price);
    }, [bids]);

    const sellData = useMemo(() => {
        const data: HalfRowType[] = [];

        if (asks.data) {
            for (const key in asks.data) {
                if (Array.isArray(asks.data?.[key])) {
                    const tempObj: HalfRowType = { price: 0, volume: 0, count: 0, percent: 0 };
                    tempObj['price'] = asks.data[key][0];
                    tempObj['volume'] = asks.data[key][1];
                    tempObj['count'] = asks.data[key][2];
                    tempObj['percent'] = Number(asks.data[key][1]) / Number(asks.totalQuantity) || 0;
                    data.push(tempObj);
                }
            }
        }

        return data;
    }, [asks]);

    const isPriceInRange = useCallback(
        (price: number) => {
            if (!data?.lowThreshold || !data?.highThreshold) return true; // or maybe false
            else return +data.lowThreshold <= +price && +price <= +data.highThreshold;
        },
        [data],
    );

    const forwardToByeSell = (price : number , quantity : number , side : BuySellSide) => {
        dispatch(setPartDataBuySellAction({
            data: {
                price,
                quantity,
                side,
            },
            comeFrom: ComeFromKeepDataEnum.DepthMarket,
        }))
    }

    const clickByeOrder = (mode: 'Buy' | 'Sell', ind: number) => {
        const data = mode === "Buy" ? buyData : sellData
        const price = data[ind].price
        const quantity = data[ind].volume

        forwardToByeSell(price , quantity , "Buy")
    }

    const clickSellOrder = (mode: 'Buy' | 'Sell', ind: number) => {
        const data = mode === "Buy" ? buyData : sellData
        const price = data[ind].price
        const quantity = data[ind].volume

        forwardToByeSell(price , quantity , "Sell")
    }

    const clickCollectOrder = (mode: 'Buy' | 'Sell', ind: number) => {
        const data = mode === "Buy" ? buyData : sellData
        const sideOrder = mode === "Sell" ? "Buy" : "Sell"
        const collectData = data.slice(0, ind + 1)
        const price = data[0].price

        let collectVolume = 0
        collectData.map(item => {
            collectVolume += item.volume
        })

        forwardToByeSell(price , collectVolume , sideOrder)
    }




    return (
        <WidgetLoading spining={isLoading}>
            <div className="grid grid-cols-2 grid-rows-1 h-fit">
                <div className=" dark:border-D-gray-400 border-L-gray-400">
                    {buyData.map(({ count, price, volume, percent }, inx) => {
                        return (
                            <HalfRow
                                key={price}
                                mode="Buy"
                                price={price}
                                volume={volume}
                                count={count}
                                isOdd={inx % 2 === 0}
                                isInRange={isPriceInRange(price)}
                                percent={percent}
                                clickByeOrder={(mode) => clickByeOrder(mode, inx)}
                                clickCollectOrder={(mode) => clickCollectOrder(mode, inx)}
                                clickSellOrder={(mode) => clickSellOrder(mode, inx)}
                            />
                        );
                    })}
                </div>
                <div className="w-full border-r h-full dark:border-D-gray-400 border-L-gray-400">
                    {sellData.map(({ count, price, volume, percent }, inx) => {
                        return (
                            <HalfRow
                                key={price}
                                mode="Sell"
                                price={price}
                                volume={volume}
                                count={count}
                                isOdd={inx % 2 === 0}
                                isInRange={isPriceInRange(price)}
                                percent={percent}
                                clickByeOrder={(mode) => clickByeOrder(mode, inx)}
                                clickCollectOrder={(mode) => clickCollectOrder(mode, inx)}
                                clickSellOrder={(mode) => clickSellOrder(mode, inx)}
                            />
                        );
                    })}
                </div>
            </div>
        </WidgetLoading>
    );
};

export default MarketDepth;
