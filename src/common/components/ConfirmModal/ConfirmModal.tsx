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
					width: '25rem',
					minHeight: '12.5rem',
					maxHeight: '12.5rem'
				}}
				className='bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden'
			>
				<div className='flex justify-between items-center bg-L-primary-50 dark:bg-D-primary-200 cursor-grab pr-6 h-12'>
					<div className='moveable flex items-center flex-1 h-full'>
						{typeof title === 'string'
							? <span className='font-medium text-base text-white'>{t(title)}</span>
							: title
						}
					</div>
				</div>

				<div className='flex flex-col flex-1 overflow-hidden gap-6 p-6'>
					<div>
						<p className='text-base text-L-gray-700 dark:text-D-gray-700'>{description}</p>
					</div>

					<div className='flex justify-end gap-2'>
						<button
							role="button"
							type='button'
							onClick={onCancel}
							className='flex items-center rounded justify-center text-base text-L-gray-500 dark:text-D-gray-500 border border-L-gray-500 dark:border-D-gray-500 px-6 h-10'
						>
							{t(cancelBtnLabel)}
						</button>

						<button
							role="button"
							type='button'
							onClick={onConfirm}
							autoFocus
							className='flex items-center rounded justify-center text-base btn-primary px-12 h-10'
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