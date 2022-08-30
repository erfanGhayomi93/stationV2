import React from 'react';
import PriceView from 'src/common/components/PriceView';

const SymbolsPreview = () => {
    //
    return (
        <div className="flex" style={{ fontSize: '13px' }}>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1200} percentage={-0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={12354} percentage={0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={852} percentage={0.6} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={52369} percentage={-0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={251} percentage={0.04} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1200} percentage={-0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1269} percentage={0.8} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={8574} percentage={0.2} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={45866} percentage={-0.35} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={12500} percentage={-0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={1236985} percentage={0.5} />
            </div>
            <div className="flex mx-2">
                <span className="ml-1">فولاد:</span>
                <PriceView price={12584} percentage={-0.5} />
            </div>
        </div>
    );
};

export default SymbolsPreview;
