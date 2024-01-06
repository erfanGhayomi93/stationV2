import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { TPhysicalbody, TCashbody } from './types';

export const useCreateCashSettlement = (options?: Omit<UseMutationOptions<any, unknown, TCashbody, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendSettlementRequest, options);

const sendSettlementRequest = async (body: TCashbody) => {
    const { data } = await AXIOS.post(Apis().Options.CreateCashSettlement, body);
    return data?.result;
};

export const useCreatePhysicalSettlement = (options?: Omit<UseMutationOptions<any, unknown, TCashbody, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendPhysicalSettlementRequest, options);

const sendPhysicalSettlementRequest = async (body: TPhysicalbody) => {
    const { data } = await AXIOS.post(Apis().Options.CreatePhysicalSettlement, body);
    return data?.result;
};
