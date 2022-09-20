type BuySellState = {
    price: number;
    quantity: number;
    validity: validity;
    strategy: strategy;
    validityDate: string | undefined;
    sequential: boolean;
    symbolISIN: string;
};
type validity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';
type strategy = 'normal';
type BuySellAction =
    | { type: 'SET_PRICE'; value: number }
    | { type: 'SET_QUANTITY'; value: number }
    | { type: 'SET_STRATEGY'; value: strategy }
    | { type: 'SET_VALIDITY'; value: validity }
    | { type: 'SET_VALIDITY_DATE'; value: string }
    | { type: 'SET_SEQUENTIAL'; value: boolean }
    | { type: 'SET_SYMBOL'; value: string };
