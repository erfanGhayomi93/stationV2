import React, { useCallback } from 'react';
import { TseIcon } from 'src/common/icons';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    insCode: string;
}

const TseBtn = ({ insCode, className, ...rest }: Props) => {
    //
    const onBtnClick = useCallback(() => {
        insCode && window.open('http://tsetmc.com/Loader.aspx?ParTree=151311&i=' + insCode);
    }, [insCode]);

    return (
        <button onClick={onBtnClick} className={`p-1 rounded-sm hover:bg-slate-100 ${className}`} {...rest}>
            <TseIcon />
        </button>
    );
};

export default TseBtn;
