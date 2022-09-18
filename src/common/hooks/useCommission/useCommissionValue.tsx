import { FC } from 'react';
import { useCommissionQuery } from 'src/app/queries/trade';

interface IuseCommissionValueType {
    marketUnit: MarketUnit;
}

const useCommissionValue = ({ marketUnit }: IuseCommissionValueType) => {
    const { data: commissionData } = useCommissionQuery<Commission[]>({ select: (data) => data.commissions });
    return (
        commissionData?.find((market) => market.marketUnit === marketUnit) || {
            marketUnit: undefined,
            buyCommissionValue: 0,
            sellCommissionValue: 0,
        }
    );
};

export default useCommissionValue;
