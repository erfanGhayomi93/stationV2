type TSide = 'Buy' | 'Sell';

type IOrderType = 'MarketOrder' | 'LimitOrder' | 'MarketToLimitOrder' | 'MarketOnOpeningOrder' | 'StopOrder';

type IFormType = 'Web' | 'Mobile' | 'BrokerTrader' | 'ClientApi' | 'MarketMaker' | 'Admin' | 'Supervisor';

type TAction = 'CreateOrder' | 'ModifyOrder' | 'CancelOrder' | 'ExpireOrder';

type TStatus =
     | 'InOMSQueue'
     | 'OnSending'
     | 'Error'
     | 'DeleteByEngine'
     | 'OnBoard'
     | 'Canceled'
     | 'OnModifyFrom'
     | 'OnModifyTo'
     | 'Modified'
     | 'OnBoardModify'
     | 'PartOfTheOrderDone'
     | 'OrderDone'
     | 'OnCanceling'
     | 'OnModifyError'
     | 'OnCancelError'
     | 'Expired'
     | 'RejectByGAP'
     | 'OnCancelingWithBroker'
     | 'TradeCancel';

type TtradeDetails =
     | null
     | {
            tradedQuantity: number;
            tradePrice: number;
            remainingQuantityOrder: number;
            tradeDate: string;
            tradeNumber: string;
            total: number;
       }[];

type Tblock = 'Account' | 'Portfolio' | 'Position';

type TOrderStateRequestType = 'All' | 'OnBoard' | 'Done' | 'Error';

interface ISingleDeleteOrderResult {
     clientKey: string | null;
     orderId: number;
     response: string;
     succeeded: boolean;
}

interface IOpenOrder {
     orderId: number;
     userName: null | string;
     customerISIN: string;
     marketUnit: string;
     symbolISIN: string;
     price: number;
     orderVolume: number;
     triggerPrice: number;
     orderPlaceInPrice?: null | number;
     orderVolumeInPrice?: null | number;
     quantity: number;
     orderSide: TSide;
     orderOrigin: string;
     parentOrderId: number;
     orderType: IOrderType;
     validity: TValidity;
     validityDate: string;
     orderFrom: IFormType;
     orderAction: TAction | 0;
     orderMinimumQuantity: number;
     orderDateTime: string;
     hostOrderNumber: null | string;
     expectedRemainingQuantity: number;
     sumExecuted: number;
     symbolTitle: string;
     position: number;
     valuePosition: number;
     lastTradePrice: number;
     orderState: TStatus;
     lastErrorCode: string | null;
     customErrorMsg: string | null;
     orderPlaceInPrice?: null | number;
     orderVolumeInPrice?: null | number;
     tradeDetails: TtradeDetails;
     isEditable: boolean;
     blockType: Tblock;
     blockedPositionISIN?: string;
     blockedPositionTitle?: string;
     remainingQuantity: number;
     customerTitle: string;
     bourseCode: string;
     requestDate: string;
}

interface ITodayOrderReq {
     side?: TSide;
     symbolISIN?: string;
     CustomerISIN?: string | string[];
     GtOrderStateRequestType?: TOrderStateRequestType;
}

interface IDoneOrdersReq {
     customerISIN?: string;
     symbolISIN?: string;
     orderSide?: TSide;
     aggregateType?: 'both' | 'symbol';
}

interface IDoneOrdersRes {
     bourseCode: string;
     commission: number;
     customerISIN: string;
     customerTitle: string;
     iterationCount: number;
     orderFrom: string;
     orderSide: TSide;
     price: number;
     quantity: number;
     symbolISIN: string;
     symbolTitle: string;
     totalPrice: number;
     tradeDate: string;
     validityDate: number;
     validityType: number;
}

type TCustomerIsins = string[];

interface ICreateOrderReq {
     id?: string;
     status?: string;
     customerISIN: TCustomerIsins;
     customerTitle: TCustomerIsins; //for show in notification
     CustomerTagId?: TCustomerIsins;
     GTTraderGroupId?: TCustomerIsins;
     symbolISIN: string;
     orderSide: TSide;
     price: number;
     quantity: number;
     percent: number;
     validity: TValidity;
     validityDate: string | null;
     orderDraftId: number | undefined;
     orderType: IOrderType;
     orderStrategy: string;
}

interface ICreateOrderRes {
     successClientKeys: string[];
     errorNumbers: number;
}
