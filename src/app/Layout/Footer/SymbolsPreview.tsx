import React from 'react';
import PriceView from 'src/common/components/PriceView';

const SymbolsPreview = () => {
    //
    return (
        <>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1200} percentage={-0.5} />
            </div>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={12354} percentage={0.5} />
            </div>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={52369} percentage={-0.5} />
            </div>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={251} percentage={0.04} />
            </div>
            <div className="flex mx-2 flex-nowrap whitespace-nowrap snap-center">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1200} percentage={-0.5} />
            </div>
        </>
    );
};

export default SymbolsPreview;
