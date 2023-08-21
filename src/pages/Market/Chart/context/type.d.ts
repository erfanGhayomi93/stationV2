declare interface TvStudyTemplateListType {
    id: number;
    name: string;
    timestamp: number;
}

declare interface TvSavedChartType {
    id: number;
    client: string;
    content: null | string;
    name: string;
    resolution: string;
    symbol: string;
    user: number;
    timestamp: number;
}

interface initStateType {
    selectedSymbol: string;
    tvChartActiveLayout: tvChartActiveLayoutType;
    modals: {
        tvCompareModal: boolean;
        tvIndicatorsModal: boolean;
        tvLayoutModal: boolean;
        tvLoadChartTemplate: boolean;
        tvSaveChartTemplate: boolean;
        tvSaveIndicatorsTemplate: boolean;
    };
}

interface IRequestSavedStudyTemplates {
    client: string | number;
    user: string | number;
}

type tradingViewAction =
    | { type: 'Set_Selected_Symbol'; value: string }
    | { type: 'Set_Active_Layout'; value: tvChartActiveLayoutType }
    | { type: 'Toggle_Modal_Tv'; value: keyof typeof initStateType.modals };

type tvChartActiveLayoutType = '1' | '2c' | '2r' | '3c' | '3r' | '2-2' | '4r' | '4c';
