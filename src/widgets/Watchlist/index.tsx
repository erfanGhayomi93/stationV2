import { useDefaultWatchlistSymbolsQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { UseHandleShowColumn } from './components/UseHandleShowColumn';
import WatchlistController from './components/WatchlistController/WatchlistController';
import { useWatchListState } from './context/WatchlistContext';

type Props = {};
type WatchlistData = {
    symbolISIN: string;
    symbolTitle: string;
    lastTradedPrice: number;
    closingPrice: number;
    totalNumberOfSharesTraded: number;
    totalTradeValue: number;
};
const Watchlists = (props: Props) => {
    const appDispatch = useAppDispatch();

    const {
        state: { selectedWatchlist, selectedDefaultWatchlist },
    } = useWatchListState();
    const { columns } = UseHandleShowColumn();

    const { data: defaultWatchlistSymbols } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist);
    const { data: watchlistSymbols } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlist, {
        select: (data) => {
            return data.map((item) => {
                return { symbolISIN: item.symbolISIN, ...item.symbol };
            });
        },
    });

    const defaultCols = {
        lockPinned: true,
        flex: 1,
        cellClass: 'text-center dir-ltr',
        headerClass: 'px-1 font-semibold',
    };

    return (
        <div className="h-full grid grid-rows-min-one py-3 px-6">
            <div>
                <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium text-2xl py-4">دیده‌بان</h1>
                <WatchlistController {...{columns}}/>
            </div>
            <AGTable
                rowData={selectedWatchlist === 0 ? defaultWatchlistSymbols : watchlistSymbols}
                columnDefs={columns}
                onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                defaultColDef={defaultCols}
                rowSelection="single"
            />
        </div>
    );
};

export default Watchlists;
