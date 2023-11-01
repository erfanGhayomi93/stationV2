interface ISettingsType {
    name: AppType;
    value: string;
}
type AppType =
    // | 'REACT_APP_BROKER_CODE'
    // | 'REACT_APP_PUSHENGINE_PATH'
    // | 'REACT_APP_PUSHENGINE_PORT'
    // | 'REACT_APP_PORTFOLIO_PATH'
    | 'REACT_APP_OAUTH_PATH'
    | 'REACT_APP_BASE_URL'
// | 'REACT_APP_COMMON_PATH'
// | 'REACT_APP_BACKOFFICE_PATH'
// | 'REACT_APP_MARKETDATA_PATH'
// | 'REACT_APP_ORDER_PATH'
// | 'REACT_APP_RESOURCE_PATH'
// | 'REACT_APP_ENV'
// | 'REACT_APP_LANG'
// | 'REACT_APP_RES_PATH'
// | 'REACT_APP_RES_NAME';

interface IApiRoutesTypes {
    OAuthApi: {
        authorization: string;
        captcha: string;
        twoFactor: string;
        logout: string;
    };
    User: {
        GetUserInformation: string;
    };
    Time: {
        Get: string;
    };
    Index: {
        Symbols: string;
    };
    Symbol: {
        Search: string;
        SymbolGeneralInformation: string;
    };
    Customer: {
        Search: string;
        GetCustomerInformation: string;
        GetGroupInformation: string;
        MultiSearch: string;
    };
    MarketDepth: {
        Get: string;
    };
    OrderUrl: {
        Create: string;
        Get: string;
        Delete: string;
    };
    SupervisorMessage: {
        Get: string;
        ReadPost: string;
    };
    draft: {
        Create: string;
        Get: string;
        Delete: string;
    };
    Basket: {
        Get: string;
        Create: string;
        Edit: string;
        Delete: string;
        CreateDetail: string;
        GetDetail: string;
        DeleteDetails: string;
    };
    Commission: { Get: string };
    WatchList: {
        Get: string;
        Create: string;
        Delete: string;
        Update: string;
        GetWatchlistSymbol: string;
        DeleteSymbol: string;
        AddSymbol: string;
        DefaultWatchlist: string;
        GetDefaultWatchlistSymbols: string;
    };
    Setting: {
        GetSetting: string;
    };
}


interface PlatformSettingResultTypes {
    userId: number;
    theme: string;
    layoutId: number;
    hotKeyEnabled: boolean;
    defaultBuyVolume: string;
    defaultSellVolume: string;
    confirmBeforeOrderDelete: boolean;
    surveillanceMessages: boolean;
    confirmBeforeSendingOrder: boolean;
    bestPriceFromTopOrder: boolean;
    symbolInfoOnSendOrder: boolean;
    showOrderSplit: boolean;
    plusKeyBehaviorOn: boolean;
    multipleOrderModal: boolean;
    showIntroGuideOnLogin: boolean;
    alertType: string;
    alertPosition: string;
}

interface UserSettingResultTypes {
    userId: number;
    name: string;
    traderCode: string;
    nationalCode: string;
    stationName: string;
    userName: string;
    phone: string;
    stationCode: string;
    email: string;
}

interface GetSessionLogRequestParam {
    pageNumber: number;
    pageSize: number;
}

interface SessionLogResultType {
    uniqueId: string;
    ip: string;
    userName: string;
    deviceType: string;
    status: string;
    loginDate: string;
    logoutDate: string;
}