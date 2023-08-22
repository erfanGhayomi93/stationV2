//
// const CommonUrl = 'http://192.168.40.8:12000';
// const PortfolioUrl = 'http://192.168.40.8:11000';
// const MarketData = 'http://192.168.40.8:7000';
// const BackOffice = 'http://192.168.40.8:9500';
// const OrderUrl = 'http://192.168.40.8:8500';
// const OauthUrl = 'http://192.168.40.8:5011';

// const OrderUrl = baseUrl; // "http://192.168.40.8:8500";
// const PortfolioUrl = baseUrl; // "http://192.168.40.8:11000";
// const OauthUrl = baseUrl; // "http://192.168.40.8:5011";
// const CommonUrl = baseUrl; // "http://192.168.40.8:12000";
// const BackOffice = baseUrl; // "http://192.168.40.8:9500";
// const MarketData = baseUrl; // "http://192.168.40.8:7000";

// const ResourceUrl = window.REACT_APP_RESOURCE_PATH; // "http://192.168.40.8:5002";
// const AccountUrl = window.REACT_APP_ACCOUNT_PATH; // "http://192.168.40.8:5020";
// const PushEngine = window.REACT_APP_PUSHENGINE_PATH; // "http://192.168.40.8:5800";
// const ClubUrl = window.REACT_APP_CLUB_PATH; //http://192.168.40.8:19000;

const baseUrl = "172.30.14.14:5199"

const apiRoutes = {
    OAuthApi: {
        authorization: baseUrl + '/GTOAuthApi/v1/GTAuthorization',
        captcha: baseUrl + '/Captcha/v1/create',
        twoFactor: baseUrl + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: baseUrl + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: `${baseUrl}/GTTrader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: `${baseUrl}/Time/v1/Get`,
    },
    Index: {
        Symbols: `${baseUrl}/Index/v1/Symbols`,
    },
    Symbol: {
        Search: baseUrl + '/GTSymbol/v1/Search',
        SymbolGeneralInformation: baseUrl + '/GTSymbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: baseUrl + '/GtCustomer/v1/Search',
        GetCustomerInformation: baseUrl + '/GtCustomer/v1/GetCustomerInformation',
        GetGroupInformation: baseUrl + '/GtCustomer/v1/GetGroupInformation',
        MultiSearch: baseUrl + '/GTCustomer/v1/MultipleSerach',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    OrderUrl: {
        Create: baseUrl + '/GTOrder/v1/Create',
        Get: baseUrl + '/GTOrder/v1/GTTodayOrdersList',
        Delete: baseUrl + '/GTOrder/v1/SingleDelete',
        Trades: baseUrl + '/GTOrder/v1/Trades',
    },
    SupervisorMessage: {
        Get: `${baseUrl}/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: `${baseUrl}/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    draft: {
        Create: baseUrl + '/GTOrderDraft/v1/Create',
        Get: baseUrl + '/GTOrderDraft/v1/Get',
        Delete: baseUrl + '/GTOrderDraft/v1/Delete',
    },
    Basket: {
        Get: baseUrl + '/GTCart/v1/CartList',
        Create: baseUrl + '/GTCart/v1/CreateCart',
        Edit: baseUrl + '/GTCart/v1/EditCart',
        Delete: baseUrl + '/GTCart/v1/DeleteCart',
        CreateDetail: baseUrl + '/GTCart/v1/CreateCartDetail',
        GetDetail: baseUrl + '/GTCart/v1/CartDetailList',
        DeleteDetails: baseUrl + '/GTCart/v1/CartDetailDelete',
    },
    Commission: { Get: `${baseUrl}/Commission/v1/GetBuyAndSellCommision` },
    WatchList: {
        Get: baseUrl + '/GTWatchlist/v1/Watchlists',
        Create: baseUrl + '/GTWatchlist/v1/Create',
        Delete: baseUrl + '/GTWatchlist/v1/Delete',
        Update: baseUrl + '/GTWatchlist/v1/Update',
        GetWatchlistSymbol: baseUrl + '/GTWatchlist/v1/GetWatchlistSymbols',
        DeleteSymbol: baseUrl + '/GTWatchlist/v1/DeleteSymbol',
        AddSymbol: baseUrl + '/GTWatchlist/v1/AddSymbol',
        DefaultWatchlist: baseUrl + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: baseUrl + '/Watchlist/v1/GetDefaultWatchlistSymbols',
    },
    Portfolio: {
        CustomerPortfolio: baseUrl + '/GTPortfolio/v1/GTPortfolios'
    },
    Setting: {
        GetSetting: `${baseUrl}/Setting/v1/GTGetSettings`,
    },
    tvChart : {
        index : `${baseUrl}/TV/v1` ,
        config : `${baseUrl}/TV/v1/config` ,
        symbols : `${baseUrl}/TV/v1/symbols` ,
        search : `${baseUrl}/TV/v1/search` ,
        history : `${baseUrl}/TV/v1/history` ,
        marks : `${baseUrl}/TV/v1/marks` ,
        charts : `${baseUrl}/TV/v1/1.1/charts` ,
        studyTemplate : `${baseUrl}/TV/v1/1.1/study_templates` ,
        save : `${baseUrl}/TV/v1/1.1/charts` ,
        delete : `${baseUrl}/TV/v1/1.1/charts` ,
        loadOne : `${baseUrl}/TV/v1/1.1/charts` ,
        loadAll : `${baseUrl}/TV/v1/1.1/charts` ,
    }

};

export default apiRoutes;
