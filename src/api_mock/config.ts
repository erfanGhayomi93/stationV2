import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { mock_routes } from './routes';

// export const configMockAdapter = (axiosInstance: AxiosInstance) => {
//     //
//     const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });
//     const baseURL = window.baseURL;

//     mock_routes.forEach(({ method, path, replyFn }) => {
//         if (!method || !path || !replyFn) return;
//         mock?.[`on${method}`](baseURL + path)?.reply(replyFn);
//     });
// };
