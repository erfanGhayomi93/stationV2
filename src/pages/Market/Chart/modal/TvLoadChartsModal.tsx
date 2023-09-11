import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import styles from './TradingView.module.scss';
import { CloseIcon, Search } from 'src/common/icons';
import { useTradingState } from '../context';
import ipcMain from 'src/common/classes/IpcMain';
import Draggable from 'src/common/components/Draggable/Draggable';
import NoData from 'src/common/components/NoData/NoData';
import Loading from 'src/common/components/Loading/Loading';
import { RootState } from 'src/redux/store';
import { useAppSelector } from 'src/redux/hooks';
import { useTvSavedChart } from 'src/app/queries/tradingView';
import ConfirmModal from 'src/common/components/ConfirmModal/ConfirmModal';

type RowType = {
	chartTitle: string;
	symbolTitle: string;
	timestamp: number;
	active: boolean;
	onClick: () => void;
	onDelete: () => void;
}

const Row = ({ chartTitle, symbolTitle, onDelete, timestamp, active, onClick }: RowType) => {
	const datetime = useMemo(() => {
		return dayjs(timestamp * 1E3).calendar('jalali').format('YYYY/MM/DD HH:mm');
	}, [timestamp]);

	return (
		<div
			tabIndex={-1}
			role="button"
			onClick={onClick}
			style={{
				minHeight: '2.7rem',
				maxHeight: '2.7rem',
			}}
			className={clsx('flex relative items-center cursor-pointer justify-start hover:bg-L-gray-200 dark:hover:bg-D-gray-200 transition-colors px-6', styles.item)}
		>
			<div style={{ width: '9rem' }} className='overflow-hidden'>
				<span className='truncate text-right text-sm font-normal text-L-gray-700 dark:text-D-gray-700'>
					{chartTitle}
				</span>
			</div>

			<div style={{ width: '8rem' }} className='overflow-hidden'>
				<span className='truncate text-sm font-normal text-L-gray-700 dark:text-D-gray-700'>
					{symbolTitle}
				</span>
			</div>

			<div style={{ width: '8rem' }} className='overflow-hidden'>
				<span className='truncate text-sm font-normal text-L-gray-700 dark:text-D-gray-700'>
					{datetime}
				</span>
			</div>

			<div className='flex items-center justify-center'>
				<button
					role="button"
					style={{
						minWidth: '2.7rem',
						maxWidth: '2.7rem',
						minHeight: '2.7rem',
						maxHeight: '2.7rem',
					}}
					type='button'
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();

						onDelete();
					}}
					className={clsx('absolute text-L-gray-700 dark:text-D-gray-700 left-0 flex items-center justify-center transition-colors', styles.delete)}
				>
					<CloseIcon width='0.8rem' height='0.8rem' />
				</button>
			</div>
		</div>
	);
};

