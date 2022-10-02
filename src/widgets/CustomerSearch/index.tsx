import { RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import clsx from 'clsx';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useDebounce from 'src/common/hooks/useDebounce';
import SearchInput from './components/SearchInput';
import { useCustomerSearchState } from './context/CustomerSearchContext';
import { CounterBalloon } from 'src/common/components/CounterBalloon/CounterBalloon';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { useCustomerListInfinit } from 'src/app/queries/customer';
import { Virtuoso } from 'react-virtuoso';
import ResultItem from './components/ResultItem/ResultItem';
import ResultHeader from './components/ResultItem/ResultHeader';
import ResultFooter from './components/ResultItem/ResultFooter';

const CustomerSearch = () => {
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const debouncedParams = useDebounce(state.params, 500);
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const { data: data, isFetching, hasNextPage, fetchNextPage } = useCustomerListInfinit(debouncedParams);

    const types: ICustomerTypeType[] = ['Customer', 'Group', 'Mine'];
    const typeCounts = useMemo(() => data?.pages[data?.pages.length - 1].typeCounts, [data]);

    const setParams = (type: ICustomerTypeType) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, type: type }, isSelectedActive: false }));
    };

    const toggleSelection = (isActive: boolean) => {
        setState((prev) => ({ ...prev, isSelectedActive: isActive }));
    };

    const ItemRenderer = (props: any) => {
        return <div className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300" {...props}></div>;
    };
    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto text-1.2">
            <SearchInput />
            <div className="bg-L-basic dark:bg-D-basic h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                <div className="flex gap-2  py-2">
                    {types.map((type, inx) => (
                        <button
                            key={inx}
                            onClick={() => setParams(type)}
                            disabled={!typeCounts?.find((countType) => countType.type === type)?.count}
                            className={clsx(
                                ' outline-none duration-200 disabled:opacity-60 relative  border-solid  border px-2 py-1 rounded-md',
                                !state.isSelectedActive && state.params.type === type
                                    ? 'bg-L-gray-250 dark:bg-D-gray-250 border-L-primary-50 text-L-primary-50 dark:text-D-primary-50'
                                    : 'bg-L-gray-250 dark:bg-D-gray-250 border-transparent dark:text-D-gray-450 text-L-gray-450',
                            )}
                        >
                            <CounterBalloon count={typeCounts?.find((countType) => countType.type === type)?.count || 0} />
                            {t('CustomerTypes.' + type)}
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
                <Virtuoso
                    data={state.isSelectedActive ? selectedCustomers : data?.pages.flatMap((page) => page.searchResult.result) || []}
                    className="border-L-gray-300 border rounded-lg"
                    endReached={() => fetchNextPage()}
                    itemContent={(index, data) => <ResultItem key={index} {...data} />}
                    components={{
                        Footer: () => <ResultFooter isFetching={isFetching} />,
                        Header: ResultHeader,
                        Item: ItemRenderer,
                    }}
                />
            </div>
        </div>
    );
};

export default CustomerSearch;
