import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';
import { useDefaultCustomerList, useMultiCustomerListQuery } from 'src/app/queries/customer';
import { CounterBalloon } from 'src/common/components/CounterBalloon/CounterBalloon';
import useDebounce from 'src/common/hooks/useDebounce';
import { SpinnerIcon } from 'src/common/icons';
import { useAppValues } from 'src/redux/hooks';
import ResultHeader from './components/ResultItem/ResultHeader';
import ResultItem from './components/ResultItem/ResultItem';
import { useCustomerSearchState } from './context/CustomerSearchContext';

const CustomerSearch = () => {
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const [type, setType] = useState<ICustomerMultiTypeType>('Natural');
    const debouncedTerm = useDebounce(state.params.term, 500);
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const { data: groupedCustomer, isFetching } = useMultiCustomerListQuery(
        { term: debouncedTerm },
        {
            select: (data) => {
                const Legal = data.filter((item) => item.customerType === 'Legal');
                const Natural = data.filter((item) => item.customerType === 'Natural');
                const CustomerTag = data.filter((item) => item.customerType === 'CustomerTag');
                const GTCustomerGroup = data.filter((item) => item.customerType === 'GTCustomerGroup');
                return {
                    Legal,
                    Natural,
                    CustomerTag,
                    GTCustomerGroup,
                };
            },
        },
    );
    const { data: defaultCustomer } = useDefaultCustomerList();

    const types: ICustomerMultiTypeType[] = ['Natural', 'Legal', 'CustomerTag', 'GTCustomerGroup'];
    // const typeCounts = useMemo(() => data?.pages[data?.pages.length - 1].typeCounts, [data]);

    // const setParams = (type: ICustomerMultiTypeType) => {
    //     setState((prev) => ({ ...prev, params: { ...prev.params, type: type }, isSelectedActive: false }));
    // };

    const toggleSelection = (isActive: boolean) => {
        setState((prev) => ({ ...prev, isSelectedActive: isActive }));
    };

    const handleSetType = (value: ICustomerMultiTypeType) => {
        setType(value);
        setState((prev) => ({ ...prev, isSelectedActive: false }));
    };

    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300" {...props}></div>;
    };
    //
    return (
        <div className="w-full h-full grid gap-2  overflow-y-auto text-1.2">
            <div className="bg-L-basic dark:bg-D-basic h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2 justify-between py-2 w-full">
                    <div className="flex gap-2 ">
                        {types.map((itemType, inx) => (
                            <button
                                key={inx}
                                onClick={() => handleSetType(itemType)}
                                // disabled={!(groupedCustomer ? groupedCustomer[itemType].length : 0)}
                                className={clsx(
                                    ' outline-none duration-200 disabled:opacity-60 relative  border-solid  border px-2 py-1 rounded-md',
                                    !state.isSelectedActive && itemType === type
                                        ? 'bg-L-gray-250 dark:bg-D-gray-250 border-L-primary-50 text-L-primary-50 dark:text-D-primary-50'
                                        : 'bg-L-gray-250 dark:bg-D-gray-250 border-transparent dark:text-D-gray-450 text-L-gray-450',
                                )}
                            >
                                <CounterBalloon count={groupedCustomer ? groupedCustomer[itemType].length : 0} />
                                {t('CustomerType.' + itemType)}
                            </button>
                        ))}
                        <button
                            onClick={() => toggleSelection(true)}
                            className={clsx(
                                ' duration-200 relative outline-none border-solid border px-2 py-1 rounded-md',
                                state.isSelectedActive
                                    ? 'bg-L-gray-250 dark:bg-D-gray-250 border-L-primary-50 text-L-primary-50 dark:text-D-primary-50'
                                    : 'bg-L-gray-250 dark:bg-D-gray-250 border-transparent dark:text-D-gray-450 text-L-gray-450',
                            )}
                        >
                            <CounterBalloon count={selectedCustomers.length} />
                            همه انتخاب شده‌ها
                        </button>
                    </div>
                    <div className={clsx('duration-200', isFetching ? '' : 'scale-0')}>
                        <SpinnerIcon className="animate-spin text-L-primary-50 dark:text-D-primary-50" />
                    </div>
                </div>
                <div className="h-full flex flex-col">
                    <ResultHeader />
                    <Virtuoso
                        data={state.isSelectedActive ? selectedCustomers : (groupedCustomer && groupedCustomer[type]) || defaultCustomer}
                        className="border-L-gray-300 border rounded-lg rounded-t-none"
                        itemContent={(index, data) => <ResultItem key={index} {...data} />}
                        components={{
                            Item: ItemRenderer,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerSearch;
