import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { MoreDotsIcon, PortfolioDetailIcon, StarIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import clsx from 'clsx';

const ActionCellRenderer: FC<IGoMultiCustomerType> = (data) => {
    const { setState } = useCustomerSearchState();

    const showDetailModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isDetailModalOpen: true, detailModalData: data }));
    };

    const showPortfolioModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: true, detailModalData: data }));
    };
    
    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <Tippy content="لیست دلخواه" className="text-xs">
                <button
                onClick={() => showDetailModal(data)}
                >
                    <StarIcon className={clsx({
                        "text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": true
                    })} />
                </button>
            </Tippy>

            <Tippy content="اطلاعات مشتری" className="text-xs">
                <button
                    onClick={() => showDetailModal(data)}>
                    <MoreDotsIcon width={14} height={14} className="text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 rotate-90" />
                </button>
            </Tippy>

            <Tippy content="پرتفوی مشتری" className="text-xs">
                <button
                    onClick={() => showPortfolioModal(data)}>
                    <PortfolioDetailIcon className="hover:text-L-primary-50 hover:dark:text-D-primary-50 text-L-gray-600 dark:text-D-gray-600" />
                </button>
            </Tippy>


        </div>
    );
};

export default ActionCellRenderer;
