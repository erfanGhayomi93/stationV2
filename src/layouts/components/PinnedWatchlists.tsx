import { useMutationUpdateCurrentTab } from '@api/Symbol';
import { useGetWatchlistSymbol } from '@api/watchlist';
import { PinnedIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import Popup from '@components/popup';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { pushEngine, UpdatedFieldsType } from '@LS/pushEngine';
import { subscribeSymbolGeneral } from '@LS/subscribes';
import { useSymbolStore } from '@store/symbol';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const PinnedWatchlists = () => {
     const [isLaptop, setIsLaptop] = useState(false);

     const { setSelectedSymbol, selectedSymbol } = useSymbolStore();

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const { data: watchlistSymbolData, isFetching, isSuccess } = useGetWatchlistSymbol({ PageNumber: 1, watchlistType: 'Pinned' });

     const { mutate: mutateCurrentTab } = useMutationUpdateCurrentTab()

     const queryClient = useQueryClient()

     const refData = useRef<IGetSymbolsWatchlistRes[]>();

     const { setDebounce } = UseDebounceOutput()

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     const handleSelectedTab = (newSymbolISIN: string) => {
          mutateCurrentTab({ currentSymbolISIN: selectedSymbol, newSymbolISIN: newSymbolISIN }, {
               onSuccess: () => {
                    queryClient.refetchQueries({ queryKey: ['GetSymbolsTab'] })
               }
          })
          setSelectedSymbol(newSymbolISIN)
     }

     const updateSymbolTab = ({ itemName, changedFields }: UpdatedFieldsType<ISymbolTabSub>) => {
          const symbolsDataSnapshot: IGetSymbolsWatchlistRes[] = JSON.parse(JSON.stringify(refData.current));

          const findSymbolOld = symbolsDataSnapshot.find(item => item.symbolISIN === itemName);

          if (findSymbolOld) {
               const updatedSymbol = {
                    ...findSymbolOld,
                    lastTradedPrice: changedFields.lastTradedPrice
                         ? changedFields.lastTradedPrice
                         : findSymbolOld.lastTradedPrice,
                    lastTradedPriceVarPercent: changedFields.lastTradedPriceVarPercent
                         ? changedFields.lastTradedPriceVarPercent
                         : findSymbolOld.lastTradedPriceVarPercent,
               };

               const indexSymbol = symbolsDataSnapshot.findIndex(item => item.symbolISIN === itemName);

               symbolsDataSnapshot[indexSymbol] = updatedSymbol;

               refData.current = symbolsDataSnapshot;

               setDebounce(() => {
                    queryClient.setQueryData(['watchlistSymbols', { PageNumber: 1, watchlistType: 'Pinned' }], () => {
                         if (refData.current) return [...refData.current];
                    });
               }, 1000);
          }
     };

     useEffect(() => {
          if (!isFetching && watchlistSymbolData?.length && isSuccess) {
               //init Ref data
               refData.current = watchlistSymbolData;

               const id = 'PinWatchlistSymbol';
               const items = watchlistSymbolData?.map(item => item.symbolISIN);
               const fields = ['lastTradedPrice', 'lastTradedPriceVarPercent'];

               subscribeSymbolGeneral<ISymbolTabSub>({
                    id,
                    items,
                    fields,
                    onItemUpdate: updatedFields => {
                         updateSymbolTab(updatedFields);
                    },
               });

               return () => {
                    pushEngine.unSubscribe(id);
               };
          }
     }, [isFetching]);

     return (
          <div className="flex items-center">
               <PinnedIcon className="text-icon-warning" />

               <div className="flex h-full items-center">
                    {watchlistSymbolData
                         ?.slice(0, isLaptop ? 2 : 4).map(item => (
                              <div
                                   className={clsx('flex h-full cursor-pointer items-center gap-x-1 px-3 transition-colors last:pl-0')}
                                   key={item.symbolISIN}
                              >
                                   <LastPriceTitle
                                        onClick={() => handleSelectedTab(item.symbolISIN)}
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
                                   {watchlistSymbolData
                                        ?.slice(isLaptop ? 2 : 4).map((item, index) => (
                                             <li
                                                  key={index}
                                                  className="flex w-full flex-1 justify-between rounded-md p-2 transition-colors hover:bg-back-primary"
                                             >
                                                  <LastPriceTitle
                                                       key={index}
                                                       onClick={() => {
                                                            handleSelectedTab(item.symbolISIN);
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
