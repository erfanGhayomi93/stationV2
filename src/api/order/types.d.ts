
type TSide = 'Buy' | 'Sell';

type Ttypes = 'MarketOrder' | 'LimitOrder' | 'MarketToLimitOrder' | 'MarketOnOpeningOrder' | 'StopOrder';

type TBsValidityDates = 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled' | 'Day' | 'Week' | 'Month';

 type IFormType = 'Web' | 'Mobile' | 'BrokerTrader' | 'ClientApi' | 'MarketMaker' | 'Admin' | 'Supervisor';

  type TAction = 'CreateOrder' | 'ModifyOrder' | 'CancelOrder' | 'ExpireOrder';

 type TStatus =
		| 'InOMSQueu'
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
    orderType: Ttypes;
    validity: TBsValidityDates;
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
    orderStatus: TStatus;
    lastErrorCode: string | null;
    customErrorMsg: string | null;
    orderPlaceInPrice?: null | number;
    orderVolumeInPrice?: null | number;
    tradeDetails: TtradeDetails;
    isEditable: boolean;
    blockType: Tblock;
    blockedPositionISIN?: string;
    blockedPositionTitle?: string;
    remainingQuantity : number;
    customerTitle : string;
    bourseCode : string , 
    requestDate : string
};

interface ITodayOrderReq {
    side?: TSide;
    symbolISIN?: string;
    CustomerISIN?: string | string[];
    GtOrderStateRequestType?: TOrderStateRequestType;
}