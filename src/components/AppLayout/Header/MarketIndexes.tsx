import React from 'react';
import PriceView from 'src/components/common/PriceView';

const MarketIndexes = () => {
    //
    return (
        <div className="flex items-center ">
            <div className="flex items-center">
                <span className="ml-1">شاخص کل:</span>
                <PriceView price={1254135} percentage={3.2} />
            </div>
            <div className="flex items-center ml-2 mr-3">
                <span className="ml-1">شاخص هم وزن:</span>
                <PriceView price={155200} percentage={-3.2} />
            </div>
        </div>
    );
};

export default MarketIndexes;
