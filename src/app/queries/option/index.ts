import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getOpenPosition = async () => {
    const { data } = await AXIOS.get<IOpenPositionsRes[]>(Apis().Option.GetOpenPositions);
    return data;
};

export const useOpenPosition = (options?: UseQueryOptions<IOpenPositionsRes[]>) =>
    useQuery<IOpenPositionsRes[]>(['GetOpenPositions'], () => getOpenPosition(), { ...options });
