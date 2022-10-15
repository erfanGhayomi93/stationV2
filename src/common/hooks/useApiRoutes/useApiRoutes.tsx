import { useEffect, useState } from 'react';
import { getGlobalSettings, useGlobalSettings } from 'src/app/queries/settings';
import { queryClient } from 'src/app/queryClient';

export const useApiPath = () => {
    const [apiRoutes, setApiRoutes] = useState<IApiRoutesTypes | undefined>();
    const { data } = useGlobalSettings<IApiRoutesTypes>();
    useEffect(() => {
        const CommonUrl = data?.find((item) => item.name === 'REACT_APP_COMMON_PATH')?.value;
        const PortfolioUrl = data?.find((item) => item.name === 'REACT_APP_PORTFOLIO_PATH')?.value;
        const MarketData = data?.find((item) => item.name === 'REACT_APP_MARKETDATA_PATH')?.value;
        const BackOffice = data?.find((item) => item.name === 'REACT_APP_BACKOFFICE_PATH')?.value;
        const OrderUrl = data?.find((item) => item.name === 'REACT_APP_ORDER_PATH')?.value;
        const OauthUrl = data?.find((item) => item.name === 'REACT_APP_OAUTH_PATH')?.value;
        CommonUrl &&
            PortfolioUrl &&
            MarketData &&
            BackOffice &&
            OrderUrl &&
            OauthUrl &&
            setApiRoutes({
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
                    MultiSearch: BackOffice + '/GTCustomer/v1/MultipleSerach',
                },
                MarketDepth: {
                    Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
                },
                OrderUrl: {
                    Create: OrderUrl + '/GTOrder/v1/Create',
                    Get: OrderUrl + '/GTOrder/v1/GTTodayOrdersList',
                    Delete: OrderUrl + '/GTOrder/v1/SingleDelete',
                },
                SupervisorMessage: {
                    Get: `${MarketData}/SupervisorMessage/v1/TodaySupervisorMessage`,
                    ReadPost: `${MarketData}/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
                },
                draft: {
                    Create: OrderUrl + '/GTOrderDraft/v1/Create',
                    Get: OrderUrl + '/GTOrderDraft/v1/Get',
                    Delete: OrderUrl + '/GTOrderDraft/v1/Delete',
                },
                Basket: {
                    Get: OrderUrl + '/GTCart/v1/CartList',
                    Create: OrderUrl + '/GTCart/v1/CreateCart',
                    Edit: OrderUrl + '/GTCart/v1/EditCart',
                    Delete: OrderUrl + '/GTCart/v1/DeleteCart',
                    CreateDetail: OrderUrl + '/GTCart/v1/CreateCartDetail',
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
                    GetDefaultWatchlistSymbols: PortfolioUrl + '/Watchlist/v1/GetDefaultWatchlistSymbols',
                },
                Setting: {
                    GetSetting: `${CommonUrl}/Setting/v1/GTGetSettings`,
                },
            });
    }, [data]);

    return { apiRoutes };
};

export const getApiPath = () => {
    const data = queryClient.getQueryData(['GetGlobalSettings']) as ISettingsType[];
    const CommonUrl = data?.find((item) => item.name === 'REACT_APP_COMMON_PATH')?.value;
    const PortfolioUrl = data?.find((item) => item.name === 'REACT_APP_PORTFOLIO_PATH')?.value;
    const MarketData = data?.find((item) => item.name === 'REACT_APP_MARKETDATA_PATH')?.value;
    const BackOffice = data?.find((item) => item.name === 'REACT_APP_BACKOFFICE_PATH')?.value;
    const OrderUrl = data?.find((item) => item.name === 'REACT_APP_ORDER_PATH')?.value;
    const OauthUrl = data?.find((item) => item.name === 'REACT_APP_OAUTH_PATH')?.value;

    return CommonUrl && PortfolioUrl && MarketData && BackOffice && OrderUrl && OauthUrl
        ? {
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
                  MultiSearch: BackOffice + '/GTCustomer/v1/MultipleSerach',
              },
              MarketDepth: {
                  Get: 'https://marketdata.ramandtech.com/Symbol/v1/GetMarketDepthV2',
              },
              OrderUrl: {
                  Create: OrderUrl + '/GTOrder/v1/Create',
                  Get: OrderUrl + '/GTOrder/v1/GTTodayOrdersList',
                  Delete: OrderUrl + '/GTOrder/v1/SingleDelete',
              },
              SupervisorMessage: {
                  Get: `${MarketData}/SupervisorMessage/v1/TodaySupervisorMessage`,
                  ReadPost: `${MarketData}/SupervisorMessage/v1/ReadTodaySupervisorMessages?MessageIDs=`,
              },
              draft: {
                  Create: OrderUrl + '/GTOrderDraft/v1/Create',
                  Get: OrderUrl + '/GTOrderDraft/v1/Get',
                  Delete: OrderUrl + '/GTOrderDraft/v1/Delete',
              },
              Basket: {
                  Get: OrderUrl + '/GTCart/v1/CartList',
                  Create: OrderUrl + '/GTCart/v1/CreateCart',
                  Edit: OrderUrl + '/GTCart/v1/EditCart',
                  Delete: OrderUrl + '/GTCart/v1/DeleteCart',
                  CreateDetail: OrderUrl + '/GTCart/v1/CreateCartDetail',
                  GetDetail: OrderUrl + '/GTCart/v1/CartDetailList',
                  DeleteDetails: OrderUrl + '/GTCart/v1/CartDetailDelete',
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
                  GetDefaultWatchlistSymbols: PortfolioUrl + '/Watchlist/v1/GetDefaultWatchlistSymbols',
              },
              Setting: {
                  GetSetting: `${CommonUrl}/Setting/v1/GTGetSettings`,
              },
          }
        : undefined;
};
