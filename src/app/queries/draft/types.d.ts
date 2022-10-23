interface IDraftRequsetType {
    id: number;
    symbolISIN: string;
    symbolTitle: string;
    price: number;
    percent: number;
    quantity: number;
    side: string;
    validity: string;
    validityDate: string | undefined;
    date: string;
    customerISINs: string;
    orderStrategy?: string;
    orderType?: OrderTypeType;
}

interface IDraftCreateType {
    symbolISIN: string;
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
