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

interface IModalStore {
     editOrdersGroupModalSheet: TEditOrdersGroupModalSheet | null;
     setEditOrdersGroupModalSheet: (state: TEditOrdersGroupModalSheet | null) => void;

     deleteOrdersGroupModalSheet: TDeleteOrdersGroupModalSheet | null;
     setDeleteOrdersGroupModalSheet: (state: TDeleteOrdersGroupModalSheet | null) => void;

     customersSearchModalSheet: TcustomersSearchModalSheet | null;
     setCustomersSearchModalSheet: (state: TcustomersSearchModalSheet | null) => void;

     confirmLogoutModal: boolean;
     setConfirmLogoutModal: (state: boolean) => void;

     isPercentQuantityOrderModal: boolean;
     setIsPercentQuantityOrderModal: (isPercentQuantityOrderModal: boolean) => void;

     addSymbolToWatchlistModal: boolean;
     setAddSymbolToWatchlistModal: (state: boolean) => void;

     createNewWatchlistModal: boolean;
     setCreateNewWatchlistModal: (state: boolean) => void;

     createNewCustomerGroupModal: boolean;
     setCreateNewCustomerGroupModal: (state: boolean) => void;
}
