type SLiderStateType = {
    isShowSupervisorMessage: boolean;
};

enum SLiderActionEnum {
    TOGGLE_MENU = "TOGGLE_MENU"
}

type SLiderActionType = {
    type : SLiderActionEnum.TOGGLE_MENU , payload : boolean
}
