type ReportSide = OrderSideType | undefined;
type ReportStatus = OrderStatus | undefined;
type ReportCustomer = string | undefined;
type ReportSymbol = string | undefined;
type ReportStartDate = string | undefined;
type ReportTillDate = string | undefined;

type ReportsState = {
    customerISIN?: ReportCustomer;
    symbolISIN?: ReportSymbol;
    FromDate?: ReportStartDate;
    ToDate?: ReportTillDate;
    side?: ReportSide;
    status?: ReportStatus;
};
type ReportsAction =
    | { type: 'SET_CUSTOMER'; value: ReportCustomer }
    | { type: 'SET_SYMBOL'; value: ReportSymbol }
    | { type: 'SET_START_DATE'; value: ReportStartDate }
    | { type: 'SET_TILL_DATE'; value: ReportTillDate }
    | { type: 'SET_SIDE'; value: ReportSide }
    | { type: 'SET_STATUS'; value: ReportStatus };
