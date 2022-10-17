import { useMutation, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';

////////////////get Basket////////////////////////
export const getBasketFn = async () => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListBasket[]>>(apiRoutes?.Basket.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetBasket = () => useQuery<IListBasket[], unknown>(['BasketList'], getBasketFn);

///////////////create Basket///////////////////
const setBasketFn = async (param: string): Promise<number> => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((apiRoutes?.Basket.Create as string) + param);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useCreateBasket = () =>
    useMutation<number, unknown, string>(setBasketFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['BasketList']);
            onSuccessNotif({ title: 'سبد با موفقیت حذف شد' });
        },
        onError: () => {
            onErrorNotif(`متاسفانه انجام نشد`);
        },
    });
///////////////edit Basket///////////////////
const updateBasketFn = async (params: Partial<IListBasket>) => {
    const { name, sendDate, id, isPinned } = params;
    let queryString = name ? `name=${name}&sendDate=${sendDate}&id=${id}&isPinned=${isPinned}` : `isPinned=${isPinned}&id=${id}`;
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((apiRoutes?.Basket.Edit as string) + `?` + queryString);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useUpdateBasket = () =>
    useMutation(updateBasketFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['BasketList']);
            onSuccessNotif({ title: 'ویرایش سبد با موفقیت حذف شد' });
        },
        onError: () => {
            onErrorNotif(`متاسفانه انجام نشد`);
        },
    });
///////////////delete Basket///////////////////
const deleteBasketFn = async (id: number) => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((apiRoutes?.Basket.Delete as string) + `?id=` + id);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteBasket = () =>
    useMutation(deleteBasketFn, {
        onSuccess: () => {
            onSuccessNotif({ title: 'حذف سبد با موفقیت حذف شد' });
            return queryClient.invalidateQueries(['BasketList']);
        },
        onError: () => {
            onErrorNotif(`متاسفانه انجام نشد`);
        },
    });

///////////////Create Cart Detail///////////////////
const createDetailsBasketFn = async (params: any) => {
    const apiRoutes = getApiPath();

    try {
        const { data } = await AXIOS.post(apiRoutes?.Basket.CreateDetail as string, params);
        return data.result || 0;
    } catch {
        return 0;
    }
};
export const useCreateDetailsBasket = () =>
    useMutation(createDetailsBasketFn, {
        onSuccess: () => {
            onSuccessNotif({ title: 'مشتری با موفقیت به سبد اضافه شد' });
        },
        onError: () => {
            onErrorNotif(`متاسفانه انجام نشد`);
        },
    });
////////////////get Basket////////////////////////
export const getDetailsBasketFn = async (cartId: number | undefined) => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListDetailsBasket[]>>((apiRoutes?.Basket.GetDetail as string) + '?cartId=' + cartId);
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
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>((apiRoutes?.Basket.DeleteDetails as string) + `?cartDetailId=` + id);
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteDetailsBasket = (cartId: number | undefined) =>
    useMutation(deleteDetailsBasketFn, {
        onSuccess: () => {
            onSuccessNotif({ title: 'حذف مشتری از سبد با موفقیت انجام شد' });
            return queryClient.invalidateQueries(['BasketDetailsList', cartId]);
        },
        onError: () => {
            onErrorNotif(`متاسفانه انجام نشد`);
        },
    });
