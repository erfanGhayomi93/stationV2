import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AXIOS from 'src/api/axiosInstance';
import { useOrdersListDetails } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AppModal from 'src/common/components/AppModal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { dateTimeFormatter } from 'src/utils/helpers';

export type TDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    orderId?: string,
    customerTitle?: string,
    symbolTitle?: string,
    orderSide?: string
};


const DetailModal = ({ isOpen, onClose, orderId, customerTitle, orderSide, symbolTitle }: TDetailModalProps) => {
    //
    const { data, isFetching } = useOrdersListDetails(orderId, {
        enabled: Boolean(orderId),
    });

    const { t } = useTranslation();

    const colDefs = useMemo(
        (): ColDefType<IOrderListDetail>[] => [
            {
                headerName: 'زمان',
                field: 'orderDateTime',
                valueFormatter: ({ value }) => dateTimeFormatter(value),
                minWidth: 150,
                cellClass: 'ltr',
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                type: 'sepratedNumber',
                maxWidth: 120
            },
            {
                headerName: 'قیمت',
                field: 'price',
                type: 'sepratedNumber',
                maxWidth: 120
            },
            {
                headerName: 'وضعیت',
                field: 'omsOrderState',
                valueFormatter: ({ value }) => t(`order_status.${value}`),
                minWidth: 150,
                cellClassRules: {
                    'text-L-warning': ({ value }) => !['OrderDone', 'Canceled', 'DeleteByEngine'].includes(value),
                    'text-L-success-200': ({ value }) => value === 'OrderDone',
                    'text-L-error-200': ({ value }) => ['Canceled', 'DeleteByEngine', 'Error'].includes(value),
                },
            },
        ],
        [],
    );

    return (
        <AppModal
            isOpen={isOpen}
            handleClose={onClose}
            height={500}
            width={700}
            title={
                <span className="font-normal text-sm text-white font-IRANSansFaNum">
                    <span>جزئیات سفارش‌‌</span>
                    {
                        customerTitle && <span className='pr-1'>{customerTitle}</span>
                    }
                    {
                        symbolTitle && <span>{' - ' + symbolTitle}</span>
                    }
                    {
                        orderSide && <span className='px-1'>({t('orderSide.' + orderSide)})</span>
                    }
                </span>
            }
        >
            <div className="flex-1 p-6">
                <WidgetLoading spining={isFetching}>
                    <AGTable
                        columnDefs={colDefs}
                        rowData={data}
                        suppressRowHoverHighlight
                    />
                </WidgetLoading>
            </div>
        </AppModal>
    );
};

export default DetailModal;