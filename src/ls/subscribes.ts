import { MutableRefObject } from 'react';
import { pushEngine } from './pushEngine';
import { queryClient } from 'src/app/queryClient';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { factoryQueryKey } from 'src/utils/helpers';
import { queryKeyWatchlistSymbol } from 'src/constant/watchlist';

export const subscriptionWatchlistMinor = (data: IGetWatchlistSymbol[], timer: MutableRefObject<NodeJS.Timeout | null | undefined>, setDebounce: any) => {
      pushEngine.subscribe<Partial<IGetWatchlistSymbol>>({
            id: 'WatchlistSymbol',
            mode: 'MERGE',
            isSnapShot: 'yes',
            adapterName: 'RamandRLCDData',
            items: data.map((watchlist) => watchlist?.symbolISIN),
            fields: ['totalNumberOfSharesTraded', 'lastTradedPrice', 'lastTradedPriceVarPercent'],
            onFieldsUpdate: ({ changedFields, itemName }) => {
                  let updatedWatchList: IGetWatchlistSymbol[] | undefined = [];
                  // timer.current = setTimeout(() => {
                  itemName === 'IRO1FOLD0001' &&
                        console.log({
                              changedFields,
                              itemName,
                        });

                        timer.current = setTimeout(() => {
//                         queryClient.setQueryData(queryKeyWatchlistSymbol({ PageNumber: 1, watchlistType: 'Pinned' }), (oldData: IGetWatchlistSymbol[] | undefined) => {
//                               const prevData = updatedWatchList && updatedWatchList?.length > 0 ? updatedWatchList : oldData;
//                               updatedWatchList = JSON.parse(JSON.stringify(prevData));
// 
//                               if (prevData && prevData?.length > 0 && updatedWatchList) {
//                                     const effectedSymbol = prevData.find((symbol) => symbol.symbolISIN === itemName) as IGetWatchlistSymbol;
//                                     const inx = prevData.findIndex((symbol) => symbol.symbolISIN === itemName);
// 
//                                     const updatedSymbol = {
//                                           ...effectedSymbol,
//                                           ...changedFields,
//                                     };
// 
//                                     if (updatedWatchList) {
//                                           updatedWatchList[inx] = updatedSymbol;
//                                     }
//                                     clearTimer()
//                                     return [...updatedWatchList];
//                               }
//                         });
                  }, 3000);
                  // }, 1000);

                  // clearTimer();
            },
      });

      const clearTimer = () => {
            if (!timer.current) return;

            clearTimeout(timer.current);
            timer.current = null;
      };
};

export const subscriptionRecentHistory = (data: SearchSymbolType[], timer: MutableRefObject<NodeJS.Timeout | null | undefined>) => {
      pushEngine.subscribe<Partial<SearchSymbolType>>({
            id: 'RecentHistorySymbol',
            mode: 'MERGE',
            isSnapShot: 'yes',
            adapterName: 'RamandRLCDData',
            items: data.map((watchlist) => watchlist?.symbolISIN),
            fields: ['lastTradedPrice'],
            onFieldsUpdate: ({ changedFields, itemName }) => {
                  timer.current = setTimeout(() => {
                        queryClient.setQueryData(['userRecentSymbolHistory'], (oldData: SearchSymbolType[] | undefined) => {
                              if (!!oldData) {
                                    const updatedWatchList = JSON.parse(JSON.stringify(oldData));
                                    const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName);
                                    const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);

                                    const updatedSymbol = {
                                          ...effectedSymbol,
                                          ...changedFields,
                                    };

                                    updatedWatchList[inx] = updatedSymbol;
                                    return [...updatedWatchList];
                              }
                        });

                        clearTimer();
                  }, 2000);
            },
      });

      const clearTimer = () => {
            if (!timer.current) return;

            clearTimeout(timer.current);
            timer.current = null;
      };
};

export const subscriptionCoGroupSymbol = (data: GetSameSectorResultType[], symbolISIN: string) => {
      let timer: string | number | NodeJS.Timeout | undefined;

      pushEngine.subscribe<GetSameSectorResultType>({
            id: 'CoGroupSymbol',
            mode: 'MERGE',
            isSnapShot: 'yes',
            adapterName: 'RamandRLCDData',
            items: data.map((watchlist) => watchlist?.symbolISIN),
            fields: ['lastTradedPrice', 'totalNumberOfSharesTraded', 'lastTradedPriceVarPercent', 'bestSellPrice', 'bestBuyPrice'],
            onFieldsUpdate({ changedFields, itemName }) {
                  timer = setTimeout(() => {
                        // console.log('changedFields', changedFields);
                        queryClient.setQueryData([Apis().Symbol.SameSectorSymbols, symbolISIN], (oldData: GetSameSectorResultType[] | undefined) => {
                              if (!!oldData) {
                                    const updatedWatchList = JSON.parse(JSON.stringify(oldData));
                                    const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName);
                                    const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);

                                    const updatedSymbol = {
                                          ...effectedSymbol,
                                          ...changedFields,
                                    };

                                    updatedWatchList[inx] = updatedSymbol;
                                    return [...updatedWatchList];
                              }
                        });

                        clearTimeout(timer);
                  }, 2000);
            },
      });
};

export const subscriptionPortfolio = (symbols: string[], params: IGTPortfolioRequestType) => {
      pushEngine.subscribe({
            id: 'portfolioSymbols',
            adapterName: 'RamandRLCDData',
            mode: 'MERGE',
            items: symbols,
            fields: ['lastTradedPrice', 'closingPrice', 'symbolState', 'lostProfitValue', 'dayValue'],
            isSnapShot: 'yes',
            onFieldsUpdate: ({ itemName, changedFields }) => {
                  // console.log(itemName, changedFields);
                  queryClient.setQueryData(['portfolioList', factoryQueryKey(params)], (oldData: GlobalPaginatedApiResponse<IGTPortfolioResultType[]> | undefined) => {
                        if (!!oldData) {
                              const { result: portfolioSymbols, ...rest } = oldData;
                              const updatedPortfolio = JSON.parse(JSON.stringify(portfolioSymbols));
                              const effectedSymbol = portfolioSymbols.find((symbol) => symbol.symbolISIN === itemName);
                              const inx = portfolioSymbols.findIndex((symbol) => symbol.symbolISIN === itemName);

                              const updatedSymbol = {
                                    ...effectedSymbol,
                                    ...changedFields,
                              };

                              updatedPortfolio[inx] = updatedSymbol;
                              return {
                                    ...rest,
                                    result: updatedPortfolio,
                              };
                        }
                  });
            },
      });
};

export const SymbolBestOneOrders = (selectedSymbol: string, fields: string[]) => {
      pushEngine.subscribe({
            id: 'SymbolBestOneOrders',
            mode: 'MERGE',
            isSnapShot: 'yes',
            adapterName: 'RamandRLCDData',
            items: [selectedSymbol],
            fields: fields,
            onFieldsUpdate: ({ changedFields }) => {
                  queryClient.setQueriesData(['SymbolGeneralInfo', selectedSymbol], (oldData) => {
                        const prevData: SymbolGeneralInfoType = JSON.parse(JSON.stringify(oldData));
                        return {
                              ...prevData,
                              ordersData: {
                                    ...prevData,
                                    ...changedFields,
                              },
                        };
                  });
            },
      });
};
