import { ColDef, ICellRendererParams, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWatchListSymbolsQuery, useWatchlistsQuery } from 'src/app/queries/watchlist';
import ipcMain from 'src/common/classes/IpcMain';
import AGTable from 'src/common/components/AGTable';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
import Select from 'src/common/components/SelectAsync';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { pushEngine } from 'src/ls/pushEngine';
import { subscriptionWatchlistMinor } from 'src/ls/subscribes';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { LastTradedPrice, SymbolTradeState } from 'src/widgets/Watchlist/components/CellRenderer';

type WatchlistProps = {
	expand: boolean;
}

const Watchlist = ({ expand }: WatchlistProps) => {
	const { t } = useTranslation();

	const gridRef = useRef<AgGridReact<IGetWatchlistSymbol>>(null);
	const timer = useRef<NodeJS.Timeout | null>()

	const [watchlist, setWatchlist] = useState<IWatchlistType | null>(null);

	const dispatch = useAppDispatch();


	const { data: watchlists, isFetching: isFetchingWatchlist } = useWatchlistsQuery({
		select(data) {
			return data.filter(watchList => watchList.type === "Pinned" || watchList.type === "User")
		},
	})


	const { data: watchlistSymbol, refetch: refetchWatchlist, remove } = useWatchListSymbolsQuery(
		{
			watchlistId: watchlist?.id || 0,
			watchlistType: watchlist?.type || "User",
			PageNumber: 1
		},
		{
			enabled: false,
			onSuccess: (data) => {
				pushEngine.unSubscribe("WatchlistSymbol")
				if (!data || data.length === 0) return;

				const symbolISINs: string[] = [];
				data.forEach((symbol) => {
					symbolISINs.push(symbol.symbolISIN);
				});

				subscriptionWatchlistMinor(data, timer, watchlist?.id || 0)
			},
		}
	);


	const onRowClicked = ({ data }: RowClickedEvent<IGetWatchlistSymbol>) => {
		if (!data) return;
		dispatch(
			setSelectedSymbol(data.symbolISIN)
		);

		ipcMain.send('tv_chart:update_symbol', data.symbolISIN);
	};

	const COLUMNS = useMemo<ColDef<IGetWatchlistSymbol>[]>(() => ([
		/* نماد */
		{
			colId: 'symbolTitle',
			field: 'symbolTitle',
			headerName: t('table_columns.symbolTitle'),
			minWidth: 120,
			maxWidth: undefined,
			flex: 1,
			sortable: true,
			cellRenderer: SymbolTradeState,
			comparator: (valueA, valueB) => valueA.localeCompare(valueB)
		},

		/* حجم معاملات */
		{
			colId: 'totalNumberOfSharesTraded',
			field: 'totalNumberOfSharesTraded',
			headerName: t('table_columns.totalNumberOfSharesTraded'),
			cellRenderer: ChangeCellRenderer,
			minWidth: 96,
			hide: !expand,
			cellClass: 'ltr',
			valueFormatter: ({ value }) => value > 1E7 ? String(abbreviateNumber(value)) : seprateNumber(value),
			cellRendererParams: {
				tooltip: true
			}
		},

		/* آخرین قیمت */
		{
			colId: 'lastTradedPrice',
			field: 'symbol.lastTradedPrice',
			headerName: t('table_columns.lastTradedPrice'),
			minWidth: 108,
			hide: !expand,
			cellRenderer: LastTradedPrice,
			cellRendererParams: ({ data }: ICellRendererParams<IGetWatchlistSymbol, number>) => ({
				percent: data ? data.lastTradedPriceVarPercent : 0
			}),
		},
	]), [expand, watchlistSymbol]);

	useEffect(() => {
		if (watchlist === null) return;
		refetchWatchlist();

		return () => {
			remove()
			pushEngine.unSubscribe("WatchlistSymbol")
		}
	}, [watchlist]);

	useEffect(() => {
		if (!Array.isArray(watchlists) || watchlists.length === 0) return;

		if (watchlist !== null) return;
		setWatchlist(watchlists[0]);
	}, [watchlists, watchlist]);

	return (
		<div className='flex flex-col gap-4 h-full'>
			<WidgetLoading spining={isFetchingWatchlist}>
				<Select
					classes={{
						root: 'border rounded border-L-gray-200 dark:border-D-gray-200'
					}}
					options={watchlists ?? []}
					value={watchlist}
					onChange={(wl) => setWatchlist(wl)}
					getOptionLabel={(wl) => wl.watchListName}
					getOptionId={(wl) => wl.id}
					placeholder={t('tv_chart.could_not_find_watchlist')}
				>
					{(value) => (
						<Select.Option option={value} />
					)}
				</Select>

				<div className='flex-1'>
					<AGTable
						rowSelection='single'
						ref={gridRef}
						suppressMovableColumns
						suppressRowDrag
						// loading={isFetching}
						columnDefs={COLUMNS}
						rowData={watchlistSymbol ?? []}
						onRowClicked={onRowClicked}
						getRowId={({ data }) => data.symbolISIN}
						defaultColDef={{
							sortable: true,
							lockPinned: true,
							suppressMovable: false,
							valueFormatter: ({ value }) => isNaN(Number(value)) ? value : seprateNumber(value),
							comparator: (valueA, valueB) => valueA - valueB,
						}}
					/>
				</div>

			</WidgetLoading>
		</div >

	);
};

export default Watchlist;



