import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { seprateNumber } from 'src/utils/helpers';
import clsx from 'clsx';
import { useMarketDepthState } from '../../context';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

const KucoinDepth = ({ lastTradedPrice }: { lastTradedPrice: number }) => {
    //
    const { t } = useTranslation();
    const rendered = useRef<boolean>(false);

    const {
        marketDepthData: { asks, bids, isLoading },
    } = useMarketDepthState();

    const sellData = useMemo(() => {
        const data: RowProps[] = [];

        if (asks.data) {
            for (const key in asks.data) {
                if (Array.isArray(asks.data?.[key])) {
                    const tempObj: any = { price: 0, volume: 0, count: 0, percent: 0 };
                    tempObj['price'] = asks.data[key][0];
                    tempObj['volume'] = asks.data[key][1];
                    tempObj['count'] = asks.data[key][2];
                    tempObj['percent'] = Number(asks.data[key][1]) / Number(asks.totalQuantity) || 0;
                    data.push(tempObj);
                }
            }
        }

        return data.sort((a, b) => +b.price - +a.price);
    }, [asks]);

    const buyData = useMemo(() => {
        const data: RowProps[] = [];

        if (bids.data) {
            for (const key in bids.data) {
                if (Array.isArray(bids.data?.[key])) {
                    const tempObj: any = { price: 0, volume: 0, count: 0, percent: 0 };
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

    const onSellVirtousoLoad = (e: VirtuosoHandle) => {
        if (!e || rendered.current) return;

        const index = sellData.length - 1;
        e.scrollToIndex(index);

        rendered.current = true;
    };

    return (
        <WidgetLoading spining={isLoading}>
            <div className="h-full overflow-hidden flex flex-col gap-1">
                <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-500 dark:text-D-gray-500 dark:border-D-gray-400 right-0">
                    <span className="w-1/5">{t('ag_columns_headerName.count')}</span>
                    <span>{t('ag_columns_headerName.volume')}</span>
                    <span className="mr-auto">{t('ag_columns_headerName.price')}</span>
                </div>

                <div style={{ flex: '1 0 1rem', overflowY: 'auto' }}>
                    <Virtuoso
                        ref={onSellVirtousoLoad}
                        totalCount={sellData.length}
                        initialScrollTop={9999}
                        alignToBottom={true}
                        itemContent={(index) => {
                            const item = sellData[index];
                            return (
                                <Row
                                    key={index}
                                    count={item.count}
                                    isInRange={true}
                                    mode="Sell"
                                    isOdd={index % 2 === 0}
                                    price={item.price}
                                    percent={item.percent}
                                    volume={item.volume}
                                />
                            );
                        }}
                    />
                </div>

                <div className="flex items-center">
                    <div className="flex justify-between items-center bg-L-gray-300 dark:bg-D-gray-300 p-1 w-full">
                        <span className="text-xs font-medium text-L-gray-500 dark:text-D-gray-500">{t("Symbol.lastTrade")}</span>

                        <div className="flex gap-1 text-xs font-medium text-D-basic dark:text-L-basic">
                            <span>{seprateNumber(lastTradedPrice)}</span>
                            <span>{t("common.rial")}</span>
                        </div>
                    </div>
                </div>

                <div style={{ flex: '1 0 1rem', overflowY: 'auto' }}>
                    <Virtuoso
                        totalCount={buyData.length}
                        itemContent={(index) => {
                            const item = buyData[index];
                            return (
                                <Row
                                    key={index}
                                    count={item.count}
                                    isInRange={true}
                                    mode="Buy"
                                    isOdd={index % 2 === 0}
                                    price={item.price}
                                    percent={item.percent}
                                    volume={item.volume}
                                />
                            );
                        }}
                    />
                </div>
            </div>
        </WidgetLoading>
    );
};

export default KucoinDepth;

type RowProps = {
    mode: 'Buy' | 'Sell';
    price: number;
    volume: number;
    count: number;
    isOdd: boolean;
    isInRange: boolean;
    percent: number;
};
const Row = ({ isOdd, isInRange, percent, count, volume, price, mode }: RowProps) => {
    return (
        <div
            className={clsx(
                'text-xs text-L-gray-700 font-medium dark:text-D-gray-700 rounded m-1',
                isOdd ? 'bg-L-gray-100 dark:bg-D-gray-100' : '',
                isInRange ? '' : 'bg-transparent dark:bg-transparent opacity-60',
            )}
        >
            <div className="h-full w-full relative">
                <div
                    className={clsx(
                        'absolute  rounded h-full left-0 duration-200',
                        mode === 'Buy' ? 'bg-L-success-100 dark:bg-D-success-100' : 'bg-L-error-100 dark:bg-D-error-100',
                        isInRange ? '' : 'bg-transparent dark:bg-transparent',
                    )}
                    style={{ width: `${percent * 100}%` }}
                ></div>
                <div className={clsx('relative flex px-2 py-1 h-full items-center')}>
                    <span className="text-right" style={{ width: '20%' }}>
                        {seprateNumber(count || 0)}
                    </span>
                    <span className="cursor-pointer">{seprateNumber(volume || 0)}</span>
                    <span className="mr-auto cursor-pointer">{seprateNumber(price || 0)}</span>
                </div>
            </div>
        </div>
    );
};
