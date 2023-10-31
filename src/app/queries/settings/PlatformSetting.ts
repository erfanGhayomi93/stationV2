import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import AXIOS from "src/api/axiosInstance"
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes"

const getPlatformSetting = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<PlatformSettingResultTypes>>(Apis().Setting.GetPlatformSetting)
    return data;
}

export const useGetPlatformSetting = (options?: UseQueryOptions<GlobalApiResponseType<PlatformSettingResultTypes>>) =>
    useQuery<GlobalApiResponseType<PlatformSettingResultTypes>>([Apis().Setting.GetPlatformSetting], getPlatformSetting, {
        cacheTime: Infinity,
        staleTime: Infinity,
        ...options
    })


export const savePlatformSetting = async (postOptions: PlatformSettingResultTypes) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Setting.SavePlatformSetting, postOptions)
    return data;
}