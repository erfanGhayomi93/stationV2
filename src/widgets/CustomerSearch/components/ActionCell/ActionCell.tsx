import { FC } from 'react';
import { MoreDotsIcon, PortfolioDetailIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

const ActionCellRenderer: FC<IGoCustomerSearchResult> = (data) => {
    const { setState, state } = useCustomerSearchState();

    const showDetailModal = (data: IGoCustomerSearchResult) => {
        setState((prev) => ({ ...prev, detailModalData: data }));
    };
    const showActionModal = (data: IGoCustomerSearchResult) => {
        setState((prev) => ({ ...prev, actionModalData: data }));
    };
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <button onClick={() => showDetailModal(data)} className="dark:bg-D-gray-350 bg-L-gray-350 px-1.5 py-1 rounded-md">
                <MoreDotsIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
            <button onClick={() => showActionModal(data)} className="">
                <PortfolioDetailIcon className="text-L-primary-50 dark:text-D-primary-50" />
            </button>
        </div>
    );
};

export default ActionCellRenderer;
