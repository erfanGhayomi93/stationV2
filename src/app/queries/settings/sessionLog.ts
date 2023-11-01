import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"
import AXIOS from "src/api/axiosInstance"
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes"

const GetSessionLog = async (params: GetSessionLogRequestParam) => {
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<SessionLogResultType[]>>(Apis().Setting.SessionLog, { params })
    return data
}


export const useGetSessionLog = (params: GetSessionLogRequestParam, options?: UseQueryOptions<GlobalPaginatedApiResponse<SessionLogResultType[]>>) =>
    useQuery<GlobalPaginatedApiResponse<SessionLogResultType[]>>([Apis().Setting.SessionLog], () => GetSessionLog(params),
        { ...options })

export const terminateSession = async (sessionId: string) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Setting.TerminateSession, { params: sessionId })
    return data;
}
