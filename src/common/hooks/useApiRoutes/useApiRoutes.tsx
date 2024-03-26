import { useEffect, useState } from 'react';
import { useGlobalSettings, useGlobalSettingsPreprd, useGlobalSettingsStage } from 'src/app/queries/settings';
import { queryClient } from 'src/app/queryClient';

export const useApiPath = () => {
    const [apiRoutes, setApiRoutes] = useState<any | undefined>();
    const { data } = useGlobalSettings();
    // const { data } = useGlobalSettingsStage();

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

const getBaseUrl = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    return data?.find((item) => item.name === 'REACT_APP_BASE_URL')?.value;
};

export const Apis = () => ({
    Aggrements: {
        Get: getBaseUrl() + '/Agreement/v1/Get',
    },

    OAuthApi: {
        authorization: getOauthUrl() + '/GTOAuthApi/v1/GTAuthorization',
        captcha: getOauthUrl() + '/Captcha/v1/create',
        twoFactor: getOauthUrl() + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: getOauthUrl() + '/GTOAuthApi/v1/Logout',

        forgetPasswordRequest: getOauthUrl() + '/GTForgetPassword/v1/Request',
        forgetPasswordValidation: getOauthUrl() + '/GTForgetPassword/v1/Validation',
        forgetPasswordChangePassword: getOauthUrl() + '/GTForgetPassword/v1/ChangePassword',

        changePasswordRequest: getOauthUrl() + '/GTChangePassword/v1/Request',
        changePasswordValidation: getOauthUrl() + '/GTChangePassword/v1/Validation',
        changePasswordSetPassword: getOauthUrl() + '/GTChangePassword/v1/ChangePassword',
    },
    User: {
        GetUserInformation: getBaseUrl() + `/Trader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: getBaseUrl() + `/Time/v1/Get`,
    },
    Index: {
        Symbols: getBaseUrl() + `/Index/v1/Symbols`,
    },
    Symbol: {
        Search: getBaseUrl() + '/Symbol/v1/Searchv2',
        SymbolGeneralInformation: getBaseUrl() + '/Symbol/v1/SymbolGeneralInformation',
        SameSectorSymbols: getBaseUrl() + '/Symbol/v1/GetSameSectorSymbolsBySymbolISIN',
        optionContract: getBaseUrl() + '/Symbol/v1/GetSameCompanyContractsOptionSymbolsBySymbolISIN',
        ChartData: getBaseUrl() + '/Symbol/v1/ChartData',
        GetMarketUnit: getBaseUrl() + '/Symbol/v1/GetMarketUnit',
    },
    Option: {
        SymbolInformation: getBaseUrl() + '/Option/v1/SymbolInformation',
        GetOpenPositions: getBaseUrl() + '/Option/v1/GetOpenPositions',
    },

    BuySellRequest: {
        GetOfflineRequests: getBaseUrl() + '/BuySellRequest/v1/GetOpenRequests',
        GetOfflineRequestsHistory: getBaseUrl() + '/BuySellRequest/v1/GetHistory',
        GetOfflineRequestsPaginated: getBaseUrl() + '/BuySellRequest/v1/GetRequests',
        GetOfflineRequestsPaginatedExcel: getBaseUrl() + '/BuySellRequest/v1/TradeRequestsExcel',
        GetOfflineRequestsExcel: getBaseUrl() + '/BuySellRequest/v1/GetOpenRequestsExcel',
        SendRequest: getBaseUrl() + '/BuySellRequest/v1/SendRequest'
    },

    Customer: {
        AdvancedSearch: getBaseUrl() + '/Customer/v1/AdvancedSearch',
        GroupAdvancedSearch: getBaseUrl() + '/Customer/v1/GroupAdvancedSearch',
        ToggleFavorite: getBaseUrl() + '/Customer/v1/ToggleFavorite',
        GetCustomers: getBaseUrl() + '/Customer/v1/GetCustomers',
        GetGroups: getBaseUrl() + '/Customer/v1/GetGroups',

        Search: getBaseUrl() + '/Customer/v1/Search',
        GetCustomerInformation: getBaseUrl() + '/Customer/v1/GetCustomerInformation',
        GetCustomerFinancial: getBaseUrl() + '/Customer/v1/GetCustomerFinancialInformation',
        GetGroupInformation: getBaseUrl() + '/Customer/v1/GetGroupInformation',
        // MultiSearch: getBaseUrl() + '/Customer/v1/MultipleSearch',
        MultiMultiSearch: getBaseUrl() + '/Customer/v1/MultiMultipleSearch',
        GroupCustomerDetail: getBaseUrl() + '/Customer/v1/GroupCustomerDetail',
        Get: getBaseUrl() + '/Customer/v1/GetCustomers',
        GetTurnOver: getBaseUrl() + '/Customer/v1/CustomerTurnOverGt',
    },
    MarketDepth: {
        // Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
        Get: getBaseUrl() + '/Symbol/v1/GetMarketDepthV2',
    },
    event: {
        get: getBaseUrl() + '/Portfolio/v1/getEvent',
        getAttachment: getBaseUrl() + '/Portfolio/v1/getAttachment',
    },
    Orders: {
        Create: getBaseUrl() + '/Order/v1/Create',
        CreateV2: getBaseUrl() + '/Order/v1/CreateV2',
        Get: getBaseUrl() + '/Order/v1/TodayOrdersList',
        Details: getBaseUrl() + '/Order/v1/GetOrderStateHistory',
        Delete: getBaseUrl() + '/Order/v1/SingleDelete',
        Lists: getBaseUrl() + '/Order/v1/OrdersList',
        OrderDetails: getBaseUrl() + '/Order/v1/OrdersListDetail',
        Excel: getBaseUrl() + '/Order/v1/OrdersListExcel',
        GroupLists: getBaseUrl() + '/Order/v1/GroupOrdersList',
        Modify: getBaseUrl() + '/Order/v1/Modify',
        ModifySingleTrade: getBaseUrl() + '/Order/v1/ModifySingleTrade',
        Trades: getBaseUrl() + '/Order/v1/Trades',
        TradesDetail: getBaseUrl() + '/Order/v1/GetTradeListDetails',
        TradesExcel: getBaseUrl() + '/Order/v1/TradesExcel',
        OfflineRequests: getBaseUrl() + '/Order/v1/TradeRequests',
        DeleteRequest: getBaseUrl() + '/Order/v1/DeleteRequest',
        OfflineRequestHistory: getBaseUrl() + '/Order/v1/TradeRequestHistory',
        TodayDoneTrades: getBaseUrl() + '/Order/v1/TodayDoneTrades',
        TodayDoneTradeDetails: getBaseUrl() + '/Order/v1/TodayDoneTradeDetails',
        GetSumPrice: getBaseUrl() + '/Order/v1/GetSumPrice',
    },
    SupervisorMessage: {
        Get: getBaseUrl() + `/Message/v1/TodaySupervisorMessage`,
        ReadPost: getBaseUrl() + `/Message/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    Messages: {
        AdminMessage: getBaseUrl() + `/Message/v1/AdminMessage`,
    },
    draft: {
        Create: getBaseUrl() + '/OrderDraft/v1/Create',
        Get: getBaseUrl() + '/OrderDraft/v1/Get',
        Delete: getBaseUrl() + '/OrderDraft/v1/Delete',
        Update: getBaseUrl() + '/OrderDraft/v1/Update',
    },
    Basket: {
        Get: getBaseUrl() + '/Cart/v1/CartList',
        Excel: getBaseUrl() + '/Cart/v1/GetCartDetailExcel',
        Create: getBaseUrl() + '/Cart/v1/CreateCart',
        Edit: getBaseUrl() + '/Cart/v1/EditCart',
        Delete: getBaseUrl() + '/Cart/v1/DeleteCart',
        CreateDetail: getBaseUrl() + '/Cart/v1/CreateCartDetail',
        EditDetail: getBaseUrl() + '/Cart/v1/EditCartDetail',
        GetDetail: getBaseUrl() + '/Cart/v1/CartDetailList',
        DeleteDetails: getBaseUrl() + '/Cart/v1/CartDetailDelete',
    },
    Commission: { Get: getBaseUrl() + `/Commission/v1/GetBuyAndSellCommision` },
    WatchList: {
        Get: getBaseUrl() + '/Watchlist/v1/WatchLists',
        Create: getBaseUrl() + '/Watchlist/v1/Create',
        Delete: getBaseUrl() + '/Watchlist/v1/Delete',
        Update: getBaseUrl() + '/Watchlist/v1/Update',
        Sort: getBaseUrl() + '/Watchlist/v1/Sort',
        // GetWatchlistSymbol: getBaseUrl() + '/Watchlist/v1/GetWatchlistSymbols',
        GetWatchListSymbols: getBaseUrl() + '/Watchlist/v1/GetWatchListSymbols',
        DeleteSymbol: getBaseUrl() + '/Watchlist/v1/DeleteSymbol',
        AddSymbol: getBaseUrl() + '/Watchlist/v1/AddSymbol',
        GetSpecialWatchlistFilter: getBaseUrl() + '/Watchlist/v1/GetSpecialWatchlistFilter',
        // GetDefaultWatchlistSymbols: getBaseUrl() + '/Watchlist/v1/GetDefaultWatchlistSymbols',
        GetSymbolInWatchlist: getBaseUrl() + '/Watchlist/v1/GetSymbolInWatchlist',
        GetMarketSymbol: getBaseUrl() + '/Symbol/v1/GetMarketSymbol',
        GetSector: getBaseUrl() + '/Symbol/v1/Sectors',
    },
    Portfolio: {
        CustomerPortfolio: getBaseUrl() + '/Portfolio/v1/Portfolios',
        CardexHistory: getBaseUrl() + '/Portfolio/v1/CardexHistory',
    },
    tvChart: {
        index: `${getBaseUrl()}/TV/v1`,
        config: `${getBaseUrl()}/TV/v1/config`,
        symbols: `${getBaseUrl()}/TV/v1/symbols`,
        search: `${getBaseUrl()}/TV/v1/search`,
        history: `${getBaseUrl()}/TV/v1/history`,
        marks: `${getBaseUrl()}/TV/v1/marks`,
        charts: `${getBaseUrl()}/TV/v1/1.1/charts`,
        studyTemplate: `${getBaseUrl()}/TV/v1/1.1/study_templates`,
        save: `${getBaseUrl()}/TV/v1/1.1/charts`,
        delete: `${getBaseUrl()}/TV/v1/1.1/charts`,
        loadOne: `${getBaseUrl()}/TV/v1/1.1/charts`,
        loadAll: `${getBaseUrl()}/TV/v1/1.1/charts`,
        historyRecent: `${getBaseUrl()}/Symbol/v1/GetSearchHistory`,
        deleteRecent: `${getBaseUrl()}/Symbol/v1/DeleteSearchHistory`,
    },
    Setting: {
        GetSetting: getBaseUrl() + `/Setting/v1/GetSettings`,
        GetPlatformSetting: getBaseUrl() + `/Setting/v1/GetPlatformSettings`,
        SavePlatformSetting: getBaseUrl() + `/Setting/v1/SavePlatformSettings`,
        GetUserSetting: getBaseUrl() + `/Setting/v1/GetUserSettings`,
        SessionLog: getBaseUrl() + `/Setting/v1/GetLogins`,
        TerminateSession: getBaseUrl() + `/Setting/v1/TerminateSession`,
        UpdateUserName: getBaseUrl() + `/Setting/v1/UpdateUserName`,
    },
    Options: {
        GetCashSettlement: getBaseUrl() + `/Option/v1/GetCashSettlement`,
        GetPhysicalSettlement: getBaseUrl() + `/Option/v1/GetPhysicalSettlements`,
        CreateCashSettlement: getBaseUrl() + `/Option/v1/new-cash`,
        UpdateCashSettlement: getBaseUrl() + `/Option/v1/edit-cash`,
        CreatePhysicalSettlement: getBaseUrl() + `/Option/v1/new-physical`,
        UpdatePhysicalSettlement: getBaseUrl() + `/Option/v1/edit-physical`,
        DeleteCashSettlement: getBaseUrl() + `/Option/v1/delete-cash`,
        DeletePhysicalSettlement: getBaseUrl() + `/Option/v1/delete-physical`,
    },
    Ipo: {
        GetBySymbolISIN: getBaseUrl() + `/IPO/v1/GetBySymbolISIN`,
        Get: getBaseUrl() + `/IPO/v1/Get`,
    },
});

// const getPortfolioUrl = () => {
//     const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
//     return data?.find((item) => item.name === 'REACT_APP_PORTFOLIO_PATH')?.value;
// };
//
// const getMarketData = () => {
//     const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
//     return data?.find((item) => item.name === 'REACT_APP_MARKETDATA_PATH')?.value;
// };
//
// const getBackOffice = () => {
//     const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
//     return data?.find((item) => item.name === 'REACT_APP_BACKOFFICE_PATH')?.value;
// };
//
// const getOrderUrl = () => {
//     const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
//     return data?.find((item) => item.name === 'REACT_APP_ORDER_PATH')?.value;
// };
// const getCommonUrl = () => {
//     const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
//     return data?.find((item) => item.name === 'REACT_APP_COMMON_PATH')?.value;
// };

// export const getBaseUrl() = 'https://gtapi-preprd.ramandtech.com';

//
// const CommonUrl = 'http://192.168.40.8:12000';
// const PortfolioUrl = 'http://192.168.40.8:11000';
// const MarketData = 'http://192.168.40.8:7000';
// const BackOffice = 'http://192.168.40.8:9500';
// const OrderUrl = 'http://192.168.40.8:8500';
// const OauthUrl = 'http://192.168.40.8:5011';

// const OrderUrl = getBaseUrl(); // "http://192.168.40.8:8500";
// const PortfolioUrl = getBaseUrl(); // "http://192.168.40.8:11000";
// const OauthUrl = getBaseUrl(); // "http://192.168.40.8:5011";
// const CommonUrl = getBaseUrl(); // "http://192.168.40.8:12000";
// const BackOffice = getBaseUrl(); // "http://192.168.40.8:9500";
// const MarketData = getBaseUrl(); // "http://192.168.40.8:7000";

// const ResourceUrl = window.REACT_APP_RESOURCE_PATH; // "http://192.168.40.8:5002";
// const AccountUrl = window.REACT_APP_ACCOUNT_PATH; // "http://192.168.40.8:5020";
// const PushEngine = window.REACT_APP_PUSHENGINE_PATH; // "http://192.168.40.8:5800";
// const ClubUrl = window.REACT_APP_CLUB_PATH; //http://192.168.40.8:19000;
