type TValidity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';

type TStrategy = 'normal';

type TQuantityBasedOn = 'remain' | 'purchasePower' | 'stockDailyCredit';

interface IPriceLockIcon {
     bestBuyLimitPrice_1: number;
     bestSellLimitPrice_1: number;
}

interface IPriceWithPercent {
     priceBasedOn: string;
     percent: number;
}

interface IQuantityWithPercent {
     quantityBasedOn: TQuantityBasedOn;
     percent: number;
}

interface IBuySellState {
     side: TSide;
     price: number;
     quantity: number;
     validity: TValidity;
     strategy: TStrategy;
     validityDate: string | null;
     source: string;
     amount: number;
     isCalculatedQuantity: boolean;
     isPercentPrice: boolean;
     isPercentQuantity: boolean;
     priceWithPercent: IPriceWithPercent;
     quantityWithPercent: IQuantityWithPercent;
     isLockPrice: boolean;
}

interface IBuySellAction {
     setSide: (side: TSide) => void;
     setPrice: (price: number) => void;
     setQuantity: (quantity: number) => void;
     setValidity: (validity: TValidity) => void;
     setStrategy: (strategy: TStrategy) => void;
     setValidityDate: (validityDate: string | null) => void;
     setSource: (source: string) => void;
     setAmount: (amount: number) => void;
     setIsCalculatedQuantity: (isCalculatedQuantity: boolean) => void;
     setIsPercentPrice: (isPercentPrice: boolean) => void;
     setIsPercentQuantity: (setIsPercentQuantity: boolean) => void;
     setPriceWithPercentBaseOn: (priceBasedOn: string) => void;
     setPriceWithPercentValue: (percent: number) => void;
     setQuantityWithBaseOn: (quantityBasedOn: TQuantityBasedOn) => void;
     setQuantityWithValue: (percent: number) => void;
     setIsLockPrice: (isLockPrice: boolean) => void;
     reset: () => void;
}
