import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppState } from 'src/redux/slices/global';

export const getGlobalSettings = async () => {
    // const { data } = await AXIOS.get<ISettingsType[]>('http://192.168.40.8:12000/Setting/v1/GTGetSettings');
    const { data } = await AXIOS.get<ISettingsType[]>('https://common.ramandtech.com/Setting/v1/GTGetSettings');

    console.log({ data });
    return data || [];
};

//prettier-ignore
export const useGlobalSettings = <T = ISettingsType[],>(
    options?:
        | (Omit<UseQueryOptions<ISettingsType[], unknown, ISettingsType[], string[]>, 'initialData' | 'queryFn' | 'queryKey'> & {
            initialData?: (() => undefined) | undefined;
        })
        | undefined,
) => {
    const dispatch = useAppDispatch()
    return useQuery(['GetGlobalSettings'], getGlobalSettings, {
        onSuccess: (data) => {
            data.forEach(item => {
                Object.defineProperty(window, item.name, {
                    value: item.value,
                    writable: false,
                });
            })
            dispatch(setAppState("Loading"));
        },
        ...options,
    });
};




export const getGlobalSettingsMock = async () => {
    const { data } = await productionMock
    return data || [];
};

export const useGlobalSettingsMock = (options?: any) => {
    const dispatch = useAppDispatch()
    return useQuery(['GetGlobalSettings'], getGlobalSettingsMock, {
        onSuccess: (data) => {
            data.forEach(item => {
                Object.defineProperty(window, item.name, {
                    value: item.value,
                    writable: false,
                });
            })
            dispatch(setAppState("Loading"));
        },
        ...options,
    });
};


const productionMock = {
    data: [
        {
            "name": "REACT_APP_BROKER_CODE",
            "value": "189"
        },
        {
            "name": "REACT_APP_PUSHENGINE_PATH",
            "value": "https://pushengine.ramandtech.com"
        },
        {
            "name": "REACT_APP_PUSHENGINE_PORT",
            "value": "443"
        },
        {
            "name": "REACT_APP_PORTFOLIO_PATH",
            "value": "https://portfolio.ramandtech.com"
        },
        {
            "name": "REACT_APP_OAUTH_PATH",
            "value": "https://oauth.ramandtech.com"
        },
        {
            "name": "REACT_APP_COMMON_PATH",
            "value": "https://common.ramandtech.com"
        },
        {
            "name": "REACT_APP_BACKOFFICE_PATH",
            "value": "https://backoffice.ramandtech.com"
        },
        {
            "name": "REACT_APP_MARKETDATA_PATH",
            "value": "https://marketdata.ramandtech.com"
        },
        {
            "name": "REACT_APP_ORDER_PATH",
            "value": "https://order.ramandtech.com"
        },
        {
            "name": "REACT_APP_RESOURCE_PATH",
            "value": "https://resource.ramandtech.com"
        },
        {
            "name": "REACT_APP_ENV",
            "value": "production"
        },
        {
            "name": "REACT_APP_LANG",
            "value": "Fa"
        },
        {
            "name": "REACT_APP_RES_PATH",
            "value": "https://resource.ramandtech.com/ResourceJS"
        },
        {
            "name": "REACT_APP_RES_NAME",
            "value": "GOTStation"
        }
    ]
}