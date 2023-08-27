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
	tvSidebarStatus: 'full-width' | 'half-width' | 'collapse';
    modals: {
        tvCompareModal: boolean;
        tvIndicatorsModal: boolean;
        tvLayoutModal: boolean;
        tvLoadChartTemplate: boolean;
        tvSaveChartTemplate: boolean;
        tvSaveIndicatorsTemplate: boolean;
		tvSymbolSearchModal : boolean
    };
}

interface IRequestSavedStudyTemplates {
    client: string | number;
    user: string | number;
}

type tradingViewAction =
    | { type: 'Set_Selected_Symbol'; value: string }
    | { type: 'Set_Active_Layout'; value: tvChartActiveLayoutType }
    | { type: 'Set_TV_Sidebar_Status'; value: TvSidebarStatus  }
    | { type: 'Toggle_Modal_TV'; value: keyof typeof initStateType.modals };

type tvChartActiveLayoutType = '1' | '2c' | '2r' | '3c' | '3r' | '2-2' | '4r' | '4c';

type TvSidebarStatus = 'full-width' | 'half-width' | 'collapse';

