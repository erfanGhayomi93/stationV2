import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Draggable from '../Draggable/Draggable';

type ConfirmModalProps = {
	title: string | React.ReactElement;
	description: string | React.ReactElement;
	confirmBtnLabel?: string;
	cancelBtnLabel?: string;
	onConfirm: () => void;
	onCancel: () => void;
	classes?: Partial<Record<
		'root' | 'confirmBtn' | 'cancelBtn',
		ClassesValue
	>>;
}

const ConfirmModal = ({
	title,
	description,
	confirmBtnLabel = "common.confirm",
	cancelBtnLabel = "common.cancel",
	onConfirm,
	onCancel
}: ConfirmModalProps) => {
	const { t } = useTranslation();

	return createPortal((
		<Draggable>
			<div
				style={{
					width: '40rem',
					minHeight: '20rem',
					maxHeight: '20rem'
				}}
				className='bg-white dark:bg-black flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-secondary-200 dark:bg-dark-secondary-200 cursor-grab pr-24 h-48'>
					<div className='moveable flex items-center flex-1 h-full'>
						{typeof title === 'string'
							? <span className='font-medium text-base text-white'>{t(title)}</span>
							: title
						}
					</div>
				</div>

				<div className='flex flex-col flex-1 overflow-hidden gap-24 p-24'>
					<div>
						<p className='text-base text-gray-900 dark:text-dark-gray-900'>{description}</p>
					</div>

					<div className='flex justify-end gap-8'>
						<button
							role="button"
							type='button'
							onClick={onCancel}
							className='flex items-center rounded justify-center text-base text-gray-600 dark:text-dark-gray-600 border border-gray-600 dark:border-dark-gray-600 px-24 h-40'
						>
							{t(cancelBtnLabel)}
						</button>

						<button
							role="button"
							type='button'
							onClick={onConfirm}
							autoFocus
							className='flex items-center rounded justify-center text-base btn-primary px-48 h-40'
						>
							{t(confirmBtnLabel)}
						</button>
					</div>
				</div>
			</div>
		</Draggable>
	), document.getElementById('__MODAL') ?? document.body);
};

export default ConfirmModal;