import Tippy from '@tippyjs/react';
import React from 'react';
import { Check, CloseIcon, HistoryIcon } from 'src/common/icons';

const RequestActionCell = () => {
    return (
        <div className="h-full flex items-center justify-center gap-3">
            <button className="text-L-success-200">
                <Check width={20} height={20} />
            </button>
            <button className="text-L-error-200">
                <CloseIcon width={16} height={16} />
            </button>
            <Tippy className="text-xs" content="تاریخچه">
                <button className="text-L-primary-50 rounded-md p-1 bg-L-gray-200 dark:bg-D-gray-200">
                    <HistoryIcon width={20} height={20} />
                </button>
            </Tippy>
        </div>
    );
};

export default RequestActionCell;
