import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import AXIOS from "src/api/axiosInstance"
import { queryClient } from "src/app/queryClient";
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes"
import { useAppSelector } from "src/redux/hooks";
import { getUserData } from "src/redux/slices/global";

const getPlatformSetting = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<PlatformSettingResultTypes>>(Apis().Setting.GetPlatformSetting)
    return data;
}

export const useGetPlatformSetting = (options?: UseQueryOptions<GlobalApiResponseType<PlatformSettingResultTypes>>) => {
    return useQuery<GlobalApiResponseType<PlatformSettingResultTypes>>([Apis().Setting.GetPlatformSetting], getPlatformSetting, {
        cacheTime: Infinity,
        staleTime: Infinity,
        ...options
    })

}

export const savePlatformSetting = async (postOptions: PlatformSettingResultTypes) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Setting.SavePlatformSetting, postOptions)
    return data;
}


export const useSetPlatformSetting = () => useMutation(savePlatformSetting, {
    onSuccess: ({ result }) => {
        if (result) {
            queryClient.invalidateQueries([Apis().Setting.GetPlatformSetting])
        }
    },
})
