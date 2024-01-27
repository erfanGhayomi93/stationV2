import Tippy from '@tippyjs/react';
import React from 'react';
import { IsFilterActiveIcon, NewFilterPlusIcon } from 'src/common/icons';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isFilterActive?: boolean;
}

const OpenFilterBoxBtn = ({ isFilterActive = false, ...rest }: IProps) => {
    return (
        <Tippy content={'نمایش فیلتر'} className="text-xs">
            <div className="relative">
                <button className={`bg-white dark:bg-D-gray-300 p-2 text-L-gray-600 dark:text-D-gray-600 rounded-md `} {...rest}>
                    {isFilterActive && (
                        <div className="absolute top-[2px] right-[2px]">
                            <IsFilterActiveIcon />
                        </div>
                    )}
                    <NewFilterPlusIcon className="outline-none" />
                </button>
            </div>
        </Tippy>
    );
};

export default OpenFilterBoxBtn;
