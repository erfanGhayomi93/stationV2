type IListBasket = {
    id: number;
    name: string;
    traderISIN: string;
    createDate: string;
    deleted: boolean;
    sendDate: string;
    sended: boolean;
    isPinned: boolean;
};

type IListDetailsBasket = {
    id: number;
    cartID: number;
    symbolISIN: string;
    price: number;
    quantity: number;
    percent: number;
    side: BuySellSide;
    deleted: false;
    date: string;
    userId: number;
    validity: validity;
    validityDate: string;
    customerISINs: string;
    orderStrategy: string;
    orderType: string;
    customers: ICustomer[];
    symbolTitle: string;
};

interface ICreateCartDetailType {
    id: number;
    cartID: number;
    traderISIN?: string;
    symbolISIN: string;
    price: number;
    quantity: number;
    percent: number;
    side: BuySellSide;
    deleted?: boolean;
    date?: Date;
    userId?: number;
    validity: string;
    validityDate: Date;
    customerISINs: string;
    orderStrategy: string;
    orderType: OrderTypeType;
}

type ICustomer = {
    customerISIN: string;
    customerTitle: string;
};

type ICreateBasket = {
    name: string;
    sendDate: string;
};
