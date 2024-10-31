import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { isBetween } from '@methods/helper';
import styles from './SymbolPriceSlider.module.scss';
// import { getTheme } from 'src/redux/slices/ui';
// import { setPriceBuySellAction } from 'src/redux/slices/keepDataBuySell';

type SymbolPriceSliderProps = {
     // lowThreshold | highThreshold
     thresholdData: [number, number];

     // lowestTradePriceOfTradingDay | highestTradePriceOfTradingDay
     boundaryData: [number, number];

     // firstTradedPrice | lastTradedPrice
     exchangeData: [number, number];

     yesterdayClosingPrice: number;
};

const SymbolPriceSlider = ({ thresholdData, boundaryData, exchangeData, yesterdayClosingPrice }: SymbolPriceSliderProps) => {
     const { t } = useTranslation();

     const borderRef = useRef<HTMLDivElement>(null);

     const tooltipRef = useRef<HTMLDivElement>(null);

     const rootRef = useRef<HTMLDivElement>(null);

     // const theme = useAppSelector(getTheme)

     // const appDispatch = useAppDispatch()

     const [config, setConfig] = useState({
          firstTradedPrice: 0,
          firstTradedPriceAsPercent: 0,
          lastTradedPrice: 0,
          lastTradedPriceAsPercent: 0,
          buySliderWidth: 0,
          sellSliderWidth: 0,
          lowestTradePriceOfTradingDayAsPercent: 0,
          highestTradePriceOfTradingDayAsPercent: 0,
          offsetLeft: 0,
          offsetRight: 0,
     });

     const sepNumbers = (num: number | string): string => {
          if (typeof num === 'number') num = String(num);

          try {
               if (num.length <= 3) return num;

               const objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
               while (objRegex.test(num)) {
                    num = num.replace(objRegex, '$1,$2');
               }

               return num;
          } catch (e) {
               //
          }

          return num;
     };

     const averageNumbers = useMemo(() => {
          try {
               const spacing = Math.round((thresholdData[1] - thresholdData[0]) / 6);

               const numbers: number[] = [thresholdData[0]];
               for (let i = 1; i < 6; i++) {
                    numbers.push(thresholdData[0] + spacing * i);
               }

               numbers.push(thresholdData[1]);
               return numbers;
          } catch (e) {
               console.error(e);
               return [0, 0, 0, 0, 0];
          }
     }, [thresholdData]);

     const onMouseOver = () => {
          try {
               const tooltipElement = tooltipRef.current;
               if (!tooltipElement) return;

               tooltipElement.style.opacity = '1';
          } catch (e) {
               //
          }
     };

     const getPrice = (e: React.MouseEvent<HTMLDivElement>) => {
          const tooltipElement = tooltipRef.current;
          const rootElement = rootRef.current;
          if (!tooltipElement || !rootElement) return;

          const rootOffset = rootElement.getBoundingClientRect();
          const tooltipOffset = tooltipElement.getBoundingClientRect();

          /* Location */
          let left = e.clientX - rootOffset.left - tooltipOffset.width / 2;
          if (left < 0) left = 0;
          else if (left > rootOffset.width - tooltipOffset.width) left = rootOffset.width - tooltipOffset.width;
          tooltipElement.style.transform = `translateX(${Math.abs(left)}px)`;

          /* Value */
          const percentage = (e.clientX - rootOffset.left) / rootOffset.width;
          let price = Math.abs(Math.round((1 - percentage) * (thresholdData[1] - thresholdData[0]) - thresholdData[1]));
          if (price > thresholdData[1]) price = thresholdData[1];
          else if (price < thresholdData[0]) price = thresholdData[0];
          return price;
     };

     const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
          try {
               const tooltipElement = tooltipRef.current;
               const rootElement = rootRef.current;
               if (!tooltipElement || !rootElement) return;
               const price = getPrice(e) || 0;

               const priceAsPercent = Number((((price - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1;
               const spanChild1 = tooltipElement.querySelectorAll('span')[0] as Element;
               const spanChild2 = tooltipElement.querySelectorAll('span')[1] as Element;
               spanChild1.textContent = `${sepNumbers(price)}`;
               spanChild2.textContent = ` (${priceAsPercent}%) `;
               if (priceAsPercent < 0) {
                    spanChild2.classList.remove('text-L-success-200');
                    spanChild2.classList.add('text-L-error-200');
               } else {
                    spanChild2.classList.remove('text-L-error-200');
                    spanChild2.classList.add('text-L-success-200');
               }
          } catch (e) {
               //
          }
     };

     const onMouseLeave = () => {
          try {
               const tooltipElement = tooltipRef.current;
               if (!tooltipElement) return;

               tooltipElement.style.opacity = '0';
          } catch (e) {
               //
          }
     };

     const getSliderOffsets = (minValue: number, maxValue: number, priceFrom: number, priceTo: number) => {
          const sliderWidth = maxValue - minValue;
          const handleWidth = priceTo - priceFrom;
          const leftOffset = (priceFrom - minValue) / sliderWidth;
          const rightOffset = (maxValue - priceTo) / sliderWidth;
          const width = handleWidth / sliderWidth;

          return {
               width: Math.abs(width),
               left: Math.abs(leftOffset),
               right: Math.abs(rightOffset),
          };
     };

     const draw = () => {
          try {
               if (!borderRef.current) return;

               const instanceOfConfig = {
                    firstTradedPrice: 0,
                    firstTradedPriceAsPercent: 0,
                    lastTradedPrice: 0,
                    lastTradedPriceAsPercent: 0,
                    buySliderWidth: 0,
                    sellSliderWidth: 0,
                    lowestTradePriceOfTradingDayAsPercent: 0,
                    highestTradePriceOfTradingDayAsPercent: 0,
                    offsetLeft: 0,
                    offsetRight: 0,
               };

               const borderWidth = borderRef.current.offsetWidth;
               const [lowThreshold, highThreshold] = thresholdData;
               const [firstTradedPrice, lastTradedPrice] = exchangeData;
               const [lowestTradePriceOfTradingDay, highestTradePriceOfTradingDay] = boundaryData;

               // Calculate (firstTradedPrice, lastTradedPrice)
               const maxMinusMin = highThreshold - lowThreshold;
               instanceOfConfig.firstTradedPrice = (1 - (highThreshold - firstTradedPrice) / maxMinusMin) * borderWidth - 5;
               if (instanceOfConfig.firstTradedPrice > borderWidth - 5) instanceOfConfig.firstTradedPrice = borderWidth - 5;
               instanceOfConfig.lastTradedPrice = (1 - (highThreshold - lastTradedPrice) / maxMinusMin) * borderWidth - 5;
               if (instanceOfConfig.lastTradedPrice < -5) instanceOfConfig.lastTradedPrice = -5;

               // Calculate (firstTradedPriceAsPercent, lastTradedPriceAsPercent)
               instanceOfConfig.firstTradedPriceAsPercent =
                    Number((((firstTradedPrice - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1;
               instanceOfConfig.lastTradedPriceAsPercent =
                    Number((((lastTradedPrice - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1;

               // Calculate slider width
               const halfOfRootWidth = borderWidth / 2;

               if (boundaryData[0] <= yesterdayClosingPrice) {
                    const sellOffsets = getSliderOffsets(
                         lowThreshold,
                         yesterdayClosingPrice,
                         lowestTradePriceOfTradingDay < yesterdayClosingPrice
                              ? lowestTradePriceOfTradingDay
                              : yesterdayClosingPrice,
                         highestTradePriceOfTradingDay < yesterdayClosingPrice
                              ? highestTradePriceOfTradingDay
                              : yesterdayClosingPrice
                    );
                    instanceOfConfig.sellSliderWidth = halfOfRootWidth * sellOffsets.width;
                    instanceOfConfig.offsetRight = halfOfRootWidth * sellOffsets.right;
               }

               if (boundaryData[1] >= yesterdayClosingPrice) {
                    const buyOffsets = getSliderOffsets(
                         yesterdayClosingPrice,
                         highThreshold,
                         lowestTradePriceOfTradingDay > yesterdayClosingPrice
                              ? lowestTradePriceOfTradingDay
                              : yesterdayClosingPrice,
                         highestTradePriceOfTradingDay > yesterdayClosingPrice
                              ? highestTradePriceOfTradingDay
                              : yesterdayClosingPrice
                    );
                    instanceOfConfig.buySliderWidth = halfOfRootWidth * buyOffsets.width;
                    instanceOfConfig.offsetLeft = halfOfRootWidth * buyOffsets.left;
               }

               // Calculate (lowestTradePriceOfTradingDayAsPercent, highestTradePriceOfTradingDayAsPercent)
               instanceOfConfig.lowestTradePriceOfTradingDayAsPercent =
                    Number((((lowestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) *
                    1;
               instanceOfConfig.highestTradePriceOfTradingDayAsPercent =
                    Number((((highestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) *
                    1;

               setConfig(instanceOfConfig);
          } catch (e) {
               //
          }
     };

     // const setPriceOnBuySellModal = (e: React.MouseEvent<HTMLDivElement>) => {
     //     const price = getPrice(e) || 0;
     //     appDispatch(setPriceBuySellAction(price));
     // }

     useEffect(() => {
          draw();
     }, [thresholdData, boundaryData, exchangeData, yesterdayClosingPrice, borderRef.current]);

     return (
          <div
               ref={rootRef}
               className={clsx(
                    styles.root
                    //  theme === 'dark' && styles.dark
               )}
          >
               <div
                    ref={borderRef}
                    className={styles.border}
                    onMouseOver={onMouseOver}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    // onClick={(e) => setPriceOnBuySellModal(e)}
               />

               <div className={styles.tradedValues}>
                    <div className={styles.inner}>
                         <Tippy
                              content={
                                   <div dir="ltr" className="flex items-center gap-1">
                                        <span
                                             className={clsx(
                                                  'text-L-gray-50 dark:text-D-gray-50 text-xs font-medium transition duration-300'
                                             )}
                                        >
                                             {sepNumbers(exchangeData[0])}
                                        </span>
                                        <span
                                             className={clsx(
                                                  'text-xs font-medium transition duration-300',
                                                  config.firstTradedPriceAsPercent >= 0
                                                       ? 'text-L-success-200'
                                                       : 'text-L-error-200'
                                             )}
                                        >
                                             ({config.firstTradedPriceAsPercent}%)
                                        </span>
                                        <span className="text-L-gray-50 dark:text-D-gray-50 pl-1 text-xs">
                                             :{t('price_range_slider.closing_price')}
                                        </span>
                                   </div>
                              }
                              arrow={false}
                              className={clsx(
                                   'dark:bg-D-gray-700 bg-gray-700 top-4'
                                   //  theme
                              )}
                         >
                              <div
                                   style={{ transform: `translateX(${config.firstTradedPrice}px)` }}
                                   className={clsx('transition duration-300', styles.value)}
                              >
                                   <svg
                                        width="0.875rem"
                                        height="1.062rem"
                                        viewBox="0 0 14 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M6.97656 11.0645L2.19958 6.43259L6.97656 1.80073L11.7535 6.43259L6.97656 11.0645Z"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                        <path
                                             d="M11.7535 11.2959L6.97656 15.9278L2.19959 11.2959"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                   </svg>
                              </div>
                         </Tippy>

                         <Tippy
                              content={
                                   <div dir="ltr" className="flex items-center gap-1">
                                        <span
                                             className={clsx(
                                                  'text-L-gray-50 dark:text-D-gray-50 text-xs font-medium transition duration-300'
                                             )}
                                        >
                                             {sepNumbers(exchangeData[1])}
                                        </span>

                                        <span
                                             className={clsx(
                                                  'text-xs font-medium transition duration-300',
                                                  config.lastTradedPriceAsPercent >= 0 ? 'text-L-success-200' : 'text-L-error-200'
                                             )}
                                        >
                                             ({config.lastTradedPriceAsPercent}%)
                                        </span>

                                        <span className="text-L-gray-50 dark:text-D-gray-50 pl-1 text-xs">
                                             :{t('price_range_slider.last_traded_price')}
                                        </span>
                                   </div>
                              }
                              arrow={false}
                              className={clsx(
                                   'dark:bg-D-gray-700 bg-gray-700 top-4'
                                   // theme
                              )}
                         >
                              <div
                                   style={{ transform: `translateX(${config.lastTradedPrice}px)` }}
                                   className={clsx('transition duration-300', styles.value)}
                              >
                                   <svg
                                        width="0.875rem"
                                        height="1.062rem"
                                        viewBox="0 0 14 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                   >
                                        <path
                                             d="M6.97656 11.0645L2.19958 6.43259L6.97656 1.80073L11.7535 6.43259L6.97656 11.0645Z"
                                             fill="currentColor"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                        <path
                                             d="M11.7535 11.2959L6.97656 15.9278L2.19959 11.2959"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                        />
                                   </svg>
                              </div>
                         </Tippy>
                    </div>
               </div>

               <div ref={tooltipRef} style={{ opacity: '0' }} className={styles.tooltip}>
                    <span className="text-L-gray-50 dark:text-D-gray-50 text-xs font-medium" />
                    <span className="text-xs font-medium" />
               </div>

               <div className={styles.sliders}>
                    <div className={styles.sliderInner}>
                         <div className={clsx(styles.section, styles.sell)}>
                              <div
                                   style={{
                                        width: `${config.sellSliderWidth}px`,
                                        transform: `translateX(-${config.offsetRight}px)`,
                                   }}
                                   className={clsx('transition duration-300', styles.slider)}
                              />

                              <Tippy
                                   content={
                                        <div dir="ltr" className="flex items-center gap-1">
                                             <span
                                                  className={clsx(
                                                       'text-L-gray-50 dark:text-D-gray-50 text-xs font-medium transition duration-300'
                                                  )}
                                             >
                                                  {sepNumbers(boundaryData[0])}
                                             </span>

                                             <span
                                                  className={clsx(
                                                       'text-xs font-medium transition duration-300',
                                                       config.lowestTradePriceOfTradingDayAsPercent >= 0
                                                            ? 'text-L-success-200'
                                                            : 'text-L-error-200'
                                                  )}
                                             >
                                                  ({config.lowestTradePriceOfTradingDayAsPercent}%)
                                             </span>
                                             <span className="text-L-gray-50 dark:text-D-gray-50 pl-1 text-xs">
                                                  :{t('price_range_slider.lowest_trade_price')}
                                             </span>
                                        </div>
                                   }
                                   className={clsx(
                                        'dark:bg-D-gray-700 custom-arrow bg-current bg-gray-700'
                                        // theme
                                   )}
                              >
                                   <div
                                        style={{
                                             transform: `translateX(${
                                                  boundaryData[0] > yesterdayClosingPrice
                                                       ? config.offsetLeft
                                                       : -(config.sellSliderWidth + Math.abs(config.offsetRight))
                                             }px)`,
                                        }}
                                        className={clsx(
                                             'transition duration-300',
                                             styles.mark,
                                             boundaryData[0] > yesterdayClosingPrice && styles.buy
                                        )}
                                   />
                              </Tippy>
                         </div>

                         <div className={clsx(styles.section, styles.buy)}>
                              <div
                                   style={{
                                        width: `${config.buySliderWidth}px`,
                                        transform: `translateX(${config.offsetLeft}px)`,
                                   }}
                                   className={clsx('transition duration-300', styles.slider)}
                              />

                              <Tippy
                                   content={
                                        <div dir="ltr" className="flex items-center gap-1">
                                             <span
                                                  className={clsx(
                                                       'text-L-gray-50 dark:text-D-gray-50 text-xs font-medium transition duration-300'
                                                  )}
                                             >
                                                  {sepNumbers(boundaryData[1])}
                                             </span>

                                             <span
                                                  className={clsx(
                                                       'text-xs font-medium transition duration-300',
                                                       config.highestTradePriceOfTradingDayAsPercent >= 0
                                                            ? 'text-L-success-200'
                                                            : 'text-L-error-200'
                                                  )}
                                             >
                                                  ({config.highestTradePriceOfTradingDayAsPercent}%)
                                             </span>

                                             <span className="text-L-gray-50 dark:text-D-gray-50 pl-1 text-xs">
                                                  :{t('price_range_slider.highest_trade_price')}
                                             </span>
                                        </div>
                                   }
                                   className={clsx(
                                        'dark:bg-D-gray-700 custom-arrow bg-gray-700'
                                        // theme
                                   )}
                              >
                                   <div
                                        style={{
                                             transform: `translateX(${
                                                  boundaryData[1] < yesterdayClosingPrice
                                                       ? -config.offsetRight
                                                       : config.buySliderWidth + Math.abs(config.offsetLeft)
                                             }px)`,
                                        }}
                                        className={clsx(
                                             'transition duration-300',
                                             styles.mark,
                                             boundaryData[1] < yesterdayClosingPrice && styles.sell
                                        )}
                                   />
                              </Tippy>
                         </div>
                    </div>
               </div>

               <div className={styles.container}>
                    <div style={{ left: 0 }} className={clsx(styles.div, boundaryData[0] === averageNumbers[0] && styles.active)}>
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[0])}</span>
                         </div>
                    </div>

                    <div
                         style={{ left: '16.667%' }}
                         className={clsx(
                              styles.div,
                              isBetween(boundaryData[0], averageNumbers[1], boundaryData[1]) && styles.active
                         )}
                    >
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[1])}</span>
                         </div>
                    </div>

                    <div
                         style={{ left: '33.334%' }}
                         className={clsx(
                              styles.div,
                              isBetween(boundaryData[0], averageNumbers[2], boundaryData[1]) && styles.active
                         )}
                    >
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[2])}</span>
                         </div>
                    </div>

                    <div style={{ left: '50%' }} className={clsx(styles.div, styles.active)}>
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(yesterdayClosingPrice)}</span>
                         </div>
                    </div>

                    <div
                         style={{ left: '66.667%' }}
                         className={clsx(
                              styles.div,
                              isBetween(boundaryData[0], averageNumbers[4], boundaryData[1]) && styles.active
                         )}
                    >
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[4])}</span>
                         </div>
                    </div>

                    <div
                         style={{ left: '83.334%' }}
                         className={clsx(
                              styles.div,
                              isBetween(boundaryData[0], averageNumbers[5], boundaryData[1]) && styles.active
                         )}
                    >
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[5])}</span>
                         </div>
                    </div>

                    <div
                         style={{ left: '100%' }}
                         className={clsx(styles.div, boundaryData[1] === averageNumbers[6] && styles.active)}
                    >
                         <div className={styles.inner}>
                              <span className={clsx(styles.rhombus)} />
                              <span className={clsx(styles.line)} />
                              <span className={clsx(styles.number)}>{sepNumbers(averageNumbers[6])}</span>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default SymbolPriceSlider;
