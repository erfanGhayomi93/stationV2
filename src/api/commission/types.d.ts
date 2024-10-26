interface ICommissionRes {
     buyCommission: number;
     sellCommission: number;
     commissionType: string;
     marketTitle: string;
     marketUnitTitle: string;
}

interface ICommissionArg {
     price: number;
     quantity: number;
     side: 'Buy' | 'Sell' | '';
     marketUnit?: TMarketUnit;
     contractSize: number;
}
