import React from 'react';
import SymbolData from './SymbolData';
import SymbolSearch from './SymbolSearch';

const SymbolDetail = () => {
    //
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
