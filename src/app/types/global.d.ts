//
interface Window {
    APP_ENV: 'production' | 'development';
    baseURL: string;
    REACT_APP_BROKER_CODE: string;
    REACT_APP_PUSHENGINE_PATH: string;
    REACT_APP_PUSHENGINE_PORT: string;
    REACT_APP_PORTFOLIO_PATH: string;
    REACT_APP_OAUTH_PATH: string;
    REACT_APP_COMMON_PATH: string;
    REACT_APP_BACKOFFICE_PATH: string;
    REACT_APP_MARKETDATA_PATH: string;
    REACT_APP_ORDER_PATH: string;
    REACT_APP_RESOURCE_PATH: string;
    REACT_APP_ENV: string;
    REACT_APP_LANG: string;
    REACT_APP_RES_PATH: string;
    REACT_APP_RES_NAME: string;
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

interface ICustomers {
    customerISIN: string;
    customerTitle: string;
}

type pathnameTitleType = {
    [key: string]: { path: string; title: string };
};

interface UserType {
    firstName: string;
    lastName: string;
    userName: string;
    customerISIN: string;
}

declare interface SearchSymbolType {
	isDelete?: boolean,
	symbolISIN: string,
	companyISIN: string,
	symbolTitle: string,
	companyName: string,
	highPrice: number,
	lowPrice: number,
	closingPrice: number,
	openPrice: number,
	highThreshold: number,
	lowThreshold: number,
	lastTradedPrice: number,
	symbolGroupCode: string,
	sectorCode: string,
	marketCode: string,
	marketUnit: string,
	tradePriceVarPreviousTradePercent: number,
	yesterdayClosingPrice: number,
	closingPriceVarReferencePrice: number,
	closingPriceVarReferencePricePercent: number,
	symbolOrderState: string,
	symbolTradeState: string,
	groupState: string,
	isInWatchList: boolean,
	symbolState: string,
	companyCode: string,
	symbolTag: string
}

type RecentSymbolType = {
	symbolTitle: string;
	symbolISIN: string;
	symbolState?: string;
	lastTradedPrice?: number;
	tradePriceVarPreviousTradePercent?: number;
	companyName?: string;
	[key: string]: unknown
}