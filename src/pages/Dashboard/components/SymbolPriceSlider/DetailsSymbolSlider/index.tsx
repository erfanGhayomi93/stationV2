import { numFormatter, sepNumbers } from '@methods/helper';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IDetailsSymbolSliderProps {
     firstTradedPrice: number;
     closingPrice: number;
     threeMonthEfficiency: string;
     oneMonthEfficiency: string;
     LowThreshold: string;
     HighThreshold: string;
     tommorowLowThreshold: string;
     tommorowHighThreshold: string;
     totalTradeValue: number;
     TickPrice: string;
}

interface dataType {
     title: string;
     value: number | string;
     formatter?: (value: number | string) => string;
}

export const DetailsSymbolSlider: FC<IDetailsSymbolSliderProps> = ({
     firstTradedPrice,
     closingPrice,
     threeMonthEfficiency,
     oneMonthEfficiency,
     LowThreshold,
     HighThreshold,
     tommorowLowThreshold,
     tommorowHighThreshold,
     TickPrice,
     totalTradeValue,
}) => {
     const { t } = useTranslation();

     const data: dataType[][] = [
          [
               {
                    title: t('detailsSymbol.firstTradedPrice'),
                    value: firstTradedPrice,
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.closingPrice'),
                    value: closingPrice,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.LowHighThreshold'),
                    value: LowThreshold,
                    formatter: () => (LowThreshold ? `${sepNumbers(LowThreshold)}-${sepNumbers(HighThreshold)}` : '−'),
               },
               {
                    title: t('detailsSymbol.LowHighThreshold'),
                    value: tommorowLowThreshold,
                    formatter: () =>
                         tommorowLowThreshold ? `${sepNumbers(tommorowLowThreshold)}-${sepNumbers(tommorowHighThreshold)}` : '−',
               },
          ],
          [
               {
                    title: t('detailsSymbol.totalTradeValue'),
                    value: totalTradeValue,
                    formatter: value => numFormatter(Number(value)),
               },
               {
                    title: t('detailsSymbol.TickPrice'),
                    value: TickPrice,
               },
          ],
          [
               {
                    title: t('detailsSymbol.oneMonthEfficiency'),
                    value: oneMonthEfficiency,
               },
               {
                    title: t('detailsSymbol.threeMonthEfficiency'),
                    value: threeMonthEfficiency,
               },
          ],
     ];

     return (
          <div className="mt-2">
               {data.map((item, index) => (
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
     );
};
