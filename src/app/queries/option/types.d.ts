export type TCashbody = {
    id: number;
    requestCount: number;
    customerISIN: string;
    requestForMaximum: boolean;
    countOfDone?: number | string;
    requestForMaximumApproval: boolean;
};

export type TPhysicalbody = {
    id: number;
    requestCount: number;
    requestForMaximum: boolean;
    requestForLostOrProfit: boolean;
    customerISIN: string;
    countOfDone?: number | string;
    lossApproval: boolean;
    requestForMaximumApproval: boolean;
};
