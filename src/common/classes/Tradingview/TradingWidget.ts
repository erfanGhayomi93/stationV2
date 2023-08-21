import { QueryClient } from '@tanstack/react-query';
import routes from "src/api/apiRoutes";

import { ChartActionId, ChartingLibraryWidgetOptions, CreateStudyOptions, CustomTimezones, EmptyCallback, IChartingLibraryWidget, PriceScaleMode, ResolutionString, SeriesStyle, SubscribeEventsMap, TickMarkType } from 'src/charting_library';
import { widget } from "src/charting_library/charting_library.esm";
import Datafeed from './Datafeed';

type FillableOptions = 'symbol' | 'client_id' | 'user_id' | 'container';

type CompareOptions = {
	forceOverlay: boolean;
	lock: boolean;
	dataSource: 'close' | 'hight' | 'low' | 'open';
}

type ConstructorArgs = {
	options: Pick<ChartingLibraryWidgetOptions, FillableOptions> & Required<Pick<ChartingLibraryWidgetOptions, FillableOptions>>;
	adjusted?: boolean;
	theme: 'light' | 'dark';
	queryCache: QueryClient
}

class TradingWidget {
	private _configuration: ChartingLibraryWidgetOptions;

	private _theme: 'light' | 'dark';

	private _symbol: string;

	private _adjusted: boolean;

	private _symbolDivider = '_';

	private _queryCache: QueryClient;

	private _datafeed: Datafeed;

	public widget: IChartingLibraryWidget | null = null;

	public container: HTMLElement;

	constructor({ options, queryCache, adjusted = true, theme = 'light' }: ConstructorArgs) {
		this._theme = theme;

		this._adjusted = adjusted;

		this._symbol = options.symbol;

		this._queryCache = queryCache;

		this._datafeed = new Datafeed(this._symbol + this._symbolDivider + Number(this._adjusted), this._queryCache);

		this._configuration = {
			// @ts-ignore
			datafeed: this._datafeed,

			debug: false,

			timeframe: '60M',

			// @ts-ignore
			interval: 'D',

			fullscreen: false,

			timezone: "Asia/Tehran",

			library_path: '/charting_library/',

			locale: "fa",

			theme: this._theme === 'light' ? 'Light' : 'Dark',

			enabled_features: [
				"right_bar_stays_on_scroll",
				"use_localstorage_for_settings",
				"save_chart_properties_to_local_storage",
				"header_widget_dom_node",
				"study_templates",
				'object_tree_legend_mode',
				'hide_resolution_in_legend',
				'hide_main_series_symbol_from_indicator_legend',
				'hide_unresolved_symbols_in_legend',
			],

			disabled_features: [
				'header_widget',
				'header_saveload',
				'study_symbol_ticker_description',
				'save_shortcut',
				'delete_button_in_legend',
				'show_hide_button_in_legend',
				'timeframes_toolbar',
				"header_symbol_search",
				"link_to_tradingview",
				"source_selection_markers",
				"widget_logo",
				"volume_force_overlay",
				"header_interval_dialog_button",
				"chart_crosshair_menu"
			],

			charts_storage_url: routes.tvChart.index,

			charts_storage_api_version: '1.1',

			autosize: true,

			numeric_formatting: {
				decimal_sign: "."
			},

			customFormatters: {
				dateFormatter: {
					format: (date) => {
						return this._tickFormatter(date.getFullYear(), date.getMonth() + 1, date.getDate());
					},
					formatLocal: (date) => date.toString()
				},

				timeFormatter: {
					format: (date) => {
						const d = new Date(date);
						const dt = new Date(d.getTime() - 144E5);

						return '%h:%m'
							.replace('%h', dt.getHours().toString().padStart(2, '0'))
							.replace('%m', dt.getMinutes().toString().padStart(2, '0'))
							.replace('%s', dt.getSeconds().toString().padStart(2, '0'));
					},
					formatLocal: (date) => date.toString()
				},

				tickMarkFormatter: (date, tickMarkType: TickMarkType) => {
					const be = this._tickFormatter(date.getFullYear(), date.getMonth() + 1, date.getDate());
					const [, , Je, Tt, xt] = /(.*)\s(\d+)\/(\d+)\/(\d+)/.exec(be) as string[];
					const Wn = [
						'\u0641\u0631\u0648\u0631\u062f\u06cc\u0646',
						'\u0627\u0631\u062f\u06cc\u0628\u0647\u0634\u062a',
						'\u062e\u0631\u062f\u0627\u062f',
						'\u062a\u06cc\u0631',
						'\u0645\u0631\u062f\u0627\u062f',
						'\u0634\u0647\u0631\u06cc\u0648\u0631',
						'\u0645\u0647\u0631',
						'\u0622\u0628\u0627\u0646',
						'\u0622\u0630\u0631',
						'\u062f\u06cc',
						'\u0628\u0647\u0645\u0646',
						'\u0627\u0633\u0641\u0646\u062f'
					];

					if (tickMarkType === 'Year') return Je;
					else if (tickMarkType === 'Month') return Wn[+Tt - 1];
					else if (tickMarkType === 'DayOfMonth') return xt;
					else if (tickMarkType === 'Time') return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;

					return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
				}
			},

			custom_font_family: "IRANSansEnNum",

			custom_css_url: '/assets/css/charting_library.css',

			loading_screen: {
				backgroundColor: this._theme ? 'rgb(255, 255, 255)' : 'rgb(23, 24, 30)',
			},

			settings_overrides: this.palette.setting,

			symbol_search_request_delay: 1000,

			load_last_chart: true,

			auto_save_delay: 5,

			...options
		};

		this.container = this._configuration.container as HTMLElement;

		this._configuration.symbol = this._symbol + this._symbolDivider + Number(this._adjusted);
	}

