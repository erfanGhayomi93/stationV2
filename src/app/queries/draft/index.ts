import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { toast } from 'react-toastify';

///////////////create draft///////////////////
const setDraftFn = async (param: IDraftRequsetType): Promise<number | []> => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.draft.Create, { ...param });
        return data.result || [];
    } catch {
        return [];
    }
};

export const useCreateDraft = () => {
    return useMutation(setDraftFn, {
        onSuccess: () => {
            toast.info('done');
        },
    });
};

////////////////get draft////////////////////////
const getDraftFn = async () => {
    try {
        let { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.draft.Get);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useGetDraft = () => {
    return useQuery(['draftList'], getDraftFn);
};
