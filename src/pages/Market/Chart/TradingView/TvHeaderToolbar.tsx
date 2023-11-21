import { EntityId } from '@reduxjs/toolkit';
import Tippy from '@tippyjs/react';
import axios from 'src/api/axiosInstance';
import { ChartActionId, EntityInfo, IChartingLibraryWidget, LibrarySymbolInfo, ResolutionString, SaveLoadChartRecord, SeriesStyle, StudyEventType, UndoRedoState } from 'src/charting_library/charting_library';
import ipcMain from 'src/common/classes/IpcMain';
import clsx from 'clsx';
import Select from 'src/common/components/SelectAsync';
import {
	ArrowDown as ArrowDownSVG,
	ChartTypeAreaSVG,
	ChartTypeBarSVG,
	ChartTypeBaselineSVG,
	ChartTypeCandleSVG,
	ChartTypeHallowCandleSVG,
	ChartTypeHekinAshiSVG,
	ChartTypeLineSVG,
	CloseIcon as CloseSVG,
	CopyOutlineSVG,
	EyeOffOutlineSVG,
	EyeOutlineSVG,
	ListLayoutSVG
} from 'src/common/icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { downloadCanvasAsImage, getURL, seprateNumber as sepNumbers } from 'src/utils/helpers';
import styles from './TradingView.module.scss';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import TradingWidget from 'src/common/classes/Tradingview/TradingWidget';
import Dropdown from 'src/common/components/Dropdown/Dropdown';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { getTheme } from 'src/redux/slices/ui';
import { useSavedStudyTemplatesQuery, useTvSavedChart } from 'src/app/queries/tradingView';
import { useTradingState } from '../context';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { queryClient } from 'src/app/queryClient';

export interface onSavedChartSuccessfully {
	uid: string
	data: {
		resolution: string
		symbol_type: string
		exchange: string
		listed_exchange: string
		symbol: string
		short_name: string
		legs: string
		name: string
		description: string
		charts_symbols: string
		is_realtime: string
		content: string
	}
}

type ResolutionType = Record<'id' | 'label', string>;

type SaveLoadActionType = 'rename_chart' | 'load_charts' | 'copy_chart';

type ConfigurationType = {
	adjusted: boolean;
	marksIsHide: boolean;
	resolution: ResolutionString;
	chartType: SeriesStyle;
} & UndoRedoState;

type TvHeaderToolbarProps = {
	activeChart: TradingWidget;
	userData: UserType;
	layout: '1' | '2c' | '2r' | '3c' | '3r' | '2-2' | '4r' | '4c';
}

