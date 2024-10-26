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
}
