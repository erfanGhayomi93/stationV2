import { ICellRendererParams } from 'ag-grid-community';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDefaultWatchlistSymbolsQuery, useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import ActionCellRenderer from './components/ActionCellRenderer/ActionCellRenderer';
import { ClosingPrice, LastTradedPrice } from './components/CellRenderer';
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
    const { t } = useTranslation();

    const { data: defaultWatchlistSymbols } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist);
    const { data: watchlistSymbols } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlist, {
        select: (data) => {
            return data.map((item) => {
                return { symbolISIN: item.symbolISIN, ...item.symbol };
            });
        },
    });

    const Columns = useMemo(
        (): ColDefType<IWatchlistSymbolTableType>[] => [
            { headerName: 'نماد', field: 'symbolTitle' },
            {
                headerName: 'آخرین قیمت',
                field: 'lastTradedPrice',
                cellRenderer: LastTradedPrice,
            },
            {
                headerName: 'قیمت پایانی',
                field: 'closingPrice',
                cellRenderer: ClosingPrice,
            },
            {
                headerName: 'حجم تقاضا',
                field: 'bestBuyLimitQuantity_1',
                type:"abbreviatedNumber",
                cellClass: "bg-L-success-101 dark:bg-D-success-101",
            },
            {
                headerName: 'قیمت تقاضا',
                field: 'bestBuyLimitPrice_1',
                type: 'sepratedNumber',
                cellClass: "bg-L-success-101 dark:bg-D-success-101",
            },
            {
                headerName: 'قیمت عرضه',
                field: 'bestSellLimitPrice_1',
                type: 'sepratedNumber',
                // cellRenderer: ChangeCellRenderer,
                cellClass: "bg-L-error-101 dark:bg-D-error-101",
            },
            {
                headerName: 'حجم عرضه',
                field: 'bestSellLimitQuantity_1',
                type:"abbreviatedNumber",
                // cellRenderer: ChangeCellRenderer,
                cellClass: "bg-L-error-101 dark:bg-D-error-101",
            },
            {
                headerName: 'حجم',
                field: 'totalNumberOfSharesTraded',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
            },
            {
                headerName: 'ارزش',
                field: 'totalTradeValue',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
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
            {
                headerName: 'نام بازار',
                field: 'marketUnit',
                valueFormatter: ({ data }) => t('marketUnit.' + data?.marketUnit) || '-',
                cellRenderer: ChangeCellRenderer,
            },
            
           
            {
                headerName: 'عملیات',
                cellRenderer: ({ data }: ICellRendererParams<IWatchlistSymbolTableType>) => <ActionCellRenderer {...(data as any)} />,
            },
        ],
        [],
    );

    const defaultCols = {
		lockPinned: true,
		flex: 1,
		cellClass: "text-center dir-ltr",
		headerClass: "px-1 font-semibold",
	};


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
                defaultColDef={defaultCols}
                rowSelection="single"
            />
        </div>
    );
};

export default Watchlists;
