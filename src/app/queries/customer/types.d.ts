type tabCustomerType = 'Customers' | 'GroupCustomer' | 'MyGroup' | 'FavoriteList';

interface IGoCustomerResult {
    type: ICustomerMultiTypeType;
    searchResult: PaginatedSearchResult;
    typeCounts: TypeCount[];
}

interface IGoMultiCustomerType {
    bourseCode: string;
    children: IGoMultiCustomerType[];
    credit: number;
    customerISIN: string;
    customerType: ICustomerMultiTypeType;
    nationalCode: string;
    purchasePower: number;
    title: string;
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
    type: ICustomerMultiTypeType;
    count: number;
}

interface IGoCustomerRequest extends IPaginateRequest {
    term?: string;
    type?: ICustomerMultiTypeType;
}
type ICustomerMultiTypeType = 'Legal' | 'Natural' | 'CustomerTag' | 'TraderGroup';

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
    customerType?: string;
    phoneNumber: string;
    registrationNo: string | number;
}

interface IGetCustomerInformationRequestType {
    customerISIN: string | undefined;
}
