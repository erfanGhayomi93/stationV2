import { useQueryCommission } from "@api/commission"



export const useCommissionValue = (marketUnit?: TMarketUnit): ICommissionRes => {
    const defaultValue: ICommissionRes = {
        buyCommission: 0,
        commissionType: '',
        marketTitle: '',
        marketUnitTitle: '',
        sellCommission: 0,
    }
    try {
        const { data: commissionData } = useQueryCommission();
        
        if (!marketUnit || !commissionData) return defaultValue;

        const res = commissionData?.find(({ marketUnitTitle }) => marketUnitTitle === marketUnit);

        return res || defaultValue

    } catch {
        return defaultValue
    }
}
