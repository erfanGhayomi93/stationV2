import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';

import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { filterStateType } from 'src/pages/basket/components/FilterBasket';
import { excelDownloader } from 'src/utils/helpers';

////////////////get Basket////////////////////////
export const getBasketFn = async () => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IListBasket[]>>(Apis().Basket.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetBasket = () => useQuery(['BasketList'], getBasketFn , {
    select(data) {
        return data?.map(item => {
            if(item.sendDate === "0001-01-01T00:00:00"){
                return {
                    ...item , 
                    sendDate : null
                }
            }
            return item
        })
    },
});

///////////////create Basket///////////////////
const setBasketFn = async ({ name, sendDate }: ICreateBasket): Promise<GlobalApiResponseType<number>> => {
    try {
        const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.Create as string, null, { params: { name, sendDate } });
        return data;
    } catch {
        return {
            result: 0,
            succeeded: false,
            errors: []
        };
    }
};

export const useCreateBasket = (options?: UseMutationOptions<GlobalApiResponseType<number>, unknown, ICreateBasket>) =>
    useMutation<GlobalApiResponseType<number>, unknown, ICreateBasket>(setBasketFn, options);


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
        onSuccess: (data) => {
            console.log("data",data)
            onSuccessNotif({ title: 'سبد با موفقیت حذف شد' });
            queryClient.invalidateQueries(['BasketList']);
        }
    });

///////////////Create Cart Detail///////////////////
const createDetailsBasketFn = async (params: any) => {
    const { data } = await AXIOS.post(Apis().Basket.CreateDetail, params);
    return data;
};
export const useCreateDetailsBasket = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(createDetailsBasketFn, { ...options });

//insert customer to basket
const insertCustomerToBasketFn = async (params: ICreateCartDetailType[]) => {
    const { data } = await AXIOS.post(Apis().Basket.CreateBulkCartDetail as string, params);
    return data.result || 0;
};
export const useCreateBulkDetailBasket = (
    options?: Omit<UseMutationOptions<ICreateCartDetailType[], unknown, ICreateCartDetailType[], unknown>, 'mutationFn'> | undefined,
) => useMutation(insertCustomerToBasketFn, { ...options });


//insert customer to basket
const cardSendOrderFn = async (params: ICardSend) => {
    const { data } = await AXIOS.post(Apis().Basket.CartSendOrder, params);
    return data.result || 0;
};
export const useCardSendOrder = (
    options?: Omit<UseMutationOptions<ICardSend, unknown, ICardSend, unknown>, 'mutationFn'> | undefined,
) => useMutation(cardSendOrderFn, { ...options });




//Edit Basket Information
const EditCartDetail = async (params: ICreateCartDetailType) => {
    const { data } = await AXIOS.post(Apis().Basket.EditDetail, params);
    return data.result || 0;
};
export const useEditDetailsBasket = (
    options?: Omit<UseMutationOptions<ICreateCartDetailType, unknown, ICreateCartDetailType, unknown>, 'mutationFn'> | undefined,
) => useMutation(EditCartDetail, { ...options });

////////////////get Basket////////////////////////
export const getDetailsBasketFn = async (params: IGetBasketDetailParams) => {
    try {
        let { data } = await AXIOS.get<IListDetailsBasket>(Apis().Basket.GetDetail, { params });
        return data;
    } catch {
        return {
            hasNextPage: false,
            hasPreviousPage: false,
            pageNumber: 1,
            pageSize: 10,
            result: [],
            totalCount: '1',
            errors: [],
            succeeded: false,
            totalPages: 0,
        } as IListDetailsBasket;
    }
};

export const useGetDetailsBasket = (params: IGetBasketDetailParams) =>
    useQuery(['BasketDetailsList', params.CartId], () => getDetailsBasketFn({ ...params }), {
        enabled: !!params.CartId,
    });
///////////////delete details Basket///////////////////
const deleteDetailsBasketFn = async (cartDetailId?: number) => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Basket.DeleteDetails as string, {}, { params: { cartDetailId } });
        return data.result || 0;
    } catch {
        return 0;
    }
};

export const useDeleteDetailsBasket = (cartId: number) =>
    useMutation(deleteDetailsBasketFn, {
        onSuccess: () => {
            onSuccessNotif({ title: 'حذف مشتری از سبد با موفقیت انجام شد' });
            queryClient.invalidateQueries(['BasketDetailsList', cartId]);
        },
    });

//Download Excel
const excelExport = async (params: filterStateType) => {
    let { data } = await AXIOS.get(Apis().Basket.Excel as string, { params });
    if (data) {
        excelDownloader(data);
    }
    return data;
};

export const useGetBasketExcel = (params: filterStateType, options?: Omit<UseQueryOptions<any, any, any, any>, 'mutationFn'> | undefined) =>
    useQuery(['BasketExcel', params], ({ queryKey }) => excelExport(queryKey[1] as filterStateType), { ...options, enabled: false });
