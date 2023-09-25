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
    title: string;
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


interface ICustomerFinancialResult {
    customerISIN: string;
    credit: number;
    creditDebt: number;
    t1: number;
    t2: number;
    saveDate: string;
    orderBlockValue: number;
    paymentRequestBlockValue: number;
    customerTitle: string;
    bourseCode: string;
    nationalCode: string;
    finalRemain: number;
}

interface ICustomerFinancialResponse extends GlobalApiResponseType<ICustomerFinancialResult> { }



interface IGetCustomerTurnOverRequestType {
    Side?: "buy" | "sell" | "deposit" | "withdrawal" | "Remain",
    CustomerISIN?: string;
    SymbolISIN?: string;
    IsAggregated?: boolean;
    DateFrom?: string;
    DateTo?: string;
    Time?: string;
    PageSize: number;
    PageNumber: number;
}

interface IGetCustomerTurnOverResultType {
    dateTime: string;
    side: string;
    credit: number;
    debit: number;
    remaining: number;
    description: string;
    traderCode: number;
    stationName: string;
    symbolISIN: string;
    customerISIN: string;
}


interface IGetCustomerTurnOverResponse extends GlobalPaginatedApiResponse<IGetCustomerTurnOverResultType[]> { 
    finalRemain: number;
    remainMinusLastTrades: number;
    totalCountFilter: number;
    pageCount: number
}