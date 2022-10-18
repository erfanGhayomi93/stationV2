import { useEffect, useMemo, useCallback, useState } from 'react';
import { useAppValues } from 'src/redux/hooks';
import useMarketDepth from './useMarketDepth';
import HalfRowType from './HalfRow';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import clsx from 'clsx';

type HalfRowType = {
    price: number;
    volume: number;
    count: number;
    percent: number;
};

const Orders = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            lowThreshold: data?.symbolData?.lowThreshold,
            highThreshold: data?.symbolData?.highThreshold,
        }),
    });

    const {
        data: { bids, asks },
        actions: { fetch, subscribe, unsubscribe, reset },
    } = useMarketDepth();

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

    useEffect(() => {
        fetch(selectedSymbol).then(subscribe);

        return () => {
            reset();
            unsubscribe();
        };
    }, [selectedSymbol]);

    return (
        <div
            className={clsx('w-full h-[33px] flex pt-2')}
        >
            <div className="w-1/2 h-full dark:border-D-gray-350 border-L-gray-350">
                <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-400 dark:text-D-gray-400 dark:border-D-gray-350 sticky top-0 right-0">
                    <span className="ml-4">تعداد</span>
                    <span>حجم</span>
                    <span className="mr-auto">قیمت</span>
                </div>
                <div>
                    {buyData.map(({ count, price, volume, percent }, inx) => {
                        return (
                            <HalfRowType
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
            </div>
            <div className="w-1/2 border-r h-full dark:border-D-gray-350 border-L-gray-350">
                <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-400 dark:text-D-gray-400 dark:border-D-gray-350 border-L-gray-350 sticky top-0 right-0">
                    <span className="ml-auto">قیمت</span>
                    <span>حجم</span>
                    <span className="mr-4">تعداد</span>
                </div>
                <div>
                    {sellData.map(({ count, price, volume, percent }, inx) => {
                        return (
                            <HalfRowType
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
        </div>
    );
};

export default Orders;
