type OrderSide = OrderSideType | undefined;
type OrderCustomer = string | undefined;
type OrderSymbol = string | undefined;
type OrderStartDate = string | undefined;
type OrderTillDate = string | undefined;

type OrdersState = {
    customerISIN?: OrderCustomer;
    symbolISIN?: OrderSymbol;
    FromDate?: OrderStartDate;
    ToDate?: OrderTillDate;
    side?: OrderSide;
    status?: OrderStatus | undefined;
};
type OrdersAction =
    | { type: 'SET_CUSTOMER'; value: OrderCustomer }
    | { type: 'SET_SYMBOL'; value: OrderSymbol }
    | { type: 'SET_START_DATE'; value: OrderStartDate }
    | { type: 'SET_TILL_DATE'; value: OrderTillDate }
    | { type: 'SET_SIDE'; value: OrderSide }
    | { type: 'SET_STATUS'; value: OrderStatus | undefined };
