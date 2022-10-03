interface IDraftRequsetType {
    symbolISIN: string;
    price: number
    quantity: number
    side: string;
    validity: string;
    validityDate: string | undefined;
    customerISINs: string,
    percent : number ,
    orderStrategy : string , 
    orderType : OrderTypeType
}

type IDraftSelected = {
    customerTitles: string[];
    symbolTitle: string;
    side: string;
    quantity: number;
    price: number;
    validity: string;
    validityDate: string;
};