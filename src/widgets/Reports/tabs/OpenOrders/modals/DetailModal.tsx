import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AXIOS from 'src/api/axiosInstance';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AppModal from 'src/common/components/AppModal';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { CloseIcon } from 'src/common/icons';

export type TDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    modalData?: IOrderGetType;
};

type TResponse = {
    id: number;
    dateTime: string;
    state: string;
};

const DetailModal = ({ isOpen, onClose, modalData }: TDetailModalProps) => {
    //
    const { data, isFetching } = useGetOrderState(modalData?.orderId, {
        enabled: Boolean(modalData?.orderId),
    });

    const { t } = useTranslation();

    const modalTitle = `جزئیات سفارش ${modalData?.customerTitle || 'مشتری'} ${
        modalData?.hostOrderNumber ? 'با شماره سفارش ' + modalData?.hostOrderNumber : ''
    }`;

    const colDefs = useMemo(
        (): ColDefType<TResponse>[] => [
            {
                headerName: 'زمان',
                field: 'dateTime',
                valueFormatter: ({ value }) => (dayjs(value).isValid() ? dayjs(value).calendar('jalali').format('HH:mm   YYYY-MM-DD') : value),
                maxWidth: 153,
            },
            {
                headerName: 'وضعیت',
                field: 'state',
                valueFormatter: ({ value }) => t(`order_status.${value}`),
            },
        ],
        [],
    );

    return (
        <AppModal
            isOpen={isOpen}
            handleClose={onClose}
            height={344}
            title={
                <span className="font-normal text-sm text-white">
                    جزئیات سفارش <span className="text-L-info-50">{modalData?.customerTitle || 'مشتری '} </span>
                    {modalData?.hostOrderNumber && (
                        <>
                            با شماره سفارش <span className="text-L-info-50">{modalData?.hostOrderNumber}</span>
                        </>
                    )}
                </span>
            }
        >
            <div className="flex-1 p-6">
                <WidgetLoading spining={isFetching}>
                    <AGTable columnDefs={colDefs} rowData={data} suppressRowHoverHighlight />
                </WidgetLoading>
            </div>
        </AppModal>
    );
};

export default DetailModal;

export const useGetOrderState = (OrderId?: number, options?: Omit<UseQueryOptions<any, any, any, any>, 'queryFn'>) =>
    useQuery(['OrderStateHistory'], () => getOrderStateHistory(OrderId as number), {
        ...options,
    });

const getOrderStateHistory = async (OrderId: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TResponse[]>>(Apis().Orders.Details, { params: { OrderId } });
    return data?.result || [];
};
