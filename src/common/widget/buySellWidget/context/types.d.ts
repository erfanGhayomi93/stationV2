type TValidity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';
type TStrategy = 'normal';

interface IBuySellState {
     side: TSide;
     price: number;
     quantity: number;
     validity: TValidity;
     strategy: TStrategy;
     validityDate: string | null;
     source: string;
     isCalculatedQuantity: boolean;
     amount: number;
     setSide: (side: TSide) => void;
     setPrice: (price: number) => void;
     setQuantity: (quantity: number) => void;
     setValidity: (validity: TValidity) => void;
     setStrategy: (strategy: TStrategy) => void;
     setValidityDate: (validityDate: string | null) => void;
     setSource: (source: string) => void;
     setIsCalculatedQuantity: (isCalculatedQuantity: boolean) => void;
     setAmount: (amount: number) => void;
}
