import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { CodalIcon } from 'src/common/icons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    symbolTitle: string;
}

const CodalBtn = ({ className, symbolTitle, ...rest }: Props) => {
    //
    const onBtnClick = useCallback(() => {
        symbolTitle && window.open('https://www.codal.ir/ReportList.aspx?search&Symbol=' + symbolTitle);
    }, [symbolTitle]);

    return (
        <Tippy content="سایت کدال" className="text-xs">
            <button
                onClick={onBtnClick}
                className={clsx(className || 'flex h-[28px] w-[28px] items-center justify-center rounded-sm  dark:text-white')}
                {...rest}
            >
                <CodalIcon height={24} width={24} />
            </button>
        </Tippy>
    );
};

export default CodalBtn;
