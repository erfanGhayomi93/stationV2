import { useEffect, useMemo, useState } from 'react';
import { useGroupCustomer, useGroupDefault } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import ResultHeader from '../components/ResultItem/ResultHeader';
import GroupItem from '../components/ResultItem/groupItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import Tippy from '@tippyjs/react';
import { Refresh2Icon } from 'src/common/icons';
import dayjs from 'dayjs';
import ipcMain from 'src/common/classes/IpcMain';

const GroupSearch = () => {
    const { state: { params } } = useCustomerSearchState();
    const debouncedTerm = useDebounce(params.term, 500);
    const [timeRefresh, setTimeRefresh] = useState<dayjs.Dayjs>(dayjs())

    const isDefaultUse = useMemo(() => !params.term?.length, [params.term])




    const { data: defaultGroups, refetch: refetchDefaultGroups, remove: removeDefaultGroups, isFetching: isFetchingDefault } = useGroupDefault({
        enabled: isDefaultUse,
        onSuccess() {
            setTimeRefresh(dayjs())
        }
    })

    const { data: searchGroups, isFetching: isFetchingSearch, refetch: refetchCustomers } = useGroupCustomer(
        { term: debouncedTerm },
        {
            onSuccess() {
                setTimeRefresh(dayjs())

                if (!!defaultGroups) {
                    removeDefaultGroups()
                }
            }
        }
    );



    const refetchToggleFavorite = () => {
        isDefaultUse ? refetchDefaultGroups() : refetchCustomers()
    }


    const rowUI = useMemo(() => {
        let listGroups = isDefaultUse ? defaultGroups : searchGroups
        if (!listGroups) listGroups = []
        return listGroups
            .map((item, ind) => (
                <GroupItem
                    key={ind}
                    ind={ind}
                    customer={item}
                    refetchToggleFavorite={refetchToggleFavorite}
                />
            ))
    }, [searchGroups, defaultGroups, isDefaultUse])

    useEffect(() => {
        ipcMain.handle("update_customer", refetchToggleFavorite)

        return () => ipcMain.removeHandler("update_customer")
    }, [])


    return (
        <div className="w-full h-full grid gap-2 text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200 flex items-center justify-between w-100">
                    <div className="">
                        <SearchInput placeholder='نام گروه / نام مشتری / کدملی / کدبورسی' />
                    </div>
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
                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader />

                    <div className='overflow-y-auto h-full relative'>
                        <div className='h-full w-full absolute top-0'>
                            <WidgetLoading spining={isFetchingDefault || isFetchingSearch}>
                                {rowUI}
                            </WidgetLoading>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default GroupSearch;
