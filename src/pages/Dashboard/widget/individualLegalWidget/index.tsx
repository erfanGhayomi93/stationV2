import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import ProgressBar from '@components/progressBar';
import { dateFormatter, numFormatter, sepNumbers } from '@methods/helper';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSymbolStore } from 'store/symbol';

interface IIndividualLegalWidgetProps {
     // lastTradeDateTime: number
     // TotalNumberOfTrades: number
     // totalNumberOfSharesTraded: number
     // baseVolume: number
     // pe: number
     // floatFree: number
}

interface dataType {
     title: string;
     value: number | string;
     formatter?: (value: number | string) => string;
}

const IndividualLegalWidget: FC<IIndividualLegalWidgetProps> = () => {
     const { t } = useTranslation();

     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { data: detailsSymbol } = useQuerySymbolGeneralInformation<any>(selectedSymbol, data => ({
          individualBuyVolume: data.individualLegal.individualBuyVolume,
          individualSellVolume: data.individualLegal.individualSellVolume,
          legalBuyVolume: data.individualLegal.legalBuyVolume,
          legalSellVolume: data.individualLegal.legalSellVolume,
          numberOfIndividualBuyers: data.individualLegal.numberOfIndividualBuyers,
          numberOfIndividualSellers: data.individualLegal.numberOfIndividualSellers,
          numberOfLegalBuyers: data.individualLegal.numberOfLegalBuyers,
          numberOfLegalSellers: data.individualLegal.numberOfLegalSellers,
          lastTradeDateTime: data?.symbolData?.lastTradeDateTime,
          totalNumberOfTrades: data.symbolData?.totalNumberOfTrades,
          totalNumberOfSharesTraded: data.symbolData?.totalNumberOfSharesTraded,
          baseVolume: data.symbolData?.baseVolume,
          oneMonthTradeVolume: data.symbolData?.oneMonthTradeVolume,
          totalNumberOfSharesCount: data.symbolData?.totalNumberOfSharesCount,
          pe: data.symbolData?.pe,
          floatFree: data.symbolData?.floatFree,
     }));

     const buyPercent = useMemo(() => {
          const total = Number(detailsSymbol?.individualBuyVolume || 0) + Number(detailsSymbol?.legalBuyVolume || 0);
          const individual = detailsSymbol?.individualBuyVolume ? detailsSymbol?.individualBuyVolume / total : 0;
          const legal = detailsSymbol?.legalBuyVolume ? detailsSymbol?.legalBuyVolume / total : 0;
          return { individual, legal };
     }, [detailsSymbol?.individualBuyVolume, detailsSymbol?.legalBuyVolume]);

     const sellPercent = useMemo(() => {
          const total = Number(detailsSymbol?.individualSellVolume || 0) + Number(detailsSymbol?.legalSellVolume || 0);
          const individual = detailsSymbol?.individualSellVolume ? detailsSymbol?.individualSellVolume / total : 0;
          const legal = detailsSymbol?.legalSellVolume ? detailsSymbol?.legalSellVolume / total : 0;
          return { individual, legal };
     }, [detailsSymbol?.individualSellVolume, detailsSymbol?.legalSellVolume]);

     const data: dataType[][] = [
          [
               {
                    title: t('detailsSymbol.lastTradeDateTime'),
                    value: detailsSymbol?.lastTradeDateTime,
                    formatter: value => dateFormatter(value),
               },
               {
                    title: t('detailsSymbol.totalNumberOfTrades'),
                    value: detailsSymbol?.TotalNumberOfTrades,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.totalNumberOfSharesTraded'),
                    value: detailsSymbol?.totalNumberOfSharesTraded,
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.baseVolume'),
                    value: detailsSymbol?.baseVolume,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.monthlyTradeVolume'),
                    value: detailsSymbol?.oneMonthTradeVolume,
                    formatter: value => numFormatter(Number(value)),
               },
               {
                    title: t('detailsSymbol.totalNumberOfSharesCount'),
                    value: detailsSymbol?.totalNumberOfSharesCount,
               },
          ],
          [
               {
                    title: t('detailsSymbol.floatFree'),
                    value: detailsSymbol?.floatFree,
               },
               {
                    title: t('detailsSymbol.pe'),
                    value: detailsSymbol?.pe,
               },
          ],
     ];

     return (
          <div className="flex flex-col gap-y-1 p-2">
               <div className="flex flex-col justify-center gap-y-4 text-sm">
                    <div className="flex items-center justify-between">
                         <ProgressBar
                              percent={buyPercent.individual * 100}
                              bgColorClass="bg-progressbar-success"
                              topCenter={detailsSymbol?.individualBuyVolume}
                              bottomCenter={detailsSymbol?.numberOfIndividualBuyers}
                              origin="end"
                         />

                         <span className="mx-8 text-content-paragraph">{t('detailsSymbol.individual')}</span>

                         <ProgressBar
                              percent={sellPercent.individual * 100}
                              bgColorClass="bg-progressbar-error"
                              topCenter={detailsSymbol?.individualSellVolume}
                              bottomCenter={detailsSymbol?.numberOfIndividualSellers}
                         />
                    </div>

                    <div className="flex items-center justify-between">
                         <ProgressBar
                              percent={buyPercent.legal * 100}
                              bgColorClass="bg-progressbar-success"
                              topCenter={detailsSymbol?.legalBuyVolume}
                              bottomCenter={detailsSymbol?.numberOfLegalBuyers}
                              origin="end"
                         />

                         <span className="mx-8 text-content-paragraph">{t('detailsSymbol.legal')}</span>

                         <ProgressBar
                              percent={sellPercent.legal * 100}
                              bgColorClass="bg-progressbar-error"
                              topCenter={detailsSymbol?.legalSellVolume}
                              bottomCenter={detailsSymbol?.numberOfLegalSellers}
                         />
                    </div>
               </div>

               <div className="mt-2">
                    {data?.map((item, index) => (
                         <div key={index} className="mx-3 flex border-b border-line-div-3 py-3 text-xs last:border-none">
                              {item.map((child, ind) => (
                                   <div
                                        key={ind}
                                        className="flex flex-1 justify-between border-line-div-3 odd:border-l odd:pl-3 even:pr-3"
                                   >
                                        <span className="text-content-paragraph">{child.title}:</span>
                                        <span className="ltr text-content-title">
                                             {child?.formatter ? child.formatter(child.value) || '−' : child.value || '−'}
                                        </span>
                                   </div>
                              ))}
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default IndividualLegalWidget;
