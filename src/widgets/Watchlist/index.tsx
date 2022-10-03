import { CellRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { useMemo } from 'react';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import ActionCellRenderer from './components/ActionCellRenderer/ActionCellRenderer';
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
        state: { selectedWatchlist },
    } = useWatchListState();
    const { data: watchlistSymbols } = useWatchListSymbolsQuery(selectedWatchlist);

    const Columns = useMemo(
        (): ColDefType<IWatchlistSymbolType>[] => [
            { headerName: 'نماد', field: 'symbol.symbolTitle' },
            { headerName: 'قیمت لحظه ای', field: 'symbol.lastTradedPrice', type: 'sepratedNumber' },
            { headerName: 'قیمت پایانی', field: 'symbol.closingPrice', type: 'sepratedNumber' },
            { headerName: 'حجم معاملات', field: 'symbol.totalNumberOfSharesTraded', type: 'abbreviatedNumber' },
            { headerName: 'ارزش معاملات', field: 'symbol.totalTradeValue', type: 'abbreviatedNumber' },
            { headerName: 'عملیات', cellRenderer: ({ data }: any) => <ActionCellRenderer {...data} /> },
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
