import {
     useMutationCreateSymbolTab,
     useMutationDeleteSymbolTab,
     useMutationUpdateCreateDateTimeTab,
     useQuerySymbolTab,
} from '@api/Symbol';
import { CloseIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import Popup from '@components/popup';
import SearchSymbol from '@components/searchSymbol';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import { useSymbolStore } from 'store/symbol';
import ProfileDropdown from './ProfileDropdown';

const HeaderLayout = () => {
     const [isLaptop, setIsLaptop] = useState(false);

     const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null);

     const { selectedSymbol, setSelectedSymbol, setMarketUnit, setSymbolTitle } = useSymbolStore();

     const { data: symbolTab } = useQuerySymbolTab();

     const { mutate: mutateCreate } = useMutationCreateSymbolTab();

     const { mutate: mutateDelete } = useMutationDeleteSymbolTab();

     const { mutate: mutateUpdateCreateTime } = useMutationUpdateCreateDateTimeTab();

     const handleClickSymbolFromDropdown = (symbolISIN: string) => {
          mutateUpdateCreateTime(symbolISIN);

          setSelectedSymbol(symbolISIN);
     };

     const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
          if (!symbol) return;

          mutateCreate(symbol.symbolISIN);

          setSearchSymbol(symbol);

          setSelectedSymbol(symbol.symbolISIN);

          setMarketUnit(symbol?.marketUnit)

          setSymbolTitle(symbol.symbolTitle)
     };

     const handleRemoveTabSymbol = (symbolISIN: string) => {
          mutateDelete(symbolISIN);

          const findIndex = symbolTab?.findIndex(item => item.symbolISIN === symbolISIN);

          symbolTab && setSelectedSymbol(symbolTab[findIndex === 0 ? 1 : Number(findIndex) - 1].symbolISIN);
     };

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     return (
          <div className="flex h-full justify-between gap-4 px-4 pt-2">
               <div className="flex w-1/5 items-center justify-start gap-x-4 pb-2">
                    <ProfileDropdown />
                    <div className="flex-1">
                         <SearchSymbol searchSymbol={searchSymbol} setSearchSymbol={handleSetSelectedSymbol} />
                    </div>
               </div>
               <div className="flex w-4/5 flex-1 items-center justify-end gap-x-2">
                    <div className="flex h-full flex-1 items-center justify-end">
                         {symbolTab?.slice(0, isLaptop ? 4 : 7).map((item, ind) => (
                              <Fragment key={item?.symbolISIN || ind}>
                                   <div
                                        className={clsx('flex h-full cursor-pointer items-center gap-2 px-5 transition-colors', {
                                             'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN,
                                        })}
                                   >
                                        <LastPriceTitle
                                             PriceVar={item?.lastTradedPriceVarPercent}
                                             price={item?.lastTradedPrice}
                                             symbolISIN={item?.symbolISIN}
                                             symbolTitle={item?.symbolTitle}
                                             key={item?.symbolISIN}
                                             onClick={symbolISIN => setSelectedSymbol(symbolISIN)}
                                             isSelected={selectedSymbol === item?.symbolISIN}
                                        />

                                        {item?.symbolISIN === selectedSymbol && symbolTab.length !== 1 && (
                                             <CloseIcon
                                                  width={10}
                                                  height={10}
                                                  className="text-icon-default"
                                                  onClick={() => handleRemoveTabSymbol(item?.symbolISIN)}
                                             />
                                        )}
                                   </div>

                                   <span
                                        className={clsx(
                                             `h-4 w-[1px] bg-line-div-2 last:opacity-0 ${!!symbolTab && symbolTab[ind + 1]?.symbolISIN === selectedSymbol ? 'opacity-0' : ''} `,
                                             {
                                                  'opacity-0': item?.symbolISIN === selectedSymbol,
                                             }
                                        )}
                                   ></span>
                              </Fragment>
                         ))}
                    </div>
                    <Popup
                         margin={{
                              y: 20,
                              x: 5,
                         }}
                         defaultPopupWidth={200}
                         renderer={() => (
                              <ul className="flex w-full flex-col gap-2 rounded-md bg-back-surface px-4 py-3 shadow-E5">
                                   {symbolTab?.map(item => (
                                        <li
                                             className={clsx(
                                                  'rtl flex w-full items-center rounded-md p-2 transition-colors hover:bg-back-primary',
                                                  selectedSymbol === item?.symbolISIN && 'bg-back-primary'
                                             )}
                                        >
                                             <LastPriceTitle
                                                  PriceVar={item?.lastTradedPriceVarPercent}
                                                  price={item?.lastTradedPrice}
                                                  symbolISIN={item?.symbolISIN}
                                                  symbolTitle={item?.symbolTitle}
                                                  key={item?.symbolISIN}
                                                  onClick={() => handleClickSymbolFromDropdown(item?.symbolISIN)}
                                                  isSelected={selectedSymbol === item?.symbolISIN}
                                             />
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <div className="pb-2">
                                   <button className="flex items-center rounded-lg bg-back-2 p-4" onClick={() => setOpen(!open)}>
                                        <UpArrowIcon
                                             className={clsx('h-min text-icon-default transition-transform', {
                                                  'rotate-180': !open,
                                             })}
                                        />
                                   </button>
                              </div>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default HeaderLayout;
