import { useQuery } from '@tanstack/react-query';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getOfflineRequestHistory } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { CloseIcon } from 'src/common/icons';

type ModalProps = {
    isOpen: boolean;
    setClose: Dispatch<SetStateAction<boolean>>;
    requestId: number;
    requestNumber: number;
    customerTitle: string;
};

const HistoryModal = ({ isOpen, setClose, requestId, requestNumber, customerTitle }: ModalProps) => {
    //
    const { t } = useTranslation();

    const { data, isFetching } = useQuery(
        [Apis().Orders.OfflineRequestHistory, requestId],
        ({ queryKey }) => getOfflineRequestHistory(queryKey[1] as number),
        {
            enabled: !!requestId && isOpen,
        },
    );

    const columns = useMemo(
        (): ColDefType<IGTOfflineRequestHistoryResult>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                maxWidth: 100,
                field: 'agTableIndex',
                valueFormatter: ({ node }) => String(node?.rowIndex! + 1),
            },
            { headerName: t('ag_columns_headerName.userName'), field: 'userName'},
            { headerName: t('ag_columns_headerName.date'), field: 'dateTime', type: 'date' },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestState.' + value) : '-'),
            },
        ],
        [],
    );
    return (
        <Modal isOpen={isOpen} onClose={setClose} className="min-h-[30rem] w-2/5 bg-L-basic dark:bg-D-basic rounded-md h-full grid">
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>{`تاریخچه تغییرات: درخواست شماره ${requestNumber || '-'} - مشتری ${customerTitle || '-'}`}</div>
                    <CloseIcon onClick={() => setClose(false)} className="cursor-pointer" />
                </div>

                <WidgetLoading spining={isFetching}>
                    <div className="p-6 pt-2 h-full">
                        <AGTable columnDefs={columns} rowData={data || []} suppressRowVirtualisation={true} suppressColumnVirtualisation={true} />
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    );
};

export default HistoryModal;
