interface ICommissionTypeResultType {
    commissions: Commission[];
}

interface Commission {
    buyCommission: number
    sellCommission:number
    commissionType :string;
    marketTitle : string;
    marketUnitTitle :string;
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
