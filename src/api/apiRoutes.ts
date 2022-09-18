//

const mock_path = 'MockApi/api/';
const CommonUrl = 'http://192.168.40.8:12000';
const OauthUrl = 'http://192.168.40.8:5011';
const MarketData = 'http://192.168.40.8:7000';
const BackOffice = 'http://192.168.40.8:9500';

const apiRoutes = {
    OAuthApi: {
        authorization: OauthUrl + '/OAuthApi/v1/Authorization',
        captcha: OauthUrl + '/Captcha/v1/create',
        twoFactor: OauthUrl + '/OAuthApi/v1/TwoFactorAuthorizer',
        logout: OauthUrl + '/OAuthApi/v1/Logout',
    },
    User: {
        GetUserInformation: `${CommonUrl}/Customer/v1/GetGeneralInformation`,
    },
    Time: {
        Get: `${CommonUrl}/Time/v1/Get`,
    },
    Index: {
        Symbols: `${MarketData}/Index/v1/Symbols`,
    },
    Symbol: {
        Search: CommonUrl + '/Symbol/v1/Search',
        SymbolGeneralInformation: MarketData + '/Symbol/v1/SymbolGeneralInformation',
    },
    Customer: {
        Search: BackOffice + '/GoCustomer/v1/Search',
        GetCustomerInformation: BackOffice + '/GoCustomer/v1/GetCustomerInformation',
        GetGroupInformation: BackOffice + '/GoCustomer/v1/GetGroupInformation',
    },
    MarketDepth: {
        Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
    },
    Commission: { Get: `${CommonUrl}/Commission/v1/Get` },
};

export default apiRoutes;
