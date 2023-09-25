import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { MoreDotsIcon, PortfolioDetailIcon, StarIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import clsx from 'clsx';
import { useMutationToggleFavorite } from 'src/app/queries/customer';
import { queryClient } from 'src/app/queryClient';
import { toggleFavoriteSelectedCustomer } from 'src/redux/slices/option';
import { useAppDispatch } from 'src/redux/hooks';   

const ActionCellRenderer: FC<IGoMultiCustomerType> = (data) => {
    const { setState, state: { params: { term }, activeTab } } = useCustomerSearchState();
    const dispatch = useAppDispatch()

    const { mutate } = useMutationToggleFavorite({
        onSuccess() {
            activeTab === "Customers" && queryClient.invalidateQueries(["advancedSearchCustomer", term])
            activeTab === "GroupCustomer" && queryClient.invalidateQueries(["advancedSearchGroup", term])
            activeTab === "FavoriteList" && queryClient.invalidateQueries(["getDefaultCustomer"])
            activeTab === "SelectedList" && dispatch(toggleFavoriteSelectedCustomer(data.customerISIN))
        },
    })

    const showDetailModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isDetailModalOpen: true, detailModalData: data }));
    };

    const showPortfolioModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: true, detailModalData: data }));
    };

    const handleFavorite = (data: IGoMultiCustomerType) => {
        mutate({ customerIsin: data.customerISIN, isFavorite: !data.isFavorite })
    }

    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            <Tippy content="اضافه به لیست دلخواه" className="text-xs">
                <button
                    onClick={() => handleFavorite(data)}
                >
                    <StarIcon className={clsx({
                        "text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": !data.isFavorite,
                        "text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50": data.isFavorite,
                    })} />
                </button>
            </Tippy>

            <Tippy content="اطلاعات مشتری" className="text-xs">
                <button
                    onClick={() => showDetailModal(data)}
                >
                    <MoreDotsIcon width={14} height={14} className="text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 rotate-90" />
                </button>
            </Tippy>

            <Tippy content="پرتفوی مشتری" className="text-xs">
                <button
                    onClick={() => showPortfolioModal(data)}
                >
                    <PortfolioDetailIcon className="hover:text-L-primary-50 hover:dark:text-D-primary-50 text-L-gray-600 dark:text-D-gray-600" />
                </button>
            </Tippy>
        </div>
    );
};

export default ActionCellRenderer;
