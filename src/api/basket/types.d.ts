type ICartListRes = {
     id: number;
     name: string;
     traderISIN: string;
     createDate: string;
     deleted: boolean;
     sendDate: string | null;
     sended: boolean;
     isPinned: boolean;
};

interface IDetailsCartFilter {
     SymbolISIN: string | null;
     CustomerISINs: string[];
     side: TSide | '';
     PageNumber: number;
     PageSize: number;
}

interface IDetailsCartReq extends IDetailsCartFilter {
     CartId: number;
}

interface ICustomers {
     customerISIN: string;
     customerTitle: string;
}

interface IDetailsCartRes {
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
     validity: TValidity;
     validityDate: string;
     customerISIN: string;
     orderStrategy: string;
     orderType: string;
     symbolTitle: string;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     customers: ICustomers[];
}

interface ICreateCartReq {
     name: string;
}

interface IDeleteCartReq {
     id: number;
}

interface IEditCartReq {
     name: string;
     sendDate: string;
     id: number;
     isPinned: boolean;
}

interface IDeleteDetailsCartRes {
     cartDetailId: number;
}

interface ICreateBulkCartDetailReq {
     cartID: number;
     symbolISIN: string;
     price: number;
     quantity: number;
     side: TSide;
     validity: TValidity;
     validityDate: string | null;
     customerISIN: string;
     orderStrategy: string;
}
