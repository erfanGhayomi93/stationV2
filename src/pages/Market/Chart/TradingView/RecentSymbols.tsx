import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { ItemUpdate } from 'lightstreamer-client-web';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Subscribe from 'src/common/classes/Subscribe';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { CloseIcon , TvSymbolSearchSVG } from 'src/common/icons';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { getSelectedSymbol, setSelectedSymbol } from 'src/redux/slices/option';
// import { subscribeLastTradedPrice } from 'utils/subscriptions';
import { useTradingState } from '../context';
import { seprateNumber } from 'src/utils/helpers';

type SymbolProps = {
	symbol: RecentSymbolType;
	active: boolean;
	deletable: boolean;
	label: string;
	onClick: (symbol: RecentSymbolType) => void;
	onDelete: (symbol: RecentSymbolType) => void;
};

const Symbol = ({ symbol, active, deletable, label, onClick, onDelete }: SymbolProps) => {
	const timer = useRef<NodeJS.Timeout | undefined>(undefined);

	const [oldPrice, setOldPrice] = useState(symbol?.lastTradedPrice ?? 0);

	const onDeleteSymbol = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		onDelete(symbol);
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		try {
			// console.log("e.button",e.button)
			if (e.button === 1 && deletable) onDelete(symbol);
			else onClick(symbol);
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
				onMouseDown={onMouseDown}
				tabIndex={-1}
				role="button"
				// style={{ minHeight: '2.7rem', maxHeight: '2.7rem' }}
				className={clsx('relative rounded hover:bg-L-gray-200 dark:hover:bg-D-gray-200  max-h-full cursor-pointer flex flex-col justify-center font-medium gap-x-2 transition-colors', active && 'bg-L-gray-300 dark:bg-D-gray-300')}
			>
				<span className='text-L-gray-700 dark:text-D-gray-700 text-sm pt-1 pr-1'>{symbol.symbolTitle}</span>

				{(('lastTradedPrice' in symbol) && (typeof symbol.lastTradedPrice === 'number')) && (
					<span className='flex gap-1 text-L-gray-600 dark:text-D-gray-600 text-sm pb-1 pr-1'>
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
						<CloseIcon width='12' height='12' />
					</button>
				)}
			</div>
		</li>
	);
};

const RecentSymbols = () => {
	const { t } = useTranslation();

	const hashKey = useRef<number>(0);

	const subscription = useRef<Subscribe | null>(null);

	const [recentSymbols, setRecentSymbols] = useLocalStorage<RecentSymbolType[]>('symbol_search_history', []);

	const dispatch = useAppDispatch();

	const {setState} = useTradingState()

	const selectedSymbol = useAppSelector(getSelectedSymbol);
// 
	// useEffect(() => {
	//   console.log("recentSymbols",recentSymbols)
	// }, [recentSymbols])
	

	const onSymbolUpdate = (updateInfo: ItemUpdate) => {
		try {
			const symbolISIN: string = updateInfo.getItemName();

			const data: RecentSymbolType[] = JSON.parse(JSON.stringify(
				recentSymbols
				// Localstorage.get('symbol_search_history', [])
			));

			const symbolIndex = data.findIndex(symbol => symbol.symbolISIN === symbolISIN);
			if (symbolIndex === -1) return;

			updateInfo.forEachChangedField((_a, _b, value) => {
				try {
					if (value) {
						const valueAsNumber = Number(value);

						// @ts-ignore
						data[symbolIndex].lastTradedPrice = isNaN(valueAsNumber) ? value : valueAsNumber;
					}
				} catch (e) {
					console.log(e);
				}
			});

			setRecentSymbols(data);
		} catch (e) {
			console.log(e);
		}
	};

	const onDeleteSymbol = (symbolISIN: string) => {
		try {
			const newSymbol = recentSymbols.filter(symbol => symbol.symbolISIN !== symbolISIN);
			setRecentSymbols(newSymbol);

			if (symbolISIN === selectedSymbol && newSymbol.length > 0) {
				dispatch(
					setSelectedSymbol(newSymbol[0].symbolISIN)
				);
			}
		} catch (e) {
			//
		}
	};

	const openSearchModal = () => {
		// dispatch(toggleTvSymbolSearchModal(true));
		setState({type : "Toggle_Modal_TV" , value : "tvSymbolSearchModal"})
	};

	const setActiveSymbol = (symbolISIN: string) => {
		dispatch(
			setSelectedSymbol(symbolISIN)
		);
	};

	const unsubscribe = () => {
		if (!subscription.current) return;

		subscription.current.unsubscribe();
		subscription.current = null;
	};

	const toASCIINum = (key: string) => {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash;
	};

	const symbolsHashKey = (symbolISINs: string[]) => {
		let num = 0;
		for (let i = 0; i < symbolISINs.length; i++) {
			if (symbolISINs[i]) num += Number(toASCIINum(symbolISINs[i]));
		}

		return num;
	};

	// const subscribe = (symbolISINs: string[]) => {
	// 	subscription.current = subscribeLastTradedPrice(symbolISINs)
	// 		.addEventListener('onItemUpdate', onSymbolUpdate)
	// 		.start();
	// };

	// const openBuySellModal = (side: 'buy' | 'sell') => {
	// 	dispatch(
	// 		addBuySellModal({
	// 			symbolISIN: selectedSymbol as string,
	// 			side
	// 		})
	// 	);
	// };

	useEffect(() => {
		if (recentSymbols) {
			const symbolISINs: string[] = [];
			recentSymbols.forEach((symbol) => {
				symbolISINs.push(symbol.symbolISIN);
			});

			const newHashKey = symbolsHashKey(symbolISINs);

			if (hashKey.current !== newHashKey) {
				unsubscribe();
				// subscribe(symbolISINs);
			}

			hashKey.current = newHashKey;
		}
	}, [recentSymbols]);

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
						<TvSymbolSearchSVG width="32" height="32"/>
					</button>
				</Tippy>

				{Array.isArray(recentSymbols) && recentSymbols.length > 0
					? (
						<ul className='flex items-center py-1 gap-1 h-full'>
							{recentSymbols.map((symbol, index) => (
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