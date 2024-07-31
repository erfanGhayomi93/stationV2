import dayjs from "dayjs";

export const initialState: IFilterPositionHistory = {
    FromDate: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    SymbolISIN: [],
    CustomerISIN: [],
    'QueryOption.PageSize': 25,
    'QueryOption.PageNumber': 1,
    Time: 'day',
    positionSide : '',
    blockType : '',
    actionSource : '',
};

export const sideOption = [
    { label: "همه", value: "" },
    { label: "خرید", value: "Buy" },
    { label: "فروش", value: "Sell" }
];

export const blockTypeOption = [
    { label: "همه", value: "" },
    { label: "وجه نقد", value: "Account" },
    { label: "سهام پایه", value: "Portfolio" },
    { label: "موقعیت", value: "Position" }
];

export const actionSourceOption = [
    { label: "همه", value: "" },
    { label: "معامله", value: "Trade" },
    { label: "تسویه فیزیکی", value: "PhysicalSettlement" },
    { label: "تسویه نقدی", value: "CashSettlement" }
];