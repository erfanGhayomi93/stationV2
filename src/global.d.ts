declare module '*.svg' {
     import * as React from 'react';
     const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
     export default ReactComponent;
}

declare interface Window {
     REACT_APP_BROKER_CODE: string;
     REACT_APP_PUSHENGINE_PATH: string;
     REACT_APP_PUSHENGINE_PORT: string;
     REACT_APP_BASE_URL: string;
     REACT_APP_OAUTH_PATH: string;
     REACT_APP_RESOURCE_PATH: string;
     REACT_APP_ENV: string;
     REACT_APP_LANG: string;
     REACT_APP_RES_PATH: string;
     REACT_APP_RES_NAME: string;
}

interface GlobalApiResponseType<T> {
     result: T;
     succeeded: boolean;
     errors?: string[] | string;
}

interface GlobalPaginatedApiResponse<T> {
     result: T;
     succeeded: boolean;
     errors?: string[] | string;
     pageNumber: number;
     totalPages: number;
     totalCount: number;
     pageSize: number;
     hasPreviousPage: boolean;
     hasNextPage: boolean;
}

type RecordClasses<T extends string> = Partial<Record<T, ClassesValue>>;

type TSortingMethods = 'asc' | 'desc';

type ElementType<T extends readonly unknown[]> = T extends readonly (infer U)[] ? U : never;
