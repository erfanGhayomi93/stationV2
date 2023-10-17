import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { Check, CloseIcon, HistoryIcon } from 'src/common/icons';
import HistoryModal from '../modals/HistoryModal';
import { ICellRendererParams } from 'ag-grid-community';

const RequestActionCell = ({ data }: ICellRendererParams) => {
    //
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const openHistoryModal = () => setIsHistoryModalOpen(true);


    return (
        <div className="h-full flex items-center justify-center gap-3">
            <button className="text-L-success-200">
                <Check width={20} height={20} />
            </button>
            <button className="text-L-error-200">
                <CloseIcon width={16} height={16} />
            </button>
            <Tippy className="text-xs" content="تاریخچه">
                <button onClick={openHistoryModal} className="text-L-primary-50 rounded-md p-1 bg-L-gray-200 dark:bg-D-gray-200">
                    <HistoryIcon width={20} height={20} />
                </button>
            </Tippy>
            <HistoryModal
                isOpen={isHistoryModalOpen}
                setClose={setIsHistoryModalOpen}
                requestId={data?.id}
                requestNumber={data?.requestNo}
                customerTitle={data?.customerTitle}
            />
        </div>
    );
};

export default RequestActionCell;
