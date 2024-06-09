import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import AXIOS from 'src/api/axiosInstance';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AppModal from 'src/common/components/AppModal';
import Seperator from 'src/common/components/IpoBuyModal/components/Seperator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { seprateNumber } from 'src/utils/helpers';

type Props = {
    modalData: { isOpen: boolean; data?: IGTTradesListResultType };
    setModalData: Dispatch<SetStateAction<{ isOpen: boolean; data?: Props['modalData']['data'] }>>;
    aggregateType: 'None' | 'Customer' | 'Symbol' | 'Both';
};

type TInfoFieldParams = {
    label: string;
    value: string | number;
    preFix?: boolean;
    preFixText?: string;
};

const TradeInfoModal = ({ modalData, setModalData, aggregateType }: Props) => {

    const handleClose = () => setModalData({ isOpen: false });

    const [footerData, setFooterData] = useState({
        quantity: 0,
        price: 0,
        row: 0,
        comission: 0,
        tradeValue: 0,
    });

    const { data, isLoading } = useQuery(
        ['OrderDetails',],
        () =>
            getTradeDetails({
                OrderSide: modalData?.data?.orderSide,
                SymbolISIN: modalData?.data?.symbolISIN,
                CustomerISIN: modalData?.data?.customerISIN,
                TradeDate: modalData?.data?.tradeDate,
                GetTradesAggregateType: aggregateType,
                OrderId: modalData?.data?.orderId
            }),
        {
            cacheTime: 0,
            enabled: !!modalData?.data,
            onSuccess: (value) => {
                if (value) {
                    setFooterData(
                        value.reduce(
                            (a: typeof footerData, b: Record<string, any>, c: number) => {
                                a.quantity += b.tradeQuantity;
                                a.price += b.tradePrice;
                                a.row += c + 1;
                                a.tradeValue += b.totalPrice;
                                a.comission += b.totalCommission;
                                return a;
                            },
                            { comission: 0, price: 0, quantity: 0, row: 0, tradeValue: 0 } as typeof footerData,
                        ),
                    );
                }
            },
            onError: () => {
                setFooterData({ comission: 0, price: 0, quantity: 0, row: 0, tradeValue: 0 });
            },
        },
    );

    const colDefs = useMemo(
        (): ColDefType<unknown>[] => [
            { headerName: 'ردیف', valueGetter: ({ node }) => Number(node?.rowIndex) + 1, maxWidth: 60 },
            ...(aggregateType !== 'Customer' ? [{ headerName: 'مشتری', field: 'customerTitle' }] : []),
            ...(aggregateType !== 'Symbol' ? [{ headerName: 'نماد', field: 'symbolTitle' }] : []),
            { headerName: 'تعداد', field: 'tradeQuantity', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'tradePrice', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'کارمزد', field: 'totalCommission', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'totalPrice', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'زمان', field: 'tradeDate', type: 'date', minWidth: 150 },
        ],
        [],
    );

    // const createTitle = () => {
    //     switch (aggregateType) {
    //         case 'Customer':
    //             const customerTitle = modalData?.data?.customerTitle;
    //             return `(مشتری${customerTitle ? ' - ' + customerTitle : ''})`;
    //         case 'Symbol':
    //             const symbolTitle = modalData?.data?.symbolTitle;
    //             return `(نماد${symbolTitle ? ' - ' + symbolTitle : ''})`;
    //         default:
    //             return '';
    //     }
    // };

    return (
        <AppModal
            isOpen={modalData?.isOpen}
            handleClose={handleClose}
            height={500}
            width={900}
            title={
                <span className="font-normal text-sm text-white">
                    جزئیات معامله <span className="text-L-info-50">{modalData?.data?.customerTitle}</span>
                </span>
            }
        >
            <div className="h-full w-full flex flex-col p-4 justify-between gap-3">
                <div className="flex-1">
                    <WidgetLoading spining={isLoading}>
                        <AGTable columnDefs={colDefs} rowData={data} suppressRowHoverHighlight onSortChanged={({ api }) => api.refreshCells()} />
                    </WidgetLoading>
                </div>
                <div className="rounded-lg w-full h-14 mb-1 shadow-[0_0_11px_0_rgba(0,0,0,0.06)] border border-L-gray-300 flex items-center p-4 gap-6">
                    <InfoField label="ردیف" value={data?.length || 0} />
                    <Seperator height={'50%'} />
                    <InfoField label="تعداد" value={footerData.quantity} />
                    <Seperator height={'50%'} />
                    <InfoField label="قیمت" value={footerData.price} preFix preFixText="ریال" />
                    <Seperator height={'50%'} />
                    <InfoField label="کارمزد" value={footerData.comission} preFix preFixText="ریال" />
                    <Seperator height={'50%'} />
                    <InfoField label="ارزش معامله" value={footerData.tradeValue} preFix preFixText="ریال" />
                </div>
            </div>
        </AppModal>
    );
};

const InfoField = ({ label, value, preFix, preFixText = '' }: TInfoFieldParams) => {
    return (
        <div className={clsx('flex gap-2 text-xs font-bold')}>
            <h5 className="text-L-gray-600">{label + ':'}</h5>
            <h5 className="dark:text-white">{seprateNumber(+value)}</h5>
            {preFix ? <h5 className="text-L-gray-500">{preFixText}</h5> : null}
        </div>
    );
};

const getTradeDetails = async (params?: Record<string, any>) => {
    const { data } = await AXIOS.get(Apis().Orders.TradesDetail, { params });
    return data?.result;
};

export default TradeInfoModal;
