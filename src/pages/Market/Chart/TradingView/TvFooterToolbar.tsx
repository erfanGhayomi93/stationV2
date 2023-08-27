import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './TradingView.module.scss';
import TradingWidget from 'src/common/classes/Tradingview/TradingWidget';
import { useAppSelector } from 'src/redux/hooks';
import { getTheme } from 'src/redux/slices/ui';

type TvFooterToolbarProps = {
	activeChart: TradingWidget;
}

const TvFooterToolbar = ({ activeChart }: TvFooterToolbarProps) => {
	const theme = useAppSelector(getTheme)

	const onChangeTimeFrame = (value: { val: { value: string; type: string }; res: string }) => {
		try {
			activeChart.widget!.setTimeFrame(value);
		} catch (e) {
			//
		}
	};

	const availableTimeFrames = useMemo(() => ([
		{ id: '60M', label: '5 سال', type: 'period-back', value: '1W' },
		{ id: '12M', label: '1 سال', type: 'period-back', value: '1W' },
		{ id: '6M', label: '6 ماه', type: 'period-back', value: '240' },
		{ id: '3M', label: '3 ماه', type: 'period-back', value: '60' },
		{ id: '1M', label: '1 ماه', type: 'period-back', value: '30' },
		{ id: '5D', label: '5 روز', type: 'period-back', value: '5' },
		{ id: '1D', label: '1 روز', type: 'period-back', value: '1' },
	]), []);

	return (
		<div className='flex rtl justify-between bg-L-basic dark:bg-D-basic w-full'>
			<div className={clsx('flex rtl justify-between bg-L-basic dark:bg-D-basic w-full', theme === 'dark' && styles.dark)}>
				<ul className={clsx(styles.list, 'justify-start')}>
					{availableTimeFrames.map((frame) => (
						<li key={frame.id} className='border-0'>
							<button
								role="button"
								type='button'
								onClick={() => onChangeTimeFrame({
									val: {
										value: frame.id,
										type: frame.type
									},
									res: frame.value
								})}
								className={clsx(styles.btn, styles.expand)}
							>
								<span>
									<span>{frame.label}</span>
								</span>
							</button>
						</li>
					))}
				</ul>

				<ul className={clsx(styles.list, 'justify-start')} />
			</div>
		</div>
	);
};

export default TvFooterToolbar;