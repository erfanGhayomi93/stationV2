import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getMessageSupervisor = async (): Promise<SUpervisorMessageResult[]> => {
    try {
        const { data } = await AXIOS.get(apiRoutes.SupervisorMessage.Get);
        return data.result || [];
    } catch {
        return [];
    }
};

export const useMessagesSuppervisor = () => {
    return useQuery<SUpervisorMessageResult[], Error>(['suppervisorMessage'], getMessageSupervisor);
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
