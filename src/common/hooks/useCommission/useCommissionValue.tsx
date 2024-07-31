import { FC } from 'react';
import { useCommissionQuery } from 'src/app/queries/trade';

interface IuseCommissionValueType {
    marketUnit?: MarketUnit;
}

interface IuseCommissionType extends IuseCommissionValueType {
    price: number;
    quantity: number;
    contractSize: number
    side: 'Buy' | 'Sell' | '';
}

export const useCommissionValue = ({ marketUnit }: IuseCommissionValueType) => {
    const { data: commissionData } = useCommissionQuery();
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

const useCommission = ({ marketUnit, price, quantity, side, contractSize }: IuseCommissionType) => {
    const { buyCommission, sellCommission } = useCommissionValue({ marketUnit });
    const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
    const commission = Math.round(commissionValue * price * quantity * contractSize);
    const unitCommission = Math.round(commissionValue * price * contractSize * 1 * 100) / 100;
    return { commission, unitCommission };
};

export const useCostValue = ({ price, quantity, contractSize }: { price: number, quantity: number, contractSize: number }) => {
    return Math.round(price * quantity * contractSize);
};

export const useTotalValue = ({ marketUnit, price, quantity, side, contractSize }: IuseCommissionType) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side, contractSize });
    const cost = useCostValue({ quantity, price, contractSize });

    return Math.round((cost + (side === 'Sell' ? commission * -1 : commission)) * 1000) / 1000;
};

export const useDrawValue = ({ marketUnit, price, quantity, side, contractSize }: IuseCommissionType) => {
    const totalValue = useTotalValue({ quantity, price, marketUnit, side, contractSize });
    const { sellCommission } = useCommissionValue({ marketUnit });
    return Math.round(totalValue / (quantity - quantity * sellCommission) || 0);
};

export const useBuyDetail = ({ marketUnit, price, quantity, contractSize }: Omit<IuseCommissionType, 'side'>) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side: 'Buy', contractSize });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side: 'Buy', contractSize });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'Buy', contractSize });
    return {
        commission,
        totalValue,
        drawValue,
    };
};

export const useSellDetail = ({ marketUnit, price, quantity, contractSize }: Omit<IuseCommissionType, 'side'>) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side: 'Sell', contractSize });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side: 'Sell', contractSize });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side: 'Sell', contractSize });
    return {
        commission,
        totalValue,
        drawValue,
    };
};

export const useBuySellDetail = ({ marketUnit, price, quantity, side, contractSize }: IuseCommissionType) => {
    const { commission } = useCommission({ quantity, price, marketUnit, side, contractSize });
    const cost = useCostValue({ quantity, price, contractSize });
    const totalValue = useTotalValue({ quantity, price, marketUnit, side, contractSize });
    const drawValue = useDrawValue({ quantity, price, marketUnit, side, contractSize });
    return {
        commission,
        cost,
        drawValue,
        totalValue
    };
};

export default useCommission;
