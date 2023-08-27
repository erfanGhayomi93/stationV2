import { useRef, useEffect, useState } from 'react'
import { useTradingState } from '../context';
import TradingWidget from 'src/common/classes/Tradingview/TradingWidget';
import { fetchUser } from 'src/handlers/boot';
import { RootState } from 'src/redux/store';
import { QueryClient } from '@tanstack/react-query';
import { IChartingLibraryWidget } from 'src/charting_library/charting_library';
import { seprateNumber } from 'src/utils/helpers';
import TvHeaderToolbar from './TvHeaderToolbar';
import TvFooterToolbar from './TvFooterToolbar';
import Loading from 'src/common/components/Loading/Loading';
import PortfolioWatchlist from '../PortfolioWatchlist';
import ipcMain from 'src/common/classes/IpcMain';
import { Trans } from 'react-i18next';
import { useAppSelector } from 'src/redux/hooks';



export const ChartingLibrary = () => {
	const rootRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement | undefined>(undefined);
	const chartsRef = useRef<TradingWidget[] | null>(null);


	const { global: { userData }, ui: { theme }, option: { selectedSymbol } } = useAppSelector((state: RootState) => state)
	const { state: { tvChartActiveLayout }, setState } = useTradingState()

	const tradingQueryClient = new QueryClient();

	const [activeChart, setActiveChart] = useState<TradingWidget | null>(null);
	const [chartsLoaded, setChartsLoaded] = useState(false);

	const onChartReady = (tvWidget: TradingWidget, element: HTMLDivElement) => {
		try {
			const widget = tvWidget.widget as IChartingLibraryWidget;

			widget.activeChart().priceFormatter().format = (value) => {
				if (!value) return '';
				return seprateNumber(Number(value.toFixed(0)));
			};

			tvWidget.subscribe('mouse_down', () => {
				setActiveChart(tvWidget);

				if (!containerRef.current) return;
				const children = containerRef.current.children;

				for (let i = 0; i < children.length; i++) {
					children[i].classList.remove('border-info-100');
					children[i].classList.add('border-transparent');
				}

				element.classList.add('border-info-100');
				element.classList.remove('border-transparent');
			});

			tvWidget.setTheme(theme);
		} catch (e) {
			//
		}
	};

	const openAdvancedSearchModal = () => {
		setState({ type: "Toggle_Modal_TV", value: "tvSymbolSearchModal" })
	};


	useEffect(() => {
		try {
			const rootElement = rootRef.current;
			if (!rootElement) return;

			setChartsLoaded(false);
			rootElement.innerHTML = "";

			const [size, type] = tvChartActiveLayout.split('');

			containerRef.current = document.createElement('div');
			containerRef.current.classList.add('flex', 'gap-1', 'w-full', 'h-full');

			if (type === 'r') containerRef.current.classList.add('flex-col');
			else containerRef.current.classList.add('flex-row', 'flex-wrap');

			const length = tvChartActiveLayout === '2-2' ? 4 : Number(size);
			if (isNaN(length)) throw new Error('length is "NaN"');

			chartsRef.current = [];
			for (let i = 0; i < length; i++) {
				const child = document.createElement('div');
				if (tvChartActiveLayout === '2-2') child.style.minWidth = `calc(50% - 0.5rem)`;
				else if (length !== 1) child.style.minWidth = `calc(${Math.floor(100 / length)}% - 0.5rem)`;
				child.classList.add('flex-1', 'rounded', 'max-w-full', 'overflow-hidden', 'bg-white', 'dark:bg-black', 'border', 'border-transparent');

				containerRef.current.appendChild(child);

				if (!chartsRef.current[i]) {
					const widget = new TradingWidget({
						options: {
							symbol: selectedSymbol ?? 'IRO1ATIR0001',
							client_id: userData?.customerISIN ?? "client_id",
							user_id: userData?.customerISIN ?? "user_id",
							container: child
						},
						theme,
						queryCache: tradingQueryClient
					}).create();

					if (i === chartsRef.current.length) widget.onChartReady(() => setChartsLoaded(true));
					widget.onChartReady(() => onChartReady(widget, child));

					chartsRef.current[i] = widget;
				}
			}

			/* Handle first chart */
			const firstChart = chartsRef.current[0];
			setActiveChart(firstChart);

			firstChart.container.classList.add('border-info-100');
			firstChart.container.classList.remove('border-transparent');

			rootElement.appendChild(containerRef.current);
		} catch (e) {
			//
		}
	}, [tvChartActiveLayout, rootRef.current]);

	useEffect(() => {
		try {
			if (!chartsRef.current) return;

			chartsRef.current.forEach((chart) => {
				chart.setTheme(theme);
			});
		} catch (e) {
			//
		}
	}, [theme]);

	useEffect(() => {
		ipcMain.handle('tv_chart:set_layout', (layoutId: '1' | '2c' | '2r' | '3c' | '3r' | '2-2' | '4r' | '4c') => setState({ type: "Set_Active_Layout", value: layoutId }));

		return () => {
			ipcMain.removeHandler('tv_chart:set_layout');
		};
	}, [activeChart]);

	if (!selectedSymbol) return (
		<div dir='ltr' className='flex items-center justify-center bg-white dark:bg-black flex-1'>
			<div className='text-base font-medium text-L-gray-700 dark:text-D-gray-700'>
				<Trans
					i18nKey="tv_chart.no_symbol_found"
					components={{
						1: <button role="button" onClick={openAdvancedSearchModal} className='font-bold text-L-primary-50 dark:text-D-primary-50' />,
					}}
				/>
			</div>
		</div>
	);



	return (
		<div className='relative flex-1 flex flex-col gap-2'>
			{(chartsLoaded && activeChart) && (
				<TvHeaderToolbar
					activeChart={activeChart}
					layout={tvChartActiveLayout}
					userData={userData as UserType}
				/>
			)}

			<div className='flex justify-between h-full gap-2'>
				<PortfolioWatchlist />
				<div id="tv_container" ref={rootRef} dir='ltr' className='flex-1 h-full' />
			</div>


			{(chartsLoaded && activeChart) && (
				<TvFooterToolbar activeChart={activeChart} />
			)}

			{!chartsLoaded && (
				<div className="absolute bg-white dark:bg-black h-full w-full">
					<Loading />
				</div>
			)}

		</div>
	)
}
