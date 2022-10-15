import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getCommission = async () => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<ICommissionTypeResultType>>(apiRoutes?.Commission.Get as string, {});
    return data?.result;
};
// prettier-ignore
export const useCommissionQuery = <T=ICommissionTypeResultType>(
    options?: Omit<UseQueryOptions<ICommissionTypeResultType, unknown, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['getCommission'], ({ queryKey }) => getCommission(), options);
};
