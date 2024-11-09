import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useQueryMessagesSupervisor = ({ symbolISIN }: { symbolISIN: string }) => {
     const url = routeApi().SupervisorMessage.Get;

     return useQuery({
          queryKey: ['GetSupervisorMessages', symbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ISupervisorMessageRes[]>>(url, { params: { symbolISIN } });

               return response.data.result;
          },
     });
};

export const useMutationReadMessage = () => {
     const url = routeApi().SupervisorMessage.Read;

     return useMutation({
          mutationFn: async (id: number) => {
               const { data } = await AXIOS.post(url, null, { params: { MessageIDs: id } });

               return data.result;
          },
     });
};
