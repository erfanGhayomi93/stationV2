import Tippy from '@tippyjs/react';
import React from 'react';
import { CurvedRefreshIcon } from 'src/common/icons';

type Props = {
    onClearClick: React.MouseEventHandler<HTMLButtonElement>;
    onSubmitClick: React.MouseEventHandler<HTMLButtonElement>;
};

const SubmitFilterBox = ({ onClearClick, onSubmitClick }: Props) => {
    return (
        <div className="flex gap-2 ">
            <Tippy content={'پیش فرض'}>
                <button onClick={onClearClick} className="border border-L-primary-50 rounded-md px-2">
                    <CurvedRefreshIcon />
                </button>
            </Tippy>
            <button onClick={onSubmitClick} className="w-full p-2 bg-L-primary-50 text-white rounded-md">
                اعمال فیلتر
            </button>
        </div>
    );
};

export default SubmitFilterBox;
