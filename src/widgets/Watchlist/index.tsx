import { useDefaultWatchlistSymbolsQuery, useGetMarketSymbolQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { UseHandleShowColumn } from './components/UseHandleShowColumn';
import WatchlistController from './components/WatchlistController/WatchlistController';
import { useWatchListState } from './context/WatchlistContext';
import { useTranslation } from 'react-i18next';

type Props = {};

const Watchlists = (props: Props) => {
    const { t } = useTranslation()
    const appDispatch = useAppDispatch();
    const {
        state: { selectedWatchlist, selectedDefaultWatchlist, PageNumber, marketUnit, sector },
        setState,
    } = useWatchListState();

    const { columns } = UseHandleShowColumn();

    const { data: defaultWatchlistSymbols } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist);

    const { data: watchlistSymbols } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlist, {
        select: (data) => data.map((item) => ({ symbolISIN: item.symbolISIN, ...item.symbol })),
    });
    const { data, isFetching } = useGetMarketSymbolQuery({ PageNumber, marketUnit: marketUnit, SectorCode: sector.id });
    const { symbols, totalCount } = data?.result || {};

    const handleChangePaginator = (PageNumber: number) => {
        setState({ value: PageNumber, type: 'SET_PageNumber' });
    };

    const defaultCols = {
        lockPinned: true,
        flex: 1,
        cellClass: 'text-center dir-ltr',
        headerClass: 'px-1 font-semibold',
    };

    return (
        <div className="h-full grid grid-rows-min-one py-3 px-6">
            <div>
                <h1 className="text-L-gray-700 dark:text-D-gray-700 font-medium text-2xl py-4">{t("Watchlist.title")}</h1>
                <WatchlistController {...{ columns }} />
            </div>

            <WidgetLoading spining={isFetching}>
                <AGTable
                    rowData={selectedWatchlist === 0 ? symbols : selectedWatchlist === 1 ? defaultWatchlistSymbols : watchlistSymbols}
                    columnDefs={columns}
                    onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                    defaultColDef={defaultCols}
                    rowSelection="single"
                />
            </WidgetLoading>

            {selectedWatchlist === 0 && (totalCount as number) > 0 && (
                <div className="border-t flex justify-end items-center pt-4">
                    <Paginator
                        loading={isFetching}
                        current={PageNumber}
                        total={totalCount ? Math.ceil(totalCount / 20) : 0}
                        onChange={handleChangePaginator}
                    />
                </div>
            )}
        </div>
    );
};

export default Watchlists;
