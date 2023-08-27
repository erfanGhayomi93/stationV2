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
        <Tippy content={t("common.TSE")} className="text-xs">
            <button onClick={onBtnClick} className={`flex items-center justify-center p-1 rounded-sm  ${className}`} {...rest}>
                <TseIcon />
            </button>
        </Tippy>
    );
};

export default TseBtn;
