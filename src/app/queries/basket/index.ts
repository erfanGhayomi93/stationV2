import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

////////////////get Basket////////////////////////
export const getBasketFn = async () => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListBasket[]>>(Apis().Basket.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetBasket = () => useQuery<IListBasket[], unknown>(['BasketList'], getBasketFn);

///////////////create Basket///////////////////
const setBasketFn = async (param: string): Promise<number> => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((Apis().Basket.Create as string) + param);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useCreateBasket = () => useMutation<number, unknown, string>(setBasketFn);
///////////////edit Basket///////////////////
const updateBasketFn = async (params: Partial<IListBasket>) => {
    const { name, sendDate, id, isPinned } = params;
    let queryString = name ? `name=${name}&sendDate=${sendDate}&id=${id}&isPinned=${isPinned}` : `isPinned=${isPinned}&id=${id}`;

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((Apis().Basket.Edit as string) + `?` + queryString);
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
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((Apis().Basket.Delete as string) + `?id=` + id);
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
        const { data } = await AXIOS.post(Apis().Basket.CreateDetail as string, params);
        return data.result || 0;
    } catch {
        return 0;
    }
};
export const useCreateDetailsBasket = () => useMutation(createDetailsBasketFn);
////////////////get Basket////////////////////////
export const getDetailsBasketFn = async (cartId: number | undefined) => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListDetailsBasket[]>>((Apis().Basket.GetDetail as string) + '?cartId=' + cartId);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetDetailsBasket = (cartId: number | undefined) =>
    useQuery(['BasketDetailsList', cartId], () => getDetailsBasketFn(cartId), {
        enabled: !!cartId,
    });
///////////////delete details Basket///////////////////
const deleteDetailsBasketFn = async (id: number) => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((Apis().Basket.DeleteDetails as string) + `?cartDetailId=` + id);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteDetailsBasket = (cartId: number | undefined) =>
    useMutation(deleteDetailsBasketFn, {
        onSuccess: () => {
            return queryClient.invalidateQueries(['BasketDetailsList', cartId]);
        },
    });