const TvLoadChartsModal = () => {
	const { t } = useTranslation();

	const location = useLocation();

	const queryClient = useQueryClient();

	const [search, setSearch] = useState("");

	const { global: { userData } } = useAppSelector((state: RootState) => state)

	const [selectedChart, setSelectedChart] = useState<TvSavedChartType | null>(null);

	const [deletingChart, setDeletingChart] = useState<TvSavedChartType | null>(null);

	const { setState } = useTradingState()

	const { data: savedCharts, isFetching } = useTvSavedChart(
		{
			client: userData?.customerISIN ?? 0,
			user: userData?.customerISIN ?? 0,
		}
	);


	const filterSavedCharts = useMemo(() => {
		if (!savedCharts) return [];

		savedCharts.sort((chart1, chart2) => chart2.timestamp - chart1.timestamp);
		return savedCharts.filter((chart) => (`${chart.name} ${chart.symbol}`).toLowerCase().includes(search.toLowerCase()));
	}, [savedCharts, search]);


	const onClose = () => {
		setState({ type: "Toggle_Modal_TV", value: "tvLoadChartTemplate" })
	};

	const onClickRow = (chart: TvSavedChartType) => {
		setSelectedChart(chart);
	};

	const onDeleteRow = (chart: TvSavedChartType) => {
		setDeletingChart(chart);
	};

	const deleteChartById = (chartId: number) => {
		try {
			const data = queryClient.getQueryData([
				'tvSavedCharts'
				// ,
				// {
				// 	client: userData?.customerISIN ?? 0,
				// 	user: userData?.customerISIN ?? 0,
				// }
			]);
			const charts = (data ? JSON.parse(JSON.stringify(data)) : []) as TvSavedChartType[];

			const filteredCharts = charts.filter((chart) => chart.id !== chartId);

			if (filteredCharts.length === 0) ipcMain.send('tv_chart:empty_charts');

			queryClient.setQueryData([
				'tvSavedCharts'
				// ,
				// {
				// 	client: userData?.customerISIN ?? 0,
				// 	user: userData?.customerISIN ?? 0,
				// }
			], filteredCharts);

			setDeletingChart(null);
		} catch (e) {
			//
		}
	};

	useEffect(() => {
		const pathname = location.pathname.replace(/\/$/g, '');
		if (pathname !== "/Market/Chart") onClose();
	}, [location]);

	useEffect(() => {
		if (!selectedChart) return;
		ipcMain.send<TvSavedChartType>('tv_chart:load_chart', selectedChart);
	}, [selectedChart]);

	return (
		<Draggable>
			<div
				style={{
					width: '30rem',
					height: '25rem'
				}}
				className='bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-L-blue-50 dark:bg-D-blue-50 cursor-grab pr-4 py-3'>
					<div className='moveable flex items-center flex-1 h-full'>
						<span className='font-medium text-base text-white'>{t('tv_chart.tv_load_saved_charts')}</span>
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

				<div className='flex flex-col flex-1 overflow-hidden py-6 gap-6'>
					<div className='relative w-full px-6'>
						<label className='relative flex bg-white dark:bg-black items-center rounded overflow-hidden border border-L-gray-500 dark:border-D-gray-500 text-L-gray-500 dark:text-D-gray-500'>
							<span className='flex items-center justify-center px-4 h-10'>
								<Search width='1.25rem' height='1.25rem' />
							</span>

							<input
								type='text'
								value={search}
								autoFocus
								onChange={(e) => setSearch(e.target.value)}
								placeholder={t('tv_chart.tv_chart_name')}
								className='rounded flex-1 bg-transparent pl-6 text-sm font-normal h-10 outline-none'
							/>

							<div className='flex items-center absolute text-L-gray-500 dark:text-D-gray-500 left-3'>
								{search.length > 1 && (
									<button role="button" type='button' className='cursor-pointer text-sm' onClick={() => setSearch("")}>
										<CloseIcon width="1rem" height="1rem" />
									</button>
								)}
							</div>
						</label>
					</div>

					<div className='flex overflow-hidden relative flex-1'>
						{(!savedCharts || savedCharts.length === 0)
							? <NoData />
							: isFetching
								? <Loading />
								: (
									<div className='flex overflow-hidden flex-col flex-1 gap-4'>
										<div className='flex items-center justify-start px-6'>
											<div style={{ width: '9rem' }}>
												<span className='text-base font-normal text-L-gray-700 dark:text-D-gray-700'>
													{t('tv_chart.tv_chart_name')}
												</span>
											</div>
											<div style={{ width: '8rem' }}>
												<span className='text-base font-normal text-L-gray-700 dark:text-D-gray-700'>
													{t('tv_chart.tv_modal_symbol_column')}
												</span>
											</div>
											<div style={{ width: '8rem' }}>
												<span className='text-base font-normal text-L-gray-700 dark:text-D-gray-700'>
													{t('tv_chart.tv_modified_time')}
												</span>
											</div>
										</div>

										<div className='overflow-auto flex-1'>
											<div className='flex flex-col gap-1'>
												{filterSavedCharts.map((chart) => (
													<Row
														key={chart.id}
														symbolTitle={chart.symbol}
														chartTitle={chart.name}
														timestamp={chart.timestamp}
														active={false}
														onClick={() => onClickRow(chart)}
														onDelete={() => onDeleteRow(chart)}
													/>
												))}
											</div>
										</div>
									</div>
								)
						}
					</div>
				</div>

				{deletingChart && (
					<ConfirmModal
						title='common.confirmation'
						description={t('tv_chart.tv_confirm_delete_chart', { chartName: deletingChart.name })}
						confirmBtnLabel='common.delete'
						onConfirm={() => {
							ipcMain.send<number>('tv_chart:delete_saved_chart', deletingChart.id);
							deleteChartById(deletingChart.id);
						}}
						onCancel={() => setDeletingChart(null)}
					/>
				)}
			</div>
		</Draggable>
	);
};

export default TvLoadChartsModal;