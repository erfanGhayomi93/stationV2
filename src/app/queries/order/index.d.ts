interface IOrderRequestType {
    customerISIN: string[];
    symbolISIN: string;
    orderSide: string;
    price: number;
    quantity: number;
    percent: number;
    validity: string;
    validityDate: string;
    orderDraftId: number;
    orderType: string;
    orderStrategy: string;
}
