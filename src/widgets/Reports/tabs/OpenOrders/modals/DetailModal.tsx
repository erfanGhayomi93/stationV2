import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import AXIOS from 'src/api/axiosInstance';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { CloseIcon } from 'src/common/icons';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    OrderId: number | undefined;
};

type TResponse = {
    id: number;
    dateTime: string;
    state: string;
};

const DetailModal = ({ isOpen, onClose, OrderId }: Props) => {
    //
    const { data, isFetching } = useGetOrderState(OrderId, {
        enabled: Boolean(OrderId),
    });

    const colDefs = useMemo(
        (): ColDefType<TResponse>[] => [
            {
                headerName: 'زمان',
                field: 'dateTime',
                type: 'date',
                maxWidth: 153,
            },
            {
                headerName: 'وضعیت',
                field: 'state',
            },
        ],
        [],
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-[500px] h-[344px] rounded">
            <div className="w-full h-full bg-L-basic dark:bg-D-basic flex flex-col shadow-md">
                <div className="flex justify-between items-center bg-L-primary-50 dark:bg-D-primary-200 px-6 h-12">
                    <span className="font-medium text-base text-white">{'جزئیات'}</span>
                    <button className="p-1" onClick={onClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>
                <div className="flex-1 p-6">
                    <WidgetLoading spining={isFetching}>
                        <AGTable columnDefs={colDefs} rowData={data} />
                    </WidgetLoading>
                </div>
            </div>
        </Modal>
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