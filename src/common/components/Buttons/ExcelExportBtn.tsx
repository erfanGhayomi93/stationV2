import Tippy from '@tippyjs/react';
import { t } from 'i18next';
import React from 'react';
import { Excel2Icon } from 'src/common/icons';

const ExcelExportBtn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
            <button className={`bg-white dark:bg-D-gray-300 p-2 text-L-gray-600 dark:text-D-gray-600 rounded-md ${props.className}`} {...props}>
                <Excel2Icon className="outline-none" />
            </button>
        </Tippy>
    );
};

export default ExcelExportBtn;
