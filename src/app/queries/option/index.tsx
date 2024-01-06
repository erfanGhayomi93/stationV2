import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { TPhysicalbody, TCashbody, TCashDeleteBody } from './types';

export const useCreateCashSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendSettlementRequest, options);

const sendSettlementRequest = async (body: TCashbody) => {
    const { data } = await AXIOS.post(Apis().Options.CreateCashSettlement, body);
    return data?.result;
};

export const useUpdateCashSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendSettlementUpdateRequest, options);

const sendSettlementUpdateRequest = async (body: TCashbody) => {
    const { data } = await AXIOS.post(Apis().Options.UpdateCashSettlement, body);
    return data?.result;
};

export const useCreatePhysicalSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendPhysicalSettlementRequest, options);

const sendPhysicalSettlementRequest = async (body: TPhysicalbody) => {
    const { data } = await AXIOS.post(Apis().Options.CreatePhysicalSettlement, body);
    return data?.result;
};
export const useUpdatePhysicalSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendPhysicalSettlementUpdateRequest, options);

const sendPhysicalSettlementUpdateRequest = async (body: TPhysicalbody) => {
    const { data } = await AXIOS.post(Apis().Options.UpdatePhysicalSettlement, body);
    return data?.result;
};

export const useDeleteCashSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendDeleteCashRequest, options);

const sendDeleteCashRequest = async (body: TCashDeleteBody) => {
    const { data } = await AXIOS.post(Apis().Options.DeleteCashSettlement, body);
    return data?.result;
};

export const useDeletePhysicalSettlement = (options?: Omit<UseMutationOptions<any, unknown, any, unknown>, 'mutationFn'> | undefined) =>
    useMutation(sendDeletePhysicalRequest, options);

const sendDeletePhysicalRequest = async (body: TCashDeleteBody) => {
    const { data } = await AXIOS.post(Apis().Options.DeletePhysicalSettlement, body);
    return data?.result;
};
