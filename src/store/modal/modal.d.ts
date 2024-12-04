type TEditOrdersGroupModalSheet = {
     side: TSide;
     symbolTitle: string;
     data: IOpenOrder[];
};

type TDeleteOrdersGroupModalSheet = {
     side: TSide;
     symbolTitle: string;
     data: IOpenOrder[];
};

type TcustomersSearchModalSheet = {
     symbolTitle: string;
};

type TAddCustomersToGroupModal = {
     customers: string[];
};

type TEditCustomerGroupModal = {
     customer: IMyGroupsInformationRes;
};

type TDeleteCustomerGroupModal = {
     customer: IMyGroupsInformationRes;
};

type TManageBasketOrderModal = {
     isShow?: boolean;
     isAdd?: boolean;
};

type TPortfolioCustomerModal = {
     customer: ICustomerAdvancedSearchRes;
};

type TEditBasketOrderModal = {
     basket: ICartListRes;
};

type TAddOrderToBasketModal = {
     orders: IDetailsCartRes[];
};

type TConfirmDeleteBasketOrderModal = {
     basket: ICartListRes;
};

interface IModalStore {
     editOrdersGroupModalSheet: TEditOrdersGroupModalSheet | null;
     setEditOrdersGroupModalSheet: (state: TEditOrdersGroupModalSheet | null) => void;

     deleteOrdersGroupModalSheet: TDeleteOrdersGroupModalSheet | null;
     setDeleteOrdersGroupModalSheet: (state: TDeleteOrdersGroupModalSheet | null) => void;

     customersSearchModalSheet: TcustomersSearchModalSheet | null;
     setCustomersSearchModalSheet: (state: TcustomersSearchModalSheet | null) => void;

     confirmLogoutModal: boolean;
     setConfirmLogoutModal: (state: boolean) => void;

     dividedOrdersModal: boolean;
     setDividedOrdersModal: (state: boolean) => void;

     isPercentQuantityOrderModal: boolean;
     setIsPercentQuantityOrderModal: (isPercentQuantityOrderModal: boolean) => void;

     addSymbolToWatchlistModal: boolean;
     setAddSymbolToWatchlistModal: (state: boolean) => void;

     createNewWatchlistModal: boolean;
     setCreateNewWatchlistModal: (state: boolean) => void;

     createNewCustomerGroupModal: boolean;
     setCreateNewCustomerGroupModal: (state: boolean) => void;

     addCustomersToGroupModal: TAddCustomersToGroupModal | null;
     setAddCustomersToGroupModal: (state: TAddCustomersToGroupModal | null) => void;

     manageCustomerGroupModal: boolean;
     setManageCustomerGroupModal: (state: boolean) => void;

     editCustomerGroupModal: TEditCustomerGroupModal | null;
     setEditCustomerGroupModal: (state: TEditCustomerGroupModal | null) => void;

     deleteCustomerGroupModal: TDeleteCustomerGroupModal | null;
     setDeleteCustomerGroupModal: (state: TDeleteCustomerGroupModal | null) => void;

     portfolioCustomerModal: TPortfolioCustomerModal | null;
     setPortfolioCustomerModal: (state: TPortfolioCustomerModal | null) => void;

     manageBasketOrderModal: TManageBasketOrderModal;
     setManageBasketOrderModal: (state: TManageBasketOrderModal) => void;

     createNewBasketModal: boolean;
     setCreateNewBasketModal: (state: boolean) => void;

     editBasketOrderModal: TEditBasketOrderModal | null;
     setEditBasketOrderModal: (state: TEditBasketOrderModal | null) => void;

     addOrderToBasketModal: TAddOrderToBasketModal | null;
     setAddOrderToBasketModal: (state: TAddOrderToBasketModal | null) => void;

     confirmDeleteBasketOrderModal: TConfirmDeleteBasketOrderModal | null;
     setConfirmDeleteBasketOrderModal: (state: TConfirmDeleteBasketOrderModal | null) => void;
}
