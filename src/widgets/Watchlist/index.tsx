import { useMemo } from 'react';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import WatchlistController from './components/WatchlistController';
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
        state: { selectedWatchlist },
    } = useWatchListState();
    const { data: watchlistSymbols } = useWatchListSymbolsQuery(selectedWatchlist);

    const Columns = useMemo(
        (): ColDefType<IWatchlistSymbolType>[] => [
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'قیمت لحظه ای', field: 'lastTradedPrice', type: 'sepratedNumber' },
            { headerName: 'قیمت پایانی', field: 'closingPrice', type: 'sepratedNumber' },
            { headerName: 'حجم معاملات', field: 'totalNumberOfSharesTraded', type: 'abbreviatedNumber' },
            { headerName: 'ارزش معاملات', field: 'totalTradeValue', type: 'abbreviatedNumber' },
            { headerName: 'عملیات', field: 'symbolISIN' },
        ],
        [],
    );
    return (
        <div className="px-3 py-1 flex flex-col h-full">
            <WatchlistController />
            <div className="grow">
                <AGTable
                    rowData={watchlistSymbols}
                    columnDefs={Columns}
                    onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
                />
            </div>
        </div>
    );
};

export default Watchlists;
