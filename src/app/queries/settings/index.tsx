import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppState } from 'src/redux/slices/global';

export const getGlobalSettings = async () => {
    // const { data } = await AXIOS.get<ISettingsType[]>('http://192.168.40.8:12000/Setting/v1/GTGetSettings');
    const { data } = await AXIOS.get<ISettingsType[]>('https://common.ramandtech.com/Setting/v1/GTGetSettings');

    // console.log({ data });
    return data || [];
};

//prettier-ignore
export const useGlobalSettings = <T=ISettingsType[],>(
    options?:
        | (Omit<UseQueryOptions<ISettingsType[], unknown, ISettingsType[], string[]>, 'initialData' | 'queryFn' | 'queryKey'> & {
              initialData?: (() => undefined) | undefined;
          })
        | undefined,
) => {
    const dispatch = useAppDispatch()
    return useQuery(['GetGlobalSettings'], getGlobalSettings, {
        onSuccess: (data) => {
            data.forEach(item=>{
                Object.defineProperty(window,item.name , {
                    value: item.value,
                    writable: false,
                });
            })
            dispatch(setAppState("Loading"));
        },
        ...options,
    });
};
