import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAppValues } from 'src/redux/hooks';
import HalfRow from '../HalfRow';

const Best5Row = () => {
    //
    const [orders, setOrders] = useState<OrdersData | undefined>(undefined);
    const [totalBuyVolume, setTotalBuyVolume] = useState<number>(0);
    const [totalSellVolume, setTotalSellVolume] = useState<number>(0);
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const queryClient = useQueryClient();
    const ordersData = (queryClient.getQueryData(['SymbolGeneralInfo', selectedSymbol]) as SymbolGeneralInfoType)?.ordersData || {};

    useEffect(() => {
        if (ordersData) {
            setOrders(ordersData);
        }
    }, [ordersData]);

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

    useEffect(() => {
        setTotalVolume();
    }, [orders]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 grid-rows-1 overflow-auto" style={{ overflow: 'overlay' }}>
                <div className="">
                    {orders &&
                        [1, 2, 3, 4, 5].map((n, ind) => (
                            <HalfRow
                                key={n}
                                mode="Buy"
                                isInRange={true}
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
                        [1, 2, 3, 4, 5].map((n, ind) => (
                            <HalfRow
                                key={n}
                                mode="Sell"
                                isInRange={true}
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
    );
};

export default Best5Row;
