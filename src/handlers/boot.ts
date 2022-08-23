import AXIOS from 'src/api/axiosInstance';
import { AppActionEnum, AppDispatchType } from 'src/contexts/app';

// add plugins to dayjs globaly
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import relativeTime from 'dayjs/plugin/relativeTime';
import apiRoutes from 'src/api/apiRoutes';
dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
//

export const fetchUser = async (dispatch: AppDispatchType) => {
    try {
        const { data } = await AXIOS.get(apiRoutes.User.Info);
        dispatch({ type: AppActionEnum.SET_APP_USER, payload: data?.result || {} });
    } catch (error: any) {
        if (![401].includes(error?.response?.status)) dispatch({ type: AppActionEnum.SET_APP_STATE, payload: 'Crashed' });
    }

    setPrimaryLoadingState(false);
};

export const setPrimaryLoadingState = (loadingState: boolean) => {
    const loadingWrapper = document.getElementById('loading-wrapper') as HTMLElement;
    if (loadingState) loadingWrapper.classList.remove('hide');
    else loadingWrapper.classList.add('hide');
};
