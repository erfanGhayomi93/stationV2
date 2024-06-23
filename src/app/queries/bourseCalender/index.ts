import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getGetEvent = async (params: IGetEventParamsType , signal ?: AbortSignal) => {
    const { fromDate, toDate, watchlistId } = params;
    const { data } = await AXIOS.get<GlobalApiResponseType<GetEventType[]>>(Apis().event.get as string, {
        params: {
            fromDate,
            toDate,
            watchlistId: watchlistId !== 0 ? watchlistId : undefined,
        },
        signal
    });
    return data || [];
};

export const useGetEventQuery = (params: IGetEventParamsType) => {
    return useQuery(['getEventDayOnCalender' , params.watchlistId ?? 0], ({ signal }) => getGetEvent(params, signal));
};
