import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useCallback, ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { CodalIcon } from 'src/common/icons';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    symbolTitle: string;
}

const CodalBtn = ({ className, symbolTitle, ...rest }: Props) => {
    const { t } = useTranslation()
    const onBtnClick = useCallback(() => {
        symbolTitle && window.open('https://www.codal.ir/ReportList.aspx?search&Symbol=' + symbolTitle);
    }, [symbolTitle]);

    return (
        <Tippy content={t("common.codal")} className="text-xs">
            <button
                onClick={onBtnClick}
                className={clsx(className || 'flex items-center justify-center rounded-sm  dark:text-white')}
                {...rest}
            >
                <CodalIcon className='w-6 h-6' />
            </button>
        </Tippy>
    );
};

export default CodalBtn;
