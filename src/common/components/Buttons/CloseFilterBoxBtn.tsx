import Tippy from '@tippyjs/react';
import React from 'react';
import { NewFilterMinusIcon } from 'src/common/icons';

const CloseFilterBoxBtn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Tippy content={'بستن فیلتر'} className="text-xs">
            <button className={`bg-L-gray-200 dark:bg-D-gray-300 p-2 text-L-primary-50 dark:text-D-gray-600 rounded-md ${props.className}`} {...props}>
                <NewFilterMinusIcon className="outline-none" />
            </button>
        </Tippy>
    );
};

export default CloseFilterBoxBtn;
