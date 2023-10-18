interface ICommissionTypeResultType {
    commissions: Commission[];
}

interface Commission {
    buyCommission: number
    commissionType :string;
    marketTitle : string;
    marketUnitTitle :string;
    sellCommission:number
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
