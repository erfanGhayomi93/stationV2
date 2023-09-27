import clsx from 'clsx';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useAdvancedSearchQuery, useGetCustomers } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';

const CustomerSearch = () => {
    const { t } = useTranslation();
    const { state: { params: { term } } } = useCustomerSearchState();
    const debouncedTerm = useDebounce(term, 500);
    const [customerType, setCustomerType] = useState("")

    const { data: defaultCustomers, refetch: refetchDefaultCustomer, remove: removeDefaultCustomers } = useGetCustomers({}, {
        enabled: false,
    })

    const { data: searchCustomers, isFetching, refetch: refetchCustomers } = useAdvancedSearchQuery(
        { term: debouncedTerm },
        {
            onSuccess() {
                if (!!defaultCustomers) {
                    removeDefaultCustomers()
                }
            },
        }
    );

    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-[#d2e3fa] dark:hover:bg-[#474d57]" {...props}></div>;
    };

    const refetchToggleFavorite = () => {
        !!defaultCustomers ? refetchDefaultCustomer() : refetchCustomers()
    }


    const rowUI = useMemo(() => {
        let listGroups = defaultCustomers || searchCustomers

        if (!listGroups) return null
        else if (customerType) {
            listGroups = listGroups.filter(item => item.customerType === customerType)
        }

        return <Virtuoso
            data={listGroups}
            className="rounded-lg rounded-t-none"
            itemContent={(index, data) => data ? <ResultItem
                key={index}
                data={data}
                refetchToggleFavorite={refetchToggleFavorite}
            /> : null}
            components={{
                Item: ItemRenderer,
            }}
        />

    }, [searchCustomers, defaultCustomers, customerType])


    useEffect(() => {
        if ((term as string)?.length < 2)
            refetchDefaultCustomer()
    }, [])


    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 justify-between py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200">
                    <div className="flex gap-6 flex-1">
                        <SearchInput placeholder='نام مشتری / کدملی / کدبورسی' />

                        <div className='w-[100px]'>
                            <Select
                                onChange={(selected) => setCustomerType(selected)}
                                value={customerType}
                                options={[
                                    { value: "", label: 'همه' },
                                    { value: "Natural", label: t('CustomerType.Natural') },
                                    { value: "Legal", label: t('CustomerType.Legal') },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={clsx('duration-200', isFetching ? '' : 'scale-0')}>
                        {/* <SpinnerIcon className="animate-spin text-L-primary-50 dark:text-D-primary-50" /> */}
                    </div>
                </div>
                <div className="h-full flex flex-col">
                    <ResultHeader />

                    {rowUI}

                </div>
            </div>
        </div>
    );
};

export default CustomerSearch;
