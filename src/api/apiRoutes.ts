//
// const CommonUrl = 'http://192.168.40.8:12000';
// const PortfolioUrl = 'http://192.168.40.8:11000';
// const MarketData = 'http://192.168.40.8:7000';
// const BackOffice = 'http://192.168.40.8:9500';
// const OrderUrl = 'http://192.168.40.8:8500';
// const OauthUrl = 'http://192.168.40.8:5011';

// const OrderUrl = window.REACT_APP_ORDER_PATH; // "http://192.168.40.8:8500";
// const PortfolioUrl = window.REACT_APP_PORTFOLIO_PATH; // "http://192.168.40.8:11000";
// const OauthUrl = window.REACT_APP_OAUTH_PATH; // "http://192.168.40.8:5011";
// const CommonUrl = window.REACT_APP_COMMON_PATH; // "http://192.168.40.8:12000";
// const BackOffice = window.REACT_APP_BACKOFFICE_PATH; // "http://192.168.40.8:9500";
// const MarketData = window.REACT_APP_MARKETDATA_PATH; // "http://192.168.40.8:7000";

// const ResourceUrl = window.REACT_APP_RESOURCE_PATH; // "http://192.168.40.8:5002";
// const AccountUrl = window.REACT_APP_ACCOUNT_PATH; // "http://192.168.40.8:5020";
// const PushEngine = window.REACT_APP_PUSHENGINE_PATH; // "http://192.168.40.8:5800";
// const ClubUrl = window.REACT_APP_CLUB_PATH; //http://192.168.40.8:19000;
const apiRoutes = {
    OAuthApi: {
        authorization: window.REACT_APP_OAUTH_PATH + '/GTOAuthApi/v1/GTAuthorization',
        captcha: window.REACT_APP_OAUTH_PATH + '/Captcha/v1/create',
        twoFactor: window.REACT_APP_OAUTH_PATH + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: window.REACT_APP_OAUTH_PATH + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: `${window.REACT_APP_COMMON_PATH}/GTTrader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: `${window.REACT_APP_COMMON_PATH}/Time/v1/Get`,
    },
    Index: {
        Symbols: `${window.REACT_APP_MARKETDATA_PATH}/Index/v1/Symbols`,
    },
    Symbol: {
        Search: window.REACT_APP_COMMON_PATH + '/GTSymbol/v1/Search',
        SymbolGeneralInformation: window.REACT_APP_MARKETDATA_PATH + '/GTSymbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: window.REACT_APP_BACKOFFICE_PATH + '/GtCustomer/v1/Search',
        GetCustomerInformation: window.REACT_APP_BACKOFFICE_PATH + '/GtCustomer/v1/GetCustomerInformation',
        GetGroupInformation: window.REACT_APP_BACKOFFICE_PATH + '/GtCustomer/v1/GetGroupInformation',
        MultiSearch: window.REACT_APP_BACKOFFICE_PATH + '/GTCustomer/v1/MultipleSerach',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    OrderUrl: {
        Create: window.REACT_APP_ORDER_PATH + '/GTOrder/v1/Create',
        Get: window.REACT_APP_ORDER_PATH + '/GTOrder/v1/GTTodayOrdersList',
        Delete: window.REACT_APP_ORDER_PATH + '/GTOrder/v1/SingleDelete',
        Trades: window.REACT_APP_ORDER_PATH + '/GTOrder/v1/Trades',
    },
    SupervisorMessage: {
        Get: `${window.REACT_APP_MARKETDATA_PATH}/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: `${window.REACT_APP_MARKETDATA_PATH}/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    draft: {
        Create: window.REACT_APP_ORDER_PATH + '/GTOrderDraft/v1/Create',
        Get: window.REACT_APP_ORDER_PATH + '/GTOrderDraft/v1/Get',
        Delete: window.REACT_APP_ORDER_PATH + '/GTOrderDraft/v1/Delete',
    },
    Basket: {
        Get: window.REACT_APP_ORDER_PATH + '/GTCart/v1/CartList',
        Create: window.REACT_APP_ORDER_PATH + '/GTCart/v1/CreateCart',
        Edit: window.REACT_APP_ORDER_PATH + '/GTCart/v1/EditCart',
        Delete: window.REACT_APP_ORDER_PATH + '/GTCart/v1/DeleteCart',
        CreateDetail: window.REACT_APP_ORDER_PATH + '/GTCart/v1/CreateCartDetail',
        GetDetail: window.REACT_APP_ORDER_PATH + '/GTCart/v1/CartDetailList',
        DeleteDetails: window.REACT_APP_ORDER_PATH + '/GTCart/v1/CartDetailDelete',
    },
    Commission: { Get: `${window.REACT_APP_COMMON_PATH}/Commission/v1/GetBuyAndSellCommision` },
    WatchList: {
        Get: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/Watchlists',
        Create: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/Create',
        Delete: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/Delete',
        Update: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/Update',
        GetWatchlistSymbol: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/GetWatchlistSymbols',
        DeleteSymbol: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/DeleteSymbol',
        AddSymbol: window.REACT_APP_PORTFOLIO_PATH + '/GTWatchlist/v1/AddSymbol',
        DefaultWatchlist: window.REACT_APP_PORTFOLIO_PATH + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: window.REACT_APP_PORTFOLIO_PATH + '/Watchlist/v1/GetDefaultWatchlistSymbols',
    },
    Setting: {
        GetSetting: `${window.REACT_APP_COMMON_PATH}/Setting/v1/GTGetSettings`,
    },
};

export default apiRoutes;
