import React, { useCallback, useMemo } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppSelector } from 'src/redux/hooks';
import HalfRow from '../HalfRow';
import { useMarketDepthState } from '../../context';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getSelectedSymbol } from 'src/redux/slices/option';

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

    return (
        <WidgetLoading spining={isLoading}>
            <div className="grid grid-cols-2 grid-rows-1 overflow-auto  h-full" style={{ overflow: 'overlay' }}>
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
                            />
                        );
                    })}
                </div>
            </div>
        </WidgetLoading>
    );
};

export default MarketDepth;
