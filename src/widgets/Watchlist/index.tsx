// import { useDefaultWatchlistSymbolsQuery, useGetMarketSymbolQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { UseHandleShowColumn } from './components/UseHandleShowColumn';
import WatchlistController from './components/WatchlistController/WatchlistController';
import { useWatchListState } from './context/WatchlistContext';
import { useTranslation } from 'react-i18next';
import { useWatchListSymbolsQuery, useWatchlistsQuery } from 'src/app/queries/watchlist';
import { AddSymbol } from 'src/common/icons';

type Props = {};

const Watchlists = (props: Props) => {
    const { t } = useTranslation()
    const appDispatch = useAppDispatch();
    const {
        state: { selectedWatchlistId, watchlistType, selectedDefaultWatchlist, PageNumber, marketUnit, sector },
        setState,
    } = useWatchListState();

    const { columns } = UseHandleShowColumn();

    const { data: watchlists } = useWatchlistsQuery();


    const { data: watchlistSymbolList, isFetching: isFetchingSymbol } = useWatchListSymbolsQuery(
        { watchlistId: selectedWatchlistId, watchlistType, type: selectedDefaultWatchlist, MarketUnit: marketUnit, SectorCode: sector.id, PageNumber: PageNumber }
    )

    // const { data: watchlistSymbolListMarket, isFetching: isFetchingMarket } = useGetMarketSymbolQuery({ marketUnit, PageNumber, SectorCode: sector.id , watchlistType })

    // const { symbols: watchlistSymbolListMarketSymbol, totalCount } = watchlistSymbolListMarket || {};


    // const { data: WatchlistSymbolsDefault, isFetching: isFetchingDefault } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist, watchlistType);

    // const { data: watchlistSymbols } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlistId, {
    //     select: (data) => data.map((item) => ({ symbolISIN: item.symbolISIN, ...item.symbol })),
    // });



    const handleChangePaginator = (PageNumber: number) => {
        setState({ value: PageNumber, type: 'SET_PageNumber' });
    };

    const defaultCols = {
        lockPinned: true,
        flex: 1,
        cellClass: 'text-center dir-ltr',
        headerClass: 'px-1 font-semibold',
    };

    // const dataRow = watchlistType === "Market" ? watchlistSymbolListMarketSymbol : watchlistType === "Ramand" ? WatchlistSymbolsDefault : watchlistSymbolListUser

    return (
        <div className="h-full grid grid-rows-min-one py-3 px-6">
            <div>
                <h1 className="text-L-gray-700 dark:text-D-gray-700 font-medium text-2xl py-4">{t("Watchlist.title")}</h1>
                <WatchlistController {...{ columns, watchlists }} />
            </div>

            <div className='grid grid-rows-one-min-min'>
                {/* <WidgetLoading spining={isFetchingSymbol}> */}
                <AGTable
                    rowData={watchlistSymbolList}
                    columnDefs={columns}
                    onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                    defaultColDef={defaultCols}
                    rowSelection="single"
                    asyncTransactionWaitMillis={4000}
                    animateRows={true}
                    suppressScrollOnNewData={true}
                    suppressRowVirtualisation={true}
                    suppressColumnVirtualisation={true}
                    suppressLoadingOverlay={true}
                />
                {/* </WidgetLoading> */}

                {
                    (watchlistType === "User" || watchlistType === "Pinned") && (
                        <div>
                            <button
                                onClick={() => setState({ type: "TOGGLE_ADD_SYMBOL_MODE", value: true })}
                                className='text-L-primary-50 dark:text-D-primary-50 p-2 border border-L-gray-400 dark:border-D-gray-400 flex rounded items-center mt-6 mb-2'
                            >
                                <AddSymbol className='ml-2' />
                                افزودن نماد
                            </button>
                        </div>
                    )
                }

                {/* {watchlistType === "Market" && (totalCount as number) > 0 && (
                    <div className="border-t flex justify-end items-center pt-4">
                        <Paginator
                            loading={isFetchingMarket}
                            current={PageNumber}
                            total={totalCount ? Math.ceil(totalCount / 20) : 0}
                            onChange={handleChangePaginator}
                        />
                    </div>
                )} */}
            </div>

        </div>
    );
};

export default Watchlists;
