import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { NoFileExistsSVG } from 'src/common/icons';

type NoDataProps = {
	label?: string;
	classes?: Partial<Record<
		'root' | 'spinner' | 'label',
		ClassesValue | undefined
	>>;
	iconExists?: boolean;
	textExists?: boolean;
}

const NoData = ({ label, classes, iconExists = true, textExists = true }: NoDataProps) => {
	const { t } = useTranslation();

	return (
		<div className={clsx(classes?.root ?? 'absolute top-0 left-0 flex items-center justify-center w-full h-full')}>
			<div className='flex flex-col items-center text-L-gray-700 dark:text-D-gray-700 gap-4'>
				{iconExists && <NoFileExistsSVG width='2.2rem' height='2.2rem' />}
				{textExists && (
					<span className={clsx(classes?.label ?? 'text-sm')}>
						{label ?? t('common.no_data')}
					</span>
				)
				}
			</div>
		</div>
	);
};

export default NoData;