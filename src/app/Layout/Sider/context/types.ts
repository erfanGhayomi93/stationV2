export type SLiderStateType = {
    isShowSupervisorMessage: boolean;
    countNumberSupervisorMessage: number;
};

export enum SLiderActionEnum {
    TOGGLE_MENU = 'TOGGLE_MENU',
}

export type SLiderActionType = {
    type: SLiderActionEnum.TOGGLE_MENU;
    payload?: any;
};

export enum COuntNumberSupervisorEnum {
    COUNT_NUMBER = 'COUNT_NUMBER',
}

export type COuntNumberSupervisorAction = {
    type: COuntNumberSupervisorEnum.COUNT_NUMBER;
    payload: number;
};

export enum REadSupervisorEnum {
    READ_MESSAGE = 'READ_MESSAGE',
}

export type REadSupervisorAction = {
    type: REadSupervisorEnum.READ_MESSAGE;
    payload?: any;
};
