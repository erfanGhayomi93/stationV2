type TEditOrdersGroupModalSheet = {
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

     customersSearchModalSheet: TcustomersSearchModalSheet | null;
     setCustomersSearchModalSheet: (state: TcustomersSearchModalSheet | null) => void;
}
