import { useEffect, useMemo, useState } from 'react';
import { removeCustomerToMyGroupMutation, useMyGroup, useMyGroupSearchCustomer } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import ResultHeader from '../components/ResultItem/ResultHeader';
import GroupItem from '../components/ResultItem/groupItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import Tippy from '@tippyjs/react';
import { EditIcon, Refresh2Icon } from 'src/common/icons';
import dayjs from 'dayjs';
import ipcMain from 'src/common/classes/IpcMain';
import { onSuccessNotif } from 'src/handlers/notification';

const MyGroup = () => {
    //
    const { state: { params } } = useCustomerSearchState();

    const { setState } = useCustomerSearchState()

    const debouncedTerm = useDebounce(params.term, 500);

    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs())

    const isDefaultUse = useMemo(() => !params.term?.length, [params.term])



    const { data: myGroup, refetch: refetchMyGroup, remove: removeMyGroup, isFetching: isFetchingMyGroup } = useMyGroup({
        enabled: isDefaultUse,
        onSuccess() {
            setTimeRefresh(dayjs())
        },
        select: data =>
            data.map(item => ({
                ...item,
                ...(item.children && {
                    children: item.children.map(child => ({
                        ...child,
                        parentId: item.id
                    }))
                })
            }))
    })


    const { data: searchGroups, isFetching: isFetchingSearch, refetch: refetchCustomers } = useMyGroupSearchCustomer(
        { term: debouncedTerm },
        {
            onSuccess() {
                setTimeRefresh(dayjs())

                if (!!myGroup) {
                    removeMyGroup()
                }
            },
            select: data =>
                data.map(item => ({
                    ...item,
                    ...(item.children && {
                        children: item.children.map(child => ({
                            ...child,
                            parentId: item.id
                        }))
                    })
                }))
        }
    );

    const { mutate: mutateRemove } = removeCustomerToMyGroupMutation({
        onSuccess() {
            //
            onSuccessNotif({ title: 'مشتری با موفقیت از گروه موردنظر حذف شد' })

            const clear = setTimeout(() => {
                refetchToggleFavorite()
                clearTimeout(clear)
            }, 1000);

        },
    })

    const openModal = () => {
        setState(prev => ({
            ...prev,
            isManagementMyGroupOpen: true
        }))
    }

    const removeCustomerFromMyGroup = (data: IGoMultiCustomerType) => {
        if (data.parentId) {
            mutateRemove({
                groupId: data.parentId,
                customerISINs: [data.customerISIN]
            })
        }
    }

    const refetchToggleFavorite = () => {
        isDefaultUse ? refetchMyGroup() : refetchCustomers()
    }


    const rowUI = useMemo(() => {
        let listGroups = isDefaultUse ? myGroup : searchGroups
        if (!listGroups) listGroups = []
        return listGroups
            ?.map((item, ind) => (
                <GroupItem<IUpdateMyGroup>
                    key={ind}
                    ind={ind}
                    customer={item}
                    refetchToggleFavorite={refetchToggleFavorite}
                    getLable={(v) => v.groupName}
                    getChildren={(v) => v.children}
                />
            ))
    }, [myGroup, isDefaultUse])

    useEffect(() => {
        ipcMain.handle("update_customer", refetchToggleFavorite)

        return () => ipcMain.removeChannel("update_customer")
    }, [])

    useEffect(() => {
        ipcMain.handle('remove_customer_from_myGroup', removeCustomerFromMyGroup)

        return () => {
            ipcMain.removeHandler('remove_customer_from_myGroup', removeCustomerFromMyGroup)
        }
    }, [])




    return (
        <div className="w-full h-full grid gap-2 text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200 flex items-center justify-between w-100">
                    <div className="">
                        <SearchInput placeholder='نام گروه / نام مشتری / کدملی / کدبورسی' />
                    </div>
                    <div className='flex items-center gap-x-4'>

                        <button
                            className="shadow-sm flex items-center gap-2 py-1.5 drop-shadow-sm px-2  text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 p-1 text-1.3 rounded-md"
                            onClick={openModal}
                        >
                            <EditIcon />
                            مدیریت گروه‌های من
                        </button>

                        <div
                            onClick={refetchToggleFavorite}
                            className='cursor-pointer select-none'
                        >
                            <Tippy hideOnClick={false} content={
                                <div className='flex flex-col gap-1'>
                                    <span>آخـرین بـروز رســانی</span>
                                    <span>{timeRefresh.calendar("jalali").format("HH:mm  YYYY/MM/DD")}</span>
                                </div>
                            }>
                                <div className='select-none'>
                                    <Refresh2Icon />
                                </div>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader />

                    <div className='overflow-y-auto h-full relative'>
                        <div className='h-full w-full absolute top-0'>
                            <WidgetLoading spining={isFetchingMyGroup || isFetchingSearch}>
                                {rowUI}
                            </WidgetLoading>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyGroup;
