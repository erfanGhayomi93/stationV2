import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';

////////////////get Basket////////////////////////
export const getBasketFn = async () => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListBasket[]>>(apiRoutes.Basket.Get);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetBasket = () => useQuery(['BasketList'], getBasketFn);

///////////////create Basket///////////////////
const setBasketFn = async (param: string): Promise<number | []> => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.Basket.Create + param);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useCreateBasket = () =>
    useMutation(setBasketFn, {
        onSuccess: (data) => {
            return queryClient.invalidateQueries(['BasketList']);
        },
    });
///////////////edit Basket///////////////////
const updateBasketFn = async (params: Partial<IListBasket>) => {
    const { name, sendDate, id, isPinned } = params;
    let queryString = name ? `name=${name}&sendDate=${sendDate}&id=${id}&isPinned=${isPinned}` : `isPinned=${isPinned}&id=${id}`;
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.Basket.Edit + `?` + queryString);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useUpdateBasket = () =>
    useMutation(updateBasketFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['BasketList']);
        },
    });
///////////////delete Basket///////////////////
const deleteBasketFn = async (id: number) => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.Basket.Delete + `?id=` + id);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteBasket = () =>
    useMutation(deleteBasketFn, {
        onSuccess: () => {
           return queryClient.invalidateQueries(['BasketList']);
        },
    });

///////////////Create Cart Detail///////////////////
const createDetailsBasketFn = async (params: any) => {
    try {
        const { data } = await AXIOS.post(apiRoutes.Basket.CreateDetail, params);
        return data.result || 0;
    } catch {
        return 0;
    }
};
export const useCreateDetailsBasket = () => useMutation(createDetailsBasketFn);
