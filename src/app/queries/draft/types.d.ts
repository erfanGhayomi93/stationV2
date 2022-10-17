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
    id:  number;
    customerTitles: string[];
    customers : ICustomer[]
    symbolTitle: string;
    side: string;
    quantity: number;
    price: number;
    validity: string;
    validityDate: string;
};