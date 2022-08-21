import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiRoutes from './apiRoutes';

export const configMockAdapter = (axiosInstance: AxiosInstance) => {
    //
    const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });
    const baseURL = window.baseURL;

    mock.onGet(baseURL + apiRoutes.User.Info).reply((config) => {
        //
        const authorizationString = config?.headers?.Authorization || '';
        const token = String(authorizationString).split(' ')[1] || '';

        const tokenGeneratedTime = Number(token) || 0;
        const nowTime = new Date().getTime();

        if (nowTime - tokenGeneratedTime > 5 * 60 * 1000) return [401];
        else return [200, successApiResponse({ firstName: 'جواد', lastName: 'بینایی', userName: 'admin' })];
    });

    mock.onPost(baseURL + apiRoutes.User.Login).reply((config) => {
        //
        const data = JSON.parse(config.data);
        const isUserOk = data.userName === 'admin' && data.password === '1234';

        if (isUserOk) return [200, successApiResponse({ firstName: 'جواد', lastName: 'بینایی', userName: 'admin', token: new Date().getTime() })];
        else return [200, failApiResponse(['UserNotFound'])];
    });
};

const successApiResponse = (result: any) => ({ succeeded: true, result, errors: null });
const failApiResponse = (errors: string[]) => ({ succeeded: false, result: null, errors });
