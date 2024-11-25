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
     clientKey: string;
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

type errorStatus =
     | 'Call_Sell_Now_Allowed'
     | 'Contract_InCremental_DisAllowed_FromTSE'
     | 'Contract_InCreasement_DisAllowed'
     | 'Group_not_authorized_for_this_Trader'
     | 'Put_Sell_Now_Allowed'
     | 'Option_Permission_NotSet'
     | 'Order_ValidityDate_Not_Valid'
     | 'Customer_Request_Already_Registered'
     | 'Credit_Not_Allowed_In_Option'
     | 'SymbolState_Is_Not_Valid'
     | 'Price_Not_Allowed'
     | 'Quantity_Not_Allowed'
     | 'OrderType_Not_Allowed'
     | 'CancelTime_Is_Not_Valid'
     | 'GroupState_Is_Not_Valid'
     | 'MarketTime_Is_Not_Valid'
     | 'ModifyTime_Is_Not_Valid'
     | 'MinBuyOrderAmount_Is_Not_Valid'
     | 'MinSellOrderAmount_Is_Not_Valid'
     | 'SellOrder_Is_Not_Allowed_ForThisSymbol'
     | 'MaxSellCountPerDay_Is_Not_Allowed_ForThisSymbol'
     | 'SellTime_Is_Not_Allowed_ForThisSymbol'
     | 'MaxSellVolumePerDay_Is_Not_Allowed_ForThisSymbol'
     | 'BuyOrder_Is_Not_Allowed'
     | 'MaxBuyCountPerDay_Is_Not_Valid'
     | 'BuyTime_Is_Not_Allowed_ForThisSymbol'
     | 'MaxBuyVolumePerDay_Is_Not_Allowed_ForThisSymbol'
     | 'Block_SettlementDate_Is_Not_Valid'
     | 'SellOrder_Is_Allowed_Only_For_Negative_Remain'
     | 'Contract_NotValid'
     | 'You_Have_Open_CashSettlement_In_Your_Contract'
     | 'BuyOrder_Is_Not_Allowed_ForThisSymbol'
     | 'SellOrder_Is_Not_Valid_ForIPO'
     | 'OrderValidity_Is_Not_Valid_ForIPO'
     | 'Customer_Sell_Order_Is_Not_Allowed'
     | 'Customer_Buy_Order_Is_Not_Allowed'
     | 'Customer_Cross_Order_Is_Not_Allowed'
     | 'Customer_Max_BuyVolume_Limit_Reached'
     | 'Customer_Max_SellVolume_Limit_Reached'
     | 'Hybrid_Limitation_Failed'
     | 'MarketCheck_Fail'
     | '92115'
     | 'CrossOrder_Is_Not_Allowed_ForThisSymbol'
     | 'Order_Price_Is_Outside_The_Thresholds'
     | 'Order_Origin_Does_Not_Match_The_Account_Origin'
     | 'Request_Reject_By_Gap_Manager'
     | 'Group_State_Doesnot_Allow_This_Function'
     | 'Symbol_Does_Not_Exist'
     | 'Disclosed_Quantity_Too_Small'
     | 'This_Trader_Does_Not_Belong_To_This_Member'
     | 'Quantities_Must_Be_Multiple_Of_Traded_LOT'
     | 'This_Order_is_not_in_the_book'
     | 'Ok'
     | 'ParseMessageFailed'
     | 'ParseMessageFailed_BrokerIdNotValid'
     | 'ParseMessageFailed_MessageActionNotValid'
     | 'ParseMessageFailed_CustomerShardIdNotValid'
     | 'Not_Enough_Remain'
     | 'NotEnoughRemain'
     | 'AgreementNotApproved'
     | 'ParseMessageFailed_AccountIdNotValid'
     | 'ParseMessageFailed_SymbolISINNotValid'
     | 'OrderHaveUnProcessMessage'
     | 'AccessToOrderDenied'
     | 'ParseMessageFailed_CustomerISINNotValid'
     | 'ParseMessageFailed_UserNameNotValid'
     | 'OrderPerSecondFail'
     | 'OMSNotAvailable'
     | 'HasNotAcceptedtAgreement'
     | 'Held_quantity_of_shares_is_insufficient'
     | 'AccessToHubFail'
     | 'ChangeBestPrice_Is_Not_Valid'
     | 'Order_Entry_Time_Is_Finished'
     | 'Delete_By_Regulator'
     | 'OrderingTimeIsNotValid'
     | 'CreatOrder_Is_Not_Allowed_In_This_Time'
     | 'Disclosed_quantity_forbidden_for_FAK'
     | 'order data is not valid'
     | 'OrderDataIsNotValid'
     | 'Modify_Order_Validation_Is_Not_Allowed'
     | 'ModifyOrder_Is_Not_Allowed_In_This_Time'
     | 'Symbol_State_Does_Not_Allow_This_Function'
     | 'CancelOrder_Is_Not_Allowed_In_This_Time'
     | 'CreateOrder_Is_Not_Allowed_In_This_Time'
     | 'Client_Account_Number_is_bad_Filled'
     | 'HasNotAcceptedAgreement'
     | 'Price_Must_Be_Valid_Against_Tick_Table'
     | 'NoTimeToOrder'
     | 'Order_PerSecond_Check_Failed'
     | 'default'
     | 'Contract_IsExpired'
     | 'AccessToOneOrMoreCustomersDenied'
     | 'PositionBlockISIN_Not_Valid';

interface IModifyGroupOrderReq {
     price: number;
     quantity: number;
     validity: validity;
     validityDate: string | null;
     id: number;
}

interface IModifyGroupOrderRes {
     clientKey: string | null;
     orderId: number;
     response: string;
     succeeded: boolean;
}

interface IDeleteGroupOrderRes {
     clientKey: string | null;
     orderId: number;
     response: string;
     succeeded: boolean;
}

type IDeleteGroupOrderReq = number;

interface IDividedOrderRow {
     id: string;
     customerTitle: string;
     customerISIN: string;
      quantity: number;
      price: number;
      status?: OrderStatusType;
     isError : boolean 
     clientKey?: string;
 }
