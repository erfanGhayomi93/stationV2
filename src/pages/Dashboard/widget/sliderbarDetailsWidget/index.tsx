import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import SymbolPriceSlider from '@pages/Dashboard/components/SymbolPriceSlider';
import { DetailsSymbolSlider } from '@pages/Dashboard/components/SymbolPriceSlider/DetailsSymbolSlider';
import { HighLowPriceSymbol } from '@pages/Dashboard/components/SymbolPriceSlider/HighLowPriceSymbol/HighLowPriceSymbol';
import { useSymbolStore } from 'store/symbol';

const SliderbarDetailsWidget = () => {
     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { data } = useQuerySymbolGeneralInformation<any>(selectedSymbol, data => ({
          yesterdayClosingPrice: data?.symbolData?.yesterdayClosingPrice,
          highThreshold: data?.symbolData?.highThreshold,
          lastTradedPrice: data?.symbolData?.lastTradedPrice,
          highestTradePriceOfTradingDay: data?.symbolData?.highestTradePriceOfTradingDay,
          lowThreshold: data?.symbolData?.lowThreshold,
          closingPrice: data?.symbolData?.closingPrice,
          lowestTradePriceOfTradingDay: data?.symbolData?.lowestTradePriceOfTradingDay,
          isOption: data?.symbolData?.isOption,
          openPrice: data?.symbolData?.openPrice,
          lastTradedPriceVarPercent: data?.symbolData?.lastTradedPriceVarPercent,
          closingPriceVarPercent: data?.symbolData?.closingPriceVarPercent,

          firstTradedPrice: data?.symbolData?.firstTradedPrice,
          threeMonthEfficiency: data?.symbolData?.threeMonthEfficiency,
          oneMonthEfficiency: data?.symbolData?.oneMonthEfficiency,
          tommorowLowThreshold: data?.symbolData?.tommorowLowThreshold,
          tommorowHighThreshold: data?.symbolData?.tommorowHighThreshold,
          TickPrice: data?.symbolData?.tickPrice,
          totalTradeValue: data?.symbolData?.totalTradeValue,
     }));

     return (
          <div className="flex w-full flex-col gap-x-1 p-2">
               <div className="">
                    <SymbolPriceSlider
                         yesterdayClosingPrice={data?.yesterdayClosingPrice ?? 0}
                         thresholdData={[data?.lowThreshold ?? 0, data?.highThreshold ?? 0]}
                         exchangeData={[data?.closingPrice ?? 0, data?.lastTradedPrice ?? 0]}
                         boundaryData={[data?.lowestTradePriceOfTradingDay ?? 0, data?.highestTradePriceOfTradingDay ?? 0]}
                    />
               </div>

               <div className="mt-2">
                    <HighLowPriceSymbol
                         highestTradePriceOfTradingDay={data?.highestTradePriceOfTradingDay ?? 0}
                         lowestTradePriceOfTradingDay={data?.lowestTradePriceOfTradingDay ?? 0}
                         yesterdayClosingPrice={data?.yesterdayClosingPrice ?? 0}
                         openPrice={data?.openPrice ?? 0}
                    />
               </div>

               <div>
                    <DetailsSymbolSlider
                         firstTradedPrice={data?.firstTradedPrice}
                         closingPrice={data?.closingPrice}
                         threeMonthEfficiency={data?.threeMonthEfficiency}
                         oneMonthEfficiency={data?.oneMonthEfficiency}
                         LowThreshold={data?.lowThreshold}
                         HighThreshold={data?.highThreshold}
                         tommorowLowThreshold={data?.tommorowLowThreshold}
                         tommorowHighThreshold={data?.tommorowHighThreshold}
                         totalTradeValue={data?.totalTradeValue}
                         TickPrice={data?.TickPrice}
                    />
               </div>
          </div>
     );
};

export default SliderbarDetailsWidget;
