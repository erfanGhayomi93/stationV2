import clsx from 'clsx';

// import { toggleTvLayoutModal } from 'features/modalSlice';
// import { getTvChartActiveLayout } from 'features/uiSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTradingState } from '../context';
import ipcMain from 'src/common/classes/IpcMain';
import Draggable from 'src/common/components/Draggable/Draggable';
import { Chart1ColSVG, Chart2ColSVG, Chart2RowSVG, Chart2x2SVG, Chart3ColSVG, Chart3RowSVG, Chart4ColSVG, Chart4RowSVG, CloseIcon } from 'src/common/icons';
// import routes from 'routes';

type RowType = {
	rowIndex: number;
	lastRow?: boolean;
	items: {
		id: string;
		label: React.ReactElement;
		active: boolean;
		onClick: () => void;
	}[]
}

const Row = ({ rowIndex, lastRow, items }: RowType) => {
	return (
		<div
			style={{
				height: '76px'
			}}
			className={clsx('flex justify-start items-center gap-8 w-full', !lastRow && 'border-b border-L-gray-200 dark:border-D-gray-200')}
		>
			<div className='flex items-center'>
				<span className='text-base text-black dark:text-white'>{rowIndex}</span>
			</div>

			<ul className='flex items-center gap-8'>
				{items.map((item) => (
					<li key={item.id}>
						<button
							role="button"
							type='button'
							onClick={item.onClick}
							className={clsx('flex justify-center transition-colors items-center rounded-md h-10 w-10', item.active ? 'btn-primary' : 'text-L-primary-50 dark:text-D-primary-text-L-primary-50 border border-L-gray-500 dark:border-D-gray-500 hover:bg-L-gray-200 dark:hover:bg-D-gray-200')}
						>
							{item.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

const TvLayoutModal = () => {
	const { t } = useTranslation();

	const location = useLocation();


	const { state: { tvChartActiveLayout }, setState } = useTradingState()

	const setLayout = (layoutId: string) => {
		ipcMain.send('tv_chart:set_layout', layoutId);
	};

	const onClose = () => {
		setState({ type: "Toggle_Modal_TV", value: "tvLayoutModal" })
	};

	useEffect(() => {
		const pathname = location.pathname.replace(/\/$/g, '');
		if (pathname !== "/Market/Chart") onClose();
	}, [location]);

	return (
		<Draggable>
			<div
				style={{
					width: '31.2rem',
				}}
				className='bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-L-blue-50 dark:bg-D-blue-50 cursor-grab pr-4 py-3'>
					<div className='moveable flex items-center flex-1 h-full'>
						<span className='font-medium text-base text-white'>{t('tv_chart.tv_multi_chart')}</span>
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

				<div className='flex flex-col p-6 gap-4'>
					<div className='w-full'>
						<span className='text-sm text-black dark:text-white'>{t('tv_chart.select_chart_layout_description')}:</span>
					</div>

					<div className='flex flex-col'>
						<Row
							rowIndex={1}
							items={[
								{ id: '1', label: <Chart1ColSVG />, active: tvChartActiveLayout === '1', onClick: () => setLayout('1') }
							]}
						/>

						<Row
							rowIndex={2}
							items={[
								{ id: '2c', label: <Chart2ColSVG />, active: tvChartActiveLayout === '2c', onClick: () => setLayout('2c') },
								{ id: '2r', label: <Chart2RowSVG />, active: tvChartActiveLayout === '2r', onClick: () => setLayout('2r') }
							]}
						/>

						<Row
							rowIndex={3}
							items={[
								{ id: '3c', label: <Chart3ColSVG />, active: tvChartActiveLayout === '3c', onClick: () => setLayout('3c') },
								{ id: '3r', label: <Chart3RowSVG />, active: tvChartActiveLayout === '3r', onClick: () => setLayout('3r') }
							]}
						/>

						<Row
							rowIndex={4}
							lastRow
							items={[
								{ id: '2-2', label: <Chart2x2SVG />, active: tvChartActiveLayout === '2-2', onClick: () => setLayout('2-2') },
								{ id: '4c', label: <Chart4ColSVG />, active: tvChartActiveLayout === '4c', onClick: () => setLayout('4c') },
								{ id: '4r', label: <Chart4RowSVG />, active: tvChartActiveLayout === '4r', onClick: () => setLayout('4r') }
							]}
						/>
					</div>
				</div>
			</div>
		</Draggable>
	);
};

export default TvLayoutModal;