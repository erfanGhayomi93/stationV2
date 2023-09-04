import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { MoreDotsIcon, PortfolioDetailIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

const ActionCellRenderer: FC<IGoMultiCustomerType> = (data) => {
    const { setState, state } = useCustomerSearchState();

    const showDetailModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isDetailModalOpen: true,detailModalData: data }));
    };
    const showPortfolioModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen:true,detailModalData: data }));
    };
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <Tippy content="اطلاعات مشتری" className="text-xs">
                <button onClick={() => showDetailModal(data)} className="dark:bg-D-gray-400 bg-L-gray-400 px-1.5 py-1 rounded-md">
                    <MoreDotsIcon className="text-L-primary-50 dark:text-D-primary-50" />
                </button>
            </Tippy>
            <Tippy content="پرتفوی مشتری" className="text-xs">
                <button onClick={() => showPortfolioModal(data)} className="">
                    <PortfolioDetailIcon className="text-L-primary-50 dark:text-D-primary-50" />
                </button>
            </Tippy>
        </div>
    );
};

export default ActionCellRenderer;
