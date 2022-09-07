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

    // isLoading or isFetching ? depends ...
    const { remove, isLoading, isFetching } = useSymbolGeneralInfo(selectedSymbol);

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
            {/*  apply loading wrapper here */}
            <div className="grow">
                <SymbolData />
            </div>
        </div>
    );
};

export default SymbolDetail;
