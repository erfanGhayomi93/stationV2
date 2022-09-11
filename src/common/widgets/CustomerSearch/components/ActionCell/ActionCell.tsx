import { MoreDotsIcon, PortfolioDetailIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

const actionCellRenderer = ({ data }: { data: IGoCustomerSearchResult }) => {
    const { setState, state } = useCustomerSearchState();

    const showDetailModal = (data: IGoCustomerSearchResult) => {
        setState((prev) => ({ ...prev, detailModalData: data }));
    };
    const showActionModal = (data: IGoCustomerSearchResult) => {
        setState((prev) => ({ ...prev, actionModalData: data }));
    };
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <button onClick={() => showDetailModal(data)} className=" bg-[#C6D8E7] px-1.5 py-1 rounded-md">
                <MoreDotsIcon className="text-[#135CA4]" />
            </button>
            <button onClick={() => showActionModal(data)} className="">
                <PortfolioDetailIcon className="text-[#135CA4]" />
            </button>
        </div>
    );
};

export default actionCellRenderer;
