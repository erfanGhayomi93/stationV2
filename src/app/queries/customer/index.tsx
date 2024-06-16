import { InfiniteData, useInfiniteQuery, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { stringify } from 'querystring';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

// advance search for get list of customer

const getAdvancedSearch = async (params: IGoCustomerRequestType, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.AdvancedSearch as string, {
        params: { ...params, type: params.type?.join() },
        signal
    });
    return data.result || [];
};


export const useAdvancedSearchQuery = (
    params: IGoCustomerRequestType,
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, IGoMultiCustomerType[], string[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['advancedSearchCustomer', params.term ? params.term : ""], ({ signal }) => getAdvancedSearch(params, signal), {
        enabled: !!params.term,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};
//

// /advance group search for get list group of customer

const getGroupSearch = async (params: IGoCustomerRequestType, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.GroupAdvancedSearch as string, {
        params: { ...params, type: params.type?.join() },
        signal
    });
    return data.result || [];
};


export const useGroupCustomer = (
    params: IGoCustomerRequestType,
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, IGoMultiCustomerType[], string[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['advancedSearchGroup', params.term ? params.term : ""], ({ signal }) => getGroupSearch(params, signal), {
        enabled: !!params.term && params.term.length > 2,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};
//

// /get group default for get list group of customer

const getGroupDefault = async (signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.GetGroups, {
        signal
    });
    return data.result || [];
};


export const useGroupDefault = (
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, IGoMultiCustomerType[], string[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['getGroupDefault',], ({ signal }) => getGroupDefault(signal), {
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};
//


const getMyGroupSearch = async (params: IGoCustomerRequestType, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IUpdateMyGroup[]>>(Apis().Customer.SearchCustomerMyGroup, {
        params: { ...params, type: params.type?.join() },
        signal
    });
    return data.result || [];
};


export const useMyGroupSearchCustomer = (
    params: IGoCustomerRequestType,
    options?: UseQueryOptions<IUpdateMyGroup[], Error, IUpdateMyGroup[], string[]>,
) => {
    return useQuery(['SearchCustomerGroup', params.term ? params.term : ""], ({ signal }) => getMyGroupSearch(params, signal), {
        enabled: !!params.term && params.term.length > 2,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};



const getMyGroup = async (signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IUpdateMyGroup[]>>(Apis().Customer.GetMyGroups, {
        signal
    });
    return data.result || [];
};


export const useMyGroup = (
    options?: UseQueryOptions<IUpdateMyGroup[], Error, IUpdateMyGroup[], string[]>,
) => {
    return useQuery(['getMyGroup'], ({ signal }) => getMyGroup(signal), {
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};




const updateMyGroupFn = async (params: IUpdateMyGroup) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Customer.UpdateMyGroup, params);
    return data?.result;
};


export const updateMyGroupMutation = (options?: UseMutationOptions<boolean, Error, IUpdateMyGroup>) => useMutation(updateMyGroupFn, options);





const deleteMyGroupFn = async (groupId: number) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Customer.DeleteMyGroup, { groupId });
    return data?.result;
};


export const deleteMyGroupMutation = (options?: UseMutationOptions<boolean, Error, number>) => useMutation(deleteMyGroupFn, options);


const getCreateMyGroup = async (params: ICreateMyGroup) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Customer.CreateMyGroups, params);
    return data.result || [];
};

export const useMutationCreateMyGroup = (
    options?: Omit<UseMutationOptions<boolean | never[], unknown, ICreateMyGroup, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(getCreateMyGroup, options);
};




const AddCustomerToMyGroupFn = async (params: IAddCustomerToMyGroup) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Customer.AddCustomerToMyGroup, params);
    return data?.result;
};


export const AddCustomerToMyGroupMutation = (options?: UseMutationOptions<number, Error, IAddCustomerToMyGroup>) => useMutation(AddCustomerToMyGroupFn, options);

const removeCustomerToMyGroupFn = async (params: IAddCustomerToMyGroup) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().Customer.RemoveCustomersFromMyGroup, params);
    return data?.result;
};


