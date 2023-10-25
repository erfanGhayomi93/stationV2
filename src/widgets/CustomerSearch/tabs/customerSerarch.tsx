import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useAdvancedSearchQuery, useGetCustomers } from 'src/app/queries/customer';
import useDebounce from 'src/common/hooks/useDebounce';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import WidgetLoading from 'src/common/components/WidgetLoading';

const CustomerSearch = () => {
    const { t } = useTranslation();
    const { state: { params: { term } } } = useCustomerSearchState();
    const debouncedTerm = useDebounce(term, 500);
    const [customerType, setCustomerType] = useState("")

    const isDefaultUse = useMemo(() => !term?.length, [term])


    const { data: defaultCustomers, refetch: refetchDefaultCustomer, remove: removeDefaultCustomers, isFetching: isFetchingDefault } = useGetCustomers({}, {
        enabled: isDefaultUse,
    })

    const { data: searchCustomers, refetch: refetchCustomers, isFetching: isFetchingSearch } = useAdvancedSearchQuery(
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
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-L-primary-100 dark:hover:bg-D-primary-100" {...props}></div>;
    };

    const refetchToggleFavorite = () => {
        isDefaultUse ? refetchDefaultCustomer() : refetchCustomers()
    }


    const rowUI = useMemo(() => {
        let listGroups = isDefaultUse ? defaultCustomers : searchCustomers

        if (!listGroups) listGroups = []
        else if (customerType) {
            listGroups = listGroups.filter(item => item.customerType === customerType)
        }

        return <Virtuoso
            data={listGroups}
            className="rounded-lg rounded-t-none"
            itemContent={(index, data) =>
                <ResultItem
                    key={index}
                    data={data}
                    refetchToggleFavorite={refetchToggleFavorite}
                />
            }
            components={{
                Item: ItemRenderer,
            }}
            totalCount={listGroups.length}
        />

    }, [searchCustomers, defaultCustomers, customerType, isDefaultUse])



    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2">
                <div className="flex gap-2 py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200">
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
                </div>

                <div className="grid grid-rows-min-one h-full">
                    <ResultHeader />

                    <WidgetLoading spining={isFetchingSearch || isFetchingDefault}>
                        {rowUI}
                    </WidgetLoading>
                </div>
            </div>
        </div>
    );
};

export default CustomerSearch;
