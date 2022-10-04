//
const CommonUrl = 'http://192.168.40.8:12000';
const PortfolioUrl = 'http://192.168.40.8:11000';
const MarketData = 'http://192.168.40.8:7000';
const BackOffice = 'http://192.168.40.8:9500';
const OrderUrl = 'http://192.168.40.8:8500';
const OauthUrl = 'http://192.168.40.8:5011';

const apiRoutes = {
    OAuthApi: {
        authorization: OauthUrl + '/GTOAuthApi/v1/GTAuthorization',
        captcha: OauthUrl + '/Captcha/v1/create',
        twoFactor: OauthUrl + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: OauthUrl + '/GTOAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: `${CommonUrl}/GTTrader/v1/GetGeneralInformation`,
    },
    Time: {
        Get: `${CommonUrl}/Time/v1/Get`,
    },
    Index: {
        Symbols: `${MarketData}/Index/v1/Symbols`,
    },
    Symbol: {
        Search: CommonUrl + '/GTSymbol/v1/Search',
        SymbolGeneralInformation: MarketData + '/GTSymbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: BackOffice + '/GtCustomer/v1/Search',
        GetCustomerInformation: BackOffice + '/GtCustomer/v1/GetCustomerInformation',
        GetGroupInformation: BackOffice + '/GtCustomer/v1/GetGroupInformation',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    OrderUrl: {
        Create: OrderUrl + '/GTOrder/v1/Create',
        Get: OrderUrl + '/GTOrder/v1/GTOrderList',
    },
    SupervisorMessage: {
        Get: `${MarketData}/SupervisorMessage/v1/TodaySupervisorMessage`,
        ReadPost: `${MarketData}/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
    },
    draft: {
        Create: OrderUrl + '/GTOrderDraft/v1/Create',
        Get: OrderUrl + '/GTOrderDraft/v1/Get',
        Delete : OrderUrl + '/GTOrderDraft/v1/Delete'
    },
    Commission: { Get: `${CommonUrl}/Commission/v1/Get` },
    WatchList: {
        Get: PortfolioUrl + '/GTWatchlist/v1/Watchlists',
        Create: PortfolioUrl + '/GTWatchlist/v1/Create',
        Delete: PortfolioUrl + '/GTWatchlist/v1/Delete',
        Update: PortfolioUrl + '/GTWatchlist/v1/Update',
        GetWatchlistSymbol: PortfolioUrl + '/GTWatchlist/v1/GetWatchlistSymbols',
        DeleteSymbol: PortfolioUrl + '/GTWatchlist/v1/DeleteSymbol',
        AddSymbol: PortfolioUrl + '/GTWatchlist/v1/AddSymbol',
        DefaultWatchlist: PortfolioUrl + '/Watchlist/v1/DefaultWatchlists',
        GetDefaultWatchlistSymbols: PortfolioUrl + '/Watchlist/v1/DefaultWatchlist',
    },
};

export default apiRoutes;
