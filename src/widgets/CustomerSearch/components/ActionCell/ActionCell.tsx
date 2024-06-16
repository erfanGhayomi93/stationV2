import Tippy from '@tippyjs/react';
import { FC } from 'react';
import { DeleteIcon, MoreDotsIcon, PlusIcon, StarIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import clsx from 'clsx';
import { useMutationToggleFavorite } from 'src/app/queries/customer';
import ipcMain from 'src/common/classes/IpcMain';

const ActionCellRenderer: FC<{ customer: IGoMultiCustomerType, refetchToggleFavorite: (customerIsin: string) => void }> = ({ customer: data, refetchToggleFavorite }) => {
    const { state: { activeTab }, setState } = useCustomerSearchState();

    const { mutate } = useMutationToggleFavorite({
        onSuccess() {
            refetchToggleFavorite(data.customerISIN)
        },
    })

    const showDetailModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isDetailModalOpen: true, detailModalData: data }));
    };

    // const showPortfolioModal = (data: IGoMultiCustomerType) => {
    //     setState((prev) => ({ ...prev, isPortfolioModalOpen: true, detailModalData: data }));
    // };

    const handleFavorite = (data: IGoMultiCustomerType) => {
        mutate({ customerIsin: data.customerISIN, isFavorite: !data.isFavorite })
    }

    const openManagementMyGroupModal = (data: IGoMultiCustomerType) => {
        setState((prev) => ({ ...prev, isManagementMyGroupOpen: true, detailsManagementGroup: [data] }));
    }

    return (
        <div className="flex items-center justify-center gap-2 py-2 h-full">
            {
                activeTab === 'MyGroup' && (
                    <Tippy hideOnClick={false} content="حذف از گروه های من" className="text-xs">
                        <button
                            onClick={() => ipcMain.send('remove_customer_from_myGroup' , data)}
                        >
                            <DeleteIcon
                                width={15}
                                height={15}
                                className={clsx(
                                    "text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50",
                                )} />
                        </button>
                    </Tippy>
                )
            }


            <Tippy hideOnClick={false} content="اضافه به گروه های من" className="text-xs">
                <button
                    onClick={() => openManagementMyGroupModal(data)}
                >
                    <PlusIcon className={clsx(
                        "w-[1.35rem] h-[1.35rem] text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50",
                    )} />
                </button>
            </Tippy>

            <Tippy hideOnClick={false} content="اضافه به لیست دلخواه" className="text-xs">
                <button
                    onClick={() => handleFavorite(data)}
                >
                    <StarIcon className={clsx({
                        "w-[1.35rem] h-[1.35rem] text-L-gray-400 dark:text-D-gray-400 hover:text-L-primary-50 hover:dark:text-D-primary-50": !data.isFavorite,
                        "w-[1.35rem] h-[1.35rem] text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50": data.isFavorite,
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
                    <MoreDotsIcon className="w-3.5 h-3.5 text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 rotate-90" />
                </button>
            </Tippy>

            {/* <Tippy
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
                    <PortfolioDetailIcon className="w-[1.13rem] h-[1.13rem] hover:text-L-primary-50 hover:dark:text-D-primary-50 text-L-gray-600 dark:text-D-gray-600" />
                </button>
            </Tippy> */}
        </div >
    );
};

export default ActionCellRenderer;