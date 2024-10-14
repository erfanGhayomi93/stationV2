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

     const { tabsSymbol, setTabSymbol, selectedSymbol, setSelectedSymbol } = useSymbolStore();

     console.log(tabsSymbol, 'tabsSymbol');

     const handleClickSymbol = (symbolISIN: string) => {
          const instanceTabSymbol: SearchSymbol[] = [...tabsSymbol];

          const symbol: SearchSymbol | undefined = instanceTabSymbol.find(item => item.symbolISIN === symbolISIN);
          const otherData = instanceTabSymbol.filter(item => item.symbolISIN !== symbolISIN);

          symbol && setTabSymbol([{ ...symbol }, ...otherData]);

          setSelectedSymbol(symbolISIN);
     };

     //  useEffect(() => {
     //       console.log('tabsSymbol', tabsSymbol);
     //  }, [tabsSymbol]);

     const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
          if (!symbol) return;

          setSearchSymbol(symbol);

          setSelectedSymbol(symbol.symbolISIN);

          const isExist = tabsSymbol.some(item => item.symbolISIN === symbol?.symbolISIN);
          if (isExist) {
               return;
          }
          setTabSymbol([...tabsSymbol, { ...symbol }]);
     };

     const handleRemoveTabSymbol = (symbolISIN: string) => {
          const instanceTabSymbol: SearchSymbol[] = tabsSymbol.map(item => ({ ...item }));

          const findIndex = instanceTabSymbol.findIndex(item => item.symbolISIN === symbolISIN);

          if (findIndex !== -1) {
               instanceTabSymbol.splice(findIndex, 1);
               setTabSymbol([...instanceTabSymbol]);
               setSelectedSymbol(instanceTabSymbol[findIndex === 0 ? 0 : findIndex - 1].symbolISIN);
          }
     };

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     return (
          <div className="flex h-full justify-between px-4">
               <div className="flex flex-1 items-center gap-x-2">
                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={() => (
                              <ul className="rtl flex flex-col gap-4 rounded-md bg-back-surface px-4 py-3 shadow-E2">
                                   {tabsSymbol.map(option => (
                                        <LastPriceTitle
                                             PriceVar={option.lastTradedPriceVar}
                                             price={option.lastTradedPrice}
                                             symbolISIN={option.symbolISIN}
                                             symbolTitle={option.symbolTitle}
                                             key={option.symbolISIN}
                                             onClick={handleClickSymbol}
                                             isSelected={selectedSymbol === option.symbolISIN}
                                             lastPrice={1}
                                             lastPriceVar={1}
                                        />
                                   ))}
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

                    <div className="flex h-full flex-1 items-center">
                         {tabsSymbol.slice(0, isLaptop ? 4 : 7).map((item, ind) => (
                              <Fragment key={item?.symbolISIN || ind}>
                                   <div
                                        className={clsx('flex h-full cursor-pointer items-center px-5 transition-colors', {
                                             'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN,
                                        })}
                                   >
                                        {item?.symbolISIN === selectedSymbol && tabsSymbol.length !== 1 && (
                                             <CloseIcon
                                                  width={10}
                                                  height={10}
                                                  className="text-icon-default"
                                                  onClick={() => handleRemoveTabSymbol(item?.symbolISIN)}
                                             />
                                        )}
                                        <LastPriceTitle
                                             PriceVar={item?.lastTradedPriceVar}
                                             price={item?.lastTradedPrice}
                                             symbolISIN={item?.symbolISIN}
                                             symbolTitle={item?.symbolTitle}
                                             key={item?.symbolISIN}
                                             onClick={() => setSelectedSymbol(item?.symbolISIN)}
                                             isSelected={selectedSymbol === item?.symbolISIN}
                                             lastPrice={1}
                                             lastPriceVar={1}
                                        />
                                   </div>

                                   <span
                                        className={clsx(
                                             `h-4 w-[1px] bg-line-div-1 last:opacity-0 ${!!tabsSymbol && tabsSymbol[ind + 1]?.symbolISIN === selectedSymbol ? 'opacity-0' : ''} `,
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
