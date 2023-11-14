import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
// import { baseUrl } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppState } from 'src/redux/slices/global';
const getGlobalSettings = async () => {
    // const { data } = await AXIOS.get<ISettingsType[]>('https://common.ramandtech.com/Setting/v1/GTGetSettings');
    const { data } = await AXIOS.get<ISettingsType[]>('https://wtapi-preprd.ramandtech.com' + '/Setting/v1/GetSettings');

    console.log({ data });
    return data || [];
};

//prettier-ignore
export const useGlobalSettings = (
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




const getGlobalSettingsPreprd = async () => {
    const { data } = await preprdMock
    return data || [];
};

export const useGlobalSettingsPreprd = (options?: any) => {
    console.log("1111111111111111")
    const dispatch = useAppDispatch()
    return useQuery(['GetGlobalSettings'], getGlobalSettingsPreprd, {
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

const preprdMock = {
    data: [
        {
            "name": "REACT_APP_BROKER_CODE",
            "value": "347"
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
            "name": "REACT_APP_BASE_URL",
            "value": "https://wtapi-preprd.ramandtech.com"
        },
        {
            "name": "REACT_APP_OAUTH_PATH",
            "value": "https://oauth-preprd.ramandtech.com"
        },
        {
            "name": "REACT_APP_RESOURCE_PATH",
            "value": "https://resource-preprd.ramandtech.com"
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
            "value": "https://resource-preprd.ramandtech.com/ResourceJS"
        },
        {
            "name": "REACT_APP_RES_NAME",
            "value": "GOTStation"
        }
    ]
}

const getGlobalSettingsStage = async () => {
    const { data } = await stageMock
    return data || [];
};

export const useGlobalSettingsStage = (options?: any) => {
    const dispatch = useAppDispatch()
    return useQuery(['GetGlobalSettings'], getGlobalSettingsStage, {
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



const stageMock = {
    data: [
        {
            "name": "REACT_APP_BROKER_CODE",
            "value": "347"
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
            "name": "REACT_APP_BASE_URL",
            "value": "https://wtapi-stage.ramandtech.com"
        },
        {
            "name": "REACT_APP_OAUTH_PATH",
            "value": "https://oauth-stage.ramandtech.com"
        },
        {
            "name": "REACT_APP_RESOURCE_PATH",
            "value": "https://resource.ramandtech.com"
        },
        {
            "name": "REACT_APP_ENV",
            "value": "Stage"
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