import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetWatchlistSymbol = (params: IGetSymbolsWatchlistReq) => {
     const url = routeApi().Watchlist.getWatchlistSymbols;

     return useQuery({
          queryKey: ['watchlistSymbols', params],
          queryFn: async () => {
               const { data } = await AXIOS.get<GlobalApiResponseType<IGetSymbolsWatchlistRes[]>>(url, {
                    params,
               });

               return data.result;
          },
     });
};

export const useAddSymbolToWatchlist = () => {
     const url = routeApi().Watchlist.addWatchlistToSymbols;

     return useMutation({
          mutationFn: async (params: IAddSymbolsWatchlistReq) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<IAddSymbolsWatchlistRes>>(url, {}, { params: params });

               return data.result;
          },
     });
};

export const useGetSymbolInWatchlist = () => {
     const url = routeApi().Watchlist.getSymbolInWatchlist;

     return useQuery({
          queryKey: ['getSymbolInWatchlist'],
          queryFn: async () => {
               const { data } = await AXIOS.get<GlobalApiResponseType<IGetSymbolInWatchlistRes[]>>(url);

               return data.result;
          },
     });
};

export const useDeleteSymbolInWatchlist = () => {
     const url = routeApi().Watchlist.deleteSymbolInWatchlist;

     return useMutation({
          mutationFn: async (params: IDeleteSymbolInWatchlistReq) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<TDeleteSymbolInWatchlistRes>>(url, {}, { params });

               return data.result;
          },
     });
};

export const useGetWatchlists = () => {
     const url = routeApi().Watchlist.getWatchlists;

     return useQuery({
          queryKey: ['getWatchlists'],
          queryFn: async () => {
               const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistsRes[]>>(url);

               return data.result;
          },
     });
};

export const useCreateWatchlist = () => {
     const url = routeApi().Watchlist.createWatchlist;

     return useMutation({
          mutationFn: async (params: ICreateWatchlistReq) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<ICreateWatchlistRes>>(url, {}, { params });

               return data.result;
          },
     });
};
