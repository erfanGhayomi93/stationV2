import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseIcon, TvSymbolSearchSVG } from 'src/common/icons';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { getSelectedSymbol, setSelectedSymbol } from 'src/redux/slices/option';
// import { subscribeLastTradedPrice } from 'utils/subscriptions';
import { useTradingState } from '../context';
import { seprateNumber } from 'src/utils/helpers';
import { useRecentSymbolHistory } from 'src/app/queries/tradingView';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { subscriptionRecentHistory } from 'src/ls/subscribes';
import { pushEngine } from 'src/ls/pushEngine';
import ipcMain from 'src/common/classes/IpcMain';

type SymbolProps = {
	symbol: SearchSymbolType;
	active: boolean;
	deletable: boolean;
	label: string;
	onClick: (symbol: SearchSymbolType) => void;
	onDelete: (symbol: SearchSymbolType) => void;
};

const Symbol = ({ symbol, active, deletable, label, onClick, onDelete }: SymbolProps) => {
	const timer = useRef<NodeJS.Timeout | undefined>(undefined);

	const [oldPrice, setOldPrice] = useState(symbol?.lastTradedPrice ?? 0);

	const onDeleteSymbol = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		e.preventDefault();
		onDelete(symbol);
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		try {
			// if (e.button === 1 && deletable) onDelete(symbol);
			onClick(symbol);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (oldPrice === symbol.lastTradedPrice) return;

		timer.current = setTimeout(() => setOldPrice(symbol?.lastTradedPrice ?? 0), 1500);
	}, [symbol.lastTradedPrice, oldPrice]);

	return (
		<li
			className='pl-1 border-l border-L-gray-300 dark:border-D-gray-300 min-w-[115px] h-full box-border'
		>
			<div
				onClick={onMouseDown}
				tabIndex={-1}
				role="button"
				// style={{ minHeight: '2.7rem', maxHeight: '2.7rem' }}
				className={clsx('relative rounded hover:bg-L-gray-200 dark:hover:bg-D-gray-200  max-h-full cursor-pointer flex flex-col justify-center font-medium gap-x-2 transition-colors', active && 'bg-L-gray-300 dark:bg-D-gray-300')}
			>
				<span className='text-L-gray-700 dark:text-D-gray-700 text-sm pt-1 pr-1'>{symbol.symbolTitle}</span>

				{(('lastTradedPrice' in symbol) && (typeof symbol.lastTradedPrice === 'number')) && (
					<span className='flex gap-1 text-L-gray-500 dark:text-D-gray-500 text-xs pb-1 pr-1'>
						<span
							className={clsx({
								'text-L-success-300': oldPrice < symbol.lastTradedPrice,
								'text-L-error-300': oldPrice > symbol.lastTradedPrice,
							})}
						>
							{seprateNumber(symbol.lastTradedPrice)}
						</span>
						<span>{label}</span>
					</span>
				)}

				{deletable && (
					<button
						role="button"
						type='button'
						onClick={onDeleteSymbol}
						style={{ left: '4px', top: '4px' }}
						className='absolute text-L-gray-500 dark:text-D-gray-500 rounded hover:bg-L-gray-300 dark:hover:bg-D-gray-300'
					>
						<CloseIcon width='10' height='10' />
					</button>
				)}
			</div>
		</li>
	);
};

const RecentSymbols = () => {
	const { t } = useTranslation();
	const timer = useRef<NodeJS.Timeout | null>()


	const { data: recentSymbols , refetch: refetchRecentHistory } = useRecentSymbolHistory({
		select(data) {
			return data.filter(item => item)
		},
		onSuccess(data) {
			pushEngine.unSubscribe("RecentHistorySymbol")
			let timeout : NodeJS.Timeout
			timeout = setTimeout(() => {
				if (!!data && !!data.length) {
					subscriptionRecentHistory(data, timer)
				}
				clearTimeout(timeout)
			}, 500);


		},
		enabled: false
	});
	// const [recentSymbols, setRecentSymbols] = useLocalStorage<SearchSymbolType[]>('symbol_search_history', []);

	const dispatch = useAppDispatch();

	const { setState } = useTradingState()

	const selectedSymbol = useAppSelector(getSelectedSymbol); 
	

	const onDeleteSymbol = async (symbolISIN: string) => {
		try {
			await AXIOS.post<GlobalApiResponseType<SearchSymbolType[]>>(Apis().tvChart.deleteRecent, {
				SymbolISIN: symbolISIN
			});

			refetchRecentHistory()
		} catch {}

	};

	const openSearchModal = () => {
		// dispatch(toggleTvSymbolSearchModal(true));
		setState({ type: "Toggle_Modal_TV", value: "tvSymbolSearchModal" })
	};

	const setActiveSymbol = (symbolISIN: string) => {
		dispatch(
			setSelectedSymbol(symbolISIN)
		);
	};


	useEffect(() => {
		refetchRecentHistory()

	}, []);

	useEffect(() => {
	
		return () => {
			pushEngine.unSubscribe("RecentHistorySymbol")
		}
	}, [])


	useEffect(() => {
		let clearTime: NodeJS.Timeout;
		ipcMain.handle<string>('tv_chart:refetch_recent_history', () => {
			clearTime = setTimeout(() => {
				refetchRecentHistory()
				clearTimeout(clearTime)
			}, 500);
		});

		return () => {
			ipcMain.removeHandler('tv_chart:refetch_recent_history');
		}
	}, [])


	if (!selectedSymbol) return null;

	return (
		<div style={{ minHeight: '3rem', maxHeight: '3rem' }} className='flex justify-between items-center bg-L-basic dark:bg-D-basic rounded pl-4'>
			<div className='flex items-center h-full'>
				<Tippy placement='bottom' content={t('Tooltip.tv_open_symbol_search_modal')}>
					<button
						role="button"
						type='button'
						className='flex items-center justify-center text-L-gray-600 dark:text-D-gray-600 px-4'
						onClick={openSearchModal}
					>
						<TvSymbolSearchSVG width="32" height="32" />
					</button>
				</Tippy>

				{Array.isArray(recentSymbols) && recentSymbols.length > 0
					? (
						<ul className='flex items-center py-1 gap-1 h-full'>
							{recentSymbols
								.map((symbol, index) => (
									<Symbol
										key={index}
										active={selectedSymbol === symbol.symbolISIN}
										symbol={symbol}
										onClick={() => setActiveSymbol(symbol.symbolISIN)}
										onDelete={() => onDeleteSymbol(symbol.symbolISIN)}
										label={t('common.rial')}
										deletable={recentSymbols.length > 1}
									/>
								))}
						</ul>
					) : (
						<span className='text-sm font-normal text-L-gray-600 dark:text-D-gray-600'>{t('tv_chart.recent_symbols_is_empty')}</span>
					)}
			</div>

			{/* <div className='flex items-center gap-16 h-full'>
				<button
					role="button"
					type='button'
					onClick={() => openBuySellModal('buy')}
					style={{ width: '8rem' }}
					className='flex items-center justify-center rounded h-24 text-base text-success-400 border border-success-400 bg-transparent hover:bg-success-400 hover:text-white dark:hover:text-black transition-colors'
				>
					{t('common.buy')}
				</button>

				<button
					role="button"
					type='button'
					onClick={() => openBuySellModal('sell')}
					style={{ width: '8rem' }}
					className='flex items-center justify-center rounded h-24 text-base text-error-300 border border-error-300 bg-transparent hover:bg-error-300 hover:text-white dark:hover:text-black transition-colors'
				>
					{t('common.sell')}
				</button>
			</div> */}
		</div>
	);
};

export default RecentSymbols;