//
interface Window {
    APP_ENV: 'production' | 'development';
    baseURL: string;
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.jpg';
declare module '*.png';

interface GlobalApiResponseType<T> {
    result: T;
    succeeded: boolean;
    errors?: string[] | string;
}

interface IPaginateRequest {
    pageNumber?: number;
    pageSize?: number;
}
