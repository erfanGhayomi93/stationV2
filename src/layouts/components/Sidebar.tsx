import {
     BasketIcon,
     CommunityIcon,
     DraftIcon,
     EyeIcon,
     GearIcon,
     HomeIcon,
     PieChartIcon,
     //   PlusIcon,
     ShapesIcon,
     StoneFourIcon,
} from '@assets/icons';
import { useUIStore } from '@store/ui';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
     const { t } = useTranslation();

     const navigate = useNavigate();

     const { isExpandSidebar, setIsExpandSidebar } = useUIStore();

     const [showContent, setShowContent] = useState(isExpandSidebar);

     const ITEMS = useMemo(
          () => [
               {
                    id: 'home',
                    icon: <HomeIcon />,
                    title: t('sidebar.home'),
                    disable: false,
                    path: '/',
               },
               {
                    id: 'market',
                    icon: <EyeIcon />,
                    title: t('sidebar.market'),
                    subItem: [
                         {
                              id: 'watchlist',
                              title: t('sidebar.watchlist'),
                         },
                    ],
                    disable: true,
               },
               {
                    id: 'portfolioTrader',
                    icon: <BasketIcon />,
                    title: t('sidebar.portfolioTrader'),
                    disable: true,
               },
               {
                    id: 'requests',
                    icon: <ShapesIcon />,
                    title: t('sidebar.requests'),
                    disable: true,
               },
               {
                    id: 'manageCustomer',
                    icon: <CommunityIcon />,
                    title: t('sidebar.manageCustomer'),
                    disable: true,
               },
               {
                    id: 'reports',
                    icon: <DraftIcon />,
                    title: t('sidebar.reports'),
                    disable: true,
               },
               {
                    id: 'performancePortfolio',
                    icon: <PieChartIcon />,
                    title: t('sidebar.performancePortfolio'),
                    disable: true,
               },
               {
                    id: 'optionTrade',
                    icon: <StoneFourIcon />,
                    title: t('sidebar.optionTrade'),
                    disable: true,
               },
          ],
          []
     );

     useEffect(() => {
          let timerId: NodeJS.Timeout;

          if (isExpandSidebar) {
               timerId = setTimeout(() => {
                    setShowContent(true);
               }, 0);
          } else {
               setShowContent(false);
          }

          return () => {
               clearTimeout(timerId);
          };
     }, [isExpandSidebar]);

     return (
          <aside
               onMouseEnter={() => setIsExpandSidebar(true)}
               onMouseLeave={() => setIsExpandSidebar(false)}
               style={{
                    width: isExpandSidebar ? '15rem' : '4rem',
                    transition: 'width 0.3s ease',
               }}
               className="bg-indigo-300 rtl fixed bottom-0 right-0 top-0 flex flex-col justify-between bg-nav-back-pwa px-2 py-5 shadow-E2"
          >
               <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2 py-4">
                         <div className="flex flex-shrink-0 items-center justify-center">
                              <img src={`/assets/images/logo_${window.REACT_APP_BROKER_CODE}.svg`} className="h-full w-full" />
                         </div>

                         <span
                              style={{
                                   opacity: showContent ? 1 : 0,
                              }}
                              className="truncate text-sm font-bold text-icon-primary transition-opacity"
                         >
                              {t(`brokerCode_${window.REACT_APP_BROKER_CODE}.title`)}
                         </span>
                    </div>

                    <div className={clsx('flex flex-col gap-4')}>
                         {ITEMS.map((item , ind) => (
                              <div
                                   onClick={() => {
                                        navigate(item.path ?? '/');
                                   }}
                                   className="flex items-center justify-between gap-3 py-2 pr-[10px] text-icon-default"
                                   key={ind}
                              >
                                   <div
                                        className={clsx('flex items-center gap-[10px]', {
                                             'cursor-pointer text-content-paragraph': !item.disable,
                                             'text-content-paragraph/40': item.disable,
                                        })}
                                   >
                                        <div>{item.icon}</div>
                                        {showContent && <span className="truncate text-base font-medium">{item.title}</span>}
                                   </div>
                                   <div>{/* <PlusIcon /> */}</div>
                              </div>
                         ))}
                    </div>
               </div>

               <div className="flex flex-col gap-6">
                    <div className={clsx('flex items-center gap-3 py-2 pr-[10px] text-content-paragraph/40')}>
                         <div className="flex items-center justify-center py-2">
                              <GearIcon />
                         </div>
                         <span
                              style={{
                                   opacity: showContent ? 1 : 0,
                              }}
                              className="truncate text-base font-medium transition-opacity"
                         >
                              {t('sidebar.settings')}
                         </span>
                    </div>

                    {showContent && (
                         <span
                              style={{
                                   fontSize: '11px',
                              }}
                              className="truncate text-center text-content-placeholder"
                         >
                              {t('sidebar.copyWrite')}
                         </span>
                    )}
               </div>
          </aside>
     );
};

export default Sidebar;
