import { pushEngine, UpdatedFieldsType } from '@LS/pushEngine';
import { subscribeSymbolGeneral } from '@LS/subscribes';
import {
     useMutationCreateSymbolTab,
     useMutationDeleteSymbolTab,
     useMutationUpdateCreateDateTimeTab,
     useQuerySearchHistory,
     useQuerySymbolGeneralInformation,
     useQuerySymbolTab,
} from '@api/Symbol';
import { CloseIcon, UpArrowIcon } from '@assets/icons';
import LastPriceTitle from '@components/LastPriceTitle';
import Popup from '@components/popup';
import SearchSymbol from '@components/searchSymbol';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useSymbolStore } from 'store/symbol';
import ProfileDropdown from './ProfileDropdown';
import useUpdateEffect from '@hooks/useUpdateEffect';
import { useLocation } from 'react-router';

const HeaderLayout = () => {
     const [isLaptop, setIsLaptop] = useState(false);

     const queryClient = useQueryClient();

     const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null);

     const { selectedSymbol, setSelectedSymbol } = useSymbolStore();

     const { data: symbolTab, isSuccess, refetch: refetchSymbolTab, isFetching } = useQuerySymbolTab();

     const { isSuccess: isSuccessSymbolGeneral } = useQuerySymbolGeneralInformation(selectedSymbol);

     const { data: historyData, refetch: refetchHistory } = useQuerySearchHistory();

     const refData = useRef<ISymbolTabRes[]>();

     const { setDebounce } = UseDebounceOutput();

     const { mutate: mutateCreate } = useMutationCreateSymbolTab();

     const { mutate: mutateDelete } = useMutationDeleteSymbolTab();

     const { mutate: mutateUpdateCreateTime } = useMutationUpdateCreateDateTimeTab();

     // const [isShowDropdown, setShowDropdown] = useState(false);

     const { pathname } = useLocation()

     const isDashboardPage = useMemo(() => pathname === '/', [pathname])

     const handleClickSymbolFromDropdown = (symbolISIN: string) => {
          mutateUpdateCreateTime(symbolISIN, {
               onSuccess() {
                    refetchSymbolTab();
               },
          });

          setSelectedSymbol(symbolISIN);
     };

     const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
          if (!symbol) return;

          mutateCreate(symbol.symbolISIN, {
               onSuccess() {
                    refetchSymbolTab();
               },
          });

          setSearchSymbol(symbol);

          setSelectedSymbol(symbol.symbolISIN);
     };

     const handleRemoveTabSymbol = (symbolISIN: string) => {
          mutateDelete(symbolISIN, {
               onSuccess() {
                    refetchSymbolTab();
               },
          });

          const findIndex = symbolTab?.findIndex(item => item.symbolISIN === symbolISIN);

          symbolTab && setSelectedSymbol(symbolTab[findIndex === 0 ? 1 : Number(findIndex) - 1].symbolISIN);
     };

     const updateSymbolTab = ({ itemName, changedFields }: UpdatedFieldsType<ISymbolTabSub>) => {
          const symbolsDataSnapshot: ISymbolTabRes[] = JSON.parse(JSON.stringify(refData.current));

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
                    queryClient.setQueryData(['GetSymbolsTab'], () => {
                         if (refData.current) return [...refData.current];
                    });
               }, 1000);
          }
     };

     useEffect(() => {
          if (!isFetching && symbolTab?.length && isSuccess) {
               //init Ref data
               refData.current = symbolTab;

               const id = 'tabSymbolGeneral';
               const items = symbolTab?.map(item => item.symbolISIN);
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

     useEffect(() => {
          const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
          setIsLaptop(mediaQuery.matches);
     }, []);

     useUpdateEffect(() => {
          if (isSuccessSymbolGeneral) {
               refetchHistory()
          }
     }, [isSuccessSymbolGeneral])

     return (
          <div className="flex h-full justify-between gap-4 px-4 pt-2">
               <div className="flex w-1/5 items-center justify-start gap-x-4 pb-2">
                    <ProfileDropdown />
                    <div className="flex-1">
                         <SearchSymbol
                              searchSymbol={searchSymbol}
                              setSearchSymbol={handleSetSelectedSymbol}
                              historyData={historyData}
                              isMainPage
                         />
                    </div>
               </div>
               <div className="flex w-4/5 flex-1 items-center justify-end gap-x-2">
                    <div className="flex h-full flex-1 items-center justify-end">
                         {symbolTab
                              ?.slice(0, isLaptop ? 4 : 7)
                              .map((item, ind) => (
                                   <Fragment key={item?.symbolISIN || ind}>
                                        <div
                                             className={clsx('flex h-full items-center gap-2 px-5 transition-colors', {
                                                  'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN && isDashboardPage,
                                                  // "cursor-pointer": isDashboardPage,
                                                  // "cursor-none": !isDashboardPage,
                                             })}
                                        >
                                             <LastPriceTitle
                                                  PriceVar={item?.lastTradedPriceVarPercent}
                                                  price={item?.lastTradedPrice}
                                                  symbolISIN={item?.symbolISIN}
                                                  symbolTitle={item?.symbolTitle}
                                                  key={item?.symbolISIN}
                                                  onClick={symbolISIN => setSelectedSymbol(symbolISIN)}
                                                  isSelected={isDashboardPage ? selectedSymbol === item?.symbolISIN : false}
                                                  isDisabled={!isDashboardPage}
                                             />

                                             {item?.symbolISIN === selectedSymbol && isDashboardPage && (
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
                         defaultPopupWidth={250}
                         renderer={({ setOpen }) => (
                              <ul className="flex max-h-96 flex-col gap-2 overflow-y-auto rounded-md bg-back-surface px-4 py-3 shadow-E5">
                                   {symbolTab?.map(item => (
                                        <button
                                             className={clsx(
                                                  'rtl flex w-full items-center rounded-md p-2 transition-colors hover:bg-back-primary',
                                                  (selectedSymbol === item?.symbolISIN && isDashboardPage) && 'bg-back-primary'
                                             )}
                                             key={item.symbolISIN}
                                        >
                                             <LastPriceTitle
                                                  PriceVar={item?.lastTradedPriceVarPercent}
                                                  price={item?.lastTradedPrice}
                                                  symbolISIN={item?.symbolISIN}
                                                  symbolTitle={item?.symbolTitle}
                                                  key={item?.symbolISIN}
                                                  onClick={() => {
                                                       handleClickSymbolFromDropdown(item?.symbolISIN);
                                                       setOpen(false);
                                                  }}
                                                  isSelected={isDashboardPage ? selectedSymbol === item?.symbolISIN : false}
                                             />
                                        </button>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <div className="pb-2">
                                   <button
                                        className="flex items-center rounded-lg bg-back-2 p-4 disabled:opacity-50"
                                        onClick={() => setOpen(!open)}
                                        disabled={!isDashboardPage}
                                   >
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
