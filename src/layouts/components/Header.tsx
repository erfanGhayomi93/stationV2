import { CloseIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import SearchSymbol from '@components/searchSymbol';
import Dropdown from '@uiKit/Dropdown';
import { useSymbolManager } from '@zustand/symbol';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { useMutationCreateSymbolTab, useMutationDeleteSymbolTab, useMutationUpdateCreateDateTimeTab, useQuerySymbolTab } from '@api/Symbol';

const HeaderLayout = () => {
     const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

     const [isLaptop, setIsLaptop] = useState(false);

     const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null);

     const { selectedSymbol, setSelectedSymbol } = useSymbolManager();

     const { data: symbolTab } = useQuerySymbolTab()

     const { mutate: mutateCreate } = useMutationCreateSymbolTab()

     const { mutate: mutateDelete } = useMutationDeleteSymbolTab()

     const { mutate: mutateUpdateCreateTime } = useMutationUpdateCreateDateTimeTab()

     const refDropdown = useRef<HTMLDivElement>(null);

     const handleClickSymbolFromDropdown = (symbolISIN: string) => {

          mutateUpdateCreateTime(symbolISIN)

          setSelectedSymbol(symbolISIN);

          setIsDropdownOpen(false);
     };


     const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
          if (!symbol) return;

          mutateCreate(symbol.symbolISIN)

          setSearchSymbol(symbol);

          setSelectedSymbol(symbol.symbolISIN);
     };

     const handleRemoveTabSymbol = (symbolISIN: string) => {
          mutateDelete(symbolISIN)

          const findIndex = symbolTab?.findIndex(item => item.symbolISIN === symbolISIN);

          symbolTab && setSelectedSymbol(symbolTab[findIndex === 0 ? 1 : Number(findIndex) - 1].symbolISIN);

     };

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     return (
          <div className="flex h-full justify-between px-4">
               <div className="flex flex-1 items-center gap-x-2">
                    <div className="flex items-center" ref={refDropdown}>
                         <button
                              className="flex items-center rounded-lg bg-back-2 p-3"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              disabled={!symbolTab?.length}
                         >
                              <UpArrowIcon
                                   className={clsx('h-min text-icon-default transition-transform', {
                                        'rotate-180': !isDropdownOpen,
                                        'text-icon-disable': !symbolTab?.length,
                                   })}
                              />
                         </button>

                         {!!isDropdownOpen && (
                              <Dropdown<ISymbolTabRes>
                                   ref={refDropdown}
                                   isDropdownOpen={isDropdownOpen}
                                   closeDropDowns={() => setIsDropdownOpen(false)}
                                   data={symbolTab || []}
                                   classes={{ position: 'top-10 -left-9' }}
                                   animate="fadeInDown"
                                   getLabel={option => (
                                        <LastPriceTitle
                                             PriceVar={option.lastTradedPriceVarPercent}
                                             price={option.lastTradedPrice}
                                             symbolISIN={option.symbolISIN}
                                             symbolTitle={option.symbolTitle}
                                             key={option.symbolISIN}
                                             onClick={handleClickSymbolFromDropdown}
                                             isSelected={selectedSymbol === option.symbolISIN}
                                        />
                                   )}
                              />
                         )}
                    </div>

                    <div className="flex h-full flex-1 items-center">
                         {symbolTab?.slice(0, isLaptop ? 4 : 7).map((item, ind) => (
                              <Fragment key={item?.symbolISIN || ind}>
                                   <div
                                        className={clsx('flex h-full cursor-pointer items-center px-5 transition-colors', {
                                             'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN,
                                        })}
                                   >
                                        {item?.symbolISIN === selectedSymbol && symbolTab.length !== 1 && (
                                             <CloseIcon
                                                  width={10}
                                                  height={10}
                                                  className="text-icon-default"
                                                  onClick={() => handleRemoveTabSymbol(item?.symbolISIN)}
                                             />
                                        )}
                                        <LastPriceTitle
                                             PriceVar={item?.lastTradedPriceVarPercent}
                                             price={item?.lastTradedPrice}
                                             symbolISIN={item?.symbolISIN}
                                             symbolTitle={item?.symbolTitle}
                                             key={item?.symbolISIN}
                                             onClick={() => setSelectedSymbol(item?.symbolISIN)}
                                             isSelected={selectedSymbol === item?.symbolISIN}
                                        />
                                   </div>

                                   <span
                                        className={clsx(
                                             `h-4 w-[1px] bg-line-div-1 last:opacity-0 ${!!symbolTab && symbolTab[ind + 1]?.symbolISIN === selectedSymbol ? 'opacity-0' : ''} `,
                                             {
                                                  'opacity-0': item?.symbolISIN === selectedSymbol,
                                             }
                                        )}
                                   ></span>
                              </Fragment>
                         ))}
                    </div>
               </div>

               <div className="flex w-1/5 items-center justify-end gap-x-4">
                    <div className="w-80">
                         <SearchSymbol searchSymbol={searchSymbol} setSearchSymbol={handleSetSelectedSymbol} />
                    </div>

                    <ProfileDropdown />
               </div>
          </div>
     );
};

export default HeaderLayout;
