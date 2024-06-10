import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TseIcon } from 'src/common/icons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    insCode: string;
}

const TseBtn = ({ insCode, className, ...rest }: Props) => {
    const { t } = useTranslation()

    const onBtnClick = useCallback(() => {
        insCode && window.open('http://tsetmc.com/Loader.aspx?ParTree=151311&i=' + insCode);
    }, [insCode]);

    return (
        <div>
            <Tippy content={t("common.TSE")} className="text-xs">
                <button onClick={onBtnClick} className={`${className ?? ''}`} {...rest}>
                    <TseIcon className='text-L-gray-600 dark:text-D-gray-600' />
                </button>
            </Tippy>
        </div>
    );
};

export default TseBtn;
