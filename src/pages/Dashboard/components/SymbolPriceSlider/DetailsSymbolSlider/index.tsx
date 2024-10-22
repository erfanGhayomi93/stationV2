import { ArrowDownTriangleIcon } from '@assets/icons';
import { dateFormatter, getColorClassBasedAmount, sepNumbers } from '@methods/helper';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { FC, ReactElement, useState } from 'react';
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
     totalNumberOfSharesTraded: number;
     baseVolume: number;
     totalNumberOfTrades: number;
     monthlyTradeVolume: number;
     pe: number;
     lastTradedPriceDate: number;
     lastTradedPriceVarPercent: number;
}

interface dataType {
     title: string;
     value: number | string;
     formatter?: (value: number | string) => string;
     renderer?: (value: number | string) => ReactElement;
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
     totalNumberOfSharesTraded,
     baseVolume,
     totalNumberOfTrades,
     monthlyTradeVolume,
     lastTradedPriceDate,
     lastTradedPriceVarPercent,
     pe,
}) => {
     const { t } = useTranslation();

     const [isExpand, setExpand] = useState(false);

     const [countShowItem, setCountShowItem] = useState(4);

     const toggleExpand = () => {
          setExpand(prev => !prev);
          setCountShowItem(prev => (isExpand ? 4 : data.length)); // Toggle between showing 4 and all items
     };

     const data: dataType[][] = [
          [
               {
                    title: t('detailsSymbol.lastTradeDateTime'),
                    value: lastTradedPriceDate,
                    formatter: value => dateFormatter(value, 'datetime'),
               },
               {
                    title: t('detailsSymbol.lastTradeDateTime'),
                    value: firstTradedPrice,
                    renderer: value => (
                         <div className="flex items-center gap-1 text-xs font-bold">
                              <span>{value}</span>
                              <span
                                   className={clsx(getColorClassBasedAmount(lastTradedPriceVarPercent))}
                              >{`(${lastTradedPriceVarPercent + '%'})`}</span>
                         </div>
                    ),
               },
          ],
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
                    title: t('detailsSymbol.totalTradeValue'),
                    value: totalTradeValue,
                    // formatter: value => sepNumbers(value),
                    renderer: value => (
                         <Tippy className="text-xs" content={sepNumbers(value)}>
                              <div className="flex items-center gap-1">
                                   <span className="font-bold">{`B`}</span>

                                   <span>{sepNumbers(value)}</span>
                              </div>
                         </Tippy>
                    ),
               },

               {
                    title: t('detailsSymbol.LowHighThreshold'),
                    value: LowThreshold,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.totalNumberOfSharesTraded'),
                    value: totalNumberOfSharesTraded,
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.TommorowLowHighThreshold'),
                    value: '-',
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.baseVolume'),
                    value: baseVolume,
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.totalNumberOfTrades'),
                    value: totalNumberOfTrades,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.TickPrice'),
                    value: TickPrice,
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.monthlyTradeVolume'),
                    value: monthlyTradeVolume,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.floatFree'),
                    value: '-',
                    formatter: value => sepNumbers(value),
               },
               {
                    title: t('detailsSymbol.pe'),
                    value: pe,
                    formatter: value => sepNumbers(value),
               },
          ],
          [
               {
                    title: t('detailsSymbol.oneMonthEfficiency'),
                    value: oneMonthEfficiency,
                    renderer: value => <span className={clsx(getColorClassBasedAmount(Number(value)))}>{`${value}%`}</span>,
               },
               {
                    title: t('detailsSymbol.threeMonthEfficiency'),
                    value: threeMonthEfficiency,
                    renderer: value => <span className={clsx(getColorClassBasedAmount(Number(value)))}>{`${value}%`}</span>,
               },
          ],
     ];

     return (
          <ul className="mt-2">
               {data.slice(0, countShowItem).map((item, index) => (
                    <ul key={index} className="mx-3 flex border-b border-line-div-3 py-3 text-xs last:border-none">
                         {item.map((child, ind) => (
                              <li
                                   key={ind}
                                   className="flex flex-1 justify-between border-line-div-3 odd:border-l odd:pl-3 even:pr-3"
                              >
                                   <span className="text-content-paragraph">{child.title}:</span>
                                   <span className="ltr text-content-title">
                                        {child.renderer
                                             ? child.renderer(child.value)
                                             : child?.formatter
                                               ? child.formatter(child.value) || '−'
                                               : child.value || '−'}
                                   </span>
                              </li>
                         ))}
                    </ul>
               ))}

               <div onClick={toggleExpand} className="flex cursor-pointer items-center justify-center py-2">
                    <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />
                    <div className="px-1">
                         <ArrowDownTriangleIcon className={clsx('transition-transform', isExpand && 'rotate-180')} />
                    </div>
                    <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />
               </div>
          </ul>
     );
};
