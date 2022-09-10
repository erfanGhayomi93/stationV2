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

const CustomerSearch = () => {
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const debouncedParams = useDebounce(state.params, 500);
    const { data: data, isLoading: isSearchLoading, hasNextPage, fetchNextPage } = useCustomerListInfinit(debouncedParams);

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
    const typeCounts = useMemo(() => data?.pages[data?.pages.length - 1].typeCounts, [data]);

    const setParams = (type: ICustomerTypeType) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, type: type }, isSelectedActive: false }));
    };

    const onGridReady = (grid: BodyScrollEvent<any>) => {
        const itemsLength = data?.pages.flatMap((page) => page.searchResult.result).length;
        const rowIndex = grid.api.getLastDisplayedRow() + 1;
        rowIndex === itemsLength && fetchNextPage();
    };

    const onSelectionChanged = useCallback((event: SelectionChangedEvent<any>) => {
        const rows = event.api.getSelectedNodes();
        const selectedCustomers = rows.map((item) => item.data);
        setState((prev) => ({ ...prev, selectedCustomers }));
    }, []);

    const toggleSelection = (isActive: boolean) => {
        setState((prev) => ({ ...prev, isSelectedActive: isActive }));
    };
    //
    return (
        <div className="w-full h-full grid gap-2 grid-rows-min-one overflow-y-auto">
            <SearchInput />
            <WidgetLoading spining={isSearchLoading}>
                <div className="bg-white h-full rounded py-2 px-4 grid overflow-y-auto grid-rows-min-one gap-2 ">
                    <div className="flex gap-2  py-2">
                        {typeCounts?.map((type) => (
                            <>
                                <button
                                    onClick={() => setParams(type.type)}
                                    disabled={!type.count}
                                    className={clsx(
                                        'bg-[#E2EBF3] outline-none disabled:opacity-60 relative text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md',
                                    )}
                                >
                                    <CounterBalloon count={type.count} />
                                    {t('CustomerTypes.' + type.type)}
                                </button>
                            </>
                        ))}
                        <button
                            onClick={() => toggleSelection(true)}
                            className="bg-[#E2EBF3] relative text-[#566978] border-solid border-transparent border px-2 py-1 rounded-md"
                        >
                            <CounterBalloon count={state.selectedCustomers.length} />
                            همه انتخاب شده‌ها
                        </button>
                    </div>
                    <AGTable
                        rowData={data?.pages.flatMap((page) => page.searchResult.result) || []}
                        columnDefs={Columns}
                        rowSelection={'multiple'}
                        onBodyScrollEnd={onGridReady}
                        rowHeight={50}
                        onSelectionChanged={onSelectionChanged}
                        suppressRowClickSelection={true}
                    />
                </div>
            </WidgetLoading>
        </div>
    );
};

export default CustomerSearch;
