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
        <button onClick={onBtnClick} className={`p-1 rounded-sm hover:bg-L-gray-250 dark:hover:bg-D-gray-250 dark:text-white ${className}`} {...rest}>
            <CodalIcon />
        </button>
    );
};

export default CodalBtn;
