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
    side: string;
    deleted: false;
    date: string;
    userId: number;
    validity: string;
    validityDate: string;
    customerISINs: string;
    orderStrategy: string;
    orderType: string;
    customers: ICustomer[];
    symbolTitle: string;
};

type ICustomer = {
    customerISIN: string;
    customerTitle: string;
};

type ICreateBasket = {
    name: string;
    sendDate: string;
};
