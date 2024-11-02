import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { pushEngine, UpdatedFieldsType } from '@LS/pushEngine';
import { subscribeSymbolGeneral } from '@LS/subscribes';
import SymbolPriceSlider from '@pages/Dashboard/components/SymbolPriceSlider';
import { DetailsSymbolSlider } from '@pages/Dashboard/components/SymbolPriceSlider/DetailsSymbolSlider';
import { HighLowPriceSymbol } from '@pages/Dashboard/components/SymbolPriceSlider/HighLowPriceSymbol/HighLowPriceSymbol';
import { useQueryClient } from '@tanstack/react-query';
import { SymbolGeneralfields, TFieldSymbolGeneralResLs } from 'common/constant/symbol';
import { useEffect, useRef } from 'react';
import { useSymbolStore } from 'store/symbol';

type SymbolDataKey = keyof ISymbolData;
type IndividualLegalKey = keyof IIndividualLegal;



const SliderbarDetailsWidget = () => {
     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const refData = useRef<ISymbolGeneralInformationRes>();

     const queryClient = useQueryClient();

     const { setDebounce } = UseDebounceOutput();

     const { data, isSuccess, isFetching } = useQuerySymbolGeneralInformation(selectedSymbol);



     const updateSymbolLS = ({ changedFields, itemName }: UpdatedFieldsType<TFieldSymbolGeneralResLs>) => {

          // const tempObj: { symbolData: Partial<ISymbolData>; individualLegal: Partial<IIndividualLegal> } = {
          //      symbolData: {},
          //      individualLegal: {},
          // };

          const SymbolGeneralInformationSnapshot: ISymbolGeneralInformationRes = JSON.parse(JSON.stringify(refData.current));

          let { symbolData, individualLegal } = SymbolGeneralInformationSnapshot;

          const symbolDataChanged: Partial<ISymbolData> = {};

          const individualLegalChanged: Partial<IIndividualLegal> = {};

          for (const [key, value] of Object.entries(changedFields)) {
               if (value !== null) {
                    if (symbolData && key in symbolData) {
                         symbolDataChanged[key as SymbolDataKey] = value;
                    }
                    if (individualLegal && key in individualLegal) {
                         individualLegalChanged[key as IndividualLegalKey] = value;
                    }
               }
          }

          symbolData = { ...symbolData, ...symbolDataChanged };
          individualLegal = { ...individualLegal, ...individualLegalChanged };

          refData.current = SymbolGeneralInformationSnapshot;

          setDebounce(() => {
               queryClient.setQueryData(['SymbolGeneralInformation', itemName], () => {
                    return { ...refData.current };
               });
          }, 1000);

     }

     useEffect(() => {
          if (!isFetching && isSuccess) {
               //init Ref data
               refData.current = data;

               const id = 'SymbolGeneralDetails'
               const items = [selectedSymbol]


               subscribeSymbolGeneral<TFieldSymbolGeneralResLs>({
                    id,
                    items,
                    fields: [...SymbolGeneralfields],
                    onItemUpdate: (updatedFields) => {
                         updateSymbolLS(updatedFields)
                    }
               })


               return () => {
                    pushEngine.unSubscribe(id);
               }
          }
     }, [isFetching]);

     return (
          <div className="flex w-full flex-col gap-x-1 p-4">
               <div className="">
                    <SymbolPriceSlider
                         yesterdayClosingPrice={data?.symbolData?.yesterdayClosingPrice ?? 0}
                         thresholdData={[data?.symbolData?.lowThreshold ?? 0, data?.symbolData?.highThreshold ?? 0]}
                         exchangeData={[data?.symbolData?.closingPrice ?? 0, data?.symbolData?.lastTradedPrice ?? 0]}
                         boundaryData={[
                              data?.symbolData?.lowestTradePriceOfTradingDay ?? 0,
                              data?.symbolData?.highestTradePriceOfTradingDay ?? 0,
                         ]}
                    />
               </div>

               <div className="mt-2">
                    <HighLowPriceSymbol
                         highestTradePriceOfTradingDay={data?.symbolData?.highestTradePriceOfTradingDay ?? 0}
                         lowestTradePriceOfTradingDay={data?.symbolData?.lowestTradePriceOfTradingDay ?? 0}
                         yesterdayClosingPrice={data?.symbolData?.yesterdayClosingPrice ?? 0}
                         openPrice={data?.symbolData?.openPrice ?? 0}
                    />
               </div>

               <div>
                    <DetailsSymbolSlider
                         firstTradedPrice={data?.symbolData?.firstTradedPrice ?? 0}
                         closingPrice={data?.symbolData?.closingPrice ?? 0}
                         threeMonthEfficiency={data?.symbolData?.threeMonthEfficiency ?? 0}
                         oneMonthEfficiency={data?.symbolData?.oneMonthEfficiency ?? 0}
                         LowThreshold={data?.symbolData?.lowThreshold ?? 0}
                         HighThreshold={data?.symbolData?.highThreshold ?? 0}
                         tommorowLowThreshold={data?.symbolData?.tommorowLowThreshold ?? 0}
                         tommorowHighThreshold={data?.symbolData?.tommorowHighThreshold ?? 0}
                         totalTradeValue={data?.symbolData?.totalTradeValue ?? 0}
                         tickPrice={data?.symbolData?.tickPrice ?? 0}
                         totalNumberOfSharesTraded={data?.symbolData?.totalNumberOfSharesTraded ?? 0}
                         baseVolume={data?.symbolData?.baseVolume ?? 0}
                         totalNumberOfTrades={data?.symbolData?.totalNumberOfTrades ?? 0}
                         oneMonthTradeVolume={data?.symbolData?.oneMonthTradeVolume ?? 0}
                         lastTradedPriceDate={new Date(data?.symbolData?.lastTradedDate ?? 0)?.getTime() ?? 0}
                         pe={data?.symbolData?.pe ?? 0}
                         lastTradedPriceVarPercent={data?.symbolData?.lastTradedPriceVarPercent ?? 0}
                    />
               </div>
          </div>
     );
};

export default SliderbarDetailsWidget;
