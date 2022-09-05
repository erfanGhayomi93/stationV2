import React, { useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import { useAppValues } from 'src/redux/hooks';
import SymbolData from './SymbolData';
import SymbolSearch from './SymbolSearch';

const SymbolDetail = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    // apply loading here
    const { remove, isLoading } = useSymbolGeneralInfo(selectedSymbol);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [selectedSymbol]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="pb-2">
                <SymbolSearch />
            </div>
            <div className="grow">
                <SymbolData />
            </div>
        </div>
    );
};

export default SymbolDetail;
