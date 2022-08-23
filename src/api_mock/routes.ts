import { AxiosRequestConfig } from 'axios';
import apiRoutes from 'src/api/apiRoutes';

//
type MockRoute = {
    method: 'Get' | 'Post';
    path: string;
    replyFn: (config: AxiosRequestConfig<any>) => any[] | Promise<any[]>;
};

const successApiResponse = (result: any) => ({ succeeded: true, result, errors: null });
const failApiResponse = (errors: string[]) => ({ succeeded: false, result: null, errors });

export const mock_routes: MockRoute[] = [
    {
        method: 'Get',
        path: apiRoutes.User.Info,
        replyFn: (config) => {
            //
            const authorizationString = config?.headers?.Authorization || '';
            const token = String(authorizationString).split(' ')[1] || '';

            const tokenGeneratedTime = Number(token) || 0;
            const nowTime = new Date().getTime();

            if (nowTime - tokenGeneratedTime > 5 * 60 * 1000) return [401];
            else return [200, successApiResponse({ firstName: 'جواد', lastName: 'بینایی', userName: 'admin' })];
        },
    },
    {
        method: 'Post',
        path: apiRoutes.User.Login,
        replyFn: (config) => {
            //
            const data = JSON.parse(config.data);
            const isUserOk = data.userName === 'admin' && data.password === '1234';

            if (isUserOk) return [200, successApiResponse({ firstName: 'جواد', lastName: 'بینایی', userName: 'admin', token: new Date().getTime() })];
            else return [200, failApiResponse(['UserNotFound'])];
        },
    },
];
