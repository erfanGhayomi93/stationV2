interface BuySellState<T = unknown> {
    price: number;
    quantity: number;
    validity: validity;
    strategy: strategy;
    validityDate: string | undefined;
    sequential: boolean;
    symbolISIN: string;
    divide: boolean;
    isCalculatorEnabled: boolean;
    percent?: number;
    amount: number;
    side: BuySellSide;
    comeFrom?: string;
    extra?: T;
    id?: number;
}
type validity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';
type strategy = 'normal';
type BuySellSide = 'Buy' | 'Sell';
type BuySellAction =
    | { type: 'SET_PRICE'; value: number }
    | { type: 'SET_QUANTITY'; value: number }
    | { type: 'SET_STRATEGY'; value: strategy }
    | { type: 'SET_VALIDITY'; value: validity }
    | { type: 'SET_VALIDITY_DATE'; value: string | undefined }
    | { type: 'SET_SEQUENTIAL'; value: boolean }
    | { type: 'SET_SYMBOL'; value: string }
    | { type: 'SET_DIVIDE'; value: boolean }
    | { type: 'SET_COME_FROM'; value: string }
    | { type: 'SET_PERCENT'; value: number }
    | { type: 'SET_EXTRA'; value: unknown }
    | { type: 'SET_AMOUNT'; value: number }
    | { type: 'TOGGLE_CALCULATOR'; value: boolean }
    | { type: 'TOGGLE_BUY_SELL'; value: BuySellSide }
    | { type: 'SET_ALL'; value: BuySellState }
    | { type: 'SOFT_RESET' }
    | { type: 'RESET' };

interface IBuySellExtra {
    from: string;
    id: number | undefined;
}
