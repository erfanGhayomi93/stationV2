import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getGetEvent = async (params: IGetEventParamsType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<GetEventType[]>>(Apis().event.get as string , {
        params
    });
    return data || [];
};

export const useGetEventQuery = (params: IGetEventParamsType) => {
    return useQuery(['getEventDayOnCalender'], () => getGetEvent(params));
};
