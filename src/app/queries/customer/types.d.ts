type ICustomerTypeType = 'Total' | 'Customer' | 'Group' | 'Mine';

interface IGoCustomerResult {
    type: ICustomerTypeType;
    searchResult: PaginatedSearchResult;
    typeCounts: TypeCount[];
}

interface IGoMultiCustomerType {
    customerType: string;
    customerTitle: string;
    customerISIN: string;
    nationalCode: string;
    bourseCode: string;
    purchasePower: number;
}

interface PaginatedSearchResult {
    errors: null | string[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageNumber: number;
    pageSize: number;
    result: IGoCustomerSearchResult[];
    succeeded: boolean;
    totalCount: number;
    totalPages: number;
}
interface IGoCustomerSearchResult {
    customerTitle: string;
    customerISIN: string;
    balance: number;
    bourseCode: string;
    nationalCode: number;
    groupName: string;
    groupId: number;
}

interface TypeCount {
    type: ICustomerTypeType;
    count: number;
}

interface IGoCustomerRequest extends IPaginateRequest {
    term?: string;
    type?: ICustomerTypeType;
}
type ICustomerMultiTypeType = 'Legal' | 'Natural' | 'CustomerTag';
interface IGoCustomerRequestType {
    term?: string;
    type?: ICustomerMultiTypeType[];
}

interface ICustomerInformationResultType {
    customerISIN: string;
    customerTitle: string;
    bourseCode: string;
    nationalCode: string;
    customerTag: string[];
    fatherName: string;
    branchName: string;
    stationName: string;
    remainT1: number;
    remainT2: number;
    stationCredit: number;
    brokerCredit: number;
    blocked: number;
}

interface IGetCustomerInformationRequestType {
    customerISIN: string | undefined;
}
