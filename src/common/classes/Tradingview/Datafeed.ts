import { QueryClient } from "@tanstack/react-query";
// import axios from "api/axios";
// import apiRoutes from "api/apiRoutes";
import { DatafeedConfiguration, GetMarksCallback, HistoryCallback, LibrarySymbolInfo, Mark, MarkConstColors, OnReadyCallback, PeriodParams, ResolutionString, ResolveCallback, SearchSymbolResultItem, SearchSymbolsCallback, SubscribeBarsCallback, SymbolResolveExtension } from 'src/charting_library';
import Subscribe from "src/common/classes/Subscribe";
import { ItemUpdate } from "lightstreamer-client-web";
import AXIOS from "src/api/axiosInstance";
import apiRoutes from "src/api/apiRoutes";

type MarksType = Record<'id' | 'color' | 'text' | 'label' | 'labelFontColor', string[]>
	& Record<'minSize' | 'time', number[]>
	& {
		s: string;
	};

class Datafeed {
	public symbol: string;

	private _queryCache: QueryClient;

	private _subscription: Subscribe | null;

	constructor(symbol: string, queryCache: QueryClient) {
		this.symbol = symbol;
		this._queryCache = queryCache;
		this._subscription = null;
	}

	async onReady(cb: OnReadyCallback) {
		const defaultData: DatafeedConfiguration = {
			// @ts-ignore
			supported_resolutions: ["1", "5", "15", "30", "45", "60", "240", "D", "W", "M", "6M", "12M"],
			supports_group_request: false,
			supports_marks: true,
			supports_search: true,
			supports_timescale_marks: false,
			exchanges: [
				{
					desc: "بورس کالا",
					name: "بورس کالا",
					value: "CommodityExchange"
				},
				{
					desc: "آتی",
					name: "آتی",
					value: "Future"
				},
				{
					desc: "بازار پایه فرابورس",
					name: "بازار پایه فرابورس",
					value: "BaseFaraBourse"
				},
				{
					desc: "بورس",
					name: "بورس",
					value: "Bourse"
				},
				{
					desc: "فرابورس",
					name: "فرابورس",
					value: "FaraBourse"
				},
				{
					desc: "بورس انرژی",
					name: "بورس انرژی",
					value: "EnergyExchange"
				}
			],
			symbols_types: [
				{
					name: "همه",
					value: "All"
				},
				{
					name: "سهام",
					value: "Stock"
				}
			],
			supports_time: true,
			has_no_volume: false
		};

		try {
			const data = await this._queryCache.fetchQuery({
				queryKey: ['tv:config'],
				queryFn: async () => {
					try {
						const { data } = await AXIOS.get<DatafeedConfiguration>(apiRoutes.tvChart.config);
						return data;
					} catch (e) {
						return defaultData;
					}
				}
			});

			cb(data);
		} catch (error) {
			cb(defaultData);
		}
	}

	async resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension) {
		try {
			const symbolISIN = symbolName.split('-')[0];

			try {
				const data = await this._queryCache.fetchQuery({
					queryKey: ['tv:resolveSymbol', symbolISIN],
					queryFn: async () => {
						const { data } = await AXIOS.get<LibrarySymbolInfo & { lastTradedPrice: number }>(apiRoutes.tvChart.symbols, {
							params: {
								symbol: symbolISIN
							}
						});

						return data;
					}
				});

				onResolve(data);
			} catch (err) {
				onError(err as DOMException);
			}
		} catch (e) {
			//
		}
	}

	async searchSymbols(userInput: string, exchange: string, symbolType: string, onResult: SearchSymbolsCallback) {
		try {
			const params = {
				limit: 30,
				query: userInput,
				type: symbolType,
				exchange: exchange,
			};

			const data = await this._queryCache.fetchQuery({
				queryKey: ['tv:searchSymbols', params],
				queryFn: async () => {
					const { data } = await AXIOS.get<SearchSymbolResultItem[]>(apiRoutes.tvChart.search, { params });
					return data;
				}
			});

			onResult(data);
		} catch (e) {
			onResult([]);
		}
	}

	async getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback) {
		try {
			type ApiResponse = {
				s: "no_data",
				nextTime: 1559248200
			} & {
				t: number[];
				c: number[];
				o: number[];
				h: number[];
				l: number[];
				v: number[];
				s: string;
			};

			const params = {
				symbol: this.symbol,
				resolution: resolution,
				from: periodParams.from,
				to: periodParams.to,
				countback: periodParams.countBack
			};

			try {
				const { data } = await AXIOS.get<ApiResponse>(apiRoutes.tvChart.history, { params });

				if (data.s === 'no_data') {
					onResult([], {
						noData: true
					});
					return;
				}

				const bars: {
					time: number;
					low: number;
					high: number;
					open: number;
					close: number;
					volume: number;
				}[] = [];

				const length = data.h.length;
				for (let i = 0; i < length; i++) {
					const [o, h, l, c, t, v] = [data.o[i], data.h[i], data.l[i], data.c[i], data.t[i], data.v[i]];

					bars.push({
						time: t * 1E3,
						low: l ?? 0,
						high: h ?? 0,
						open: o ?? 0,
						close: c ?? 0,
						volume: v ?? 0,
					});
				}

				onResult(bars, {
					noData: bars.length === 0
				});
			} catch (e) {
				console.log(e);
				onResult([], {
					noData: true
				});
			}
		} catch (e) {
			console.log(e);
		}
	}

	async getMarks(symbolInfo: LibrarySymbolInfo & { id: string }, from: number, to: number, onDataCallback: GetMarksCallback<Mark>, resolution: ResolutionString) {
		try {
			const params = {
				symbol: this.symbol,
				from: from,
				to: to,
				resolution: resolution,
			};

			const data = await this._queryCache.fetchQuery({
				queryKey: ['tv:getBars', params],
				queryFn: async () => {
					const { data } = await AXIOS.get<MarksType>(apiRoutes.tvChart.marks, { params });

					const marks: Mark[] = [];
					const length = data.id.length;

					for (let i = 0; i < length; i++) {
						marks.push({
							id: data.id[i],
							color: data.color[i] as MarkConstColors,
							text: data.text[i],
							label: data.label[i],
							labelFontColor: data.labelFontColor[i],
							minSize: data.minSize[i],
							time: data.time[i],
						});
					}

					return marks;
				}
			});

			onDataCallback(data);
		} catch (e) {
			onDataCallback([]);
		}
	}

	subscribeBars(symbolInfo: LibrarySymbolInfo & { id: string }, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void) {
		onResetCacheNeededCallback();

		// this._subscription = subscribeTvChartBar(symbolInfo.id)
		// 	.addEventListener('onItemUpdate', (updateInfo) => this._onBarUpdate(updateInfo, onTick))
		// 	.start();
	}

	unsubscribeBars() {
		if (this._subscription) this._subscription.unsubscribe();
	}

	/* PRIVATE METHODS */
	private _onBarUpdate(updateInfo: ItemUpdate, onTick: SubscribeBarsCallback) {
		try {
			updateInfo.forEachChangedField((fieldName, _, value) => {
				if (value) {
					console.log(fieldName, value);
				}
			});
		} catch (e) {
			//
		}
	}
}

export default Datafeed;