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
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers, setAllSelectedCustomers, setAllSelectedCustomersWithPrevious } from 'src/redux/slices/option';
import { compareArrays, removeDuplicatesCustomerISINs } from 'src/utils/helpers';

const MyGroup = () => {
    //
    const { state: { params } } = useCustomerSearchState();

    const dispatch = useAppDispatch()

    const { setState } = useCustomerSearchState()

    const debouncedTerm = useDebounce(params.term, 500);

    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs())

    const isDefaultUse = useMemo(() => !params.term?.length, [params.term])

    const selectedCustomers = useAppSelector(getSelectedCustomers);

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

    const listGroups = useMemo(() => isDefaultUse ? myGroup : searchGroups, [isDefaultUse, myGroup, searchGroups])

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
        if (data.parentId !== undefined) {
            mutateRemove({
                groupId: data.parentId,
                customerISINs: [data.customerISIN]
            })
        } else {
            onErrorNotif({ title: 'مشکل در دیتا به وجود امده است' })
        }
    }

    const refetchToggleFavorite = () => {
        isDefaultUse ? refetchMyGroup() : refetchCustomers()
    }

    const isGroupChecked = (id: number) => {
        if (selectedCustomers.length === 0 || !selectedCustomers) return false

        const findCustomer = listGroups?.find(item => item.id === id)

        const customerISINs = findCustomer?.children?.map(item => item.customerISIN)
        if (!customerISINs) return false


        const selectedCustomeISINs = selectedCustomers.map(item => item.customerISIN)

        return customerISINs?.every(item => selectedCustomeISINs.includes(item))
    }

    const onGroupSelectionChanged = (checked: boolean, id: number) => {
        const findCustomer = listGroups?.find(item => item.id === id)

        if (!findCustomer?.children?.length) return

        if (checked) {
            dispatch(setAllSelectedCustomersWithPrevious(findCustomer.children))
            return
        }

        const customerISINUnChecked = findCustomer.children.map(item => item.customerISIN)

        const detectCustomer = selectedCustomers.filter(item => {
            if (customerISINUnChecked.includes(item.customerISIN)) return false
            return true
        })

        dispatch(setAllSelectedCustomers(detectCustomer))
    }


    const rowUI = useMemo(() => !listGroups?.length ? null : listGroups
        ?.map((item, ind) => (
            <GroupItem<IUpdateMyGroup>
                key={ind}
                ind={ind}
                customer={item}
                refetchToggleFavorite={refetchToggleFavorite}
                getLable={(v) => v.groupName}
                getChildren={(v) => v.children}
                getId={(v) => v.id}
                isGroupChecked={isGroupChecked}
                onGroupSelectionChanged={onGroupSelectionChanged}
            />
        )), [myGroup, isDefaultUse, isGroupChecked, onGroupSelectionChanged, selectedCustomers])

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

    const isALLSelected = useMemo(() => {
        //
        const customerISINsList = removeDuplicatesCustomerISINs(listGroups || [])?.flatMap(item => item.children).map(item => item?.customerISIN)
        const customerISINsSelected = selectedCustomers.map(item => item.customerISIN);

        return compareArrays(customerISINsList, customerISINsSelected)
    }, [listGroups, selectedCustomers])

    const onALLSelectionChanged = (checked: boolean) => {
        if (!listGroups) return

        const res = listGroups?.flatMap(item => item?.children || [])

        checked && res && dispatch(setAllSelectedCustomersWithPrevious(res))

        const customerISINs = res.map(item => item.customerISIN)

        const final = selectedCustomers.filter(item => {
            if (customerISINs.includes(item.customerISIN)) return false
            return true
        })
        // 
        !checked && dispatch(setAllSelectedCustomers(final))
    }




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
                    <ResultHeader
                        isAllSelected={isALLSelected}
                        onALLSelectionChanged={onALLSelectionChanged}
                    />

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
