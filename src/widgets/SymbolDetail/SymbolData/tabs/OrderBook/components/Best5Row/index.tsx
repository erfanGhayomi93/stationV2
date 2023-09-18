import { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import HalfRow from '../HalfRow';
import { pushEngine } from 'src/ls/pushEngine';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getSelectedSymbol } from 'src/redux/slices/option';

const Best5Row = () => {
    //
    const [orders, setOrders] = useState<OrdersData | undefined>(undefined);
    const [totalBuyVolume, setTotalBuyVolume] = useState<number>(0);
    const [totalSellVolume, setTotalSellVolume] = useState<number>(0);
    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const { data, isFetching, refetch } = useSymbolGeneralInfo(selectedSymbol, {
        onSuccess: (data: SymbolGeneralInfoType) => {
            setOrders(data.ordersData);
        },
    });

    useEffect(() => {
        refetch();
    }, []);

    const setTotalVolume = () => {
        if (orders) {
            const buyVolumes = Object.keys(orders).filter((x) => x.includes('bestBuyLimitQuantity'));
            const totalBuy = buyVolumes.reduce((x, y) => x + orders[y as keyof OrdersData], 0);
            setTotalBuyVolume(totalBuy);

            const sellVolumes = Object.keys(orders).filter((x) => x.includes('bestSellLimitQuantity'));
            const totalSell = sellVolumes.reduce((x, y) => x + orders[y as keyof OrdersData], 0);
            setTotalSellVolume(totalSell);
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
        <WidgetLoading spining={isFetching}>
            <div className="w-full h-[148px]">
                <div className="grid grid-cols-2 grid-rows-1 overflow-auto" style={{ overflow: 'overlay' }}>
                    <div className="">
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
                                />
                            ))}
                    </div>
                    <div className="border-r dark:border-D-gray-400 border-L-gray-400">
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
                                />
                            ))}
                    </div>
                </div>
            </div>
        </WidgetLoading>
    );
};

export default Best5Row;
