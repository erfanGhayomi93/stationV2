import { useGetWatchlistSymbol } from '@api/watchlist';
import { PinnedIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import Popup from '@components/popup';
import { useSymbolStore } from '@store/symbol';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const PinnedWatchlists = () => {
     const [isLaptop, setIsLaptop] = useState(false);

     const { setSelectedSymbol, selectedSymbol } = useSymbolStore();

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const { data: watchlistSymbolData } = useGetWatchlistSymbol({ PageNumber: 1, watchlistType: 'Pinned' });

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     return (
          <div className="flex items-center">
               <PinnedIcon className="text-icon-warning" />

               <div className="flex h-full items-center">
                    {watchlistSymbolData?.slice(0, isLaptop ? 2 : 4).map(item => (
                         <div
                              className={clsx('flex h-full cursor-pointer items-center gap-x-1 px-3 transition-colors last:pl-0')}
                              key={item.symbolISIN}
                         >
                              <LastPriceTitle
                                   onClick={() => setSelectedSymbol(item.symbolISIN)}
                                   isSelected={selectedSymbol === item.symbolISIN}
                                   price={item.lastTradedPrice}
                                   PriceVar={item.lastTradedPriceVarPercent}
                                   symbolISIN={item.symbolISIN}
                                   symbolTitle={item.symbolTitle}
                              />
                         </div>
                    ))}
               </div>

               <div className="relative">
                    <Popup
                         margin={{
                              x: -20,
                              y: -40,
                         }}
                         defaultPopupWidth={200}
                         onOpen={() => setIsDropdownOpen(true)}
                         onClose={() => setIsDropdownOpen(false)}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col gap-1 rounded-md bg-back-surface px-4 py-3 shadow-E6">
                                   {watchlistSymbolData?.slice(isLaptop ? 2 : 4).map((item, index) => (
                                        <li
                                             key={index}
                                             className="flex w-full flex-1 justify-between rounded-md p-2 transition-colors hover:bg-back-primary"
                                        >
                                             <LastPriceTitle
                                                  key={index}
                                                  onClick={() => {
                                                       setSelectedSymbol(item.symbolISIN);
                                                       setOpen(false);
                                                  }}
                                                  isSelected={selectedSymbol === item.symbolISIN}
                                                  PriceVar={item.lastTradedPriceVarPercent}
                                                  price={item.lastTradedPrice}
                                                  symbolISIN={item.symbolISIN}
                                                  symbolTitle={item.symbolTitle}
                                             />
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <button className="flex items-center rounded-lg p-3" onClick={() => setOpen(!open)}>
                                   <UpArrowIcon
                                        className={clsx('h-min text-icon-default transition-transform', {
                                             'rotate-180': !isDropdownOpen,
                                        })}
                                   />
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
};

export default PinnedWatchlists;
