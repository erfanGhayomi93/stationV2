import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import {
     CodalIcon,
     LinkIcon,
     PinnedIcon,
     RiskAnnouncementIcon,
     TseIcon,
     UpArrowIcon,
     WatchlistNegativeIcon,
} from '@assets/icons';
import Popup from '@components/popup';
import { sepNumbers } from '@methods/helper';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSymbolStore } from 'store/symbol';
import SymbolState from './SymbolState';

export const MainSymbol = () => {
     const { t } = useTranslation();

     const refDropdown = useRef<HTMLDivElement>(null);

     //  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { data } = useQuerySymbolGeneralInformation<ISymbolGeneralInformationSelectHeaderSymbol>(selectedSymbol, data => ({
          clientSideAlertEnabled: data?.alerts?.clientSideAlertEnabled,
          symbolTitle: data?.symbolData?.symbolTitle,
          companyName: data?.symbolData?.companyName,
          symbolState: data?.symbolData?.symbolState,
          insCode: data?.symbolData?.insCode,
          companyCode: data?.symbolData?.companyCode,
          symbolEvents: data?.symbolData?.eventsWithinNextTenDays || [],
          hasRiskAnnouncement: data?.symbolData?.hasRiskAnnouncement,
          exchange: data?.symbolData?.exchange,
          isIpo: data?.symbolData.isIpo || false,
          lastTradedPrice: data?.symbolData.lastTradedPrice,
          lastTradedPriceVarPercent: data?.symbolData.lastTradedPriceVarPercent,
          closingPrice: data?.symbolData.closingPrice,
          closingPriceVarPercent: data?.symbolData.closingPriceVarPercent,
     }));

     const symbolStateTooltip = () => {
          if (data?.symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
          else if (data?.symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
          else if (data?.symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
          else if (data?.symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
          else if (data?.symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
          else if (data?.symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';
          else return '';
     };

     const symbolStateColor = useCallback(
          (type: 'bg' | 'text') => {
               if (!data?.symbolState) return '';

               const stateClasses: Record<string, string> = {
                    OrderEntryAuthorized_Open: type + '-content-success-buy', // مجاز
                    OrderEntryAuthorized_Reserved: `${type}-content-warnning`, // مجاز_محفوظ
                    OrderEntryAuthorized_Frozen: `${type}-content-error-sell`, // ممنوع
                    OrderEntryForbidden_Suspended: `${type}-content-error-sell`, // ممنوع_متوقف
                    OrderEntryForbidden_Open: `${type}-content-warnning`, // مجاز_متوقف
                    OrderEntryForbidden_Reserved: `${type}-content-warnning`, // ممنوع-محفوظ
               };

               return stateClasses[data?.symbolState as string];
          },
          [data?.symbolState]
     );

     const items = [
          { label: 'سایت TSE ', icon: TseIcon, onclick: () => null },
          { label: 'سایت کدال', icon: CodalIcon, onclick: () => null },
     ];

     return (
          <div className="flex items-center justify-between text-sm">

               <div className="flex flex-col gap-y-1 min-w-44">
                    <div className="flex items-center gap-x-1">
                         <SymbolState
                              symbolState={data?.symbolState || ''}
                              symbolStateColor={symbolStateColor}
                              symbolStateTooltip={symbolStateTooltip()}
                         />
                         <span className="font-bold text-content-title">{data?.symbolTitle}</span>
                         <span className={symbolStateColor('text')}>{symbolStateTooltip()}</span>
                         <span className="text-content-deselecttab">
                              {data?.exchange ? t(`exchange_type.${data?.exchange as ExchangeType}`) : '-'}
                         </span>
                         {data?.hasRiskAnnouncement && (
                              <Tippy content={t('tooltip.hasRiskAnnouncement')}>
                                   <span>
                                        <RiskAnnouncementIcon className="text-content-warnning" />
                                   </span>
                              </Tippy>
                         )}
                    </div>
                    <div>
                         <span className="text-content-deselecttab">{data?.companyName || t('common.noSymbol')}</span>
                    </div>
               </div>

               <div className="flex rounded bg-back-2 px-4 py-2">
                    <div className="flex gap-x-6 border-l border-back-1 pl-4">
                         <span>آخرین قیمت:</span>
                         <span className="flex gap-x-1">
                              <span
                                   className={clsx('ltr', {
                                        'text-content-success-buy': Number(data?.lastTradedPriceVarPercent) > 0,
                                        'text-content-error-sell': Number(data?.lastTradedPriceVarPercent) < 0,
                                   })}
                              >{`(${data?.lastTradedPriceVarPercent || '0'}%)`}</span>
                              <span className="text-content-title">{sepNumbers(Number(data?.lastTradedPrice || '0'))}</span>
                         </span>
                    </div>

                    <div className="flex gap-x-6 pr-4">
                         <span>قیمت پایانی</span>
                         <span className="flex gap-x-1">
                              <span
                                   className={clsx('ltr', {
                                        'text-content-success-buy': Number(data?.closingPriceVarPercent) > 0,
                                        'text-content-error-sell': Number(data?.closingPriceVarPercent) < 0,
                                   })}
                              >{`(${data?.closingPriceVarPercent || '0'}%)`}</span>
                              <span className="text-content-title">{sepNumbers(Number(data?.closingPrice || 0))}</span>
                         </span>
                    </div>
               </div>

               <div className="flex gap-x-1">
                    <span className="flex items-center rounded bg-back-2 p-1">
                         <PinnedIcon className="text-icon-warning" />
                    </span>
                    <span className="flex items-center rounded bg-back-2 p-1">
                         <WatchlistNegativeIcon className="text-icon-primary" />
                    </span>

                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         //  onOpen={() => setIsDropdownOpen(true)}
                         //  onClose={() => setIsDropdownOpen(false)}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col gap-4 rounded-md bg-white px-4 py-3 shadow-E2">
                                   {items.map((item, index) => (
                                        <li
                                             key={index}
                                             className="flex w-full items-center justify-between"
                                             onClick={() => {
                                                  item.onclick();
                                                  setOpen(false);
                                             }}
                                        >
                                             <div className="flex gap-x-2 pl-10">
                                                  <item.icon className="text-icon-default" />
                                                  <span className="text-content-paragraph">{item.label}</span>
                                             </div>

                                             <UpArrowIcon className="-rotate-90 text-icon-default" />
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <button className="flex items-center rounded bg-back-2 p-1" onClick={() => setOpen(!open)}>
                                   <LinkIcon className="text-icon-default" />
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
};
