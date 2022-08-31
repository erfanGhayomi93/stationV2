import AXIOS from 'src/api/axiosInstance';
import { GlobalActionEnum, GlobalDispatchType } from 'src/app/contexts/global';

// add plugins to dayjs globaly
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import relativeTime from 'dayjs/plugin/relativeTime';
import apiRoutes from 'src/api/apiRoutes';
dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
//

export const fetchUser = async (dispatch: GlobalDispatchType) => {
    try {
        const { data } = await AXIOS.get(apiRoutes.User.GetUserInformation);
        dispatch({ type: GlobalActionEnum.SET_APP_USER, payload: { userName: 'soheilkh', firstName: 'جواد', lastName: 'بینایی' } });
    } catch (error: any) {
        if (![401].includes(error?.response?.status)) dispatch({ type: GlobalActionEnum.SET_APP_STATE, payload: 'Crashed' });
    }

    setPrimaryLoadingState(false);
};

export const setPrimaryLoadingState = (loadingState: boolean) => {
    const loadingWrapper = document.getElementById('loading-wrapper') as HTMLElement;
    if (loadingState) loadingWrapper.classList.remove('hide');
    else loadingWrapper.classList.add('hide');
};
