import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getMessageSupervisorFn = async (): Promise<SUpervisorMessageResult[]> => {
    try {
        const { data } = await AXIOS.get(apiRoutes.SupervisorMessage.Get);
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
        const { data } = await AXIOS.post(apiRoutes.SupervisorMessage.ReadPost + id);
        return data.result || [];
    } catch {}
};

export const useReadTodaySupervisorMessages = () => {
    return useMutation(readMessageFn);
};

const getMessageSupervisorOneSymbolFn = async (isin: string) : Promise<SUpervisorMessageResult[]> => {
    try {
        const { data } = await AXIOS.get(apiRoutes.SupervisorMessage.Get + `?symbolISIN=${isin}`);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useMessagesSuppervisorOneSmbol = (isin: string) => {
    return useQuery<SUpervisorMessageResult[], Error>(['suppervisorMessage', isin], () => getMessageSupervisorOneSymbolFn(isin));
};
