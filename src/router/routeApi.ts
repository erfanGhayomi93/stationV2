export const routeApi = () => {
     // const data: IGetSettingsRes[] | undefined = queryClient.getQueryData(['GetSettings']);

     // const oAuthApi = window.REACT_APP_OAUTH_PATH

     const baseUrl = window.REACT_APP_BASE_URL;
     const oAuthUrl = window.REACT_APP_OAUTH_PATH;

     return {
          Time: {
               main: baseUrl + '/Time/v1/Get',
          },
          Index: {
               main: baseUrl + '/Index/v1/Symbols',
          },
          Symbol: {
               search: baseUrl + '/Symbol/v1/Searchv2',
               historyRecent: baseUrl + '/Symbol/v1/GetSearchHistory',
               SymbolGeneralInformation: baseUrl + '/Symbol/v1/SymbolGeneralInformation',
               sameGroupsSymbol: baseUrl + '/Symbol/v1/GetSameSectorSymbolsBySymbolISIN',
               optionContracts: baseUrl + '/Symbol/v1/GetSameCompanyContractsOptionSymbolsBySymbolISIN',
               GetSymbolsTab: baseUrl + '/Symbol/v1/GetSymbolsTab',
               CreateNewSymbolTab: baseUrl + '/Symbol/v1/CreateNewSymbolTab',
               RemoveTabByTraderUserIdAndSymbolISIN: baseUrl + '/Symbol/v1/RemoveTabByTraderUserIdAndSymbolISIN',
               UpdateSymbolTabCreateDateTime: baseUrl + '/Symbol/v1/UpdateSymbolTabCreateDateTime',
               UpdateTheCurrentTab: baseUrl + '/Symbol/v1/UpdateTheCurrentTab',
               CleareSymbolTabAfterLogOut: baseUrl + '/Symbol/v1/CleareSymbolTabAfterLogOut',
               GetMarketDepthV2: baseUrl + '/Symbol/v1/GetMarketDepthV2',
          },
          Orders: {
               TodayOrdersList: baseUrl + '/Order/v1/TodayOrdersList',
               todayDoneOrders: baseUrl + '/Order/v1/TodayDoneTrades',
               delete: baseUrl + '/Order/v1/SingleDelete',
               GroupOrderDelete: baseUrl + '/Order/v1/GroupOrderDelete',
               GroupOrdersModify: baseUrl + '/Order/v1/GroupOrdersModify',
               Create: baseUrl + '/Order/v1/Create',

               GetTrades: baseUrl + '/Order/v1/Trades',
               GetTradeDetails: baseUrl + '/Order/v1/TradesDetails',
          },
          Customer: {
               AdvancedSearch: baseUrl + '/Customer/v1/AdvancedSearch',
               GetCustomers: baseUrl + '/Customer/v1/GetCustomers',

               GroupAdvancedSearch: baseUrl + '/Customer/v1/GroupAdvancedSearch',
               GetGroups: baseUrl + '/Customer/v1/GetGroups',

               GetCustomerInformation: baseUrl + '/Customer/v1/GetCustomerInformation',
               GetCustomerFinancialStatus: baseUrl + '/Customer/v1/GetCustomerFinancialInformation',
               GetCustomerAgreement: baseUrl + '/Agreement/v1/Get',
               getCustomerContracts: baseUrl + '/Customer/v1/GetContacts',

               GetMyGroup: baseUrl + '/CustomerGroup/v1/GetGroups',
               MyGroupAdvancedSearch: baseUrl + '/CustomerGroup/v1/SearchCustomerGroup',

               CreateNewCustomerGroup: baseUrl + '/CustomerGroup/v1/CreateGroup',

               AddCustomersToGroups: baseUrl + '/CustomerGroup/v1/AddMultipleCustomersToMultipleGroups',

               EditCustomerGroupName: baseUrl + '/CustomerGroup/v1/UpdateGroup',

               deleteCustomerGroup: baseUrl + '/CustomerGroup/v1/DeleteGroup',

               deleteCustomerFromGroup: baseUrl + '/CustomerGroup/v1/RemoveCustomersFromGroup',

               toggleFavoriteCustomer: baseUrl + '/Customer/v1/ToggleFavorite',
          },

          SupervisorMessage: {
               Get: baseUrl + '/Message/v1/TodaySupervisorMessage',
               Read: baseUrl + '/Message/v1/ReadTodaySupervisorMessages',
          },
          Commission: {
               GetBuyAndSellCommission: baseUrl + '/Commission/v1/GetBuyAndSellCommision',
          },
          Trader: {
               GetUserInformation: baseUrl + '/Trader/v1/GetGeneralInformation',
          },
          Portfolios: {
               CustomerPortfolio: baseUrl + '/Portfolio/v1/Portfolios',
          },

          Option: {
               GetOptionOrder: baseUrl + '/Option/v1/OptionOrders',
          },

          OAuth: {
               authorization: oAuthUrl + '/GTOAuthApi/v1/GTAuthorization',
               captcha: oAuthUrl + '/Captcha/v1/create',
               twoFactor: oAuthUrl + '/OAuthApi/v1/TwoFactorAuthorizer',
               logout: oAuthUrl + '/GTOAuthApi/v1/Logout',

               forgetPasswordRequest: oAuthUrl + '/GTForgetPassword/v1/Request',
               forgetPasswordValidation: oAuthUrl + '/GTForgetPassword/v1/Validation',
               forgetPasswordChangePassword: oAuthUrl + '/GTForgetPassword/v1/ChangePassword',

               changePasswordRequest: oAuthUrl + '/GTChangePassword/v1/Request',
               changePasswordValidation: oAuthUrl + '/GTChangePassword/v1/Validation',
               changePasswordSetPassword: oAuthUrl + '/GTChangePassword/v1/ChangePassword',
          },
          Baskets: {
               cartList: baseUrl + '/Cart/v1/CartList',
               CartDetailList: baseUrl + '/Cart/v1/CartDetailList',
               createCart: baseUrl + '/Cart/v1/CreateCart',
               deleteCart: baseUrl + '/Cart/v1/DeleteCart',
               editCart: baseUrl + '/Cart/v1/EditCart',
               deleteDetails: baseUrl + '/Cart/v1/CartDetailDelete',
               cartSendOrder: baseUrl + '/Cart/v1/CartSendOrder',
               CreateBulkCartDetail: baseUrl + '/Cart/v1/CreateBulkCartDetail',
          },
          Watchlist: {
               getWatchlistSymbols: baseUrl + '/Watchlist/v1/GetWatchListSymbols',
               addWatchlistToSymbols: baseUrl + '/Watchlist/v1/AddSymbol',
               getSymbolInWatchlist: baseUrl + '/Watchlist/v1/GetSymbolInWatchlist',
               deleteSymbolInWatchlist: baseUrl + '/Watchlist/v1/DeleteSymbol',
               getWatchlists: baseUrl + '/Watchlist/v1/WatchLists',
               createWatchlist: baseUrl + '/Watchlist/v1/Create',
          },
     };
};
