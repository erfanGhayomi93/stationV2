import AXIOS from 'src/api/axiosInstance';
import { AppDispatch } from 'src/redux/store';
import { setAppState, setAppUser } from 'src/redux/slices/global';

// add plugins to dayjs globaly
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import { Apis, useApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import i18next from 'i18next';
dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
dayjs.extend(weekday)



export const fetchUser = async (dispatch: AppDispatch) => {
    try {
        const { data } = await AXIOS.get(Apis().User.GetUserInformation);
        dispatch(setAppUser({ userName: data?.result.userName, firstName: 'جواد', lastName: 'بینایی', customerISIN: "18990015846237", brokerCode: data?.result.brokerCode, mobile: "09355164207" }));
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


export const getResourceValue = (section: string, key: string) => {
    const resKey = `${section}.${key}`

    return i18next.exists(resKey) ? i18next.t(resKey) : null
}