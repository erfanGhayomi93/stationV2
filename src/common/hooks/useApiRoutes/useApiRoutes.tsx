import { useEffect, useState } from 'react';
import { useGlobalSettings, useGlobalSettingsMock } from 'src/app/queries/settings';
import { queryClient } from 'src/app/queryClient';

export const useApiPath = () => {
    const [apiRoutes, setApiRoutes] = useState<any | undefined>();
    const { data } = useGlobalSettings<any>();
    // const { data } = useGlobalSettingsMock();
    useEffect(() => {
        const routes = Apis();
        setApiRoutes(routes);
    }, [data]);

    return { apiRoutes };
};

const getOauthUrl = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_OAUTH_PATH')?.value;
};

const getPortfolioUrl = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_PORTFOLIO_PATH')?.value;
};

const getMarketData = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_MARKETDATA_PATH')?.value;
};

const getBackOffice = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_BACKOFFICE_PATH')?.value;
};

const getOrderUrl = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_ORDER_PATH')?.value;
};
const getCommonUrl = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_COMMON_PATH')?.value;
};

const baseUrl = "http://172.30.14.14:5199"

export const Apis = () => ({
    OAuthApi: {
        authorization: baseUrl + '/GTOAuthApi/v1/GTAuthorization',
        captcha: baseUrl + '/Captcha/v1/create',
        twoFactor: baseUrl + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: baseUrl + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: baseUrl + `/GTTrader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: baseUrl + `/Time/v1/Get`,
    },
    Index: {
        Symbols: baseUrl + `/Index/v1/Symbols`,
    },
    Symbol: {
        Search: baseUrl + '/GTSymbol/v1/Search',
        SymbolGeneralInformation: baseUrl + '/GTSymbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: baseUrl + '/GtCustomer/v1/Search',
        GetCustomerInformation: baseUrl + '/GtCustomer/v1/GetCustomerInformation',
        GetGroupInformation: baseUrl + '/GtCustomer/v1/GetGroupInformation',
        MultiSearch: baseUrl + '/GTCustomer/v1/MultipleSearch',
        MultiMultiSearch: baseUrl + '/GTCustomer/v1/MultiMultipleSearch',
        GroupCustomerDetail: baseUrl + '/GTCustomer/v1/GroupCustomerDetail',
        Get: baseUrl + '/GTCustomer/v1/GetCustomers',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    Orders: {
        Create: baseUrl + '/GTOrder/v1/Create',
        Get: baseUrl + '/GTOrder/v1/GTTodayOrdersList',
        Delete: baseUrl + '/GTOrder/v1/SingleDelete',
        Lists: baseUrl + '/GTOrder/v1/GTOrdersList',
        GroupLists: baseUrl + '/GTOrder/v1/GTGroupOrdersList',
        Modify: baseUrl + '/GTOrder/v1/Modify',
        Trades: baseUrl + '/GTOrder/v1/Trades',
    },
    SupervisorMessage: {
        Get: baseUrl + `/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: baseUrl + `/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    draft: {
        Create: baseUrl + '/GTOrderDraft/v1/Create',
        Get: baseUrl + '/GTOrderDraft/v1/Get',
        Delete: baseUrl + '/GTOrderDraft/v1/Delete',
        Update: baseUrl + '/GTOrderDraft/v1/Update',
    },
    Basket: {
        Get: baseUrl + '/GTCart/v1/CartList',
        Create: baseUrl + '/GTCart/v1/CreateCart',
        Edit: baseUrl + '/GTCart/v1/EditCart',
        Delete: baseUrl + '/GTCart/v1/DeleteCart',
        CreateDetail: baseUrl + '/GTCart/v1/CreateCartDetail',
        EditDetail: baseUrl + '/GTCart/v1/EditCartDetail',
        GetDetail: baseUrl + '/GTCart/v1/CartDetailList',
        DeleteDetails: baseUrl + '/GTCart/v1/CartDetailDelete',
    },
    Commission: { Get: baseUrl + `/GTCommission/v1/GetBuyAndSellCommision` },
    WatchList: {
        Get: baseUrl + '/GTWatchlist/v1/WatchLists',
        Create: baseUrl + '/GTWatchlist/v1/Create',
        Delete: baseUrl + '/GTWatchlist/v1/Delete',
        Update: baseUrl + '/GTWatchlist/v1/Update',
        Sort: baseUrl + '/GTWatchlist/v1/Sort',
        // GetWatchlistSymbol: baseUrl + '/GTWatchlist/v1/GetWatchlistSymbols',
        GetWatchListSymbols: baseUrl + '/GtWatchlist/v1/GetWatchListSymbols',
        DeleteSymbol: baseUrl + '/GTWatchlist/v1/DeleteSymbol',
        AddSymbol: baseUrl + '/GTWatchlist/v1/AddSymbol',
        DefaultWatchlist: baseUrl + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: baseUrl + '/Watchlist/v1/GetDefaultWatchlistSymbols',
        GetSymbolInWatchlist: baseUrl + '/GtWatchlist/v1/GetSymbolInWatchlist',
        GetMarketSymbol: baseUrl + '/Symbol/v1/GetMarketSymbol',
        GetSector: baseUrl + '/Sector/v1/Sectors',
    },
    Portfolio: {
        CustomerPortfolio: baseUrl + '/GTPortfolio/v1/GTPortfolios'
    },
    Setting: {
        GetSetting: baseUrl + `/Setting/v1/GTGetSettings`,
    },
});
