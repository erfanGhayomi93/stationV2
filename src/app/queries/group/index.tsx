import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const GetGroupInformation = async (params: IGetGroupInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGroupInformationResultType>>(Apis().Customer.GetGroupInformation as string, {
        params,
    });
    return data.result || [];
};

export const useGroupInformation = (param: IGetGroupInformationRequestType) => {
    return useQuery(['GetGroupInformation', param], ({ queryKey }) => GetGroupInformation(queryKey[1] as IGetGroupInformationRequestType), {
        enabled: !!param.groupId,
    });
};
const GroupCustomerDetail = async (params: IGetGroupInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGroupInformationResultType>>(Apis().Customer.GroupCustomerDetail as string, {
        params,
    });
    return data.result || [];
};

export const useGroupCustomerDetail = (param: IGetGroupInformationRequestType) => {
    return useQuery(['GroupCustomerDetail', param], ({ queryKey }) => GroupCustomerDetail(queryKey[1] as IGetGroupInformationRequestType), {
        enabled: !!param.groupId,
    });
};
