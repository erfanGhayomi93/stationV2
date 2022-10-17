import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getMessageSupervisorFn = async (): Promise<SUpervisorMessageResult[]> => {
    try {
        const { data } = await AXIOS.get(Apis().SupervisorMessage.Get as string);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useMessagesSuppervisor = (options: { onSuccess: (data: any) => void }) => {
    return useQuery<SUpervisorMessageResult[], Error>(['suppervisorMessage'], getMessageSupervisorFn, options);
};

const readMessageFn = async (id: number) => {
    try {
        const { data } = await AXIOS.post((Apis().SupervisorMessage.ReadPost as string) + id);
        return data.result || [];
    } catch {}
};

export const useReadTodaySupervisorMessages = () => {
    return useMutation(readMessageFn);
};

const getMessageSupervisorOneSymbolFn = async (isin: string): Promise<SUpervisorMessageResult[]> => {
    try {
        const { data } = await AXIOS.get((Apis().SupervisorMessage.Get as string) + `?symbolISIN=${isin}`);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useMessagesSuppervisorOneSmbol = (isin: string) => {
    return useQuery<SUpervisorMessageResult[], Error>(['suppervisorMessage', isin], () => getMessageSupervisorOneSymbolFn(isin));
};
