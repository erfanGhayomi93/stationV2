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
    result: {
        id: number;
        cartID: number;
        traderISIN: string;
        symbolISIN: string;
        price: number;
        quantity: number;
        percent: number;
        side: BuySellSide;
        deleted: true;
        date: string;
        userId: 0;
        validity: validity;
        validityDate: string;
        customerISINs: string;
        orderStrategy: string;
        orderType: string;
        symbolTitle: string;
        customers: {
            customerISIN: string;
            customerTitle: string;
        }[];
    }[];
    pageNumber: number;
    totalPages: number;
    totalCount: string;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    succeeded: boolean;
    errors: string[];
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
    validityDate: string | null;
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

interface IGetBasketDetailParams extends filterStateType {
    cartId: number;
}