export const removeCustomerToMyGroupMutation = (options?: UseMutationOptions<number, Error, IAddCustomerToMyGroup>) => useMutation(removeCustomerToMyGroupFn, options);



//

//searchCustomer

const searchCustomer = async (params: IGoCustomerRequest) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoCustomerResult>>(Apis().Customer.Search, { params });

    return data.result || [];
};

export const useCustomerListInfinit = (
    params: IGoCustomerRequest,
    options?: {
        select?: (data: InfiniteData<IGoCustomerResult>) => InfiniteData<IGoCustomerResult>;
        onSuccess?: (data: InfiniteData<IGoCustomerResult>) => void;
    },
) => {
    return useInfiniteQuery(
        ['searchCustomer', params],
        ({ queryKey, pageParam = 1 }) => searchCustomer(params),
        {
            enabled: !!params,
            getNextPageParam: (data) => (data.searchResult.hasNextPage ? data.searchResult.pageNumber + 1 : undefined),
            ...options,
        },
    );
};


//get Customer
const getCustomer = async (params: IReqestCustomer, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.GetCustomers, {
        signal,
        params
    });
    return data.result || [];
};


export const useGetCustomers = (
    params: IReqestCustomer,
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, IGoMultiCustomerType[], (string | IGoCustomerRequestType)[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['getDefaultCustomer', params.IsFavorite ? 'favorite' : 'default'], ({ signal }) => getCustomer(params, signal), options);
};
//





const searchMultiMultiCustomer = async ({ CustomerISINs }: stateCustomer) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.MultiMultiSearch as string, {
        params: {
            CustomerISINs
            // CustomerTagTitles, GtTraderGroupId
        },
        paramsSerializer: (params) => {
            return stringify(params);
        },
    });
    return data.result || [];
};

const getToggleFavorite = async ({ customerIsin, isFavorite }: IToggleFavorite) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().Customer.ToggleFavorite as string, {}, {
        params: { customerIsin, isFavorite },
        // paramsSerializer: (params) => {
        //     return stringify(params);
        // },
    });
    return data.result || [];
};

export const useMutationMultiMultiCustomer = (
    options: Omit<UseMutationOptions<IGoMultiCustomerType[], unknown, stateCustomer, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(searchMultiMultiCustomer, options);
};

export const useMutationToggleFavorite = (
    options?: Omit<UseMutationOptions<boolean | never[], unknown, IToggleFavorite, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(getToggleFavorite, options);
};





const GetCustomerInformation = async (params: IGetCustomerInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ICustomerInformationResultType>>(Apis().Customer.GetCustomerInformation as string, {
        params,
    });
    return data.result || [];
};

export const useCustomerInformation = (param: IGetCustomerInformationRequestType) => {
    return useQuery(['getCustomerInformation', param], ({ queryKey }) => GetCustomerInformation(queryKey[1] as IGetCustomerInformationRequestType), {
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled: !!param.customerISIN,
    });
};

const getCustomerFinancialInformation = async (CustomerISIN: string) => {
    const { data } = await AXIOS.get<ICustomerFinancialResponse>(Apis().Customer.GetCustomerFinancial, { params: { CustomerISIN } });
    return data.result;
};

export const useCustomerFinancialInformation = (CustomerISIN?: string) =>
    useQuery([Apis().Customer.GetCustomerFinancial, CustomerISIN], ({ queryKey }) => getCustomerFinancialInformation(queryKey[1] as string), {
        enabled: !!CustomerISIN,
    });

const getCustomerTurnOver = async (params: IGetCustomerTurnOverRequestType) => {
    const { data } = await AXIOS.get<IGetCustomerTurnOverResponse>(Apis().Customer.GetTurnOver, { params });
    return data;
};

export const useGetCustomerTurnOver = (params: IGetCustomerTurnOverRequestType, options?: UseQueryOptions<IGetCustomerTurnOverResponse>) =>
    useQuery<IGetCustomerTurnOverResponse>([Apis().Customer.GetTurnOver], () => getCustomerTurnOver(params), { ...options });
