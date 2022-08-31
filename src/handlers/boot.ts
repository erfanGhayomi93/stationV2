import AXIOS from 'src/api/axiosInstance';
import { AppDispatch } from 'src/redux/store';
import apiRoutes from 'src/api/apiRoutes';
import { setAppState, setAppUser } from 'src/redux/slices/global';

// add plugins to dayjs globaly
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
//

export const fetchUser = async (dispatch: AppDispatch) => {
    try {
        const { data } = await AXIOS.get(apiRoutes.User.GetUserInformation);
        dispatch(setAppUser({ userName: 'soheilkh', firstName: 'جواد', lastName: 'بینایی' }));
    } catch (error: any) {
        if (![401].includes(error?.response?.status)) dispatch(setAppState('Crashed'));
    }

    setPrimaryLoadingState(false);
};

export const setPrimaryLoadingState = (loadingState: boolean) => {
    const loadingWrapper = document.getElementById('loading-wrapper') as HTMLElement;
    if (loadingState) loadingWrapper.classList.remove('hide');
    else loadingWrapper.classList.add('hide');
};
