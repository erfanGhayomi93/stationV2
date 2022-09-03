import React from 'react';
import PriceView from 'src/common/components/PriceView';

const SymbolPricePreview = () => {
    //
    return (
        <div className="px-3 py-2 rounded-md bg-gray-100">
            <div className="flex justify-between items-center">
                <PriceView label="قیمت پایانی" price={12354} percentage={0.5} />
                <PriceView label="آخرین قیمت" price={345} percentage={-0.5} />
            </div>
        </div>
    );
};

export default React.memo(SymbolPricePreview);
