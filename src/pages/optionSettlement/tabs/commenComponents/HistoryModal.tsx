import { Dispatch, SetStateAction, useMemo } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import { RequestStatusOptions } from '../../constants';

type TProps = {
    title: 'نقدی' | 'فیزیکی';
    state: {
        isOpen: boolean;
        data?: Record<string, any>;
    };
    setState: Dispatch<SetStateAction<TProps['state']>>;
};

const HistoryModal = ({ state: { data, isOpen }, setState, title }: TProps) => {
    //
    const handleClose = () => setState({ isOpen: false, data: {} });

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: 'زمان',
                field: 'dateTime',
                type: 'date',
            },
            {
                headerName: 'وضعیت',
                field: 'status',
                valueFormatter: ({ value }) => (value ? RequestStatusOptions?.find((item) => item.value === value)?.label : value),
            },
            {
                headerName: 'درخواست',
                field: 'description',
            },
        ],
        [],
    );

    return (
        <Modal isOpen={isOpen} className="rounded w-[500px]" onClose={handleClose}>
            <div className="bg-L-basic dark:bg-D-basic flex flex-col shadow-md h-[350px]">
                <div className="moveable flex justify-between items-center bg-L-primary-50 dark:bg-D-primary-200 px-6 h-12">
                    <span className="font-medium text-base text-white">{`تاریخچه درخواست های تسویه ${title} ${
                        data?.symbolTitle ? ' - ' + data?.symbolTitle : ''
                    }`}</span>
                    <button className="p-1" onClick={handleClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>
                <div className="flex-1 p-6">
                    <AGTable suppressRowHoverHighlight columnDefs={colDefs} rowData={data?.history || []} />
                </div>
            </div>
        </Modal>
    );
};

export default HistoryModal;
