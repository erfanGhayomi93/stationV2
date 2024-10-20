type TExecuteStrategyFieldName = 'bestSellLimitPrice_1' | 'bestBuyLimitPrice_1';

declare interface IpcMainChannels {
     onOMSMessageReceived: Record<number, string>;
}
