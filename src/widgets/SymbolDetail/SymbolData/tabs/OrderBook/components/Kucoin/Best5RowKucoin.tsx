import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WidgetLoading from 'src/common/components/WidgetLoading';
import HalfRow from '../HalfRow';
import { t } from 'i18next';
import { seprateNumber } from 'src/utils/helpers';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { setPriceBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { pushEngine } from 'src/ls/pushEngine';
import KucoinChart from './KucoinChart';
import clsx from 'clsx';

type Props = {
    isDepthChartOpen: boolean;
};

const Best5RowKucoin = ({ isDepthChartOpen }: Props) => {
    const [orders, setOrders] = useState<OrdersData | undefined>(undefined);
    const [totalBuyVolume, setTotalBuyVolume] = useState<number>(0);
    const [totalSellVolume, setTotalSellVolume] = useState<number>(0);
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const appDispatch = useAppDispatch();
    const sellContainerRef = useRef<HTMLDivElement>(null);

    const { data, isFetching } = useSymbolGeneralInfo(selectedSymbol, {
        onSuccess: (data: SymbolGeneralInfoType) => {},
    });

    useEffect(() => {
        data && setOrders(data.ordersData);
    }, [data]);

    const { yesterdayClosingPrice, highThreshold, lowThreshold, lastTradedPrice } = useMemo(() => {
        const initialData = { yesterdayClosingPrice: 0, highThreshold: 0, lowThreshold: 0, lastTradedPrice: 0 };

        if (!data) return initialData;

        initialData.yesterdayClosingPrice = data.symbolData?.yesterdayClosingPrice ?? 0;
        initialData.highThreshold = data.symbolData?.highThreshold ?? 0;
        initialData.lowThreshold = data.symbolData?.lowThreshold ?? 0;
        initialData.lastTradedPrice = data.symbolData?.lastTradedPrice ?? 0;

        return initialData;
    }, [data]);

    const setTotalVolume = () => {
        if (orders) {
            const buyVolumes = Object.keys(orders).filter((x) => x.includes('bestBuyLimitQuantity'));
            const totalBuy = buyVolumes.reduce((x, y) => x + orders[y as keyof OrdersData], 0);
            setTotalBuyVolume(totalBuy);

            const sellVolumes = Object.keys(orders).filter((x) => x.includes('bestSellLimitQuantity'));
            const totalSell = sellVolumes.reduce((x, y) => x + orders[y as keyof OrdersData], 0);
            setTotalSellVolume(totalSell);
            const height = sellContainerRef.current?.scrollHeight;
            height && sellContainerRef.current?.scrollTo(0, height);
        }
    };

    const isPriceInRange = useCallback(
        (price: number) => {
            if (!data?.symbolData) return true;
            const { symbolData } = data;
            if (!symbolData?.lowThreshold || !symbolData?.highThreshold) return true; // or maybe false
            else return +symbolData.lowThreshold <= +price && +price <= +symbolData.highThreshold;
        },
        [data],
    );

    const setPriceOnBuySellModal = (price: number) => {
        appDispatch(setPriceBuySellAction(price));
    };

    useEffect(() => {
        setTotalVolume();
    }, [orders]);

    useEffect(() => {
        if (selectedSymbol) {
            pushEngine.subscribe({
                id: 'SymbolBest5Orders',
                mode: 'MERGE',
                isSnapShot: 'yes',
                adapterName: 'RamandRLCDData',
                items: [selectedSymbol],
                fields: [
                    'numberOfOrdersAtBestBuy_1',
                    'bestBuyLimitQuantity_1',
                    'bestBuyLimitPrice_1',
                    'numberOfOrdersAtBestBuy_2',
                    'bestBuyLimitQuantity_2',
                    'bestBuyLimitPrice_2',
                    'numberOfOrdersAtBestBuy_3',
                    'bestBuyLimitQuantity_3',
                    'bestBuyLimitPrice_3',
                    'numberOfOrdersAtBestBuy_4',
                    'bestBuyLimitQuantity_4',
                    'bestBuyLimitPrice_4',
                    'numberOfOrdersAtBestBuy_5',
                    'bestBuyLimitQuantity_5',
                    'bestBuyLimitPrice_5',
                    'numberOfOrdersAtBestSell_1',
                    'bestSellLimitQuantity_1',
                    'bestSellLimitPrice_1',
                    'numberOfOrdersAtBestSell_2',
                    'bestSellLimitQuantity_2',
                    'bestSellLimitPrice_2',
                    'numberOfOrdersAtBestSell_3',
                    'bestSellLimitQuantity_3',
                    'bestSellLimitPrice_3',
                    'numberOfOrdersAtBestSell_4',
                    'bestSellLimitQuantity_4',
                    'bestSellLimitPrice_4',
                    'numberOfOrdersAtBestSell_5',
                    'bestSellLimitQuantity_5',
                    'bestSellLimitPrice_5',
                ],
                onFieldsUpdate: ({ changedFields }) => {
                    setOrders((pre) => ({ ...pre, ...changedFields } as OrdersData));
                },
            });
        }

        return () => {
            pushEngine.unSubscribe('SymbolBest5Orders');
        };
    }, [selectedSymbol]);

    const ArrayOf5Index = Array.from(Array(6).keys()).slice(1);

    return (
        <WidgetLoading spining={isFetching} mounted={false}>
            <div className={clsx('h-full', isDepthChartOpen && 'grid grid-cols-2')}>
                {isDepthChartOpen && (
                    <div className="h-full">
                        <KucoinChart yesterdayClosingPrice={yesterdayClosingPrice} highThreshold={highThreshold} lowThreshold={lowThreshold} />
                    </div>
                )}

                <div className="h-full flex flex-col gap-1">
                    <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-500 dark:text-D-gray-500 dark:border-D-gray-400 right-0">
                        <span className="w-1/5">{t('ag_columns_headerName.count')}</span>
                        <span>{t('ag_columns_headerName.volume')}</span>
                        <span className="mr-auto">{t('ag_columns_headerName.price')}</span>
                    </div>
                    <div className="w-full flex flex-col justify-end" style={{ flex: '1 0 1rem', overflowY: 'auto' }}>
                        <div className="overflow-auto flex flex-col-reverse" ref={sellContainerRef}>
                            {orders &&
                                ArrayOf5Index.map((n, ind) => (
                                    <HalfRow
                                        key={n}
                                        mode="Sell"
                                        isInRange={isPriceInRange(orders[`bestSellLimitPrice_${n}` as keyof OrdersData])}
                                        isOdd={ind % 2 === 0}
                                        price={orders[`bestSellLimitPrice_${n}` as keyof OrdersData]}
                                        count={orders[`numberOfOrdersAtBestSell_${n}` as keyof OrdersData]}
                                        volume={orders[`bestSellLimitQuantity_${n}` as keyof OrdersData]}
                                        percent={totalSellVolume ? orders[`bestSellLimitQuantity_${n}` as keyof OrdersData] / totalSellVolume : 0}
                                        clickPrice={setPriceOnBuySellModal}
                                        sellDirection="rtl"
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex justify-between items-center bg-L-gray-300 dark:bg-D-gray-300 p-1 w-full">
                            <span className="text-xs font-medium text-L-gray-500 dark:text-D-gray-500">{t('Symbol.lastTrade')}</span>
                            <div className="flex gap-1 text-xs font-medium text-D-basic dark:text-L-basic">
                                <span>{seprateNumber(lastTradedPrice)}</span>
                                <span>{t('common.rial')}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full overflow-auto flex flex-col" style={{ flex: '1 0 1rem', overflowY: 'auto' }}>
                        {orders &&
                            ArrayOf5Index.map((n, ind) => (
                                <HalfRow
                                    key={n}
                                    mode="Buy"
                                    isInRange={isPriceInRange(orders[`bestBuyLimitPrice_${n}` as keyof OrdersData])}
                                    isOdd={ind % 2 === 0}
                                    price={orders[`bestBuyLimitPrice_${n}` as keyof OrdersData]}
                                    count={orders[`numberOfOrdersAtBestBuy_${n}` as keyof OrdersData]}
                                    volume={orders[`bestBuyLimitQuantity_${n}` as keyof OrdersData]}
                                    percent={totalBuyVolume ? orders[`bestBuyLimitQuantity_${n}` as keyof OrdersData] / totalBuyVolume : 0}
                                    clickPrice={setPriceOnBuySellModal}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </WidgetLoading>
    );
};

export default Best5RowKucoin;
