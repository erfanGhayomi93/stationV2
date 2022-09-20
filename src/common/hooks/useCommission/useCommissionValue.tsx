import { FC } from 'react';
import { useCommissionQuery } from 'src/app/queries/trade';

interface IuseCommissionValueType {
    marketUnit?: MarketUnit;
}

interface IuseCommissionType extends IuseCommissionValueType {
    price: number;
    quantity: number;
    side: 'BUY' | 'SELL';
}

export const useCommissionValue = ({ marketUnit }: IuseCommissionValueType) => {
    const { data: commissionData } = useCommissionQuery<Commission[]>({ select: (data) => data.commissions });
    return (
        commissionData?.find((market) => market.marketUnit === marketUnit) || {
            marketUnit: undefined,
            buyCommissionValue: 0,
            sellCommissionValue: 0,
        }
    );
};

const useCommission = ({ marketUnit, price, quantity }: IuseCommissionType) => {
    const { buyCommissionValue } = useCommissionValue({ marketUnit });
    return Math.ceil(buyCommissionValue * price * quantity);
};

export const useCostValue = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const commision = useCommission({ quantity, price, marketUnit, side });
    return Math.ceil(commision + price * quantity);
};

export const useDrawValue = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const cost = useCostValue({ quantity, price, marketUnit, side });
    const { sellCommissionValue } = useCommissionValue({ marketUnit });
    return Math.ceil(cost / (quantity - quantity * sellCommissionValue) || 0);
};

export const useBuyDetail = ({ marketUnit, price, quantity }: Omit<IuseCommissionType, 'side'>) => {
    const commision = useCommission({ quantity, price, marketUnit, side: 'BUY' });
    const cost = useCostValue({ quantity, price, marketUnit, side: 'BUY' });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'BUY' });
    return {
        commision,
        cost,
        drawValue,
    };
};

export const useSellDetail = ({ marketUnit, price, quantity }: Omit<IuseCommissionType, 'side'>) => {
    const commision = useCommission({ quantity, price, marketUnit, side: 'SELL' });
    const cost = useCostValue({ quantity, price, marketUnit, side: 'SELL' });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'SELL' });
    return {
        commision,
        cost,
        drawValue,
    };
};

export default useCommission;
