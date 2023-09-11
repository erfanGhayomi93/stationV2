import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";
import Watchlist from "./Watchlist";
import { useTradingState } from "../context";
import LayoutToggler from "../TradingView/LayoutToggler";


const PortfolioWatchlist = () => {
	const { t } = useTranslation();


	const { state: { tvSidebarStatus }, setState } = useTradingState()


	const updateTvSidebarStatus = (state: TvSidebarStatus) => {
		setState({ type: "Set_TV_Sidebar_Status", value: state })
	};

	if (tvSidebarStatus === 'collapse') return (
		<div className='flex w-4 relative'>
			<div className='rounded relative bg-L-basic dark:bg-D-basic w-full'></div>
			<LayoutToggler />
		</div>
	);

	return (
		<div
			style={{
				width: tvSidebarStatus === 'full-width' ? '26.625rem' : '17.37rem'
			}}
			className='relative bg-L-basic dark:bg-D-basic px-2 py-4 rounded my-[1px]'
		>
			<div className='grid grid-rows-one-min gap-1 h-full'>
				<div className='relative flex-1 overflow-x-hidden'>
					<Watchlist expand={tvSidebarStatus === 'full-width'} />
				</div>

				<div className='flex justify-end'>
					<Tippy content={t(tvSidebarStatus === 'full-width' ? "Tooltip.tv_collapse_sidebar" : "Tooltip.tv_expand_sidebar")} className="text-xs font-medium">
						<button
							role="button"
							type="button"
							className="flex items-center justify-center rounded text-L-gray-600 dark:text-D-gray-600 transition-all duration-75 hover:bg-L-gray-200 dark:hover:bg-D-gray-200 h-10 w-10"
							style={{
								transform: tvSidebarStatus === 'full-width' ? 'scale(1, 1)' : 'scale(-1, 1)'
							}}
							onClick={() => updateTvSidebarStatus(tvSidebarStatus === 'full-width' ? 'half-width' : 'full-width')}
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M20 12V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M4 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								<path d='M18 15L21 18L18 21' stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					</Tippy>
				</div>

			</div>

			<LayoutToggler />
		</div>
	);
};

export default PortfolioWatchlist;