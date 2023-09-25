import { useMutation } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { unAuthorized } from 'src/api/axiosInstance';
import { SupervisorMassage } from 'src/common/components/SupervisorMessage';
import {
    BasketIcon,
    CalenderBourseSVG,
    Envelope2Icon,
    EyeFrameIcon,
    FileIcon,
    HelpIcon,
    HomeIcon,
    OrdersIcon,
    QuitIcon,
    TradeChartSVG,
    TradesIcon,
    TurnoverIcon,
} from 'src/common/icons';
import { logOutReq } from '../Header/UserActions';
import ExpandedSider from './ExpandedSider';
import ToggleSlider from './ToggleSlider';
import { useSliderDispatch, useSliderValue } from './context';
import { SLiderActionEnum } from './context/types';
import clsx from 'clsx';

export type MenuItemType = {
    icon: JSX.Element;
    label: string | JSX.Element;
    position: 'top' | 'bottom';
    id: string;
    placeOfDisplay: 'closed' | 'opened' | 'both';
    isActive: boolean;
    onClick: (() => void) | undefined;
    children?: Omit<MenuItemType, 'position' | 'placeOfDisplay'>[];
};

const Sider = () => {
    //
    const [isOpen, setIsOpen] = useState(false);
    const { isShowSupervisorMessage, countNumberSupervisorMessage } = useSliderValue();
    const dispatch = useSliderDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState<string>('');

    useEffect(() => {
        if (!activeMenuItem) {
            setActiveMenuItem(pathname);
        }
    }, [pathname]);

    const toggleSlider = () => {
        dispatch({ type: SLiderActionEnum.TOGGLE_MESSAGE_MODAL });
        if (isShowSupervisorMessage) {
            setActiveMenuItem(pathname);
        }
    };

    const { mutate: logOutUser } = useMutation(logOutReq, {
        onSuccess: (data) => {
            if (data) unAuthorized();
        },
    });

    const menuItems = useMemo(
        (): MenuItemType[] => [
            {
                icon: <HomeIcon height={20} width={20} />,
                label: 'صفحه اصلی',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: '/',
                onClick: () => navigate('/'),
            },
            {
                icon: <EyeFrameIcon height={20} width={20} />,
                label: 'دیده بان',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: '/Watchlist',
                onClick: () => navigate('/Watchlist'),
            },
            {
                icon: <BasketIcon height={20} width={20} />,
                label: 'سبد معامله گر',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: '/basket',
                onClick: () => navigate('/basket'),
            },
            // {
            //     icon: <TradeChartSVG height={20} width={20} />,
            //     label: 'بازار',
            //     position: 'top',
            //     placeOfDisplay: 'both',
            //     isActive: false,
            //     id: '/Market/Chart',
            //     onClick: () => navigate('/Market/Chart'),
            //     children: [

            //     ],
            // },
            {
                icon: <FileIcon height={20} width={20} />,
                label: 'گزارشات',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: '/Reports/orders',
                onClick: () => navigate('/Reports/orders'),
                children: [
                    {
                        label: 'سفارشات',
                        icon: <OrdersIcon height={20} width={20} />,
                        isActive: false,
                        id: '/Reports/orders',
                        onClick: () => navigate('/Reports/orders'),
                    },
                    {
                        label: 'معاملات',
                        icon: <TradesIcon height={20} width={20} />,
                        isActive: false,
                        id: '/Reports/trades',
                        onClick: () => navigate('/Reports/trades'),
                    },
                    {
                        label: 'گردش حساب',
                        icon: <TurnoverIcon height={20} width={20} />,
                        isActive: false,
                        id: '/Reports/turnover',
                        onClick: () => navigate('/Reports/turnover'),
                    },
                ],
            },
            {
                label: 'ابزار تکنیکال',
                position: 'top',
                placeOfDisplay: 'both',
                icon: <TradeChartSVG height={20} width={20} />,
                isActive: false,
                id: '/Market/Chart',
                onClick: () => navigate('/Market/Chart'),
            },
            {
                label: 'تقویم بورسی',
                icon: <CalenderBourseSVG height={20} width={20} />,
                isActive: false,
                id: '/Market/Calender',
                onClick: () => navigate('/Market/Calender'),
                position: 'top',
                placeOfDisplay: 'both',
            },
            // {
            //     icon: <File2Icon height={20} width={20} />,
            //     label: 'یادداشت ها',
            //     position: 'top',
            //     placeOfDisplay: 'both',
            //     isActive: false,
            //     onClick: undefined,
            // },
            // {
            //     icon: <Customers height={20} width={20} />,
            //     label: 'مشتریان',
            //     position: 'top',
            //     placeOfDisplay: 'both',
            //     isActive: false,
            //     onClick: () => navigate('/Reports'),
            // },

            // {
            //     icon: <MonitorIcon height={20} width={20} />,
            //     label: 'تحلیل',
            //     position: 'bottom',
            //     placeOfDisplay: 'both',
            //     isActive: false,
            //     onClick: undefined,
            // },
            // {
            //     icon: <GearIcon height={20} width={20} />,
            //     label: 'تنظیمات',
            //     position: 'bottom',
            //     placeOfDisplay: 'both',
            //     isActive: false,
            //     onClick: undefined,
            //     // children: [
            //     //     { icon: <HomeIcon height={20} width={20} />, label: 'زیر منو 1-1', isActive: false, onClick: undefined },
            //     //     { icon: <HomeIcon height={20} width={20} />, label: 'زیر منو 2-1', isActive: false, onClick: undefined },
            //     // ],
            // },
            {
                icon: <Envelope2Icon height={20} width={20} />,
                label: 'پیام های بازار',
                position: 'bottom',
                placeOfDisplay: 'both',
                id: 'message',
                isActive: false,
                onClick: toggleSlider,
            },
            {
                icon: <HelpIcon height={20} width={20} />,
                label: 'راهنما',
                position: 'bottom',
                placeOfDisplay: 'both',
                id: '/Help',
                isActive: false,
                onClick: () => navigate('/Help'),
            },
            {
                icon: <QuitIcon height={20} width={20} />,
                label: 'خروج',
                position: 'bottom',
                placeOfDisplay: 'both',
                id: 'exit',
                isActive: false,
                onClick: () => logOutUser(),
            },
        ],
        [],
    );

    return (
        <>
            <SupervisorMassage
                flagToggle={isShowSupervisorMessage}
                setFlagToggle={toggleSlider}
                countNumberSupervisorMessage={countNumberSupervisorMessage}
            />
            <div className="w-[5rem] min-w-[80px] bg-L-blue-50 dark:bg-D-blue-50 text-white flex flex-col py-5 pt-3">
                <div className="flex flex-col items-center">
                    <ToggleSlider type="open" onOpen={() => setIsOpen(true)} />
                </div>
                <div className="flex flex-col justify-between h-full mt-4">
                    <div className="flex flex-col items-center">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'top')
                            .map((item, ind) => (
                                <Tippy key={ind} content={item.label} className="text-xs" placement="left">
                                    <button
                                        data-cy={item.id}
                                        className={clsx('p-4', activeMenuItem === item.id ? 'text-L-secondary-50' : 'text-menu')}
                                        onClick={() => {
                                            item.onClick?.();
                                            setActiveMenuItem(item.id);
                                        }}
                                    >
                                        <>{item.icon}</>
                                    </button>
                                </Tippy>
                            ))}
                    </div>
                    <div className="flex flex-col items-center">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'bottom')
                            .map((item, ind) => (
                                <Tippy
                                    aria={{ content: 'auto', expanded: 'auto' }}
                                    inertia
                                    key={ind}
                                    content={item.label}
                                    className="text-xs"
                                    placement="left"
                                >
                                    <button
                                        data-cy={item.id}
                                        className={clsx('p-4', activeMenuItem === item.id ? 'text-L-secondary-50' : 'text-menu')}
                                        onClick={() => {
                                            item.onClick?.();
                                            setActiveMenuItem(item.id);
                                        }}
                                    >
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))}
                    </div>
                </div>
            </div>
            <ExpandedSider
                isOpen={isOpen}
                activeMenuItem={activeMenuItem}
                setActiveMenuItem={setActiveMenuItem}
                onClose={() => setIsOpen(false)}
                menuItems={menuItems}
            />
        </>
    );
};

export default Sider;
