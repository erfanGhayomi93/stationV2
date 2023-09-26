import clsx from 'clsx';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useAdvancedSearchQuery } from 'src/app/queries/customer';
import { CounterBalloon } from 'src/common/components/CounterBalloon/CounterBalloon';
import useDebounce from 'src/common/hooks/useDebounce';
import { SpinnerIcon } from 'src/common/icons';
import { useAppSelector } from 'src/redux/hooks';
import Select from 'src/common/components/Select';
import ResultHeader from '../components/ResultItem/ResultHeader';
import ResultItem from '../components/ResultItem/ResultItem';
import { useCustomerSearchState } from '../context/CustomerSearchContext';
import SearchInput from '../components/SearchInput';
import { getSelectedCustomers } from 'src/redux/slices/option';

const SelectedList = () => {
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    // const [type, setType] = useState<ICustomerMultiTypeType>('Natural');
    const debouncedTerm = useDebounce(state.params.term, 500);

    const [customerType, setCustomerType] = useState("")
    const selectedCustomers = useAppSelector(getSelectedCustomers);




    useEffect(() => {
        console.log("selectedCustomers", selectedCustomers)
    }, [selectedCustomers])



    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-100 even:dark:bg-D-gray-100 hover:bg-[#d2e3fa] dark:hover:bg-[#474d57]" {...props}></div>;
    };

    const filteredData = useMemo(() => {
        if (!selectedCustomers) return []
        else if (!customerType) return selectedCustomers
        return selectedCustomers.filter(item => item.customerType === customerType)
    }, [selectedCustomers, customerType])

    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded-lg py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 justify-between py-2 px-4 w-full rounded bg-L-gray-200 dark:bg-D-gray-200">
                    <div className="flex gap-6 flex-1">
                        <SearchInput placeholder='نام مشتری' />

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

                    <div className='overflow-y-auto h-full relative'>
                        <div className='h-full w-full absolute top-0'>
                            {
                                filteredData?.map((data, index) => (
                                    <ResultItem
                                        key={index}
                                        data={data}
                                    // onSelectionChanged={onSelectionChanged}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    {/* <Virtuoso
                        data={filteredData}
                        className="rounded-lg rounded-t-none"
                        itemContent={(index, data) => data ? <ResultItem
                            key={index}
                            data={data}
                        /> : null}
                        components={{
                            Item: ItemRenderer,
                        }}
                    /> */}

                </div>
            </div>
        </div>
    );
};

export default SelectedList;
