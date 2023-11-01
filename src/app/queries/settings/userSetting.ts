import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import AXIOS from "src/api/axiosInstance"
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes"

const getUserSetting = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<UserSettingResultTypes>>(Apis().Setting.GetUserSetting)
    return data.result || {};
}

export const useGetUserSetting = (options?: UseQueryOptions<UserSettingResultTypes>) =>
    useQuery<UserSettingResultTypes>([Apis().Setting.GetUserSetting], getUserSetting, {
        cacheTime: Infinity,
        staleTime: Infinity,
        ...options
    })