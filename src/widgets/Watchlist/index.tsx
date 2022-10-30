import { ICellRendererParams } from 'ag-grid-community';
import { useMemo } from 'react';
import { useDefaultWatchlistSymbolsQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';
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
        state: { selectedWatchlist, selectedDefaultWatchlist },
    } = useWatchListState();

    const { data: defaultWatchlistSymbols } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist);
    const { data: watchlistSymbols } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlist, {
        select: (data) =>
            data.map((item) => {
                return { symbolISIN: item.symbolISIN, ...item.symbol };
            }),
    });

    const Columns = useMemo(
        (): ColDefType<IWatchlistSymbolTableType>[] => [
            { headerName: 'نماد', field: 'symbolTitle' },
            {
                headerName: 'قیمت لحظه ای',
                field: 'lastTradedPrice',
                // type: 'sepratedNumber',
                valueFormatter: ({ value }) => seprateNumber(value),
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'قیمت پایانی',
                field: 'closingPrice',
                type: 'sepratedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'حجم معاملات',
                field: 'totalNumberOfSharesTraded',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'ارزش معاملات',
                field: 'totalTradeValue',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'عملیات',
                cellRenderer: ({ data }: ICellRendererParams<IWatchlistSymbolTableType>) => <ActionCellRenderer {...(data as any)} />,
            },
        ],
        [],
    );

    return (
        <div className="h-full grid grid-rows-min-one py-3 px-6">
            <div>
                <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium text-2xl py-4">دیده‌بان</h1>
                <WatchlistController />
            </div>
            <AGTable
                rowData={selectedWatchlist === 0 ? defaultWatchlistSymbols : watchlistSymbols}
                columnDefs={Columns}
                onRowClicked={({ data }) => data?.symbolISIN && appDispatch(setSelectedSymbol(data?.symbolISIN))}
            />
        </div>
    );
};

export default Watchlists;
