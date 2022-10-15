import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

///////////////create draft///////////////////
const setDraftFn = async (param: IDraftRequsetType): Promise<number | []> => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes?.draft.Create as string, { ...param });
        return data.result || [];
    } catch {
        return [];
    }
};

export const useCreateDraft = () => {
    return useMutation(setDraftFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['draftList']);
        },
    });
};

////////////////get draft////////////////////////
export const getDraftFn = async () => {
    const apiRoutes = getApiPath();

    try {
        let { data } = await AXIOS.get(apiRoutes?.draft.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetDraft = () => {
    return useQuery(['draftList'], getDraftFn, {
        select: (data: IDraftSelected[]) =>
            data.map((item: IDraftSelected) => ({
                id: item.id,
                customerTitles: item.customerTitles,
                symbolTitle: item.symbolTitle,
                side: item.side,
                quantity: item.quantity,
                price: item.price,
                validity: item.validity,
                validityDate: item.validityDate,
            })),
    });
};
////////////////delete draft////////////////////////
const deleteDraftQuery = async (id: number): Promise<number | []> => {
    const apiRoutes = getApiPath();

    let { data } = await AXIOS.post((apiRoutes?.draft.Delete as string) + '?draftId=' + id);
    return data.result || [];
};

export const useDeleteDraft = () => {
    return useMutation(deleteDraftQuery, {
        onSuccess: () => {
            queryClient.invalidateQueries(['draftList']);
        },
        onError: (err) => {
            console.log('err', err);
        },
    });
};
