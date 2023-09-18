import clsx from 'clsx';
import { useState, useMemo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedVirtuoso, Virtuoso } from 'react-virtuoso';
import { useGroupCustomer } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import ResultHeader from '../components/ResultItem/ResultHeader';
import GroupItem from '../components/ResultItem/groupItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';

const GroupSearch = () => {
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const debouncedTerm = useDebounce(state.params.term, 500);
    const [customerType, setCustomerType] = useState("")
    const { data: groups, isFetching } = useGroupCustomer(
        { term: debouncedTerm },
    );

    const filteredData = useMemo(() => {
        if (!groups) return []
        else if (!customerType) return groups
        return groups.filter(item => item.customerType === customerType)
    }, [groups, customerType])

    const addToFavoriteList = (e: MouseEvent<SVGSVGElement>, id: string) => {
        e.preventDefault()
    }


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

                    <div className='overflow-y-auto h-full max-h-[307px]'>
                        {
                            filteredData.map((item, ind) => (
                                <GroupItem
                                    key={ind}
                                    ind={ind}
                                    customer={item}
                                    addToFavoriteList={addToFavoriteList}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default GroupSearch;
