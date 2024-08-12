// import { useDefaultWatchlistSymbolsQuery, useGetMarketSymbolQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
// import { Paginator } from 'src/common/components/Paginator/Paginator';
// import WidgetLoading from 'src/common/components/WidgetLoading';
import { useMemo, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import WatchlistController from './components/WatchlistController/WatchlistController';
import { useWatchListState } from './context/WatchlistContext';
import { Trans, useTranslation } from 'react-i18next';
import { useWatchListSymbolsQuery, useWatchlistsQuery } from 'src/app/queries/watchlist';
import { AddSymbol, InfoIcon } from 'src/common/icons';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import { ClosingPrice, LastTradedPrice, SymbolTradeState } from './components/CellRenderer';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
import ActionCellRenderer from './components/ActionCellRenderer/ActionCellRenderer';

const Watchlists = () => {
    const { t } = useTranslation();
    const appDispatch = useAppDispatch();
    const {
        state: { selectedWatchlistId, watchlistType, ramandFilterWatchlist, PageNumber, marketUnit, sector },
        setState,
    } = useWatchListState();
    const [gridApi, setGridApi] = useState<GridApi<IGetWatchlistSymbol>>();
    const { data: watchlists } = useWatchlistsQuery();

    const Columns = useMemo(
        (): ColDefType<IGetWatchlistSymbol>[] => [
            {
                headerName: 'نماد',
                field: 'symbolTitle',
                rowDrag: true,
                minWidth: 160,
                maxWidth: 160,
                cellRenderer: SymbolTradeState,
                rowDragText: (p) => {
                    return p?.rowNode?.data?.symbolTitle || 'جابجایی';
                },
            },
            {
                headerName: 'آخرین قیمت',
                field: 'lastTradedPrice',
                cellRenderer: LastTradedPrice,
                type: 'sepratedNumber',
                maxWidth: 140,
            },
            {
                headerName: 'قیمت پایانی ',
                field: 'closingPrice',
                cellRenderer: ClosingPrice,
                minWidth: 160,
                maxWidth: 160,
            },
            {
                headerName: 'حجم تقاضا',
                field: 'bestBuyLimitQuantity_1',
                type: 'abbreviatedNumber',
                cellClass: 'bg-L-success-101 dark:bg-D-success-101',
                minWidth: 160,
                maxWidth: 150,
            },
            {
                headerName: 'قیمت تقاضا',
                field: 'bestBuyLimitPrice_1',
                type: 'sepratedNumber',
                cellClass: 'bg-L-success-101 dark:bg-D-success-101',
                minWidth: 150,
                maxWidth: 150,
            },
            {
                headerName: 'قیمت عرضه',
                field: 'bestSellLimitPrice_1',
                type: 'sepratedNumber',
                cellClass: 'bg-L-error-101 dark:bg-D-error-101',
                minWidth: 150,
                maxWidth: 150,
            },
            {
                headerName: 'حجم عرضه',
                field: 'bestSellLimitQuantity_1',
                type: 'abbreviatedNumber',
                // cellRenderer: ChangeCellRenderer,
                cellClass: 'bg-L-error-101 dark:bg-D-error-101',
                minWidth: 150,
                maxWidth: 150,
            },
            {
                headerName: 'حجم',
                field: 'totalNumberOfSharesTraded',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
                minWidth: 150,
                maxWidth: 150,
            },
            {
                headerName: 'ارزش',
                field: 'totalTradeValue',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
                minWidth: 150,
                maxWidth: 150,
            },
            {
                headerName: 'بیشترین',
                field: 'highestTradePriceOfTradingDay',
                type: 'sepratedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'کمترین',
                field: 'lowestTradePriceOfTradingDay',
                type: 'sepratedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            // {
            //     headerName: 'نوع بازار',
            //     field: 'exchange',
            //     // valueFormatter: ({ data }) => t('exchange_type.' + data?.exchange) || '-',
            //     cellRenderer: ChangeCellRenderer,
            //     hide: handleIsSHowColumn('exchange'),
            // },
            {
                headerName: 'عملیات',
                cellRenderer: ({ data }: ICellRendererParams<ISymbolType>) => <ActionCellRenderer {...(data as any)} />,
                minWidth: 130,
                maxWidth: 130,
                pinned: 'left',
                sortable: false,
                lockVisible: true,
            },
        ],
        [],
    );

    const { data: watchlistSymbolList, isFetching: isFetchingSymbol } = useWatchListSymbolsQuery({
        watchlistId: selectedWatchlistId,
        watchlistType,
        type: ramandFilterWatchlist,
        MarketUnit: marketUnit,
        SectorCode: sector.id,
        PageNumber: PageNumber,
    });

    const defaultCols: ColDef<IGetWatchlistSymbol> = {
        lockPinned: true,
        flex: 1,
        cellClass: 'text-center dir-ltr',
        headerClass: 'px-1 font-semibold',
    };

    return (
        <WidgetLoading spining={isFetchingSymbol} withText>
            <div className="h-full flex flex-col py-3 px-6">
                <div>
                    <h1 className="text-L-gray-700 dark:text-D-gray-700 font-medium text-2xl py-4">{t('Watchlist.title')}</h1>
                    <WatchlistController {...{ Columns, watchlists, gridApi }} />
                </div>

                <div className="flex flex-col flex-1 relative">
                    <div className="flex-1">
                        <AGTable
                            rowModelType="clientSide"
                            rowData={watchlistSymbolList || []}
                            columnDefs={Columns}
                            onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                            defaultColDef={defaultCols}
                            rowSelection="single"
                            asyncTransactionWaitMillis={4000}
                            animateRows={true}
                            rowDragManaged
                            suppressScrollOnNewData={true}
                            suppressRowVirtualisation={true}
                            suppressColumnVirtualisation={true}
                            suppressLoadingOverlay={true}
                            suppressCellFocus={true}
                            stopEditingWhenCellsLoseFocus={true}
                            suppressNoRowsOverlay={true}
                            suppressColumnMoveAnimation={true}
                            suppressDragLeaveHidesColumns={true}
                            getRowId={({ data }) => data.symbolISIN}
                            onGridReady={(params) => setGridApi(params.api)}
                            onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
                            // onFirstDataRendered={({ api }) => api.sizeColumnsToFit()}
                            onRowDataUpdated={({ api }) => api.sizeColumnsToFit()}
                        />
                        {!['Market', 'Ramand'].includes(watchlistType) && !watchlistSymbolList?.length && !isFetchingSymbol && (
                            <div className="absolute top-0 left-0 text-D-basic dark:text-L-basic text-center flex flex-col items-center justify-center w-full h-full">
                                <Trans
                                    i18nKey="Watchlist.noDataDescription"
                                    values={{ n: t('Watchlist.addSymbol') }}
                                    components={{
                                        icon: <InfoIcon />,
                                        br: <br />,
                                        n: (
                                            <span
                                                className="text-L-info-100 cursor-pointer"
                                                onClick={() => setState({ type: 'TOGGLE_ADD_SYMBOL_MODE', value: true })}
                                            />
                                        ),
                                        d: <div className="flex items-center gap-2" />,
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {(watchlistType === 'User' || watchlistType === 'Pinned') && watchlistSymbolList?.length ? (
                        <div id="add">
                            <button
                                onClick={() => setState({ type: 'TOGGLE_ADD_SYMBOL_MODE', value: true })}
                                className="text-L-primary-50 dark:text-D-primary-50 p-2 border border-L-gray-400 dark:border-D-gray-400 flex rounded items-center mt-6 mb-2"
                            >
                                <AddSymbol className="ml-2" />
                                افزودن نماد
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {/* {watchlistType === 'Market' && (
                    <div className="border-t flex justify-end items-center pt-4">
                        <Paginator loading={false} pageSize={25} pageNumber={1} PaginatorHandler={() => {}} />
                    </div>
                )} */}
            </div>
        </WidgetLoading>
    );
};

export default Watchlists;
