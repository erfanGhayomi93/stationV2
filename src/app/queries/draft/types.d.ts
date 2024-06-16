interface IDraftRequsetType {
    id: number;
    symbolISIN: string;
    symbolTitle: string;
    price: number;
    percent: number;
    quantity: number;
    orderSide: string;
    validity: validity;
    validityDate: string | null;
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
    validity: validity;
    validityDate: string | null;
    customerISINs: string;
    customerTitles: string;
    percent: number;
    orderStrategy: string;
    orderType: OrderTypeType;
}

interface IDraftResponseType {
    customerTags: any[]
    customers: ICustomer[]
    gtGroups: any[]
    date: string;
    orderId: number;
    orderSide: BuySellSide;
    percent: number;
    price: number;
    quantity: number;
    symbolISIN: string;
    symbolTitle: string;
    validity: validity;
    validityDate: string | null;
    lastTradedPrice : number;
    lastTradedPriceVarPercent : number
    // customerISINs: string;
    // customerTitles: string[];
}

type IToggleFavorite = {
    customerIsin: string,
    isFavorite: boolean
}

type stateCustomer = {
    CustomerISINs: string[];
    // CustomerTagTitles?: string[];
    // GtTraderGroupId?: string[];
};

interface ICreateMyGroup{
    groupName: string ;
    customerISINs?: string[]
  }

interface IUpdateMyGroup {
    id: number;
    groupName: string
    children ?: IGoMultiCustomerType[] 
}

interface IAddCustomerToMyGroup {
    groupId : number , 
    customerISINs : string[]
}
