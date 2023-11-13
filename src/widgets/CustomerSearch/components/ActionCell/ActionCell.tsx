import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { MoreDotsIcon, PortfolioDetailIcon, StarIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import clsx from 'clsx';
import { useMutationToggleFavorite } from 'src/app/queries/customer';

const ActionCellRenderer: FC<{ customer: IGoMultiCustomerType, refetchToggleFavorite: (customerIsin: string) => void }> = ({ customer: data, refetchToggleFavorite }) => {
    const { setState } = useCustomerSearchState();

    const { mutate } = useMutationToggleFavorite({
        onSuccess() {
            refetchToggleFavorite(data.customerISIN)
            // console.log("checking render")
            // activeTab === "Customers" && queryClient.invalidateQueries(["advancedSearchCustomer", term])
            // activeTab === "GroupCustomer" && queryClient.invalidateQueries(["advancedSearchGroup", term])
            // activeTab === "FavoriteList" && queryClient.invalidateQueries(["getDefaultCustomer"])
            // activeTab === "SelectedList" && dispatch(toggleFavoriteSelectedCustomer(data.customerISIN))
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
            <Tippy hideOnClick={false} content="اضافه به لیست دلخواه" className="text-xs">
                <button
                    onClick={() => handleFavorite(data)}
                >
                    <StarIcon className={clsx({
                        "text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": !data.isFavorite,
                        "text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50": data.isFavorite,
                    })} />
                </button>
            </Tippy>

            <Tippy
                onShow={(instance) => {
                    let clear = setTimeout(() => {
                        instance.hide();
                        clearTimeout(clear)
                    }, 2000)
                }}
                content="اطلاعات مشتری"
                className="text-xs"
            >
                <button
                    onClick={() => showDetailModal(data)}
                >
                    <MoreDotsIcon width={14} height={14} className="text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 rotate-90" />
                </button>
            </Tippy>

            <Tippy
                onShow={(instance) => {
                    let clear = setTimeout(() => {
                        instance.hide();
                        clearTimeout(clear)
                    }, 2000)
                }}
                content="پرتفوی مشتری"
                className="text-xs"
            >
                <button
                    onClick={() => showPortfolioModal(data)}
                >
                    <PortfolioDetailIcon className="hover:text-L-primary-50 hover:dark:text-D-primary-50 text-L-gray-600 dark:text-D-gray-600" />
                </button>
            </Tippy>
        </div >
    );
};

export default ActionCellRenderer;
