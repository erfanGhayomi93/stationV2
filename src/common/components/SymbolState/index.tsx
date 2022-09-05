import React, { useMemo } from 'react';

interface Props {
    symbolState: string;
}

const SymbolState = ({ symbolState }: Props) => {
    //

    const symbolStateColor = useMemo(() => {
        if (symbolState === 'OrderEntryAuthorized_Open') return 'bg-green-400 dark:bg-dark-green-100'; //مجاز
        if (symbolState === 'OrderEntryAuthorized_Reserved') return 'bg-yellow-400'; //مجاز_محفوظ
        if (symbolState === 'OrderEntryAuthorized_Frozen') return 'bg-red-400 dark:bg-dark-red-100'; //ممنوع
        if (symbolState === 'OrderEntryForbidden_Suspended') return 'bg-red-400 dark:bg-dark-red-100'; //ممنوع_متوقف
        if (symbolState === 'OrderEntryForbidden_Open') return 'bg-yellow-400'; //مجاز_متوقف
        if (symbolState === 'OrderEntryForbidden_Reserved') return 'bg-yellow-400'; //ممنوع-محفوظ

        return 'bg-black dark:bg-dark-gray';
    }, [symbolState]);

    const symbolStateTooltip = useMemo(() => {
        if (symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
        if (symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
        if (symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
        if (symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
        if (symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
        if (symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';

        return 'SymbolState : ' + symbolState;
    }, [symbolState]);

    return <div title={symbolStateTooltip} className={`w-[9px] h-[9px] rounded-full ${symbolStateColor}`}></div>;
};

export default SymbolState;
