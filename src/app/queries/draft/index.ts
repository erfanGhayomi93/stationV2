import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { queryClient } from 'src/app/queryClient';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

///////////////create draft///////////////////
const setDraftFn = async (param: IDraftCreateType): Promise<number | []> => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().draft.Create as string, { ...param });
        return data.result || [];
    } catch {
        return [];
    }
};

export const useCreateDraft = (options?: Omit<UseMutationOptions<number | [], unknown, IDraftCreateType, unknown>, 'mutationFn'> | undefined) => {
    return useMutation(setDraftFn, { ...options });
};

////////////////get draft////////////////////////
export const getDraftFn = async () => {
    try {
        let { data } = await AXIOS.get<GlobalApiResponseType<IDraftCreateType[]>>(Apis().draft.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetDraft = () => {
    return useQuery(['draftList'], getDraftFn);
};
////////////////delete draft////////////////////////
const deleteDraftQuery = async (draftId: number): Promise<number | []> => {
    let { data } = await AXIOS.post(Apis().draft.Delete as string, {}, { params: { draftId } });
    return data.result || [];
};

export const useDeleteDraft = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {
    return useMutation(deleteDraftQuery, {
        onSuccess: () => {
            queryClient.invalidateQueries(['draftList']);
            onSuccess && onSuccess();
        },
        onError: (err) => {
            console.log('err', err);
            onError && onError();
        },
    });
};
////////////////update draft///////////////////////////

const updateDraftQuery = async (params: any) => {
    let { data } = await AXIOS.post(Apis().draft.Update as string, params);
    return data.result || [];
};

export const useUpdateDraft = (option?: Omit<UseMutationOptions<number[], Error, any, unknown>, 'mutationKey' | 'mutationFn'>) => {
    return useMutation(updateDraftQuery, option);
};
