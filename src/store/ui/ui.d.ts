interface IUIStore {
     isExpandSymbolDetails: boolean;
     setExpandSymbolDetails: (state: boolean) => void;

     isExpandSidebar: boolean;
     setIsExpandSidebar: (state: boolean) => void;

     selectedOrders: IOpenOrder[];
     setSelectedOrders: (state: IOpenOrder[]) => void;
}
