import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTradingState } from '../context';
import ipcMain from 'src/common/classes/IpcMain';
import Draggable from 'src/common/components/Draggable/Draggable';
import { CloseIcon } from 'src/common/icons';
import Checkbox from 'src/common/components/Checkbox/Checkbox';

const TvSaveIndicatorsTemplate = () => {
	const { t } = useTranslation();

	const location = useLocation();

	const { setState } = useTradingState()


	const [inputs, setInputs] = useState({
		name: "",
		saveInterval: false,
		saveSymbol: false
	});

	const onClose = () => {
		setState({ type: "Toggle_Modal_TV", value: "tvSaveIndicatorsTemplate" })
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isDisabled) return;

		try {
			ipcMain.send('tv_chart:save_study_template', inputs);
		} catch (e) {
			console.log(e);
		} finally {
			onClose();
		}
	};

	const setInputField = <T extends keyof typeof inputs,>(name: T, value: typeof inputs[T]) => {
		setInputs({
			...inputs,
			[name]: value
		});
	};

	const isDisabled = useMemo(() => {
		return (!inputs.name || inputs.name.replace(/\s/g, "").length === 0);
	}, [inputs]);

	useEffect(() => {
		const pathname = location.pathname.replace(/\/$/g, '');
		if (pathname !== "/Market/Chart") onClose();
	}, [location]);

	return (
		<Draggable>
			<div
				style={{
					width: '24rem',
					height: '18.7rem'
				}}
				className='bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-L-blue-50 dark:bg-D-blue-50 cursor-grab pr-4 py-3'>
					<div className='moveable flex items-center flex-1 h-full'>
						<span className='font-medium text-base text-white'>{t('tv_chart.tv_save_indicators_template')}</span>
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

				<form onSubmit={onSubmit} className='flex flex-col justify-between overflow-hidden flex-1 p-6 gap-6'>
					<div className='flex flex-col gap-5'>
						<label>
							<input
								type='text'
								autoFocus
								value={inputs.name}
								className='text-sm bg-transparent placeholder:text-L-gray-500 dark:placeholder:text-D-gray-500 text-black dark:text-white border border-L-gray-500 dark:border-D-gray-500 rounded px-4 h-10 w-full'
								placeholder={t('tv_chart.tv_indicator_template_name')}
								onChange={(e) => setInputField('name', e.target.value)}
							/>
						</label>

						<div className='flex flex-col gap-4'>
							<Checkbox
								label={t('tv_chart.tv_save_symbol')}
								checked={inputs.saveSymbol}
								onChange={(checked) => setInputField('saveSymbol', checked)}
								classes={{
									text: 'text-base',
									checkbox: 'w-4 h-4'
								}}
							/>

							<Checkbox
								label={t('tv_chart.tv_save_frame')}
								checked={inputs.saveInterval}
								onChange={(checked) => setInputField('saveInterval', checked)}
								classes={{
									text: 'text-base font-normal',
									checkbox: 'w-4 h-4'
								}}
							/>
						</div>
					</div>

					<div className='flex justify-end gap-2'>
						<button
							role="button"
							type='button'
							onClick={onClose}
							className='flex items-center rounded justify-center text-base text-L-gray-500 dark:text-D-gray-500 border border-L-gray-500 dark:border-D-gray-500 px-3 h-10'
						>
							{t('common.cancel')}
						</button>

						<button
							role="button"
							type='submit'
							disabled={isDisabled}
							className='flex items-center rounded justify-center text-base btn-primary px-3 h-10'
						>
							{t('common.save')}
						</button>
					</div>
				</form>
			</div>
		</Draggable>
	);
};

export default TvSaveIndicatorsTemplate;