	public create() {
		try {
			this.widget = new widget(this._configuration);
		} catch (e) {
			//
		}

		return this;
	}

	public compare(symbolISIN: string, options?: Partial<CompareOptions & CreateStudyOptions>) {
		try {
			if (!this.widget) return;

			const defaultOptions: CompareOptions & CreateStudyOptions = {
				forceOverlay: false,
				lock: false,
				dataSource: 'close',
				allowChangeCurrency: false,
				allowChangeUnit: false,
				priceScale: undefined,
				checkLimit: false,
				disableUndo: false,
				...options
			};

			this.widget.activeChart().createStudy('Compare', defaultOptions.forceOverlay, defaultOptions.lock, [defaultOptions.dataSource, symbolISIN], undefined, {
				checkLimit: defaultOptions.checkLimit,
				priceScale: defaultOptions.priceScale,
				allowChangeCurrency: defaultOptions.allowChangeCurrency,
				allowChangeUnit: defaultOptions.allowChangeUnit,
				disableUndo: defaultOptions.disableUndo,
			});
		} catch (e) {
			console.log(e);
		}
	}

	public resetChart() {
		this.executeActionById('chartReset');
	}

	public clearChart() {
		this.executeActionById('paneRemoveAllStudiesDrawingTools');
	}

	public toggleAllMarks() {
		this.executeActionById('hideAllMarks');
	}

	public undo() {
		this.executeActionById('undo');
	}

	public redo() {
		this.executeActionById('redo');
	}

	public executeActionById(actionId: ChartActionId) {
		if (!this.widget) return;

		try {
			if (this.widget.activeChart()) this.widget.activeChart().executeActionById(actionId);
		} catch (e) {
			//
		}
	}

	public onChartReady(cb: EmptyCallback) {
		if (!this.widget) return;

		try {
			this.widget.onChartReady(cb);
		} catch (e) {
			//
		}
	}

	public subscribe<EventName extends keyof SubscribeEventsMap>(event: EventName, callback: SubscribeEventsMap[EventName]): void {
		if (!this.widget) return;

		try {
			this.widget.subscribe(event, callback);
		} catch (e) {
			//
		}
	}

