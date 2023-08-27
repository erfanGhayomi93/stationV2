import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTradingState } from '../context';
import ipcMain from 'src/common/classes/IpcMain';
import Draggable from 'src/common/components/Draggable/Draggable';
import { CloseIcon, Search } from 'src/common/icons';
// import routes from 'routes';

const TvIndicatorsModal = () => {
	const { t } = useTranslation();

	const location = useLocation();

	const [search, setSearch] = useState("");

	const indicators = useMemo(() => ([
		"Accumulation/Distribution",
		"Accumulative Swing Index",
		"Advance/Decline",
		"Arnaud Legoux Moving Average",
		"Aroon",
		"Average Directional Index",
		"Average Price",
		"Average True Range",
		"Awesome Oscillator",
		"Balance of Power",
		"Bollinger Bands",
		"Bollinger Bands %B",
		"Bollinger Bands Width",
		"Chaikin Money Flow",
		"Chaikin Oscillator",
		"Chaikin Volatility",
		"Chande Kroll Stop",
		"Chande Momentum Oscillator",
		"Chop Zone",
		"Choppiness Index",
		"Commodity Channel Index",
		"Connors RSI",
		"Coppock Curve",
		"Correlation - Log",
		"Correlation Coefficient",
		"Detrended Price Oscillator",
		"Directional Movement",
		"Donchian Channels",
		"Double EMA",
		"Ease Of Movement",
		"Elder's Force Index",
		"EMA Cross",
		"Envelopes",
		"Fisher Transform",
		"Guppy Multiple Moving Average",
		"Historical Volatility",
		"Hull Moving Average",
		"Ichimoku Cloud",
		"Keltner Channels",
		"Klinger Oscillator",
		"Know Sure Thing",
		"Least Squares Moving Average",
		"Linear Regression Curve",
		"Linear Regression Slope",
		"MA Cross",
		"MA with EMA Cross",
		"MACD",
		"Majority Rule",
		"Mass Index",
		"McGinley Dynamic",
		"Median Price",
		"Momentum",
		"Money Flow Index",
		"Moving Average",
		"Moving Average Adaptive",
		"Moving Average Channel",
		"Moving Average Double",
		"Moving Average Exponential",
		"Moving Average Hamming",
		"Moving Average Multiple",
		"Moving Average Triple",
		"Moving Average Weighted",
		"Net Volume",
		"On Balance Volume",
		"Parabolic SAR",
		"Pivot Points Standard",
		"Price Channel",
		"Price Oscillator",
		"Price Volume Trend",
		"Rate Of Change",
		"Ratio",
		"Relative Strength Index",
		"Relative Vigor Index",
		"Relative Volatility Index",
		"SMI Ergodic Indicator/Oscillator",
		"Smoothed Moving Average",
		"Spread",
		"Standard Deviation",
		"Standard Error",
		"Standard Error Bands",
		"Stochastic",
		"Stochastic RSI",
		"SuperTrend",
		"Trend Strength Index",
		"Triple EMA",
		"TRIX",
		"True Strength Index",
		"Typical Price",
		"Ultimate Oscillator",
		"Volatility Close-to-Close",
		"Volatility Index",
		"Volatility O-H-L-C",
		"Volatility Zero Trend Close-to-Close",
		"Volume",
		"Volume Oscillator",
		"Volume Profile Fixed Range",
		"Volume Profile Visible Range",
		"Vortex Indicator",
		"VWAP",
		"VWMA",
		"Williams %R",
		"Williams Alligator",
		"Williams Fractal",
		"Zig Zag"
	].filter((indicatorId) => indicatorId.toLowerCase().includes(search.toLowerCase()))), [search]);

	const {setState} = useTradingState()

	const applyIndicator = (indicatorId: string) => {
		ipcMain.send('tv_chart:set_indicator', indicatorId);
	};

	const onClose = () => {
		setState({type : "Toggle_Modal_TV" , value : "tvIndicatorsModal"})
	};

	useEffect(() => {
		const pathname = location.pathname.replace(/\/$/g, '');
		if (pathname !== "/Market/Chart") onClose();
	}, [location]);

	return (
		<Draggable>
			<div
				style={{
					width: '30rem',
					height: '40rem'
				}}
				className='bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-L-blue-50 dark:bg-D-blue-50 cursor-grab pr-4 py-3'>
					<div className='moveable flex items-center flex-1 h-full'>
						<span className='font-medium text-base text-white'>{t('tv_chart.tv_indicators')}</span>
					</div>

					<button
						role="button"
						type='button'
						onClick={onClose}
						className='flex items-center text-white justify-center px-4'
					>
						<CloseIcon />
					</button>
				</div>

				<div className='flex flex-col overflow-hidden py-1 gap-1 px-'>
					<div className='relative w-full'>
						<label className='relative flex bg-white dark:bg-black items-center rounded overflow-hidden border border-L-gray-500 dark:border-D-gray-500 text-L-gray-500 dark:text-D-gray-500'>
							<div className='flex items-center absolute text-L-gray-500 dark:text-D-gray-500 right-3'>
								{search.length > 1 && (
									<button role="button" type='button' className='cursor-pointer text-sm' onClick={() => setSearch("")}>
										<CloseIcon width="0.8rem" height="0.8rem" />
									</button>
								)}
							</div>

							<input
								type='text'
								value={search}
								autoFocus
								onChange={(e) => setSearch(e.target.value)}
								placeholder={t('tv_chart.tv_indicator_name')}
								className='rounded ltr flex-1 placeholder:text-right text-left bg-transparent pr-6 text-sm font-normal h-10 outline-none'
							/>

							<span className='flex items-center justify-center px-4 h-10'>
								<Search width='1.2rem' height='1.2rem' />
							</span>
						</label>
					</div>

					<ul className='flex flex-col overflow-auto px-2'>
						{indicators.map((indicatorId) => (
							<li key={indicatorId} className='border-b border-L-gray-200 dark:border-D-gray-200 bg-transparent hover:bg-L-gray-300 dark:hover:bg-D-gray-300 px-2 transition-colors'>
								<button
									role="button"
									type="button"
									onClick={() => applyIndicator(indicatorId)}
									className='flex ltr items-center w-full text-L-gray-700 dark:text-D-gray-700 h-12'
								>
									<span className='text-base'>{indicatorId}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Draggable>
	);
};

export default TvIndicatorsModal;