export const SymbolGeneralfields = [
     'yesterdayClosingPrice',
     'lowThreshold',
     'highThreshold',
     'individualBuyVolume',
     'numberOfIndividualSellers',
     'individualSellVolume',
     'numberOfLegalBuyers',
     'legalBuyVolume',
     'numberOfLegalSellers',
     'legalSellVolume',
     'totalTradeValue',
     'totalNumberOfSharesTraded',
     'baseVolume',
     'firstTradedPrice',
     'lastTradedPrice',
     'lastTradedPriceVar',
     'lastTradedPriceVarPercent',
     'closingPrice',
     'closingPriceVar',
     'closingPriceVarPercent',
     'lastTradeDateTime',
     'lowestTradePriceOfTradingDay',
     'highestTradePriceOfTradingDay',
     'symbolState',
     'openPrice',
     'totalNumberOfTrades'
] as const;

export type TFieldSymbolGeneralResLs = Record<(typeof SymbolGeneralfields)[number], number>;
