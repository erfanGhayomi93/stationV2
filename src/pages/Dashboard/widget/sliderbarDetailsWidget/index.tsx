import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { pushEngine } from '@LS/pushEngine';
import SymbolPriceSlider from '@pages/Dashboard/components/SymbolPriceSlider';
import { DetailsSymbolSlider } from '@pages/Dashboard/components/SymbolPriceSlider/DetailsSymbolSlider';
import { HighLowPriceSymbol } from '@pages/Dashboard/components/SymbolPriceSlider/HighLowPriceSymbol/HighLowPriceSymbol';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useSymbolStore } from 'store/symbol';

type SymbolDataKey = keyof ISymbolData;
type IndividualLegalKey = keyof IIndividualLegal;

const SliderbarDetailsWidget = () => {
     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const refData = useRef<ISymbolGeneralInformationRes>();

     const queryClient = useQueryClient();

     const { setDebounce } = UseDebounceOutput();

     const { data, isSuccess } = useQuerySymbolGeneralInformation<any>(selectedSymbol);

     useEffect(() => {
          if (isSuccess) {
               console.log('hi');
               {
                    pushEngine.unSubscribe('SymbolGeneralInfoo');

                    refData.current = JSON.parse(JSON.stringify(data));

                    pushEngine.subscribe({
                         id: 'SymbolGeneralInfoo',
                         mode: 'MERGE',
                         isSnapShot: 'yes',
                         adapterName: 'RamandRLCDData',
                         items: [selectedSymbol],
                         fields: [
                              'yesterdayClosingPrice',
                              'lowThreshold',
                              'highThreshold',
                              'individualBuyVolume',
                              'numberOfIndividualSellers',
                              'individualSellVolume',
                              'numberOfLegalBuyers',
                              'legalBuyVolume',
                              'numberOfLegalSellers',
                              'legalSellVolume',
                              'totalTradeValue',
                              'totalNumberOfSharesTraded',
                              'baseVolume',
                              'firstTradedPrice',
                              'lastTradedPrice',
                              'lastTradedPriceVar',
                              'lastTradedPriceVarPercent',
                              'closingPrice',
                              'closingPriceVar',
                              'closingPriceVarPercent',
                              'lastTradeDateTime',
                              'lowestTradePriceOfTradingDay',
                              'highestTradePriceOfTradingDay',
                              'symbolState',
                              'openPrice',
                         ],
                         onFieldsUpdate: ({ changedFields, itemName }) => {
                              console.log(changedFields, 'changedFields');
                              const tempObj: { symbolData: Partial<ISymbolData>; individualLegal: Partial<IIndividualLegal> } = {
                                   symbolData: {},
                                   individualLegal: {},
                              };

                              const { symbolData, individualLegal } = refData.current || tempObj;

                              const symbolDataChanged: Partial<ISymbolData> = {};

                              const individualLegalChanged: Partial<IIndividualLegal> = {};

                              for (const [key, value] of Object.entries(changedFields)) {
                                   if (value !== null) {
                                        if (symbolData && key in symbolData) {
                                             symbolDataChanged[key as SymbolDataKey] = value as ISymbolData[SymbolDataKey];
                                        }
                                        if (individualLegal && key in individualLegal) {
                                             individualLegalChanged[key as IndividualLegalKey] =
                                                  value as IIndividualLegal[IndividualLegalKey];
                                        }
                                   }
                              }

                              tempObj['symbolData'] = { ...symbolData, ...symbolDataChanged };
                              tempObj['individualLegal'] = { ...individualLegal, ...individualLegalChanged };

                              setDebounce(() => {
                                   queryClient.setQueryData(['SymbolGeneralInformation', itemName], () => {
                                        return { ...refData.current, ...tempObj };
                                   });
                              }, 1000);
                         },
                    });
               }
          }
     }, [isSuccess]);

     return (
          <div className="flex w-full flex-col gap-x-1 p-2">
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
                         TickPrice={data?.symbolData?.tickPrice ?? 0}
                         totalNumberOfSharesTraded={data?.symbolData?.totalNumberOfSharesTraded ?? 0}
                         baseVolume={data?.symbolData?.baseVolume ?? 0}
                         totalNumberOfTrades={data?.symbolData?.totalNumberOfTrades ?? 0}
                         monthlyTradeVolume={data?.symbolData?.monthlyTradeVolume ?? 0}
                         lastTradedPriceDate={new Date(data?.symbolData?.lastTradedDate ?? 0)?.getTime() ?? 0}
                         pe={data?.symbolData?.pe ?? 0}
                         lastTradedPriceVarPercent={data?.symbolData?.lastTradedPriceVarPercent ?? 0}
                    />
               </div>
          </div>
     );
};

export default SliderbarDetailsWidget;
