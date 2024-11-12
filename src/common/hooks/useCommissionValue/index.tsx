import { useQueryCommission } from "@api/commission"



export const useCommissionValue = (marketUnit?: TMarketUnit): ICommissionRes => {
    const defaultValue: ICommissionRes = {
        buyCommission: 0,
        commissionType: '',
        marketTitle: '',
        marketUnitTitle: '',
        sellCommission: 0,
    }
    const { data: commissionData } = useQueryCommission();

    try {
        if (!marketUnit || !commissionData) return defaultValue;

        const res = commissionData?.find(({ marketUnitTitle }) => marketUnitTitle === marketUnit);

        return res || defaultValue

    } catch {
        return defaultValue
    }
}

export const useCommission = ({ marketUnit, price, quantity, side, contractSize }: ICommissionArg) => {
    const { buyCommission, sellCommission } = useCommissionValue(marketUnit);
    const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
    const commission = Math.round(commissionValue * price * quantity * contractSize);
    const unitCommission = Math.round(commissionValue * price * contractSize * 1 * 100) / 100;
    return { commission, unitCommission };
};

export const useCostValue = ({ price, quantity, contractSize }: Omit<ICommissionArg, 'side' | 'marketUnit'>) => {
    return Math.round(price * quantity * contractSize);
};


export const useTotalvalue = ({ price, quantity, side, marketUnit, contractSize }: ICommissionArg) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side, contractSize });
    const totalValueWithoutCommissionValue = useCostValue({ quantity, price, contractSize });
    const totalValueWithCommissionValue = Math.round((totalValueWithoutCommissionValue + (side === 'Sell' ? commission * -1 : commission)) * 1000) / 1000;

    return {
        totalValueWithCommissionValue,
        totalValueWithoutCommissionValue,
    }
}

export const useDrawValue = ({ marketUnit, price, quantity, side, contractSize }: ICommissionArg) => {
    const { totalValueWithCommissionValue } = useTotalvalue({ quantity, price, marketUnit, side, contractSize });
    const { sellCommission } = useCommissionValue(marketUnit);
    return Math.round(totalValueWithCommissionValue / (quantity - quantity * sellCommission) || 0);
};