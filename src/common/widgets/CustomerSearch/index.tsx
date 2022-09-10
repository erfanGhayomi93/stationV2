import { BodyScrollEvent, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import clsx from 'clsx';
import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerListInfinit } from 'src/app/queries';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import useDebounce from 'src/common/hooks/useDebounce';
import actionCellRenderer from './components/ActionCell/ActionCell';
import SearchInput from './components/SearchInput';
import { useCustomerSearchState } from './context/CustomerSearchContext';
import { CounterBalloon } from '../../components/CounterBalloon/CounterBalloon';
import nameCellRenderer from './components/NameCell/NameCell';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';

const CustomerSearch = () => {
    const { t } = useTranslation();
    const appDispatch = useAppDispatch();
    const { setState, state } = useCustomerSearchState();
    const debouncedParams = useDebounce(state.params, 500);
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const { data: data, isFetching, hasNextPage, fetchNextPage } = useCustomerListInfinit(debouncedParams);
    const Columns = useMemo<ColDefType<IGoCustomerSearchResult>[]>(
        () => [
            { field: 'customerTitle', headerName: 'نام', cellRenderer: nameCellRenderer, headerCheckboxSelection: true, checkboxSelection: true },
            { field: 'balance', headerName: 'دارایی', type: 'sepratedNumber' },
            {
                field: 'customerTitle',
                headerName: 'عملیات',
                cellRenderer: actionCellRenderer,
            },
        ],
        [],
    );

    const types: ICustomerTypeType[] = ['Customer', 'Group', 'Mine'];
    const typeCounts = useMemo(() => data?.pages[data?.pages.length - 1].typeCounts, [data]);

    const setParams = (type: ICustomerTypeType) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, type: type }, isSelectedActive: false }));
    };

    const onGridReady = (grid: BodyScrollEvent<any>) => {
        const itemsLength = data?.pages.flatMap((page) => page.searchResult.result).length;
        const rowIndex = grid.api.getLastDisplayedRow() + 1;
        rowIndex === itemsLength && fetchNextPage();
    };

    const onRowSelected = useCallback(
        (event: RowSelectedEvent<IGoCustomerSearchResult>) => {
            const index = selectedCustomers.findIndex((customer) => customer.customerISIN === event.data?.customerISIN);
            if (index === -1) {
                // appDispatch(setSelectedCustomers([...selectedCustomers, event.data as IGoCustomerSearchResult]));
            } else {
                // appDispatch(setSelectedCustomers(selectedCustomers.filter((customer) => customer.customerISIN !== event.data?.customerISIN)));
            }
        },
        [selectedCustomers],
    );

    const onSelectionChanged = useCallback(
        (event: SelectionChangedEvent<IGoCustomerSearchResult>) => {
            var rows = event.api.getSelectedNodes().map((item) => item.data as IGoCustomerSearchResult);
            appDispatch(setSelectedCustomers(rows));
        },
        [selectedCustomers],
    );

    const toggleSelection = (isActive: boolean) => {
        setState((prev) => ({ ...prev, isSelectedActive: isActive }));
    };
    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto">
            <SearchInput />
            <WidgetLoading spining={isFetching}>
                <div className="bg-white h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                    <div className="flex gap-2  py-2">
                        {types.map((type, inx) => (
                            <button
                                key={inx}
                                onClick={() => setParams(type)}
                                disabled={!typeCounts?.find((countType) => countType.type === type)?.count}
                                className={clsx(
                                    ' outline-none duration-200 disabled:opacity-60 relative  border-solid  border px-2 py-1 rounded-md',
                                    !state.isSelectedActive && state.params.type === type
                                        ? 'bg-[#E2EBF3] border-[#135CA4] text-[#135CA4]'
                                        : 'bg-[#E2EBF3] border-transparent text-[#566978]',
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
                                    ? 'bg-[#E2EBF3] border-[#135CA4] text-[#135CA4]'
                                    : 'bg-[#E2EBF3] border-transparent text-[#566978]',
                            )}
                        >
                            <CounterBalloon count={selectedCustomers.length} />
                            همه انتخاب شده‌ها
                        </button>
                    </div>
                    <AGTable
                        rowData={state.isSelectedActive ? selectedCustomers : data?.pages.flatMap((page) => page.searchResult.result) || []}
                        columnDefs={Columns}
                        rowSelection={'multiple'}
                        onBodyScrollEnd={onGridReady}
                        rowHeight={50}
                        onRowSelected={onRowSelected}
                        onSelectionChanged={onSelectionChanged}
                        suppressRowClickSelection={true}
                    />
                </div>
            </WidgetLoading>
        </div>
    );
};

export default CustomerSearch;
