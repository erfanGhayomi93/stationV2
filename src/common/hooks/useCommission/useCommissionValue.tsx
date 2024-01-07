import { FC } from 'react';
import { useCommissionQuery } from 'src/app/queries/trade';

interface IuseCommissionValueType {
    marketUnit?: MarketUnit;
}

interface IuseCommissionType extends IuseCommissionValueType {
    price: number;
    quantity: number;
    side: 'Buy' | 'Sell' | '';
}

export const useCommissionValue = ({ marketUnit }: IuseCommissionValueType) => {
    const { data: commissionData } = useCommissionQuery<Commission[]>();
    return (
        commissionData?.find((market) => market.marketUnitTitle === marketUnit) || {
            buyCommission: 0,
            commissionType: '',
            marketTitle: undefined,
            marketUnitTitle: undefined,
            sellCommission: 0,
        }
    );
};

const useCommission = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const { buyCommission, sellCommission } = useCommissionValue({ marketUnit });
    const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
    const commission = Math.ceil(commissionValue * price * quantity * 1000) / 1000;
    // const commission = commissionValue * price * quantity;
    const unitCommission = Math.ceil(commissionValue * price * 1 * 100) / 100;
    return { commission, unitCommission };
};

export const useCostValue = ({ price, quantity }: { price: number, quantity: number }) => {
    return Math.round(price * quantity);
};

export const useTotalValue = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side });
    return Math.ceil((price * quantity + (side === 'Sell' ? commission * -1 : commission)) * 1000) / 1000;
};

export const useDrawValue = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const totalValue = useTotalValue({ quantity, price, marketUnit, side });
    const { sellCommission } = useCommissionValue({ marketUnit });
    return Math.ceil(totalValue / (quantity - quantity * sellCommission) || 0);
};

export const useBuyDetail = ({ marketUnit, price, quantity }: Omit<IuseCommissionType, 'side'>) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side: 'Buy' });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side: 'Buy' });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'Buy' });
    return {
        commission,
        totalValue,
        drawValue,
    };
};

export const useSellDetail = ({ marketUnit, price, quantity }: Omit<IuseCommissionType, 'side'>) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side: 'Sell' });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side: 'Sell' });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'Sell' });
    return {
        commission,
        totalValue,
        drawValue,
    };
};

export const useBuySellDetail = ({ marketUnit, price, quantity, side }: IuseCommissionType) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side });
    const cost = useCostValue({ quantity, price });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side });
    return {
        commission,
        cost,
        drawValue,
        totalValue
    };
};

export default useCommission;
