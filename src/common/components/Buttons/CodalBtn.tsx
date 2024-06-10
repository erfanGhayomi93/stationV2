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
        <div>
            <Tippy content={t("common.codal")} className="text-xs">
                <button
                    onClick={onBtnClick}
                    className={clsx(className ?? '')}
                    {...rest}
                >
                    <CodalIcon className='text-L-gray-600 dark:text-D-gray-600' />
                </button>
            </Tippy>
        </div>
    );
};

export default CodalBtn;