const TvHeaderToolbar = ({ activeChart, layout, userData }: TvHeaderToolbarProps) => {
	const timer = useRef<NodeJS.Timeout | undefined>();

	const indicatorTimer = useRef<NodeJS.Timeout | undefined>();

	const savedChartRef = useRef<SaveLoadChartRecord | null>(null);

	const theme = useAppSelector(getTheme);

	// const queryClient = useQueryClient();

	const selectedSymbol = useAppSelector(getSelectedSymbol);

	const [configuration, setConfiguration] = useState<null | ConfigurationType>(null);

	const [savedChart, setSavedChart] = useState<SaveLoadChartRecord | null>(null);

	const [localstudies, setLocalstudies] = useLocalStorage<Record<string, EntityInfo[]>>('tradingview.saved_indicators', {});


	const { setState } = useTradingState()

	const setToggleModal = (value: string) => {
		setState({ type: "Toggle_Modal_TV", value })
	}


	const { data: savedStudyTemplates, refetch: refetchSavedStudyTemplates } = useSavedStudyTemplatesQuery(
		{
			client: userData?.customerISIN ?? 0,
			user: userData?.customerISIN ?? 0,
		},
		{
			enabled: false
		}
	);

	const { isFetching: isFetchingSavedCharts } = useTvSavedChart(

		{
			client: userData?.customerISIN ?? 0,
			user: userData?.customerISIN ?? 0,
		}
		,
		{
			onSuccess: (data) => {
				if (!data || data.length === 0) return;

				const instanceOfData = [...data];

				instanceOfData.sort((a, b) => b.timestamp - a.timestamp);
				const loadedChart = instanceOfData[0];

				if (loadedChart) {
					setSavedChart({
						id: loadedChart.id,
						image_url: '',
						// @ts-ignore
						interval: loadedChart.resolution,
						name: loadedChart.name,
						short_symbol: loadedChart.symbol,
						modified_iso: loadedChart.timestamp
					});
				}
			},
		}
	);

	const getSavedCharts = () => {
		try {
			const data = queryClient.getQueryData([
				'tvSavedCharts',
				{
					client: userData?.customerISIN ?? 0,
					user: userData?.customerISIN ?? 0,
				}
			]);

			return (data ? JSON.parse(JSON.stringify(data)) : []) as TvSavedChartType[];
		} catch (e) {
			return [];
		}
	};

	const setFieldOfConfiguration = <T extends keyof ConfigurationType>(name: T, value: ConfigurationType[T]) => {
		setConfiguration((config) => ({
			...(config!),
			[name]: value
		}));
	};

	const applyIndicator = (indicatorId: string) => {
		if (!activeChart.widget) return;

		try {
			activeChart.widget.activeChart().createStudy(indicatorId);
		} catch (e) {
			console.log((e as Error).message);
		}
	};

	const getSymbolName = () => {
		const { widget } = activeChart;
		if (!widget) return "";

		return widget.activeChart()?.symbolExt().symbol;
	};

	const onChangeChartType = (type: SeriesStyle) => {
		if (!activeChart) return;

		activeChart.setChartType(type);
		setFieldOfConfiguration('chartType', type);
	};

	const onHideMarks = () => {
		if (!activeChart) return;

		activeChart.toggleAllMarks();
		setFieldOfConfiguration('marksIsHide', !configuration?.marksIsHide);
	};

	const onChangeAdjusted = (adjusted: boolean) => {
		if (!activeChart) return;

		activeChart.setAdjusted(adjusted);
		setFieldOfConfiguration('adjusted', adjusted);
	};

	const onChangeResolution = (resolution: ResolutionString) => {
		if (!activeChart) return;

		activeChart.setInterval(resolution);
		setFieldOfConfiguration('resolution', resolution);
	};

	const onExecuteAction = (actionId: ChartActionId | string) => {
		if (!activeChart) return;

		try {
			const widget = activeChart.widget as IChartingLibraryWidget;

			if (actionId === 'open_in_new_tab') window.open(window.location.href, '_blank');
			if (actionId === 'save_chart') widget.showSaveAsChartDialog();
			if (actionId === 'undo' || actionId === 'redo') {
				activeChart.executeActionById(actionId);

				const undoRedoState = widget!.undoRedoState();

				setConfiguration({
					...(configuration as ConfigurationType),
					...undoRedoState
				});
			}
			else if (actionId === 'fullscreen') {
				try {
					const div = document.getElementById('tv_container') as HTMLDivElement;
					div.requestFullscreen();
				} catch (e) {
					console.log(e);
				}
			}
			else if (actionId === 'screenshot') {
				widget
					.takeClientScreenshot()
					.then((canvas) => {
						downloadCanvasAsImage(canvas, 'tv-canvas');
					});
			}
			else if (actionId === 'compareOrAdd') {
				setToggleModal("tvCompareModal")
			}
			else if (actionId === 'insertIndicator') {
				// dispatch(toggleTvIndicatorsModal(true));
				setToggleModal("tvIndicatorsModal")
			}
			else if (actionId === 'chartReset') {
				activeChart.resetChart();
				activeChart.clearChart();
			}
			else activeChart.executeActionById(actionId as ChartActionId);

		} catch (e) {
			//
		}
	};

	const onExecuteSaveLoadAction = (actionId: SaveLoadActionType, cb?: () => void) => {
		try {
			if (actionId === 'copy_chart') setToggleModal("tvSaveChartTemplate");
			else if (actionId === 'load_charts') setToggleModal("tvLoadChartTemplate");
		} catch (e) {
			console.log((e as Error).message);
		} finally {
			cb?.();
		}
	};

	const onActiveChartChanged = (tvWidget: TradingWidget) => {
		try {
			activeChart = tvWidget;

			const undoRedoState = tvWidget.widget!.undoRedoState();
			setConfiguration({
				marksIsHide: false,
				resolution: tvWidget.symbolInterval,
				chartType: tvWidget.chartType ?? 1,
				adjusted: tvWidget.isAdjusted,
				...undoRedoState,
			});
		} catch (e) {
			//
		}
	};

	const onSaveIndicatorsTemplate = (cb: () => void) => {
		try {
			setToggleModal("tvSaveIndicatorsTemplate");
		} catch (e) {
			//
		} finally {
			cb();
		}
	};

	const onApplyStudyTemplate = async (studyTemplate: TvStudyTemplateListType, cb: () => void) => {
		const { widget } = activeChart;
		if (!widget) return;

		try {
			cb();

			const response = await axios.get<{ status: string; data: { name: string; content: string; } }>(Apis().tvChart.studyTemplate, {
				params: {
					client: String(userData?.customerISIN ?? 0),
					user: String(userData?.customerISIN ?? 0),
					template: studyTemplate.name
				}
			});

			const result = response.data;
			if (response.status !== 200 || result.status !== 'ok') throw new Error("");

			const content = JSON.parse(result.data.content) as object;
			widget.activeChart().applyStudyTemplate(content);
		} catch (e) {
			//
		}
	};

	const onDeleteStudyTemplate = (studyName: string, cb: () => void) => {
		const { widget } = activeChart;
		if (!widget) return;

		try {
			cb();

			axios.delete<{ status: string; data: { name: string; content: string; } }>(Apis().tvChart.studyTemplate, {
				params: {
					client: String(userData?.customerISIN ?? 0),
					user: String(userData?.customerISIN ?? 0),
					template: studyName
				}
			});
		} catch (e) {
			//
		}
	};

	const onSaveStudyTemplate = async ({ name, saveInterval, saveSymbol }: { name: string; saveInterval: boolean; saveSymbol: boolean; }) => {
		try {
			const widget = activeChart.widget;
			if (!widget) return;

			const studyTemplate = widget.activeChart().createStudyTemplate({
				saveInterval,
				saveSymbol
			});

			if ('symbol' in studyTemplate) {
				studyTemplate.symbol = getSymbolName();
			}

			const apiURL = getURL(Apis().tvChart.studyTemplate, {
				client: String(userData?.customerISIN ?? 0),
				user: String(userData?.customerISIN ?? 0)
			});

			const fd = new FormData();

			fd.append('name', name);
			fd.append('content', JSON.stringify(studyTemplate));

			await axios.post<{ status: string }>(apiURL, fd);
		} catch (e) {
			//
		}
	};

	const onSaveChart = ({ name }: { name: string }) => {
		const { widget } = activeChart;
		if (!widget) return;

		try {
			widget.saveChartToServer(
				(symbol) => {
					setSavedChart({
						id: Number(symbol.uid),
						name,
						image_url: "",
						modified_iso: (new Date()).getTime(),
						short_symbol: symbol.data.short_name,
						interval: symbol.data.resolution as ResolutionString,
					});
				},
				undefined,
				{
					chartName: name
				}
			);
		} catch (e) {
			//
		}
	};

	const onDeleteSavedChart = async (chartId: number) => {
		try {
			const response = await axios.delete(Apis().tvChart.delete, {
				params: {
					client: userData?.customerISIN ?? 0,
					user: userData?.customerISIN ?? 0,
					chart: chartId
				}
			});
			const result = response.data;

			if (response.status !== 200 || result.status !== 'ok') return undefined;

			return result.data;
		} catch (e) {
			//
		}
	};

	const onAutosaveNeeded = () => {
		if (timer.current) clearTimeout(timer.current);

		timer.current = setTimeout(() => {
			const { widget } = activeChart;
			const savedChart = savedChartRef.current;
			if (!widget) return;

			if (!savedChart) {
				onSaveChart({ name: 'نمودار من' });
				return;
			}

			try {
				widget.save(async (content) => {
					try {
						const apiURL = getURL(Apis().tvChart.save, {
							client: String(userData?.customerISIN ?? 0),
							user: String(userData?.customerISIN ?? 0)
						});

						const symbolExt = widget.activeChart().symbolExt();

						const chartContent = {
							resolution: savedChart.interval,
							symbol_type: savedChart.short_symbol,
							exchange: symbolExt?.exchange ?? "",
							listed_exchange: symbolExt?.exchange ?? "",
							symbol: activeChart.symbolFull,
							short_name: symbolExt?.symbol ?? "",
							legs: JSON.stringify([{
								symbol: symbolExt.symbol,
								pro_symbol: symbolExt.pro_name
							}]),
							name: savedChart.name,
							description: symbolExt.description,
							charts_symbols: JSON.stringify({
								1: {
									symbol: activeChart.symbolFull
								}
							}),
							is_realtime: 1,
							content: JSON.stringify(content)
						};

						const fd = new FormData();
						fd.append('ChartId', String(savedChart.id));
						fd.append('content', JSON.stringify(chartContent));

						await axios.post<{ status: string; id: number }>(apiURL, fd);
					} catch (e) {
						//
					}
				});
			} catch (e) {
				//
			}
		}, 1000);
	};


	const onSymbolChanged = (symbol: LibrarySymbolInfo & { lastTradedPrice: number }) => {
		const { widget } = activeChart;
		if (!widget) return '';

		try {
			widget.activeChart().priceFormatter().format = (value) => {
				if (!value) return '';
				return sepNumbers(Number(value.toFixed(0)));
			};

			const [symbolTitle, companyTitle] = symbol.full_name.split('-');
			const symbolISIN = (symbol.ticker as string).split('-')[0];

			try {
				const studies = localstudies;
				const symbolStudies = studies[symbolISIN];
				widget.activeChart().removeAllStudies();

				if (symbolStudies) {
					for (let i = 0; i < symbolStudies.length; i++) {
						const indicatorStudy = symbolStudies[i];
						widget.activeChart().createStudy(indicatorStudy.name);
					}
				}
			} catch (e) {
				// Handle the error
			}

			ipcMain.send('tv_chart:refetch_recent_history');


		} catch (e) {
			console.log(e);
		}
	}


	const onChangedStudies = (entityId: EntityId, studyEventType: StudyEventType) => {
		try {
			const widget = activeChart.widget;
			if (!widget) return;

			const symbol = activeChart.symbolISIN;
			const studies = widget.activeChart().getAllStudies();

			let savedIndicators: Record<string, EntityInfo[]> = {};
			try {
				savedIndicators = { ...localstudies };
			} catch (e) {
				savedIndicators = {};
			}

			savedIndicators[symbol] = studies;
			// Localstorage.set('tradingview.saved_indicators', savedIndicators);
			setLocalstudies(savedIndicators)
		} catch (e) {
			//
		}
	};

	const indicatorsTemplates = useMemo(() => {
		const options: (TvStudyTemplateListType | Record<'id' | 'label', string>)[] = [
			{ id: 'save_indicators_template', label: 'ذخیره قالب اندیکاتور' }
		];

		if (savedStudyTemplates && savedStudyTemplates.length > 0) options.push(...savedStudyTemplates);

		return options;
	}, [savedStudyTemplates]);

	const availableResolutions = useMemo<ResolutionType[]>(() => ([
		{ id: '1', label: '1 دقیقه' },
		{ id: '5', label: '5 دقیقه' },
		{ id: '15', label: '15 دقیقه' },
		{ id: '30', label: '30 دقیقه' },
		{ id: '45', label: '45 دقیقه' },
		{ id: '60', label: '1 ساعت' },
		{ id: '120', label: '2 ساعت' },
		{ id: '240', label: '4 ساعت' },
		{ id: 'D', label: '1 روز' },
		{ id: 'W', label: '1 هفته' },
		{ id: 'M', label: '1 ماه' },
		{ id: '6M', label: '6 ماه' },
		{ id: '12M', label: '1 سال' }
	]), []);

	const currentResolution = useMemo(() => {
		if (!configuration) return availableResolutions[5];
		return availableResolutions.find((res) => res.id === configuration.resolution) ?? availableResolutions[5];
	}, [configuration, activeChart]);

	const availableAdjusts = useMemo(() => ([
		{ id: false, label: 'بدون تعدیل' },
		{ id: true, label: 'تعدیل شده' }
	]), []);

	const availableCandles = useMemo(() => ([
		{
			id: 0,
			label: 'میله‌ای'
		},
		{
			id: 1,
			label: 'شمعی'
		},
		{
			id: 9,
			label: 'Hallow candles'
		},
		{
			id: 2,
			label: 'خطی'
		},
		{
			id: 3,
			label: 'ناحیه‌ای'
		},
		{
			id: 10,
			label: 'Baseline'
		},
		{
			id: 8,
			label: 'هایکن آشی'
		},
	]), []);

	const candleSvg = useMemo<JSX.Element>(() => {
		const icons = {
			0: <ChartTypeBarSVG />,
			1: <ChartTypeCandleSVG />,
			2: <ChartTypeLineSVG />,
			3: <ChartTypeAreaSVG />,
			8: <ChartTypeHekinAshiSVG />,
			9: <ChartTypeHallowCandleSVG />,
			10: <ChartTypeBaselineSVG />
		};

		return icons[configuration?.chartType as keyof typeof icons];
	}, [configuration?.chartType]);

	const saveLoadChartOptions = useMemo<{ id: SaveLoadActionType, label: string; Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string | undefined; }> }[]>(() => ([
		// { id: 'rename_chart', label: 'تغییر نام', Icon: EditSquareSVG },
		{ id: 'load_charts', label: 'بارگذاری نمودار', Icon: ListLayoutSVG },
		{ id: 'copy_chart', label: 'کپی نمودار', Icon: CopyOutlineSVG }
	]), []);

	useEffect(() => {
		if (!activeChart.widget) return;

		try {
			onActiveChartChanged(activeChart);

			activeChart.widget.activeChart().onIntervalChanged().subscribe(null, (interval) => {
				let modifiedInterval: string = interval;
				if (interval === '1W') modifiedInterval = 'W';
				if (interval === '1D') modifiedInterval = 'D';
				if (interval === '1M') modifiedInterval = 'M';

				// @ts-ignore
				onChangeResolution(modifiedInterval);
			});

			// @ts-ignore
			activeChart.widget.activeChart().onSymbolChanged().subscribe(null, onSymbolChanged);

			activeChart.subscribe('study_event', (entityId, studyEventType) => {
				try {
					if (indicatorTimer.current) clearTimeout(indicatorTimer.current);
					indicatorTimer.current = setTimeout(() => onChangedStudies(entityId, studyEventType), 750);
				} catch (e) {
					//
				}
			});

			activeChart.subscribe('hideAllMarks', (value) => setFieldOfConfiguration('marksIsHide', value));

			activeChart.subscribe('chart_load_requested', (savedData: object) => {
				try {
					const allSavedCharts = getSavedCharts();

					// @ts-ignore
					const chart = allSavedCharts.find((chart) => chart.id === savedData.uid);

					if (!chart) throw new Error('Chart does not exists');

					setSavedChart({
						id: chart.id,
						name: chart.name,
						image_url: '',
						modified_iso: chart.timestamp,
						short_symbol: chart.symbol,
						interval: chart.resolution as ResolutionString
					});
				} catch (e) {
					console.log(e);
				}
			});

			activeChart.subscribe('drawing_event', () => onAutosaveNeeded());

			activeChart.subscribe('study_event', () => onAutosaveNeeded());
		} catch (e) {
			clearTimeout(timer.current);
		}
	}, [activeChart]);

	useEffect(() => {
		if (!activeChart.widget || !savedChart) return;

		try {
			if (savedChart) activeChart.subscribe('onAutoSaveNeeded', () => onAutosaveNeeded());
			else activeChart.widget.unsubscribe('onAutoSaveNeeded', () => {
				//
			});
		} catch (e) {
			//
		}
	}, [activeChart, savedChart]);

	useEffect(() => {
		if (!activeChart) return;

		ipcMain.handle<string>('tv_chart:update_symbol', (symbolISIN) => {
			if (activeChart) activeChart.setSymbol(symbolISIN);
		});

		ipcMain.handle<string>('tv_chart:compare_symbol', (symbolISIN) => activeChart.compare(symbolISIN));

		ipcMain.handle<string>('tv_chart:set_indicator', (indicatorId) => applyIndicator(indicatorId));

		ipcMain.handle<{ name: string; saveInterval: boolean; saveSymbol: boolean; }>('tv_chart:save_study_template', onSaveStudyTemplate);

		ipcMain.handle<{ name: string }>('tv_chart:save_layout_template', onSaveChart);

		ipcMain.handle<number>('tv_chart:delete_saved_chart', onDeleteSavedChart);

		ipcMain.handle<number>('tv_chart:empty_charts', () => {
			setSavedChart(null);
		});

		return () => {
			ipcMain.removeChannel('tv_chart:update_symbol');

			ipcMain.removeChannel('tv_chart:compare_symbol');

			ipcMain.removeChannel('tv_chart:set_indicator');

			ipcMain.removeChannel('tv_chart:save_study_template');

			ipcMain.removeChannel('tv_chart:load_chart');

			ipcMain.removeChannel('tv_chart:save_layout_template');

			ipcMain.removeChannel('tv_chart:delete_saved_chart');

			ipcMain.removeChannel('tv_chart:empty_charts');
		};
	}, [activeChart]);


	useEffect(() => {
		savedChartRef.current = savedChart;
	}, [savedChart]);

	useEffect(() => {
		if (!activeChart.widget || !selectedSymbol) return;

		activeChart.setSymbol(selectedSymbol);
	}, [selectedSymbol]);

	return (
		<div className={clsx('flex rtl justify-between bg-L-basic dark:bg-D-basic w-full', theme === 'dark' && styles.dark)}>
			<ul className={clsx(styles.list, 'justify-start')}>
				<li style={{ width: '96px' }} className='flex items-center justify-center p-2'>
					<Select
						classes={{
							root: 'flex justify-center',
							container: 'border-0',
							icons: 'hidden',
							label: 'text-base'
						}}
						defaultDialogWidth={140}
						options={availableResolutions}
						value={currentResolution}
						onChange={(value) => onChangeResolution(value.id as ResolutionString)}
						getOptionLabel={v => v.label}
						getOptionId={v => v.id}
					>
						{(value) => (
							<Select.Option option={value} />
						)}
					</Select>
				</li>

				<li className='flex items-center justify-center px-2'>
					<Select
						classes={{
							root: 'flex justify-center',
							container: 'border-0',
							icons: 'hidden',
							label: 'text-base'
						}}
						defaultDialogWidth={140}
						options={availableCandles}
						value={configuration ? { id: configuration.chartType, label: "" } : null}
						onChange={(type) => onChangeChartType(type.id)}
						getOptionLabel={(v) => v.label}
						getInputLabel={() => candleSvg}
						getOptionId={v => v.id}
					>
						{(value) => (
							<Select.Option option={value} />
						)}
					</Select>
				</li>

				<li>
					<button
						role="button"
						type='button'
						className={clsx(styles.btn, styles.expand)}
						onClick={() => onExecuteAction('compareOrAdd')}
					>
						<span>
							<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g fill='currentColor'>
									<path d="M9.72812 17.9621C4.77812 17.9621 0.765625 13.9496 0.765625 8.99961C0.765625 4.04961 4.77812 0.0371094 9.72812 0.0371094C14.6781 0.0371094 18.6906 4.04961 18.6906 8.99961C18.6906 13.9496 14.6781 17.9621 9.72812 17.9621ZM9.72812 1.01211C5.34062 1.01211 1.74062 4.61211 1.74062 8.99961C1.74062 13.3871 5.34062 16.9871 9.72812 16.9871C14.1156 16.9871 17.7156 13.3871 17.7156 8.99961C17.7156 4.61211 14.1156 1.01211 9.72812 1.01211Z" />
									<path d="M4.96875 8.47461H14.4938V9.52461H4.96875V8.47461Z" />
									<path d="M9.20312 4.23633H10.2531V13.7613H9.20312V4.23633Z" />
								</g>
							</svg>

							<span>مقایسه</span>
						</span>
					</button>
				</li>

				<li>
					<button
						role="button"
						type='button'
						className={clsx(styles.btn, styles.expand)}
						onClick={() => onExecuteAction('insertIndicator')}
					>
						<span className='gap-4'>
							<svg width='28px' height='28px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none">
								<path stroke="currentColor" d="M20 17l-5 5M15 17l5 5M9 11.5h7M17.5 8a2.5 2.5 0 0 0-5 0v11a2.5 2.5 0 0 1-5 0" />
							</svg>

							<span>اندیکاتورها</span>
						</span>
					</button>
				</li>

				<li className='flex items-center justify-center'>
					<Dropdown<TvStudyTemplateListType | Record<'id' | 'label', string>>
						data={indicatorsTemplates}
						onOpen={refetchSavedStudyTemplates}
						defaultDialogWidth={200}
						ListItem={({ item, onClose, index }) => (
							<li
								role="menuitem"
								key={item.id}
								className={clsx('whitespace-nowrap w-full border-L-gray-200 dark:border-D-gray-200 last:border-transparent dark:last:border-transparent bg-L-basic dark:bg-D-basic hover:bg-gray-200 dark:hover:bg-dark-gray-200 transition-colors px-4', {
									'border-b border-gray-400 dark:border-dark-gray-400': index === 0 && savedStudyTemplates && savedStudyTemplates.length > 0
								})}
							>
								<button
									role="button"
									type="button"
									onClick={index === 0 ? () => onSaveIndicatorsTemplate(onClose) : () => onApplyStudyTemplate(item as TvStudyTemplateListType, onClose)}
									className={clsx('btn-hover flex items-center relative text-xs justify-start text-L-gray-700 dark:text-D-gray-700 w-full px-1 h-10', {
										'border-b border-L-gray-200 dark:border-D-gray-200': !(savedStudyTemplates && savedStudyTemplates.length > 0 && (index === 0 || index === savedStudyTemplates.length))
									})}
								>
									<span className='flex items-center gap-16'>
										<span>{('label' in item) ? item.label : item.name}</span>
									</span>

									{index > 0 && (
										<span
											tabIndex={-1}
											role="button"
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();

												onDeleteStudyTemplate((item as TvStudyTemplateListType).name, onClose);
											}}
											className={clsx('absolute trigger text-L-gray-700 dark:text-D-gray-700 left-0 flex items-center justify-center transition-colors', styles.delete)}
										>
											<CloseSVG width='1rem' height='1rem' />
										</span>
									)}
								</button>
							</li>
						)}
					>
						<button
							role="button"
							type='button'
							className={clsx(styles.btn, styles.expand)}
						>
							<span className='gap-1'>
								<svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M6.93537 3H8.22088C8.67178 3 9.03545 2.99999 9.33148 3.02019C9.63583 3.04096 9.905 3.08474 10.1599 3.1903C10.7724 3.44404 11.2591 3.93071 11.5128 4.54328C11.6184 4.79813 11.6622 5.0673 11.683 5.37165C11.7031 5.66768 11.7031 6.03135 11.7031 6.48225V7.76775C11.7031 8.21865 11.7031 8.58236 11.683 8.87835C11.6622 9.1827 11.6184 9.45187 11.5128 9.70673C11.2591 10.3193 10.7724 10.806 10.1599 11.0597C9.905 11.1652 9.63583 11.2091 9.33148 11.2298C9.03545 11.25 8.67178 11.25 8.22088 11.25H6.93537C6.48447 11.25 6.1208 11.25 5.82478 11.2298C5.52043 11.2091 5.25125 11.1652 4.9964 11.0597C4.38384 10.806 3.89716 10.3193 3.64343 9.70673C3.53786 9.45187 3.49408 9.1827 3.47331 8.87835C3.45312 8.58232 3.45312 8.21865 3.45313 7.76775V6.48225C3.45312 6.03135 3.45312 5.66768 3.47331 5.37165C3.49408 5.0673 3.53786 4.79813 3.64343 4.54328C3.89716 3.93071 4.38384 3.44404 4.9964 3.1903C5.25125 3.08474 5.52043 3.04096 5.82478 3.02019C6.1208 2.99999 6.48447 3 6.93537 3ZM5.89284 4.01786C5.63938 4.03515 5.49178 4.06751 5.37909 4.11416C5.01155 4.26641 4.71954 4.55843 4.56729 4.92596C4.52064 5.03865 4.48828 5.18625 4.47099 5.43971C4.4534 5.69768 4.45314 6.02722 4.45314 6.49999V7.75001C4.45314 8.22277 4.4534 8.55233 4.47099 8.81029C4.48828 9.06375 4.52064 9.21135 4.56729 9.32404C4.71954 9.69157 5.01155 9.98359 5.37909 10.1358C5.49178 10.1825 5.63938 10.2148 5.89284 10.2321C6.1508 10.2497 6.48035 10.25 6.95311 10.25H8.20314C8.6759 10.25 9.00545 10.2497 9.26341 10.2321C9.51688 10.2148 9.66447 10.1825 9.77716 10.1358C10.1447 9.98359 10.4367 9.69157 10.589 9.32404C10.6356 9.21135 10.668 9.06375 10.6853 8.81029C10.7028 8.55233 10.7031 8.22277 10.7031 7.75001V6.49999C10.7031 6.02722 10.7028 5.69768 10.6853 5.43971C10.668 5.18625 10.6356 5.03865 10.589 4.92596C10.4367 4.55843 10.1447 4.26641 9.77716 4.11416C9.66447 4.06751 9.51688 4.03515 9.26341 4.01786C9.00545 4.00028 8.6759 4.00001 8.20314 4.00001H6.95311C6.48035 4.00001 6.1508 4.00028 5.89284 4.01786ZM6.93537 12.75H8.22088C8.67178 12.75 9.03545 12.75 9.33148 12.7702C9.63583 12.7909 9.905 12.8348 10.1599 12.9403C10.7724 13.194 11.2591 13.6807 11.5128 14.2933C11.6184 14.5481 11.6622 14.8173 11.683 15.1217C11.7031 15.4177 11.7031 15.7814 11.7031 16.2323V17.5177C11.7031 17.9686 11.7031 18.3324 11.683 18.6283C11.6622 18.9327 11.6184 19.2019 11.5128 19.4567C11.2591 20.0693 10.7724 20.556 10.1599 20.8097C9.905 20.9153 9.63583 20.9591 9.33148 20.9798C9.03545 21 8.67178 21 8.22088 21H6.93537C6.48447 21 6.1208 21 5.82478 20.9798C5.52043 20.9591 5.25125 20.9153 4.9964 20.8097C4.38384 20.556 3.89716 20.0693 3.64343 19.4567C3.53786 19.2019 3.49408 18.9327 3.47331 18.6283C3.45312 18.3323 3.45312 17.9686 3.45313 17.5177V16.2323C3.45312 15.7814 3.45312 15.4177 3.47331 15.1217C3.49408 14.8173 3.53786 14.5481 3.64343 14.2933C3.89716 13.6807 4.38384 13.194 4.9964 12.9403C5.25125 12.8348 5.52043 12.7909 5.82478 12.7702C6.1208 12.75 6.48447 12.75 6.93537 12.75ZM5.89284 13.7679C5.63938 13.7851 5.49178 13.8175 5.37909 13.8642C5.01155 14.0164 4.71954 14.3084 4.56729 14.676C4.52064 14.7886 4.48828 14.9363 4.47099 15.1897C4.4534 15.4477 4.45314 15.7772 4.45314 16.25V17.5C4.45314 17.9728 4.4534 18.3023 4.47099 18.5603C4.48828 18.8137 4.52064 18.9614 4.56729 19.074C4.71954 19.4416 5.01155 19.7336 5.37909 19.8858C5.49178 19.9325 5.63938 19.9649 5.89284 19.9821C6.1508 19.9997 6.48035 20 6.95311 20H8.20314C8.6759 20 9.00545 19.9997 9.26341 19.9821C9.51688 19.9649 9.66447 19.9325 9.77716 19.8858C10.1447 19.7336 10.4367 19.4416 10.589 19.074C10.6356 18.9614 10.668 18.8137 10.6853 18.5603C10.7028 18.3023 10.7031 17.9728 10.7031 17.5V16.25C10.7031 15.7772 10.7028 15.4477 10.6853 15.1897C10.668 14.9363 10.6356 14.7886 10.589 14.676C10.4367 14.3084 10.1447 14.0164 9.77716 13.8642C9.66447 13.8175 9.51688 13.7851 9.26341 13.7679C9.00545 13.7503 8.6759 13.75 8.20314 13.75H6.95311C6.48035 13.75 6.1508 13.7503 5.89284 13.7679ZM16.6854 3H17.9709C18.4218 3 18.7854 2.99999 19.0815 3.02019C19.3858 3.04096 19.655 3.08474 19.9099 3.1903C20.5224 3.44404 21.0091 3.93071 21.2628 4.54328C21.3684 4.79813 21.4122 5.0673 21.433 5.37165C21.4531 5.66768 21.4531 6.03135 21.4531 6.48225V7.76775C21.4531 8.21865 21.4531 8.58236 21.433 8.87835C21.4122 9.1827 21.3684 9.45187 21.2628 9.70673C21.0091 10.3193 20.5224 10.806 19.9099 11.0597C19.655 11.1652 19.3858 11.2091 19.0815 11.2298C18.7854 11.25 18.4218 11.25 17.9709 11.25H16.6854C16.2345 11.25 15.8708 11.25 15.5748 11.2298C15.2704 11.2091 15.0012 11.1652 14.7464 11.0597C14.1338 10.806 13.6472 10.3193 13.3934 9.70673C13.2879 9.45187 13.2441 9.1827 13.2233 8.87835C13.2031 8.58232 13.2031 8.21865 13.2031 7.76775V6.48225C13.2031 6.03135 13.2031 5.66768 13.2233 5.37165C13.2441 5.0673 13.2879 4.79813 13.3934 4.54328C13.6472 3.93071 14.1338 3.44404 14.7464 3.1903C15.0012 3.08474 15.2704 3.04096 15.5748 3.02019C15.8708 2.99999 16.2345 3 16.6854 3ZM15.6428 4.01786C15.3894 4.03515 15.2418 4.06751 15.1291 4.11416C14.7615 4.26641 14.4695 4.55843 14.3173 4.92596C14.2706 5.03865 14.2383 5.18625 14.221 5.43971C14.2034 5.69768 14.2031 6.02722 14.2031 6.49999V7.75001C14.2031 8.22277 14.2034 8.55233 14.221 8.81029C14.2383 9.06375 14.2706 9.21135 14.3173 9.32404C14.4695 9.69157 14.7615 9.98359 15.1291 10.1358C15.2418 10.1825 15.3894 10.2148 15.6428 10.2321C15.9008 10.2497 16.2304 10.25 16.7031 10.25H17.9531C18.4259 10.25 18.7554 10.2497 19.0134 10.2321C19.2669 10.2148 19.4145 10.1825 19.5272 10.1358C19.8947 9.98359 20.1867 9.69157 20.339 9.32404C20.3856 9.21135 20.418 9.06375 20.4353 8.81029C20.4529 8.55233 20.4531 8.22277 20.4531 7.75001V6.49999C20.4531 6.02722 20.4529 5.69768 20.4353 5.43971C20.418 5.18625 20.3856 5.03865 20.339 4.92596C20.1867 4.55843 19.8947 4.26641 19.5272 4.11416C19.4145 4.06751 19.2669 4.03515 19.0134 4.01786C18.7554 4.00028 18.4259 4.00001 17.9531 4.00001H16.7031C16.2304 4.00001 15.9008 4.00028 15.6428 4.01786ZM16.6854 12.75H17.9709C18.4218 12.75 18.7854 12.75 19.0815 12.7702C19.3858 12.7909 19.655 12.8348 19.9099 12.9403C20.5224 13.194 21.0091 13.6807 21.2628 14.2933C21.3684 14.5481 21.4122 14.8173 21.433 15.1217C21.4531 15.4177 21.4531 15.7814 21.4531 16.2323V17.5177C21.4531 17.9686 21.4531 18.3324 21.433 18.6283C21.4122 18.9327 21.3684 19.2019 21.2628 19.4567C21.0091 20.0693 20.5224 20.556 19.9099 20.8097C19.655 20.9153 19.3858 20.9591 19.0815 20.9798C18.7854 21 18.4218 21 17.9709 21H16.6854C16.2345 21 15.8708 21 15.5748 20.9798C15.2704 20.9591 15.0012 20.9153 14.7464 20.8097C14.1338 20.556 13.6472 20.0693 13.3934 19.4567C13.2879 19.2019 13.2441 18.9327 13.2233 18.6283C13.2031 18.3323 13.2031 17.9686 13.2031 17.5177V16.2323C13.2031 15.7814 13.2031 15.4177 13.2233 15.1217C13.2441 14.8173 13.2879 14.5481 13.3934 14.2933C13.6472 13.6807 14.1338 13.194 14.7464 12.9403C15.0012 12.8348 15.2704 12.7909 15.5748 12.7702C15.8708 12.75 16.2345 12.75 16.6854 12.75ZM15.6428 13.7679C15.3894 13.7851 15.2418 13.8175 15.1291 13.8642C14.7615 14.0164 14.4695 14.3084 14.3173 14.676C14.2706 14.7886 14.2383 14.9363 14.221 15.1897C14.2034 15.4477 14.2031 15.7772 14.2031 16.25V17.5C14.2031 17.9728 14.2034 18.3023 14.221 18.5603C14.2383 18.8137 14.2706 18.9614 14.3173 19.074C14.4695 19.4416 14.7615 19.7336 15.1291 19.8858C15.2418 19.9325 15.3894 19.9649 15.6428 19.9821C15.9008 19.9997 16.2304 20 16.7031 20H17.9531C18.4259 20 18.7554 19.9997 19.0134 19.9821C19.2669 19.9649 19.4145 19.9325 19.5272 19.8858C19.8947 19.7336 20.1867 19.4416 20.339 19.074C20.3856 18.9614 20.418 18.8137 20.4353 18.5603C20.4529 18.3023 20.4531 17.9728 20.4531 17.5V16.25C20.4531 15.7772 20.4529 15.4477 20.4353 15.1897C20.418 14.9363 20.3856 14.7886 20.339 14.676C20.1867 14.3084 19.8947 14.0164 19.5272 13.8642C19.4145 13.8175 19.2669 13.7851 19.0134 13.7679C18.7554 13.7503 18.4259 13.75 17.9531 13.75H16.7031C16.2304 13.75 15.9008 13.7503 15.6428 13.7679Z" fill="currentColor" />
								</svg>

								<span>قالب ها</span>
							</span>
						</button>
					</Dropdown>
				</li>

				<li className='flex items-center justify-center px-2'>
					<Select
						classes={{
							root: 'flex justify-center',
							container: 'border-0',
							label: 'text-base'
						}}
						defaultDialogWidth={140}
						options={availableAdjusts}
						value={availableAdjusts[Number(Boolean(configuration?.adjusted))]}
						onChange={(value) => onChangeAdjusted(value.id)}
						getOptionLabel={v => v.label}
						getOptionId={v => Number(v.id)}
					>
						{(value) => (
							<Select.Option option={value} />
						)}
					</Select>
				</li>

				<li>
					<button
						role="button"
						type='button'
						className={clsx(styles.btn, styles.expand)}
						onClick={onHideMarks}
					>
						<span>
							{configuration?.marksIsHide
								? <EyeOffOutlineSVG width='22px' height='22px' />
								: <EyeOutlineSVG width='22px' height='22px' />
							}

							<span>رویدادها</span>
						</span>
					</button>
				</li>

				<li>
					<div className="flex items-center justify-between">
						<Tippy disabled={!configuration?.enableUndo} placement='bottom' content={`حالت قبلی${configuration?.undoText ? ` (${configuration?.undoText})` : ''}`}>
							<button
								role="button"
								type='button'
								disabled={!configuration?.enableUndo}
								className={clsx(styles.btn, 'w-36')}
								onClick={() => onExecuteAction('undo')}
							>
								<span className='w-28 h-28'>
									<svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill='currentColor' d="M3.67271 11.7808L8.17272 16.2808C8.31417 16.4174 8.50362 16.493 8.70027 16.4913C8.89691 16.4896 9.08502 16.4107 9.22408 16.2717C9.36314 16.1326 9.44201 15.9445 9.44372 15.7479C9.44543 15.5512 9.36983 15.3618 9.23322 15.2203L6.01421 11.9998H16.9537C19.9537 11.9998 21.4537 14.7688 21.4537 17.2498C21.4537 17.4487 21.5327 17.6395 21.6734 17.7801C21.814 17.9208 22.0048 17.9998 22.2037 17.9998C22.4026 17.9998 22.5934 17.9208 22.734 17.7801C22.8747 17.6395 22.9537 17.4487 22.9537 17.2498C22.9537 13.9408 21.4537 10.4998 16.9537 10.4998H6.01421L9.23322 7.2808C9.36983 7.13935 9.44543 6.9499 9.44372 6.75325C9.44201 6.5566 9.36314 6.36849 9.22408 6.22944C9.08502 6.09038 8.89691 6.0115 8.70027 6.00979C8.50362 6.00809 8.31417 6.08368 8.17272 6.2203L3.67271 10.7203C3.53211 10.8609 3.45312 11.0517 3.45312 11.2505C3.45313 11.4494 3.53211 11.6402 3.67271 11.7808Z" />
									</svg>
								</span>
							</button>
						</Tippy>

						<Tippy disabled={!configuration?.enableRedo} placement='bottom' content={`حالت بعدی${configuration?.redoText ? ` (${configuration?.redoText})` : ''}`}>
							<button
								role="button"
								type='button'
								disabled={!configuration?.enableRedo}
								className={clsx(styles.btn, 'w-36')}
								onClick={() => onExecuteAction('redo')}
							>
								<span className='w-28 h-28'>
									<svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill='currentColor' d="M21.2335 12.2192L16.7335 7.7192C16.5921 7.58258 16.4026 7.50699 16.206 7.50869C16.0093 7.5104 15.8212 7.58928 15.6822 7.72834C15.5431 7.86739 15.4642 8.0555 15.4625 8.25215C15.4608 8.4488 15.5364 8.63825 15.673 8.7797L18.892 12.0002L7.95254 12.0002C4.95254 12.0002 3.45254 9.2312 3.45254 6.7502C3.45254 6.55129 3.37352 6.36052 3.23287 6.21987C3.09221 6.07922 2.90145 6.0002 2.70254 6.0002C2.50362 6.0002 2.31286 6.07922 2.1722 6.21987C2.03155 6.36052 1.95254 6.55129 1.95254 6.7502C1.95254 10.0592 3.45254 13.5002 7.95254 13.5002L18.892 13.5002L15.673 16.7192C15.5364 16.8607 15.4608 17.0501 15.4625 17.2468C15.4642 17.4434 15.5431 17.6315 15.6822 17.7706C15.8212 17.9096 16.0093 17.9885 16.206 17.9902C16.4026 17.9919 16.5921 17.9163 16.7335 17.7797L21.2335 13.2797C21.3741 13.1391 21.4531 12.9483 21.4531 12.7495C21.4531 12.5506 21.3741 12.3598 21.2335 12.2192Z" />
									</svg>
								</span>
							</button>
						</Tippy>
					</div>
				</li>
			</ul>

			<ul className={clsx(styles.list, 'justify-end')}>
				<li>
					<Tippy placement='bottom' content='بازگردانی به حالت اولیه'>
						<button
							role="button"
							type='button'
							className={clsx(styles.btn, styles.expand)}
							onClick={() => onExecuteAction('chartReset')}
						>
							<span className='gap-4'>
								<svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M4.5 10.9993C4.75288 9.07007 5.70022 7.29911 7.16468 6.01795C8.62914 4.7368 10.5103 4.03328 12.4561 4.0391C14.4018 4.04492 16.2788 4.75967 17.7355 6.04956C19.1923 7.33945 20.129 9.11605 20.3704 11.0468C20.6117 12.9775 20.1411 14.93 19.0467 16.5388C17.9523 18.1476 16.309 19.3024 14.4246 19.787C12.5401 20.2716 10.5436 20.0528 8.80887 19.1715C7.07412 18.2903 5.72 16.807 5 14.9993M4.5 19.9993V14.9993H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>

								<span>ریست</span>
							</span>
						</button>
					</Tippy>
				</li>

				<li>
					{(!savedChart || layout !== '1')
						? (
							<button
								role="button"
								type='button'
								disabled={layout !== '1' || isFetchingSavedCharts}
								className={clsx(styles.btn, styles.expand)}
								onClick={() => onExecuteSaveLoadAction('copy_chart')}
							>
								<Tippy disabled={layout === '1'} placement='bottom' content='در حال حاضر این قابلیت تنها بر روی تک نمودار کار می‌کند'>
									<span className='gap-8'>
										<svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M7.45455 17.9992C6.20682 17.9992 5.0102 17.5251 4.12793 16.6812C3.24566 15.8373 2.75 14.6927 2.75 13.4992C2.75 12.3057 3.24566 11.1612 4.12793 10.3172C5.0102 9.47333 6.20682 8.99922 7.45455 8.99922C7.74923 7.6864 8.61131 6.5327 9.85113 5.79193C10.465 5.42514 11.1532 5.17077 11.8763 5.04333C12.5994 4.9159 13.3434 4.9179 14.0657 5.04922C14.7879 5.18054 15.4744 5.43861 16.0858 5.8087C16.6973 6.17878 17.2218 6.65364 17.6293 7.20615C18.0369 7.75866 18.3195 8.378 18.4611 9.02882C18.6027 9.67963 18.6005 10.3492 18.4545 10.9992H19.4545C20.3828 10.9992 21.273 11.368 21.9294 12.0243C22.5858 12.6807 22.9545 13.571 22.9545 14.4992C22.9545 15.4275 22.5858 16.3177 21.9294 16.9741C21.273 17.6305 20.3828 17.9992 19.4545 17.9992H7.45455Z" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" />
											<path d="M15.3683 10.7507L15.3683 15.4174L17.6095 15.4174C17.7331 15.4174 17.8539 15.4517 17.9567 15.5158C18.0594 15.5799 18.1395 15.6709 18.1868 15.7775C18.2341 15.8841 18.2465 16.0014 18.2224 16.1145C18.1983 16.2276 18.1388 16.3316 18.0514 16.4132L13.9351 20.255C13.8179 20.3643 13.659 20.4258 13.4933 20.4258C13.3275 20.4258 13.1686 20.3643 13.0514 20.255L8.93513 16.4132C8.84775 16.3316 8.78825 16.2276 8.76414 16.1145C8.74004 16.0014 8.75241 15.8841 8.79971 15.7775C8.847 15.6709 8.92709 15.5799 9.02985 15.5158C9.1326 15.4517 9.25341 15.4174 9.37701 15.4174L11.6183 15.4174L11.6183 10.7507C11.6183 10.596 11.6841 10.4477 11.8013 10.3383C11.9185 10.2289 12.0775 10.1674 12.2433 10.1674L14.7433 10.1674C14.909 10.1674 15.068 10.2289 15.1852 10.3383C15.3024 10.4477 15.3683 10.596 15.3683 10.7507Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
										</svg>

										<span>ذخیره نمودار</span>
									</span>
								</Tippy>
							</button>
						)
						: (
							<Dropdown
								data={saveLoadChartOptions}
								defaultDialogWidth={200}
								ListItem={({ item, onClose }) => (
									<li key={item.id} className='w-full border-L-gray-200 dark:border-D-gray-200 last:border-transparent dark:last:border-transparent bg-L-basic hover:bg-L-gray-300 dark:bg-D-basic dark:hover:bg-D-gray-300 transition-colors px-4'>
										<button
											role="button"
											type='button'
											onClick={() => onExecuteSaveLoadAction(item.id, onClose)}
											className='flex items-center text-sm justify-start text-L-gray-700 dark:text-D-gray-700 border-b border-b-inherit w-full px-1 h-10'
										>
											<span className='flex items-center gap-4'>
												{<item.Icon width='1.2rem' height='1.2rem' />}
												<span>{item.label}</span>
											</span>
										</button>
									</li>
								)}
							>
								<button
									role="button"
									type='button'
									disabled={isFetchingSavedCharts}
									className={clsx(styles.btn, styles.expand)}
								>
									<Tippy placement='bottom' content='نمودار های ذخیره شده'>
										<span className='gap-1'>
											<span>{savedChart.name}</span>
											<ArrowDownSVG width='18' height='18' />
										</span>
									</Tippy>
								</button>
							</Dropdown>
						)
					}
				</li>

				<li>
					<Tippy placement='bottom' content='باز کردن در پنجره جدید'>
						<button
							role="button"
							type='button'
							className={styles.btn}
							onClick={() => onExecuteAction('open_in_new_tab')}
						>
							<span>
								<svg width='18px' height='18px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path fill="currentColor" d="M280 80C266.7 80 256 69.25 256 56C256 42.75 266.7 32 280 32H424C437.3 32 448 42.75 448 56V200C448 213.3 437.3 224 424 224C410.7 224 400 213.3 400 200V113.9L200.1 312.1C191.6 322.3 176.4 322.3 167 312.1C157.7 303.6 157.7 288.4 167 279L366.1 80H280zM0 120C0 89.07 25.07 64 56 64H168C181.3 64 192 74.75 192 88C192 101.3 181.3 112 168 112H56C51.58 112 48 115.6 48 120V424C48 428.4 51.58 432 56 432H360C364.4 432 368 428.4 368 424V312C368 298.7 378.7 288 392 288C405.3 288 416 298.7 416 312V424C416 454.9 390.9 480 360 480H56C25.07 480 0 454.9 0 424V120z" />
								</svg>
							</span>
						</button>
					</Tippy>
				</li>

				<li>
					<Tippy placement='bottom' content='تغییر چیدمان'>
						<button
							role="button"
							type='button'
							className={clsx(styles.btn, styles.expand)}
							onClick={() => setToggleModal("tvLayoutModal")}
						>
							<span className='gap-2'>
								<svg width="18" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M18.4531 4H6.45312C5.34856 4 4.45312 4.89543 4.45312 6V18C4.45312 19.1046 5.34856 20 6.45312 20H18.4531C19.5577 20 20.4531 19.1046 20.4531 18V6C20.4531 4.89543 19.5577 4 18.4531 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M4.45312 9H12.4531" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12.4531 15H20.4531" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M12.4531 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>

								<span>چیدمان</span>
							</span>
						</button>
					</Tippy>
				</li>

				<li>
					<Tippy placement='bottom' content='تنظیمات'>
						<button
							role="button"
							type='button'
							className={styles.btn}
							onClick={() => onExecuteAction('chartProperties')}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
									<g fill="currentColor" fillRule="evenodd">
										<path fillRule="nonzero" d="M14 17a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
										<path d="M5.005 16A1.003 1.003 0 0 1 4 14.992v-1.984A.998.998 0 0 1 5 12h1.252a7.87 7.87 0 0 1 .853-2.06l-.919-.925c-.356-.397-.348-1 .03-1.379l1.42-1.42a1 1 0 0 1 1.416.007l.889.882A7.96 7.96 0 0 1 12 6.253V5c0-.514.46-1 1-1h2c.557 0 1 .44 1 1v1.253a7.96 7.96 0 0 1 2.06.852l.888-.882a1 1 0 0 1 1.416-.006l1.42 1.42a.999.999 0 0 1 .029 1.377s-.4.406-.918.926a7.87 7.87 0 0 1 .853 2.06H23c.557 0 1 .447 1 1.008v1.984A.998.998 0 0 1 23 16h-1.252a7.87 7.87 0 0 1-.853 2.06l.882.888a1 1 0 0 1 .006 1.416l-1.42 1.42a1 1 0 0 1-1.415-.007l-.889-.882a7.96 7.96 0 0 1-2.059.852v1.248c0 .56-.45 1.005-1.008 1.005h-1.984A1.004 1.004 0 0 1 12 22.995v-1.248a7.96 7.96 0 0 1-2.06-.852l-.888.882a1 1 0 0 1-1.416.006l-1.42-1.42a1 1 0 0 1 .007-1.415l.882-.888A7.87 7.87 0 0 1 6.252 16H5.005zm3.378-6.193l-.227.34A6.884 6.884 0 0 0 7.14 12.6l-.082.4H5.005C5.002 13 5 13.664 5 14.992c0 .005.686.008 2.058.008l.082.4c.18.883.52 1.71 1.016 2.453l.227.34-1.45 1.46c-.004.003.466.477 1.41 1.422l1.464-1.458.34.227a6.959 6.959 0 0 0 2.454 1.016l.399.083v2.052c0 .003.664.005 1.992.005.005 0 .008-.686.008-2.057l.399-.083a6.959 6.959 0 0 0 2.454-1.016l.34-.227 1.46 1.45c.003.004.477-.466 1.422-1.41l-1.458-1.464.227-.34A6.884 6.884 0 0 0 20.86 15.4l.082-.4h2.053c.003 0 .005-.664.005-1.992 0-.005-.686-.008-2.058-.008l-.082-.4a6.884 6.884 0 0 0-1.016-2.453l-.227-.34 1.376-1.384.081-.082-1.416-1.416-1.465 1.458-.34-.227a6.959 6.959 0 0 0-2.454-1.016L15 7.057V5c0-.003-.664-.003-1.992 0-.005 0-.008.686-.008 2.057l-.399.083a6.959 6.959 0 0 0-2.454 1.016l-.34.227-1.46-1.45c-.003-.004-.477.466-1.421 1.408l1.457 1.466z" />
									</g>
								</svg>
							</span>
						</button>
					</Tippy>
				</li>

				<li>
					<Tippy placement='bottom' content='نمایش تمام صفحه'>
						<button
							role="button"
							type='button'
							className={styles.btn}
							onClick={() => onExecuteAction('fullscreen')}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
									<g fill="currentColor">
										<path d="M21 7v4h1V6h-5v1z" />
										<path d="M16.854 11.854l5-5-.708-.708-5 5zM7 7v4H6V6h5v1z" />
										<path d="M11.146 11.854l-5-5 .708-.708 5 5zM21 21v-4h1v5h-5v-1z" />
										<path d="M16.854 16.146l5 5-.708.708-5-5z" />
										<g>
											<path d="M7 21v-4H6v5h5v-1z" />
											<path d="M11.146 16.146l-5 5 .708.708 5-5z" />
										</g>
									</g>
								</svg>
							</span>
						</button>
					</Tippy>
				</li>

				<li>
					<Tippy placement='bottom' content='ذخیره تصویر نمودار'>
						<button
							role="button"
							type='button'
							className={styles.btn}
							onClick={() => onExecuteAction('screenshot')}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor">
									<path fillRule="evenodd" clipRule="evenodd" d="M11.118 6a.5.5 0 0 0-.447.276L9.809 8H5.5A1.5 1.5 0 0 0 4 9.5v10A1.5 1.5 0 0 0 5.5 21h16a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 21.5 8h-4.309l-.862-1.724A.5.5 0 0 0 15.882 6h-4.764zm-1.342-.17A1.5 1.5 0 0 1 11.118 5h4.764a1.5 1.5 0 0 1 1.342.83L17.809 7H21.5A2.5 2.5 0 0 1 24 9.5v10a2.5 2.5 0 0 1-2.5 2.5h-16A2.5 2.5 0 0 1 3 19.5v-10A2.5 2.5 0 0 1 5.5 7h3.691l.585-1.17z" />
									<path fillRule="evenodd" clipRule="evenodd" d="M13.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm0 1a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
								</svg>
							</span>
						</button>
					</Tippy>
				</li>
			</ul>
		</div>
	);
};

export default TvHeaderToolbar;