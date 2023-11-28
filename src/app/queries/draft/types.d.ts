interface IDraftRequsetType {
    id: number;
    symbolISIN: string;
    symbolTitle: string;
    price: number;
    percent: number;
    quantity: number;
    orderSide: string;
    validity: string;
    validityDate: string | undefined;
    date: string;
    customerISINs: string;
    orderStrategy?: string;
    orderType?: OrderTypeType;
}

interface IDraftCreateType {
    symbolISIN: string;
    customerTagTitles: string;
    gtTraderGroupId: string;
    price: number;
    quantity: number;
    side: string;
    validity: string;
    validityDate: string | undefined;
    customerISINs: string;
    customerTitles: string;
    percent: number;
    orderStrategy: string;
    orderType: OrderTypeType;
}

interface IDraftResponseType {
    customerTags :any[]
    customers : ICustomer[]
    gtGroups : any[]
    date: string;
    orderId: number;
    orderSide: BuySellSide;
    percent: number;
    price: number;
    quantity: number;
    symbolISIN: string;
    symbolTitle: string;
    validity: validity;
    validityDate: string;
    // customerISINs: string;
    // customerTitles: string[];
}

type IToggleFavorite = {
    customerIsin : string ,
    isFavorite : boolean
}

type stateCustomer = {
    CustomerISINs: string[];
    // CustomerTagTitles?: string[];
    // GtTraderGroupId?: string[];
};
