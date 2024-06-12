import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import PriceView from 'src/common/components/PriceView';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setPriceBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { getSelectedSymbol } from 'src/redux/slices/option';

const SymbolPricePreview = () => {
    //
    const selectedSymbol = useAppSelector(getSelectedSymbol)
    
    const appDispatch = useAppDispatch()

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            lastTradedPrice: data?.symbolData?.lastTradedPrice,
            lastTradedPriceVarPercent: data?.symbolData?.lastTradedPriceVarPercent,
            closingPrice: data?.symbolData?.closingPrice,
            closingPriceVarPercent: data?.symbolData?.closingPriceVarPercent,
        }),
    });

    const setPriceOnBuySellModal = (value: number) => {
        appDispatch(setPriceBuySellAction(value))
    }

    return (
        <div className="px-3 py-2 mt-4 text-1.2 rounded-md bg-L-gray-50 dark:bg-D-gray-50 dark:text-L-basic text-D-basic">
            <div className="grid gap-1 grid-cols-2 justify-items-center ">
                <PriceView
                    onClickPrice={() => setPriceOnBuySellModal(data?.lastTradedPrice || 0)}
                    label="آخرین قیمت"
                    price={data?.lastTradedPrice || 0}
                    percentage={data?.lastTradedPriceVarPercent || 0}
                />

                <PriceView
                    onClickPrice={() => setPriceOnBuySellModal(data?.closingPrice || 0)}
                    label="قیمت پایانی"
                    price={data?.closingPrice || 0}
                    percentage={data?.closingPriceVarPercent || 0}
                />
            </div>
        </div>
    );
};

export default React.memo(SymbolPricePreview);
