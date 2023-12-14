import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';

import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';

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
const setBasketFn = async ({ name, sendDate }: ICreateBasket): Promise<number> => {
    try {
        const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.Create as string, null, { params: { name, sendDate } });
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useCreateBasket = (options?: UseMutationOptions<number, unknown, ICreateBasket>) =>
    useMutation<number, unknown, ICreateBasket>(setBasketFn, options);
///////////////edit Basket///////////////////
const updateBasketFn = async (params: Partial<IListBasket>) => {
    const { name, sendDate, id, isPinned } = params;
    // let queryString = name ? `name=${name}&sendDate=${sendDate}&id=${id}&isPinned=${isPinned}` : `isPinned=${isPinned}&id=${id}`;
    let Qparams = name ? { name, sendDate, id, isPinned } : { id, isPinned };

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.Edit as string, {}, { params: Qparams });
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useUpdateBasket = () =>
    useMutation(updateBasketFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['BasketList']);
            onSuccessNotif({ title: 'ویرایش سبد با موفقیت انجام شد' });
        },
        onError: () => {
            onErrorNotif();
        },
    });
///////////////delete Basket///////////////////
const deleteBasketFn = async (id: number) => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.Delete as string, {}, { params: { id } });
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteBasket = () =>
    useMutation(deleteBasketFn, {
        onSuccess: () => {
            onSuccessNotif({ title: 'سبد با موفقیت حذف شد' });
            return queryClient.invalidateQueries(['BasketList']);
        },
        onError: () => {
            onErrorNotif();
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
export const useCreateDetailsBasket = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(createDetailsBasketFn, { ...options });

//Edit Basket Information
const EditCartDetail = async (params: ICreateCartDetailType) => {
    const { data } = await AXIOS.post(Apis().Basket.EditDetail as string, params);
    return data.result || 0;
};
export const useEditDetailsBasket = (
    options?: Omit<UseMutationOptions<ICreateCartDetailType, unknown, ICreateCartDetailType, unknown>, 'mutationFn'> | undefined,
) => useMutation(EditCartDetail, { ...options });

////////////////get Basket////////////////////////
export const getDetailsBasketFn = async (cartId: number | undefined) => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListDetailsBasket[]>>(Apis().Basket.GetDetail as string, { params: { cartId } });
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
const deleteDetailsBasketFn = async (cartDetailId: number) => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.DeleteDetails as string, {}, { params: { cartDetailId } });
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
            onErrorNotif();
        },
    });

//Download Excel
const excelExport = async (cartId: number) => {
    try {
        let { data } = await AXIOS.post(Apis().Basket.Excel as string, { cartId });
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useGetBasketExcel = (options?: Omit<UseMutationOptions<any, any, any, any>, 'mutationFn'> | undefined) =>
    useMutation(excelExport, { ...options });