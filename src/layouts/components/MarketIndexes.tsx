import { useQueryIndexMarket } from '@api/IndexMarket';
import { UpArrowIcon } from '@assets/icons';
import Popup from '@components/popup';
import { pushEngine } from '@LS/pushEngine';
import { subscribeMarketIndices } from '@LS/subscribes';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MarketIndexes = () => {
     const { data, isSuccess } = useQueryIndexMarket();

     const { t } = useTranslation();

     useEffect(() => {
          if (isSuccess) {
               subscribeMarketIndices([], ({ itemName, changedFields }) => {
                    console.log('subscribeMarketIndices', itemName, changedFields);
               });
          }

          return () => {
               pushEngine.unSubscribe('MarketIndices');
          };
     }, [data, isSuccess]);

     const uiIndexes = useCallback(
          (item: IIndexRes) => {
               const changePercent = item ? +item?.changePercent : 0;

               return (
                    <li
                         className={clsx(
                              'flex h-full w-full select-none items-center justify-between gap-x-1 text-xs font-medium'
                         )}
                         key={item.symbolISIN}
                    >
                         <span className="ml-2">
                              {t(
                                   item.symbolISIN === 'IRX6XTPI0006'
                                        ? 'MarketIndexes.MainIndex'
                                        : item.symbolISIN === 'IRXZXOCI0006'
                                          ? 'MarketIndexes.FaraBourseIndex'
                                          : 'MarketIndexes.HamvaznIndex'
                              )}
                              :
                         </span>

                         <div className="flex justify-start gap-x-1">
                              <span
                                   className={clsx('ltr', {
                                        'text-content-success-buy': changePercent > 0,
                                        'text-content-error-sell': changePercent < 0,
                                   })}
                              >
                                   ({!!item && item?.changePercent.toFixed(1) + '%'})
                              </span>

                              <span
                                   className={clsx('ltr', {
                                        'text-content-success-buy': changePercent > 0,
                                        'text-content-error-sell': changePercent < 0,
                                   })}
                              >
                                   {item && sepNumbers(item?.indexChange.toFixed())}
                              </span>

                              <span
                                   className={clsx('ltr', {
                                        'text-content-success-buy': changePercent > 0,
                                        'text-content-error-sell': changePercent < 0,
                                   })}
                              >
                                   {item && sepNumbers(item?.lastIndexValueInDay.toFixed())}
                              </span>
                         </div>
                    </li>
               );
          },
          [data]
     );

     return (
          <div className="flex items-center gap-x-4 text-xs font-medium">
               <div>{data?.filter(item => item.symbolISIN === 'IRX6XTPI0006')?.map(item => uiIndexes(item))}</div>
               <div>
                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col gap-4 rounded-md bg-back-surface px-4 py-3 shadow-E2">
                                   {data?.filter(item => item.symbolISIN !== 'IRX6XTPI0006').map(item => uiIndexes(item))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <button className="flex items-center rounded-lg p-3" onClick={() => setOpen(!open)}>
                                   <UpArrowIcon
                                        className={clsx('h-min text-icon-default transition-transform', {
                                             'rotate-180': !open,
                                        })}
                                   />
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default MarketIndexes;
