import { useQueryClient } from '@tanstack/react-query';
import { ColDef, ICellRendererParams, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

// import Subscribe from 'classes/Subscribe';
// import PricePercent from 'components/common/Table/PricePercent';
import { ItemUpdate } from 'lightstreamer-client-web';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWatchListSymbolsQuery, useWatchlistsQuery } from 'src/app/queries/watchlist';
import ipcMain from 'src/common/classes/IpcMain';
import Subscribe from 'src/common/classes/Subscribe';
import AGTable from 'src/common/components/AGTable';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
// import NoData from 'src/common/components/NoData/NoData';
import Select from 'src/common/components/SelectAsync';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { LastTradedPrice, SymbolTradeState } from 'src/widgets/Watchlist/components/CellRenderer';
// import { symbolPriceSubscription } from 'utils/subscriptions';

type WatchlistProps = {
	expand: boolean;
}

const Watchlist = ({ expand }: WatchlistProps) => {
	const { t } = useTranslation();

	const gridRef = useRef<AgGridReact<IGetWatchlistSymbol>>(null);

	const subscription = useRef<Subscribe | null>(null);

	const [watchlist, setWatchlist] = useState<IWatchlistType | null>(null);

	const queryClient = useQueryClient();

	const dispatch = useAppDispatch();

	// const { data: watchlistListData } = useWatchlistList({
	// 	onSuccess: (data) => {
	// 		if (!Array.isArray(data) || data.length === 0) return;
	// 		if (watchlist === null) setWatchlist(data[0]);
	// 	},
	// });

	const { data: watchlistListData } = useWatchlistsQuery({
		select(data) {
			return data.filter(watchList => watchList.type === "Pinned" || watchList.type === "User")
		},
	})

	useEffect(() => {
		console.log("watchlistListData", watchlistListData)
	}, [watchlistListData])


	const { data: watchlistData, isFetched, isFetching, refetch: refetchWatchlist } = useWatchListSymbolsQuery(
		{
			watchlistId: watchlist?.id || 0,
			watchlistType: watchlist?.type || "User",
			PageNumber: 1
		},
		{
			enabled: !!watchlist,
			onSuccess: (data) => {
				unsubscribe();
				if (!data || data.length === 0) return;

				const symbolISINs: string[] = [];
				data.forEach((symbol) => {
					symbolISINs.push(symbol.symbolISIN);
				});

				// subscription.current = symbolPriceSubscription(symbolISINs)
				// 	.addEventListener('onItemUpdate', onSymbolUpdate)
				// 	.start();
			},
		}
	);

	const unsubscribe = () => {
		if (!subscription.current) return;

		subscription.current.unsubscribe();
		subscription.current = null;
	};

	const updateWatchlistData = (data: IGetWatchlistSymbol[]) => {
		queryClient.setQueryData(['watchlistSymbols', watchlist?.id], data);
	};

	const onSymbolUpdate = (updateInfo: ItemUpdate) => {
		try {
			const symbolISIN: string = updateInfo.getItemName();

			const data: IGetWatchlistSymbol[] = JSON.parse(JSON.stringify((queryClient.getQueryData(['watchlistSymbols', watchlist?.id]) ?? [])));

			const symbolIndex = data.findIndex(symbol => symbol.symbolISIN === symbolISIN);
			if (symbolIndex === -1) return;

			updateInfo.forEachChangedField((fieldName, _, value) => {
				try {
					if (value) {
						const fn = fieldName as keyof Omit<WatchlistType, 'isHidden'>;
						const valueAsNumber = Number(value);

						// @ts-ignore
						data[symbolIndex].symbol[fn] = isNaN(valueAsNumber) ? value : valueAsNumber;
					}
				} catch (e) {
					console.log(e);
				}
			});

			updateWatchlistData(data);
		} catch (e) {
			console.log(e);
		}
	};

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
	]), [expand, watchlistData]);

	useEffect(() => {
		if (watchlist === null) return;
		refetchWatchlist();
	}, [watchlist]);

	useEffect(() => {
		if (!Array.isArray(watchlistListData) || watchlistListData.length === 0) return;

		if (watchlist !== null) return;
		setWatchlist(watchlistListData[0]);
	}, [watchlistListData, watchlist]);

	return (
		<div className='flex flex-col gap-4 h-full'>
			<Select
				classes={{
					root: 'border rounded border-L-gray-200 dark:border-D-gray-200'
				}}
				options={watchlistListData ?? []}
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
					rowData={watchlistData ?? []}
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

			{/* {isFetched && Array.isArray(watchlistData) && watchlistData.length === 0 && (
				<div style={{ bottom: 0, height: 'calc(100% - 2.5rem)' }} className='absolute overflow-hidden w-full'>
					<div className='relative h-full'>
						<NoData />
					</div>
				</div>
			)} */}
		</div>
	);
};

export default Watchlist;