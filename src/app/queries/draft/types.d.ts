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
