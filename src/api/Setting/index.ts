import { useQuery } from '@tanstack/react-query';
import AXIOS from '@config/axios';

export const useQueryGlobalSettings = () => {
     const baseUrl = window.location.host.includes('wt2') ? 'https://wtapi2.ramandtech.com' : 'https://wtapi.ramandtech.com';

     return useQuery({
          queryKey: ['GetSettings'],
          queryFn: async () => {
               const response = await AXIOS.get<IGetSettingsRes[]>(baseUrl + '/Setting/v1/GetSettings');
               return response.data;
          },
     });
};

export const useQueryPreprdSettings = () => {
     return useQuery({
          queryKey: ['GetSettings'],
          queryFn: async () => {
               const response = preprdMock;
               return response.data;
          },
     });
};

const preprdMock = {
     data: [
          {
               name: 'REACT_APP_BROKER_CODE',
               value: '189',
          },
          {
               name: 'REACT_APP_PUSHENGINE_PATH',
               value: 'https://pushengine.ramandtech.com',
          },
          {
               name: 'REACT_APP_PUSHENGINE_PORT',
               value: '443',
          },
          {
               name: 'REACT_APP_BASE_URL',
               value: 'https://wtapi-preprd.ramandtech.com',
          },
          {
               name: 'REACT_APP_OAUTH_PATH',
               value: 'https://oauth-preprd.ramandtech.com',
          },
          {
               name: 'REACT_APP_RESOURCE_PATH',
               value: 'https://resource-preprd.ramandtech.com',
          },
          {
               name: 'REACT_APP_ENV',
               value: 'production',
          },
          {
               name: 'REACT_APP_LANG',
               value: 'Fa',
          },
          {
               name: 'REACT_APP_RES_PATH',
               value: 'https://resource-preprd.ramandtech.com/ResourceJS',
          },
          {
               name: 'REACT_APP_RES_NAME',
               value: 'GOTStation',
          },
     ],
};
