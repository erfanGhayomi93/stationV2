import { t } from 'i18next';
import { useMemo } from 'react';
import { useOpentRequestsHistory } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AppModal from 'src/common/components/AppModal';
import WidgetLoading from 'src/common/components/WidgetLoading';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data?: Record<string, any>;
};

const InfoModal = ({ isOpen, onClose, data }: Props) => {
    const { data: historyData, isLoading } = useOpentRequestsHistory(data?.id);

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: 'شناسه نماد',
                field: 'symbolISIN',
            },
            {
                headerName: 'تاریخ',
                field: 'date',
                type: 'date',
            },
            {
                headerName: 'وضعیت',
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestState.' + value) : value),
            },
            {
                headerName: 'عملیات',
                field: 'action',
            },
        ],
        [],
    );

    return (
        <AppModal
            isOpen={isOpen}
            handleClose={onClose}
            height={500}
            width={600}
            title={
                <span className="font-normal text-sm text-white">
                    تاریخچه درخواست مشتری <span className="text-L-info-50 dark:text-D-info-50">{data?.customerTitle || ''}</span>
                </span>
            }
        >
            <WidgetLoading spining={isLoading}>
                <div className="h-full p-2">
                    <AGTable columnDefs={colDefs} rowData={historyData} suppressRowHoverHighlight />
                </div>
            </WidgetLoading>
        </AppModal>
    );
};

export default InfoModal;
