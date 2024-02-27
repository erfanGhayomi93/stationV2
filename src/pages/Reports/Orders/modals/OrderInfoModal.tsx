import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import AXIOS from 'src/api/axiosInstance';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AppModal from 'src/common/components/AppModal';
import Seperator from 'src/common/components/IpoBuyModal/components/Seperator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { seprateNumber } from 'src/utils/helpers';

type Props = {
    modalData: { isOpen: boolean; data?: IGTOrderListResultType };
    setModalData: Dispatch<SetStateAction<{ isOpen: boolean; data?: Props['modalData']['data'] }>>;
    aggregateType: 'None' | 'Customer' | 'Symbol' | 'Both';
};

type TInfoFieldParams = {
    label: string;
    value: string | number;
    preFix?: boolean;
    preFixText?: string;
};

const OrderInfoModal = ({ modalData, setModalData, aggregateType }: Props) => {
    const handleClose = () => setModalData({ isOpen: false });
    const [footerData, setFooterData] = useState({
        quantity: 0,
        price: 0,
        row: 0,
        orderValue: 0,
    });

    const { data, isLoading } = useQuery(
        ['OrderDetails'],
        () =>
            getOrderDetails({
                IDOfTrader: modalData?.data?.idOfTrader,
                OrderSide: modalData?.data?.orderSide,
                SymbolISIN: aggregateType !== 'Customer' ? modalData?.data?.symbolISIN : undefined,
                CustomerISIN: aggregateType !== 'Symbol' ? modalData?.data?.customerISIN : undefined,
                OrderDateTime: modalData?.data?.orderDateTime,
                OMSOrderState: modalData?.data?.omsOrderState,
            }),
        {
            cacheTime: 0,
            enabled: !!modalData?.data,
            onSuccess: (value) => {
                if (value) {
                    setFooterData(
                        value.reduce(
                            (a: typeof footerData, b: Record<string, any>, c: number) => {
                                a.quantity += b.quantity;
                                a.price += b.price;
                                a.row += c + 1;
                                a.orderValue += b.orderValue;
                                return a;
                            },
                            { price: 0, quantity: 0, row: 0, orderValue: 0 } as typeof footerData,
                        ),
                    );
                }
            },
            onError: () => {
                setFooterData({ orderValue: 0, price: 0, quantity: 0, row: 0 });
            },
        },
    );

    const colDefs = useMemo(
        (): ColDefType<unknown>[] => [
            { headerName: 'ردیف', valueGetter: ({ node }) => Number(node?.rowIndex) + 1, maxWidth: 60 },
            ...(aggregateType !== 'Customer' ? [{ headerName: 'مشتری', field: 'customerTitle' }] : []),
            ...(aggregateType !== 'Symbol' ? [{ headerName: 'نماد', field: 'symbolTitle' }] : []),
            { headerName: 'تعداد', field: 'quantity', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'ارزش سفارش', field: 'totalValue', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'شماره اعلامیه', field: 'hostOrderNumber', maxWidth: 100, type: 'sepratedNumber' },
            { headerName: 'وضعیت', field: 'omsOrderState', valueFormatter: ({ value }) => t('order_status.' + value) },
            { headerName: 'زمان', field: 'orderDateTime', type: 'date', minWidth: 150 },
        ],
        [],
    );

    const createTitle = () => {
        switch (aggregateType) {
            case 'Customer':
                const customerTitle = modalData?.data?.customerTitle;
                return `(مشتری${customerTitle ? ' - ' + customerTitle : ''})`;
            case 'Symbol':
                const symbolTitle = modalData?.data?.symbolTitle;
                return `(نماد${symbolTitle ? ' - ' + symbolTitle : ''})`;
            default:
                return '';
        }
    };

    return (
        <AppModal
            isOpen={modalData?.isOpen}
            handleClose={handleClose}
            height={500}
            width={1100}
            title={
                <span className="font-normal text-sm text-white">
                    جزئیات سفارش <span className="text-L-info-50">{createTitle()}</span>
                </span>
            }
        >
            <div className="h-full w-full flex flex-col p-4 justify-between gap-3">
                <div className="flex-1">
                    <WidgetLoading spining={isLoading}>
                        <AGTable columnDefs={colDefs} rowData={data} suppressRowHoverHighlight />
                    </WidgetLoading>
                </div>
                <div className="rounded-lg w-full h-14 mb-1 shadow-[0_0_11px_0_rgba(0,0,0,0.06)] border border-L-gray-300 flex items-center p-4 gap-6">
                    <InfoField label="ردیف" value={data?.length || 0} />
                    <Seperator height={'50%'} />
                    <InfoField label="تعداد" value={footerData.quantity} />
                    <Seperator height={'50%'} />
                    <InfoField label="قیمت" value={footerData.price} preFix preFixText="ریال" />
                    <Seperator height={'50%'} />
                    <InfoField label="ارزش سفارش" value={footerData.orderValue} preFix preFixText="ریال" />
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

const getOrderDetails = async (params?: Record<string, any>) => {
    const { data } = await AXIOS.get(Apis().Orders.OrderDetails, { params });
    return data?.result;
};

export default OrderInfoModal;
