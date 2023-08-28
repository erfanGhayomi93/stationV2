import { useMemo } from 'react';
import KucoinDepth from './KucoinDepth';
import KucoinChart from './KucoinChart';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppValues } from 'src/redux/hooks';

const Kucoin = ({ isDepthChartOpen }: { isDepthChartOpen: boolean }) => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data: symbolData } = useSymbolGeneralInfo<SymbolGeneralInfoType>(selectedSymbol);


    const { yesterdayClosingPrice, highThreshold, lowThreshold, lastTradedPrice } = useMemo(() => {
        const initialData = { yesterdayClosingPrice: 0, highThreshold: 0, lowThreshold: 0, lastTradedPrice: 0 };

        if (!symbolData) return initialData;

        initialData.yesterdayClosingPrice = symbolData.symbolData?.yesterdayClosingPrice ?? 0;
        initialData.highThreshold = symbolData.symbolData?.highThreshold ?? 0;
        initialData.lowThreshold = symbolData.symbolData?.lowThreshold ?? 0;
        initialData.lastTradedPrice = symbolData.symbolData?.lastTradedPrice ?? 0;

        return initialData;
    }, [symbolData]);

    return (
        <div className="h-full flex overflow-hidden">
            {isDepthChartOpen && (
                <div className="flex-1">
                    <KucoinChart
                        yesterdayClosingPrice={yesterdayClosingPrice}
                        highThreshold={highThreshold}
                        lowThreshold={lowThreshold}
                    />
                </div>
            )}

            <div className="flex-1 h-full">
                <KucoinDepth lastTradedPrice={lastTradedPrice}/>
            </div>
        </div>
    );
};

export default Kucoin;
