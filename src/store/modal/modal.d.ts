type TEditOrdersGroupModalSheet = {
     side: TSide;
     symbolTitle: string;
     data: IOpenOrder[];
};

interface IModalStore {
     editOrdersGroupModalSheet: TEditOrdersGroupModalSheet | null;
     setEditOrdersGroupModalSheet: (state: TEditOrdersGroupModalSheet | null) => void;
}
