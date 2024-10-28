import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import {
     ArrowLeftIcon,
     CodalIcon,
     LinkIcon,
     PinnedIcon,
     RiskAnnouncementIcon,
     TseIcon,
     WatchlistNegativeIcon,
} from '@assets/icons';
import Popup from '@components/popup';
import { getCodalLink, getTSELink, sepNumbers } from '@methods/helper';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSymbolStore } from 'store/symbol';
import SymbolState from './SymbolState';

export const MainSymbol = () => {
     const { t } = useTranslation();

     //  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { data } = useQuerySymbolGeneralInformation<ISymbolGeneralInformationSelectHeaderSymbol>(selectedSymbol);

     const symbolStateTooltip = () => {
          if (data?.symbolData?.symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
          else if (data?.symbolData?.symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
          else if (data?.symbolData?.symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
          else if (data?.symbolData?.symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
          else if (data?.symbolData?.symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
          else if (data?.symbolData?.symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';
          else return '';
     };

     const symbolStateColor = useCallback(
          (type: 'bg' | 'text') => {
               if (!data?.symbolData?.symbolState) return '';

               const stateClasses: Record<string, string> = {
                    OrderEntryAuthorized_Open: `${type}-content-success-buy`, // مجاز
                    OrderEntryAuthorized_Reserved: `${type}-content-warnning`, // مجاز_محفوظ
                    OrderEntryAuthorized_Frozen: `${type}-content-error-sell`, // ممنوع
                    OrderEntryForbidden_Suspended: `${type}-content-error-sell`, // ممنوع_متوقف
                    OrderEntryForbidden_Open: `${type}-content-warnning`, // مجاز_متوقف
                    OrderEntryForbidden_Reserved: `${type}-content-warnning`, // ممنوع-محفوظ
               };

               return stateClasses[data?.symbolData?.symbolState as string];
          },
          [data?.symbolData?.symbolState]
     );

     const items = [
          { label: 'سایت TSE ', icon: TseIcon, link: getTSELink(data?.symbolData?.insCode) },
          { label: 'سایت کدال', icon: CodalIcon, link: getCodalLink(data?.symbolData?.symbolTitle) },
     ];

     return (
          <div className="flex flex-col gap-2 text-xs">
               <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                         <div className="flex items-center gap-x-1">
                              <SymbolState
                                   symbolState={data?.symbolData?.symbolState || ''}
                                   symbolStateColor={symbolStateColor}
                                   symbolStateTooltip={symbolStateTooltip()}
                              />
                              <span className="text-sm font-medium text-content-title">{data?.symbolData?.symbolTitle}</span>
                              <span className={symbolStateColor('text')}>{symbolStateTooltip()}</span>
                              <span className="text-content-deselecttab">
                                   {`(${data?.symbolData?.exchange ? t(`exchange_type.${data?.symbolData?.exchange as ExchangeType}`) : '-'})`}
                              </span>
                              {data?.symbolData?.hasRiskAnnouncement && (
                                   <Tippy content={t('tooltip.hasRiskAnnouncement')}>
                                        <span>
                                             <RiskAnnouncementIcon className="text-content-warnning" />
                                        </span>
                                   </Tippy>
                              )}
                         </div>
                         <div>
                              <span className="text-content-deselecttab">
                                   {data?.symbolData?.companyName || t('common.noSymbol')}
                              </span>
                         </div>
                    </div>

                    <div className="flex gap-x-2">
                         <span className="flex items-center rounded bg-back-2 p-1">
                              <PinnedIcon width="1.5rem" height="1.5rem" className="text-icon-warning" />
                         </span>
                         <span className="flex items-center rounded bg-back-2 p-1">
                              <WatchlistNegativeIcon width="1.5rem" height="1.5rem" className="text-icon-primary" />
                         </span>

                         <Popup
                              margin={{
                                   y: 8,
                              }}
                              defaultPopupWidth={200}
                              renderer={({ setOpen }) => (
                                   <ul className="rtl flex flex-col rounded-md bg-back-modal p-4 shadow-E2">
                                        {items.map((item, index) => (
                                             <a
                                                  key={index}
                                                  aria-label="Read more about symbol in the TSE"
                                                  role="link"
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  href={item.link}
                                                  className="flex items-center justify-between rounded-md border-b border-line-div-2 px-2 py-4 transition-colors last:border-none hover:bg-back-primary/80"
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

               <div className="flex rounded bg-back-2 px-4 py-3 text-content-title">
                    <div className="flex gap-x-6 border-l border-line-div-1 pl-4 text-xs">
                         <span className="text-nowrap font-medium text-content-paragraph">آخرین قیمت:</span>
                         <span className="flex gap-x-1">
                              <span
                                   className={clsx('ltr font-bold', {
                                        'text-content-success-buy': Number(data?.symbolData?.lastTradedPriceVarPercent) > 0,
                                        'text-content-error-sell': Number(data?.symbolData?.lastTradedPriceVarPercent) < 0,
                                        'text-content-title': Number(data?.symbolData?.lastTradedPriceVarPercent) === 0,
                                   })}
                              >{`(${data?.symbolData?.lastTradedPriceVarPercent || '0'}%)`}</span>
                              <span className="text-base font-bold text-content-title">
                                   {sepNumbers(Number(data?.symbolData?.lastTradedPrice || '0'))}
                              </span>
                         </span>
                    </div>

                    <div className="flex gap-x-6 pr-4">
                         <span className="text-nowrap text-xs text-content-paragraph">قیمت پایانی:</span>
                         <span className="flex gap-x-1">
                              <span
                                   className={clsx('ltr font-bold', {
                                        'text-content-success-buy': Number(data?.symbolData?.closingPriceVarPercent) > 0,
                                        'text-content-error-sell': Number(data?.symbolData?.closingPriceVarPercent) < 0,
                                        'text-content-title': Number(data?.symbolData?.closingPriceVarPercent) === 0,
                                   })}
                              >{`(${data?.symbolData?.closingPriceVarPercent || '0'}%)`}</span>
                              <span className="text-base font-bold text-content-title">
                                   {sepNumbers(Number(data?.symbolData?.closingPrice || 0))}
                              </span>
                         </span>
                    </div>
               </div>
          </div>
     );
};
