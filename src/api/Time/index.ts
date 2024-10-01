import { useQuery } from "@tanstack/react-query";
import AXIOS from "@config/axios";
import { routeApi } from "@router/routeApi";



export const useQueryTimeService = () => {
    const url = routeApi()?.Time.main

    return useQuery({
        queryKey : ["TimeService"] ,
        queryFn : async () => {
            const response = await AXIOS.get<GlobalApiResponseType<string>>(url)
            return response.data;
        }
    })
}