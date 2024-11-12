import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import { useAddSymbolToWatchlist, useDeleteSymbolInWatchlist, useGetSymbolInWatchlist } from '@api/watchlist';
import { ArrowLeftIcon, CodalIcon, EyePlusIcon, LinkIcon, PinnedIcon, RiskAnnouncementIcon, TseIcon } from '@assets/icons';
import Popup from '@components/popup';
import PriceWithAmountChange from '@components/priceView/priceWithAmountChange';
import { getCodalLink, getTSELink } from '@methods/helper';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSymbolStore } from 'store/symbol';
import SymbolState from './SymbolState';

const MainSymbol = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { setAddSymbolToWatchlistModal } = useModalStore();

     const { data } = useQuerySymbolGeneralInformation(selectedSymbol);

     const { mutate: addSymbolToWatchlistMutate } = useAddSymbolToWatchlist();

     const { mutate: deleteSymbolInWatchlistMutate } = useDeleteSymbolInWatchlist();

     const { data: getSymbolInWatchlist, refetch: refetchGetSymbolInWatchlist } = useGetSymbolInWatchlist();

     const lastTradedPrice = data?.symbolData?.lastTradedPrice || 0;
     const closingPrice = data?.symbolData?.closingPrice || 0;
     const yesterdayClosingPrice = data?.symbolData?.yesterdayClosingPrice || 0;
     const symbolTitle = data?.symbolData?.symbolTitle || '';
     const symbolState = data?.symbolData?.symbolState || '';
     const lastTradedPriceVarPercent = data?.symbolData?.lastTradedPriceVarPercent || 0;
     const closingPriceVarPercent = data?.symbolData?.closingPriceVarPercent || 0;
     const insCode = data?.symbolData?.insCode || '';
     const exchange = data?.symbolData?.exchange || '';
     const hasRiskAnnouncement = data?.symbolData?.hasRiskAnnouncement || false;
     const companyName = data?.symbolData?.companyName || '';

     const lastTradePriceAmountChanged = lastTradedPrice - yesterdayClosingPrice;
     const closingPriceAmountChanged = closingPrice - yesterdayClosingPrice;

     const symbolStateTooltip = () => {
          if (symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
          else if (symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
          else if (symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
          else if (symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
          else if (symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
          else if (symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';
          else return '';
     };

     const symbolStateColor = useCallback(
          (type: 'bg' | 'text') => {
               if (symbolState) return '';

               const stateClasses: Record<string, string> = {
                    OrderEntryAuthorized_Open: `${type}-content-success-buy`, // مجاز
                    OrderEntryAuthorized_Reserved: `${type}-content-warnning`, // مجاز_محفوظ
                    OrderEntryAuthorized_Frozen: `${type}-content-error-sell`, // ممنوع
                    OrderEntryForbidden_Suspended: `${type}-content-error-sell`, // ممنوع_متوقف
                    OrderEntryForbidden_Open: `${type}-content-warnning`, // مجاز_متوقف
                    OrderEntryForbidden_Reserved: `${type}-content-warnning`, // ممنوع-محفوظ
               };

               return stateClasses[symbolState as string];
          },
          [symbolState]
     );

     const items = [
          { label: 'سایت TSE ', icon: TseIcon, link: getTSELink(insCode) },
          { label: 'سایت کدال', icon: CodalIcon, link: getCodalLink(symbolTitle) },
     ];

     const symbolIsPinned = useMemo(() => {
          return getSymbolInWatchlist?.some(({ symbolISIN, watchlistId }) => {
               if (symbolISIN === selectedSymbol && watchlistId === 3) return true;
               else return false;
          });
     }, [getSymbolInWatchlist, selectedSymbol]);

     const handleAddDeletePinSymbolInWatchlist = () => {
          if (symbolIsPinned) {
               deleteSymbolInWatchlistMutate(
                    { symbolISIN: selectedSymbol, type: 'Pinned' },
                    {
                         onSuccess: () => {
                              refetchGetSymbolInWatchlist();

                              queryClient.refetchQueries({ queryKey: ['watchlistSymbols'] });

                              toast.success(t('alerts.deleteSymbolInWatchlistSuccessful'));
                         },
                         onError: () => {
                              toast.error(t('alerts.deleteSymbolInWatchlistError'));
                         },
                    }
               );
          } else {
               addSymbolToWatchlistMutate(
                    { symbolISIN: selectedSymbol, type: 'Pinned' },
                    {
                         onSuccess: () => {
                              refetchGetSymbolInWatchlist();

                              queryClient.refetchQueries({ queryKey: ['watchlistSymbols'] });

                              toast.success(t('alerts.addSymbolWatchlistSuccessful'));
                         },
                         onError: () => {
                              toast.error(t('alerts.addSymbolWatchlistError'));
                         },
                    }
               );
          }
     };

     const isSymbolIsWatchlist = useMemo(() => {
          return getSymbolInWatchlist?.some(item => item.symbolISIN === selectedSymbol);
     }, [getSymbolInWatchlist]);

     return (
          <div className="flex flex-col gap-2 p-4 text-xs">
               <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                         <div className="flex items-center gap-x-1">
                              <SymbolState
                                   symbolState={symbolState}
                                   symbolStateColor={symbolStateColor}
                                   symbolStateTooltip={symbolStateTooltip()}
                              />
                              <span className="text-sm font-medium text-content-title">{symbolTitle}</span>
                              <span className={symbolStateColor('text')}>{symbolStateTooltip()}</span>
                              <span className="text-content-deselecttab">
                                   {`(${exchange ? t(`exchange_type.${exchange as ExchangeType}`) : '-'})`}
                              </span>
                              {hasRiskAnnouncement && (
                                   <Tippy content={t('tooltip.hasRiskAnnouncement')}>
                                        <span>
                                             <RiskAnnouncementIcon className="text-content-warning" />
                                        </span>
                                   </Tippy>
                              )}
                         </div>
                         <div>
                              <span className="text-content-deselecttab">{companyName || t('common.noSymbol')}</span>
                         </div>
                    </div>

                    <div className="flex gap-x-2">
                         <button
                              onClick={handleAddDeletePinSymbolInWatchlist}
                              className="flex items-center rounded bg-back-2 p-1"
                         >
                              <PinnedIcon
                                   width="1.5rem"
                                   height="1.5rem"
                                   className={clsx('transition-colors', {
                                        'text-icon-warning': symbolIsPinned,
                                        'text-icon-default': !symbolIsPinned,
                                   })}
                              />
                         </button>
                         <button
                              onClick={() => {
                                   setAddSymbolToWatchlistModal(true);
                              }}
                              className="flex items-center rounded bg-back-2 p-1"
                         >
                              <EyePlusIcon
                                   className={clsx({
                                        'text-icon-default': !isSymbolIsWatchlist,
                                        'text-icon-primary': isSymbolIsWatchlist,
                                   })}
                              />
                         </button>

                         <Popup
                              margin={{
                                   y: 8,
                              }}
                              defaultPopupWidth={200}
                              renderer={({ setOpen }) => (
                                   <ul className="rtl flex flex-col rounded-md bg-back-surface p-4 shadow-E2">
                                        {items.map((item, index) => (
                                             <a
                                                  key={index}
                                                  aria-label="Read more about symbol in the TSE"
                                                  role="link"
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  href={item.link}
                                                  className="flex items-center justify-between rounded-md border-b border-line-div-2 px-2 py-2 transition-colors last:border-none hover:bg-back-primary"
                                             >
                                                  <div className="flex justify-between gap-x-2">
                                                       <item.icon width="1.5rem" height="1.5rem" className="text-icon-default" />
                                                       <span className="text-nowrap text-content-paragraph">{item.label}</span>
                                                  </div>

                                                  <ArrowLeftIcon className="text-icon-default" />
                                             </a>
                                        ))}
                                   </ul>
                              )}
                         >
                              {({ setOpen, open }) => (
                                   <button className="flex items-center rounded bg-back-2 p-1" onClick={() => setOpen(!open)}>
                                        <LinkIcon width="1.5rem" height="1.5rem" className="text-icon-default" />
                                   </button>
                              )}
                         </Popup>
                    </div>
               </div>

               <div className="flex justify-between gap-x-1 rounded bg-back-2 px-0.5 py-3 text-content-title">
                    <div className="flex flex-1 justify-center gap-x-1 border-l border-line-div-1 text-xs font-bold">
                         <span className="text-nowrap text-xs font-medium text-content-paragraph">آخرین قیمت:</span>

                         <PriceWithAmountChange
                              percentage={lastTradedPriceVarPercent}
                              value={lastTradedPrice}
                              amountChange={lastTradePriceAmountChanged}
                         />
                    </div>

                    {/* <span className=''></span> */}

                    <div className="flex flex-1 justify-center gap-x-1">
                         <span className="text-nowrap text-xs text-content-paragraph">آخرین پایانی:</span>

                         <PriceWithAmountChange
                              percentage={closingPriceVarPercent}
                              value={closingPrice}
                              amountChange={closingPriceAmountChanged}
                         />
                    </div>
               </div>
          </div>
     );
};

export default MainSymbol;
