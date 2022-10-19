import { useEffect, useState } from 'react';
import { getGlobalSettings, useGlobalSettings } from 'src/app/queries/settings';
import { queryClient } from 'src/app/queryClient';

export const useApiPath = () => {
    const [apiRoutes, setApiRoutes] = useState<any | undefined>();
    const { data } = useGlobalSettings<any>();
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

export const Apis = () => ({
    OAuthApi: {
        authorization: getOauthUrl() + '/GTOAuthApi/v1/GTAuthorization',
        captcha: getOauthUrl() + '/Captcha/v1/create',
        twoFactor: getOauthUrl() + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: getOauthUrl() + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: getCommonUrl() + `/GTTrader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: getCommonUrl() + `/Time/v1/Get`,
    },
    Index: {
        Symbols: getMarketData() + `/Index/v1/Symbols`,
    },
    Symbol: {
        Search: getCommonUrl() + '/GTSymbol/v1/Search',
        SymbolGeneralInformation: getMarketData() + '/GTSymbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: getBackOffice() + '/GtCustomer/v1/Search',
        GetCustomerInformation: getBackOffice() + '/GtCustomer/v1/GetCustomerInformation',
        GetGroupInformation: getBackOffice() + '/GtCustomer/v1/GetGroupInformation',
        MultiSearch: getBackOffice() + '/GTCustomer/v1/MultipleSerach',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    Orders: {
        Create: getOrderUrl() + '/GTOrder/v1/Create',
        Get: getOrderUrl() + '/GTOrder/v1/GTTodayOrdersList',
        Delete: getOrderUrl() + '/GTOrder/v1/SingleDelete',
        Lists: getOrderUrl() + '/GTOrder/v1/GTOrdersList',
        GroupLists: getOrderUrl() + '/GTOrder/v1/GTGroupOrdersList',
    },
    SupervisorMessage: {
        Get: getMarketData() + `/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: getMarketData() + `/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    draft: {
        Create: getOrderUrl() + '/GTOrderDraft/v1/Create',
        Get: getOrderUrl() + '/GTOrderDraft/v1/Get',
        Delete: getOrderUrl() + '/GTOrderDraft/v1/Delete',
    },
    Basket: {
        Get: getOrderUrl() + '/GTCart/v1/CartList',
        Create: getOrderUrl() + '/GTCart/v1/CreateCart',
        Edit: getOrderUrl() + '/GTCart/v1/EditCart',
        Delete: getOrderUrl() + '/GTCart/v1/DeleteCart',
        CreateDetail: getOrderUrl() + '/GTCart/v1/CreateCartDetail',
        GetDetail: getOrderUrl() + '/GTCart/v1/CartDetailList',
        DeleteDetails: getOrderUrl() + '/GTCart/v1/CartDetailDelete',
    },
    Commission: { Get: getCommonUrl() + `/Commission/v1/Get` },
    WatchList: {
        Get: getPortfolioUrl() + '/GTWatchlist/v1/Watchlists',
        Create: getPortfolioUrl() + '/GTWatchlist/v1/Create',
        Delete: getPortfolioUrl() + '/GTWatchlist/v1/Delete',
        Update: getPortfolioUrl() + '/GTWatchlist/v1/Update',
        GetWatchlistSymbol: getPortfolioUrl() + '/GTWatchlist/v1/GetWatchlistSymbols',
        DeleteSymbol: getPortfolioUrl() + '/GTWatchlist/v1/DeleteSymbol',
        AddSymbol: getPortfolioUrl() + '/GTWatchlist/v1/AddSymbol',
        DefaultWatchlist: getPortfolioUrl() + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: getPortfolioUrl() + '/Watchlist/v1/GetDefaultWatchlistSymbols',
        GetSymbolInWatchlist : getPortfolioUrl() + '/GtWatchlist/v1/GetSymbolInWatchlist',
    },
    Setting: {
        GetSetting: getCommonUrl() + `/Setting/v1/GTGetSettings`,
    },
});
