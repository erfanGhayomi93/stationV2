import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

type LoadingProps = {
	label?: string;
	spinnerExists?: boolean;
	blur?: boolean;
	spinnerSize?: {
		width: number;
		height: number
	};
	textExists?: boolean;
	classes?: Partial<Record<
		'root' | 'spinner' | 'label',
		ClassesValue | undefined
	>>;
}

const Loading = ({ label, spinnerSize, spinnerExists = true, textExists = true, classes, blur = false }: LoadingProps) => {
	const { t } = useTranslation();

	return (
		<div className='absolute top-0 left-0 overflow-hidden w-full h-full' style={{ zIndex: 999 }}>
			<div className='relative h-full w-full'>
				{blur && (<div className='absolute w-full h-full' style={{ backdropFilter: 'blur(1.2px)' }} />)}

				<div className={clsx(classes?.root ?? 'absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full gap-4')}>
					{spinnerExists && <div
						className={clsx('spinner', classes?.spinner)}
						style={{
							width: (spinnerSize?.width ?? 32) + 'px',
							height: (spinnerSize?.height ?? 32) + 'px'
						}}
					/>}

					{textExists && (
						<span className={clsx(classes?.label ?? 'text-sm text-L-gray-600 dark:text-D-gray-600')}>
							{label ?? (t('common.loading') + ' ...')}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default Loading;