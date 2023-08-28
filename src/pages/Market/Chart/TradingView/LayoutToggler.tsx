import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { NavigateLeftSVG } from 'src/common/icons';
import { useTranslation } from 'react-i18next';
import { useTradingState } from '../context';

const LayoutToggler = () => {
	const { t } = useTranslation();

	const { state: { tvSidebarStatus }, setState } = useTradingState()

	const toggleSidebar = () => {
		setState({ type: "Set_TV_Sidebar_Status", value: tvSidebarStatus === 'collapse' ? 'full-width' : 'collapse' })

	};

	return (
		<div
			style={{
				right: 'calc(100% + 3px)'
			}}
			className='absolute top-1/2 transform -translate-y-1/2'
		>
			<Tippy placement='right' content={t('Tooltip.' + (tvSidebarStatus === 'collapse' ? 'show_portfolio_watchlist' : 'hide_portfolio_watchlist'))}>
				<button
					role="button"
					type='button'
					onClick={toggleSidebar}
					className={clsx('flex rounded-lg h-8 p-1 items-center justify-center bg-L-gray-500 dark:bg-D-gray-500 text-L-basic dark:text-D-basic  transform', tvSidebarStatus === 'collapse' ? 'rotate-0' : 'rotate-180')}
				>
					<NavigateLeftSVG />
				</button>
			</Tippy>
		</div>
	);
};

export default LayoutToggler;