	/* PRIVATE METHODS */
	private _tickFormatter(m: number, T: number, P: number) {
		const W = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			be = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
		let Tt, xt, Wn, Ci;
		const gr = m - 1600,
			Ir = T - 1,
			ro = P - 1;
		let eo =
			365 * gr +
			Math.floor((gr + 3) / 4) -
			Math.floor((gr + 99) / 100) +
			Math.floor((gr + 399) / 400);
		for (Tt = 0; Tt < Ir; ++Tt) eo += W[Tt];
		for (
			Ir > 1 &&
			((gr % 4 === 0 && gr % 100 !== 0) || gr % 400 === 0) &&
			++eo,
			eo += ro,
			xt = eo - 79,
			Wn = Math.floor(xt / 12053),
			xt %= 12053,
			Ci = 979 + 33 * Wn + 4 * Math.floor(xt / 1461),
			xt %= 1461,
			xt >= 366 &&
			((Ci += Math.floor((xt - 1) / 365)), (xt = (xt - 1) % 365)),
			Tt = 0;
			Tt < 11 && xt >= be[Tt];
			++Tt
		)
			xt -= be[Tt];
		return `${[
			'\u06cc\u06a9 \u0634\u0646\u0628\u0647',
			'\u062f\u0648 \u0634\u0646\u0628\u0647',
			'\u0633\u0647 \u0634\u0646\u0628\u0647',
			'\u0686\u0647\u0627\u0631 \u0634\u0646\u0628\u0647',
			'\u067e\u0646\u062c \u0634\u0646\u0628\u0647',
			'\u062c\u0645\u0639\u0647',
			'\u0634\u0646\u0628\u0647'
		][new Date(m, T - 1, P).getDay()]}  ${Ci}/${Tt + 1}/${xt + 1}`;
	}

	private _resetData() {
		if (!this.widget) return;

		try {
			this.widget.activeChart().resetData();
		} catch (e) {
			//
		}
	}

	private _updateSymbol() {
		try {
			if (!this.widget) return;

			this._datafeed.symbol = this.symbolFull;
			this.widget.setSymbol(this.symbolFull, this.symbolInterval, () => {
				this._resetData();
			});
		} catch (e) {
			//
		}
	}

	/* SETTER */
	setTheme(value: 'light' | 'dark') {
		try {
			if (!this.widget) return;

			this._theme = value;
			this.widget.changeTheme(value === 'dark' ? 'Dark' : 'Light').then(() => {
				// @ts-ignore
				this.widget?.activeChart().applyOverrides(this.palette.setting);
			});
		} catch (e) {
			//
		}
	}

	setAdjusted(value: boolean) {
		this._adjusted = value;
		this._updateSymbol();
	}

	setInterval(resolution: string) {
		try {
			if (!this.widget) return;

			this.widget.activeChart().setResolution(resolution as ResolutionString);
		} catch (e) {
			console.log(e);
		}
	}

	setSymbol(symbolISIN: string) {
		if (!this.widget) return;

		this._symbol = symbolISIN;
		this._updateSymbol();
	}

	setChartType(type: SeriesStyle) {
		try {
			if (!this.widget) return;

			this.widget.activeChart().setChartType(type);
		} catch (e) {
			console.log(e);
		}
	}

	setTimezone(timezone: CustomTimezones | "Etc/UTC" | "exchange") {
		try {
			if (!this.widget) return;

			this.widget.activeChart().getTimezoneApi().setTimezone(timezone);
		} catch (e) {
			//
		}
	}

	setPriceScaleMode(mode: PriceScaleMode) {
		try {
			if (!this.widget) return;

			this.widget.activeChart().getPanes().forEach((pane) => {
				pane.getMainSourcePriceScale()?.setMode(mode);
			});
		} catch (e) {
			//
		}
	}

	/* GETTER */
	get palette() {
		return {
			setting: {
				'paneProperties.backgroundType': 'solid',
				'paneProperties.background': this._theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(23, 24, 30)',

				// Error
				'mainSeriesProperties.candleStyle.borderDownColor': 'rgb(235, 91, 91)',
				'mainSeriesProperties.candleStyle.downColor': 'rgb(235, 91, 91)',
				'mainSeriesProperties.candleStyle.wickDownColor': 'rgb(235, 91, 91)',

				// Success
				'mainSeriesProperties.candleStyle.borderUpColor': 'rgb(33, 195, 151)',
				'mainSeriesProperties.candleStyle.upColor': 'rgb(33, 195, 151)',
				'mainSeriesProperties.candleStyle.wickUpColor': 'rgb(33, 195, 151)',
			}
		};
	}

	get isAdjusted() {
		return this._adjusted;
	}

	get chartType() {
		try {
			if (!this.widget) return;

			return this.widget.activeChart().chartType();
		} catch (e) {
			//
		}
	}

	get symbolInterval() {
		try {
			if (!this.widget) return 'D' as ResolutionString;
			return this.widget.symbolInterval().interval;
		} catch (e) {
			return 'D' as ResolutionString;
		}
	}

	public get symbolISIN(): string {
		return this._symbol;
	}

	public get symbolFull(): string {
		return this._symbol + this._symbolDivider + Number(this._adjusted);
	}
}

export default TradingWidget;