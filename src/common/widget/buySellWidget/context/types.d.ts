type TValidity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';
type TStrategy = 'normal';

interface IPriceWithPercent {
     PriceBasedOn: string;
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
     priceWithPercent: IPriceWithPercent;
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
     setPriceWithPercent: (priceWithPercent: IPriceWithPercent) => void;
}
