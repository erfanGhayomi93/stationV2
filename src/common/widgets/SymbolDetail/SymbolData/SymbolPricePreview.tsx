import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import PriceView from 'src/common/components/PriceView';
import { useAppValues } from 'src/redux/hooks';

const SymbolPricePreview = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            lastTradedPrice: data?.symbolData?.lastTradedPrice,
            lastTradedPriceVarPercent: data?.symbolData?.lastTradedPriceVarPercent,
            closingPrice: data?.symbolData?.closingPrice,
            closingPriceVarPercent: data?.symbolData?.closingPriceVarPercent,
        }),
    });

    return (
        <div className="px-3 py-2 rounded-md bg-gray-100">
            <div className="flex justify-between items-center">
                <PriceView label="قیمت پایانی" price={data?.closingPrice || 0} percentage={data?.closingPriceVarPercent || 0} />
                <PriceView label="آخرین قیمت" price={data?.lastTradedPrice || 0} percentage={data?.lastTradedPriceVarPercent || 0} />
            </div>
        </div>
    );
};

export default React.memo(SymbolPricePreview);
