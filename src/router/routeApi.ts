import { queryClient } from '../config/reactQuery';

export const routeApi = () => {
     const data: IGetSettingsRes[] | undefined = queryClient.getQueryData(['GetSettings']);

     // const oAuthApi = window.REACT_APP_OAUTH_PATH

     const baseUrl = window.REACT_APP_BASE_URL;

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
          },
          Orders: {
               TodayOrdersList: baseUrl + '/Order/v1/TodayOrdersList',
          },
          Customer: {
               AdvancedSearch: baseUrl + '/Customer/v1/AdvancedSearch',
               GroupAdvancedSearch: baseUrl + '/Customer/v1/GroupAdvancedSearch',
          },
     };
};
