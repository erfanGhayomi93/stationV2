interface ICommissionTypeResultType {
    commissions: Commission[];
}

interface Commission {
    marketUnit: MarketUnit;
    buyCommissionValue: number;
    sellCommissionValue: number;
}

type MarketUnit =
    | 'Exchange'
    | 'FaraBourse'
    | 'ETFStock'
    | 'Future'
    | 'MaskanFaraBourse'
    | 'TSEFuture'
    | 'Salaf'
    | 'BourseKala'
    | 'FaraPaye'
    | 'ETFFix'
    | 'BourseKalaGovahiSekkeh'
    | 'ETFVentureCapital'
    | 'SalafEnergy'
    | 'BourseKalaGovahi'
    | 'Tabaee'
    | 'ETFMixed'
    | 'ETFZaminSakhteman'
    | 'SellOption'
    | 'Bond'
    | 'BuyOption';
