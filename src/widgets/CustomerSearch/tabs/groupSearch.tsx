import clsx from 'clsx';
import { useMemo, MouseEvent, useEffect } from 'react';
import { useGroupCustomer, useGroupDefault } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import ResultHeader from '../components/ResultItem/ResultHeader';
import GroupItem from '../components/ResultItem/groupItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';

const GroupSearch = () => {
    const { state: { params } } = useCustomerSearchState();
    const debouncedTerm = useDebounce(params.term, 500);

    const { data: defaultGroups, refetch: refetchDefaultGroups, remove: removeDefaultGroups } = useGroupDefault({
        enabled: false
    })

    const { data: searchGroups, isFetching ,refetch : refetchCustomers } = useGroupCustomer(
        { term: debouncedTerm },
        {
            onSuccess() {
                if (!!defaultGroups) {
                    removeDefaultGroups()
                }
            }
        }
    );


    const addToFavoriteList = (e: MouseEvent<SVGSVGElement>, id: string) => {
        e.preventDefault()
    }

    const refetchToggleFavorite = () => {
        !!defaultGroups ? refetchDefaultGroups() : refetchCustomers()
    }

    const rowUI = useMemo(() => {
        const listGroups = defaultGroups || searchGroups
        if (!listGroups) return null
        return listGroups
            .map((item, ind) => (
                <GroupItem
                    key={ind}
                    ind={ind}
                    customer={item}
                    addToFavoriteList={addToFavoriteList}
                    refetchToggleFavorite={refetchToggleFavorite}
                />
            ))
    }, [searchGroups, defaultGroups])


    useEffect(() => {
        if ((params.term as string).length < 2)
            refetchDefaultGroups()
    }, [])


    return (
        <div className="w-full h-full grid gap-2 text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 justify-between py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200">
                    <div className="">
                        <SearchInput placeholder='نام گروه / نام مشتری / کدملی / کدبورسی' />
                    </div>

                    <div className={clsx('duration-200', isFetching ? '' : 'scale-0')}>
                        {/* <SpinnerIcon className="animate-spin text-L-primary-50 dark:text-D-primary-50" /> */}
                    </div>
                </div>
                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader />

                    <div className='overflow-y-auto h-full relative'>
                        <div className='h-full w-full absolute top-0'>
                            {rowUI}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default GroupSearch;
