import { useEffect, useState } from 'react';
import { useGlobalSettings, useGlobalSettingsMock } from 'src/app/queries/settings';
import { queryClient } from 'src/app/queryClient';

export const useApiPath = () => {
    const [apiRoutes, setApiRoutes] = useState<any | undefined>();
    // const { data } = useGlobalSettings<any>();
    const { data } = useGlobalSettingsMock();
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

export const baseUrl = 'https://gtapi-preprd.ramandtech.com';

export const Apis = () => ({
    OAuthApi: {
        authorization: getOauthUrl() + '/GTOAuthApi/v1/GTAuthorization',
        captcha: getOauthUrl() + '/Captcha/v1/create',
        twoFactor: getOauthUrl() + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: getOauthUrl() + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: baseUrl + `/Trader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: baseUrl + `/Time/v1/Get`,
    },
    Index: {
        Symbols: baseUrl + `/Index/v1/Symbols`,
    },
    Symbol: {
        Search: baseUrl + '/Symbol/v1/Search',
        SymbolGeneralInformation: baseUrl + '/Symbol/v1/SymbolGeneralInformation',
        SameSectorSymbols: baseUrl + '/Symbol/v1/GetSameSectorSymbolsBySymbolISIN',
    },
    Customer: {
        Search: baseUrl + '/Customer/v1/Search',
        GetCustomerInformation: baseUrl + '/Customer/v1/GetCustomerInformation',
        GetGroupInformation: baseUrl + '/Customer/v1/GetGroupInformation',
        MultiSearch: baseUrl + '/Customer/v1/MultipleSearch',
        MultiMultiSearch: baseUrl + '/Customer/v1/MultiMultipleSearch',
        GroupCustomerDetail: baseUrl + '/Customer/v1/GroupCustomerDetail',
        Get: baseUrl + '/Customer/v1/GetCustomers',
    },
    MarketDepth: {
        // Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
        Get: baseUrl + '/Symbol/v1/GetMarketDepthV2',
    },
    event: {
        get: baseUrl + '/Portfolio/v1/getEvent',
        getAttachment: baseUrl + '/Portfolio/v1/getAttachment',
    },
    Orders: {
        Create: baseUrl + '/Order/v1/Create',
        Get: baseUrl + '/Order/v1/TodayOrdersList',
        Delete: baseUrl + '/Order/v1/SingleDelete',
        Lists: baseUrl + '/Order/v1/OrdersList',
        GroupLists: baseUrl + '/Order/v1/GroupOrdersList',
        Modify: baseUrl + '/Order/v1/Modify',
        Trades: baseUrl + '/Order/v1/Trades',
        OfflineRequests: baseUrl + '/Order/v1/TradeRequests',
    },
    SupervisorMessage: {
        Get: baseUrl + `/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: baseUrl + `/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    Messages: {
        AdminMessage: getCommonUrl() + `/Message/v1/AdminMessage`,
    },
    draft: {
        Create: baseUrl + '/OrderDraft/v1/Create',
        Get: baseUrl + '/OrderDraft/v1/Get',
        Delete: baseUrl + '/OrderDraft/v1/Delete',
        Update: baseUrl + '/OrderDraft/v1/Update',
    },
    Basket: {
        Get: baseUrl + '/Cart/v1/CartList',
        Create: baseUrl + '/Cart/v1/CreateCart',
        Edit: baseUrl + '/Cart/v1/EditCart',
        Delete: baseUrl + '/Cart/v1/DeleteCart',
        CreateDetail: baseUrl + '/Cart/v1/CreateCartDetail',
        EditDetail: baseUrl + '/Cart/v1/EditCartDetail',
        GetDetail: baseUrl + '/Cart/v1/CartDetailList',
        DeleteDetails: baseUrl + '/Cart/v1/CartDetailDelete',
    },
    Commission: { Get: baseUrl + `/Commission/v1/GetBuyAndSellCommision` },
    WatchList: {
        Get: baseUrl + '/Watchlist/v1/WatchLists',
        Create: baseUrl + '/Watchlist/v1/Create',
        Delete: baseUrl + '/Watchlist/v1/Delete',
        Update: baseUrl + '/Watchlist/v1/Update',
        Sort: baseUrl + '/Watchlist/v1/Sort',
        // GetWatchlistSymbol: baseUrl + '/Watchlist/v1/GetWatchlistSymbols',
        GetWatchListSymbols: baseUrl + '/Watchlist/v1/GetWatchListSymbols',
        DeleteSymbol: baseUrl + '/Watchlist/v1/DeleteSymbol',
        AddSymbol: baseUrl + '/Watchlist/v1/AddSymbol',
        DefaultWatchlist: baseUrl + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: baseUrl + '/Watchlist/v1/GetDefaultWatchlistSymbols',
        GetSymbolInWatchlist: baseUrl + '/Watchlist/v1/GetSymbolInWatchlist',
        GetMarketSymbol: baseUrl + '/Symbol/v1/GetMarketSymbol',
        GetSector: baseUrl + '/Sector/v1/Sectors',
    },
    Portfolio: {
        CustomerPortfolio: baseUrl + '/Portfolio/v1/Portfolios',
    },
    Setting: {
        GetSetting: baseUrl + `/Setting/v1/GetSettings`,
    },
});
