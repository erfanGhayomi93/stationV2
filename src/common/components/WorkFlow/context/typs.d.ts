type IWorkFlowType = 'PortfolioWatchlist' | 'BuySellWidget' | 'Reports' | 'SymbolDetail';
type WorkflowState = {
    space: IWorkFlowType[];
};
type WorkflowAction = { type: 'SET_SPACE'; value: IWorkFlowType[] };
