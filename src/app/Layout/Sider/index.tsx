import { useMutation } from '@tanstack/react-query';
import Tippy from '@tippyjs/react';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { unAuthorized } from 'src/api/axiosInstance';
import { SupervisorMassage } from 'src/common/components/SupervisorMessage';
import {
    BasketIcon,
    CalenderBourseSVG,
    Envelope2Icon,
    ExiteIcon,
    EyeFrameIcon,
    FileIcon,
    GearIcon,
    HomeIcon,
    RequestListIcon,
    TradeChartSVG,
} from 'src/common/icons';
import { logOutReq } from '../Header/UserActions';
import ExpandedSider from './ExpandedSider';
import ToggleSlider from './ToggleSlider';
import { useSliderDispatch, useSliderValue } from './context';
import { SLiderActionEnum } from './context/types';
import clsx from 'clsx';

export type MenuItemType = {
    icon?: JSX.Element;
    label: string | JSX.Element;
    position: 'top' | 'bottom';
    id: string;
    placeOfDisplay: 'closed' | 'opened' | 'both';
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

    const toggleSlider = () => dispatch({ type: SLiderActionEnum.TOGGLE_MESSAGE_MODAL });

    const { mutate: logOutUser } = useMutation(logOutReq, {
        onSuccess: (data) => {
            if (data) unAuthorized();
        },
    });

    const menuItems = useMemo(
        (): MenuItemType[] => [
            {
                icon: <HomeIcon className="w-5 h-5" />,
                label: 'صفحه اصلی',
                position: 'top',
                placeOfDisplay: 'both',
                id: '/',
                onClick: () => navigate('/'),
            },
            {
                icon: <EyeFrameIcon className="w-5 h-5" />,
                label: 'دیده بان',
                position: 'top',
                placeOfDisplay: 'both',
                id: '/Watchlist',
                onClick: () => navigate('/Watchlist'),
            },
            {
                icon: <BasketIcon className="w-5 h-5" />,
                label: 'سبد معامله گر',
                position: 'top',
                placeOfDisplay: 'both',
                id: '/basket',
                onClick: () => navigate('/basket'),
            },
            {
                id: '/Requests',
                icon: <RequestListIcon />,
                label: 'درخواست ها',
                position: 'top',
                placeOfDisplay: 'both',
                onClick: () => navigate('/Requests/Offline'),
                children: [
                    {
                        label: 'آفلاین',
                        id: '/Requests/Offline',
                        onClick: () => navigate('/Requests/Offline'),
                    },
                    {
                        label: 'تسویه اختیار',
                        id: '/Requests/OptionSettlement',
                        onClick: () => navigate('/Requests/OptionSettlement'),
                    },
                ],
            },
            {
                icon: <FileIcon className="w-5 h-5" />,
                label: 'گزارشات',
                position: 'top',
                placeOfDisplay: 'both',
                id: '/Reports',
                onClick: () => navigate('/Reports/Orders'),
                children: [
                    // {
                    //     icon: <FileIcon className="w-5 h-5" />,
                    //     label: 'پرتفوی',
                    //     id: '/portfolio',
                    //     onClick: () => navigate('/portfolio'),
                    // },
                    {
                        label: 'سفارشات',
                        id: '/Reports/Orders',
                        onClick: () => navigate('/Reports/Orders'),
                    },
                    {
                        label: 'معاملات',
                        id: '/Reports/Trades',
                        onClick: () => navigate('/Reports/Trades'),
                    },
                    {
                        label: 'گردش حساب',
                        id: '/Reports/Turnover',
                        onClick: () => navigate('/Reports/Turnover'),
                    },
                ],
            },
            {
                label: 'ابزار تکنیکال',
                position: 'top',
                placeOfDisplay: 'both',
                icon: <TradeChartSVG className="w-5 h-5" />,
                id: '/Market/Chart',
                onClick: () => navigate('/Market/Chart'),
            },
            {
                label: 'تقویم بورسی',
                icon: <CalenderBourseSVG className="w-5 h-5" />,
                id: '/Market/Calender',
                onClick: () => navigate('/Market/Calender'),
                position: 'top',
                placeOfDisplay: 'both',
            },
            {
                icon: <Envelope2Icon className="w-5 h-5" />,
                label: 'پیام ها',
                position: 'bottom',
                placeOfDisplay: 'both',
                id: 'message',
                onClick: toggleSlider,
            },
            {
                id: '/setting',
                icon: <GearIcon className="w-5 h-5" />,
                label: 'تنظیمات',
                position: 'bottom',
                placeOfDisplay: 'both',
                onClick: () => navigate('/setting'),
            },
            {
                icon: <ExiteIcon height={16} width={16} />,
                label: 'خروج',
                position: 'bottom',
                placeOfDisplay: 'both',
                id: 'exit',
                onClick: () => logOutUser(),
            },
        ],
        [],
    );

    const isMenuHighlighted = (id: string) => {
        if (id !== '/') {
            return pathname.includes(id);
        } else {
            return pathname === id;
        }
    };

    return (
        <>
            <SupervisorMassage
                flagToggle={isShowSupervisorMessage}
                setFlagToggle={toggleSlider}
                countNumberSupervisorMessage={countNumberSupervisorMessage}
            />
            <div className="w-[5rem] min-w-[80px] bg-L-blue-50 dark:bg-D-blue-50 text-white flex flex-col py-5 pt-3">
                <ToggleSlider type="open" onOpen={() => setIsOpen(true)} />
                <div className="flex flex-col justify-between h-full mt-2">
                    <div className="flex flex-col items-center">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'top')
                            .map((item, ind) => (
                                <Tippy key={ind} content={item.label} className="text-xs" placement="left">
                                    <button
                                        data-cy={item.id}
                                        className={clsx('p-4', isMenuHighlighted(item.id) ? 'text-L-secondary-50' : 'text-menu')}
                                        onClick={() => {
                                            item.onClick?.();
                                        }}
                                    >
                                        {item.icon}
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
                                        className={clsx('p-4', isMenuHighlighted(item.id) ? 'text-L-secondary-50' : 'text-menu')}
                                        onClick={() => {
                                            item.onClick?.();
                                        }}
                                    >
                                        {item.icon}
                                    </button>
                                </Tippy>
                            ))}
                    </div>
                </div>
            </div>
            <ExpandedSider isOpen={isOpen} onClose={() => setIsOpen(false)} menuItems={menuItems} />
        </>
    );
};

export default Sider;

//Commented Menus Portfolio is NOT garbage will be back later on!

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
//     icon: <HelpIcon height={20} width={20} />,
//     label: 'راهنما',
//     position: 'bottom',
//     placeOfDisplay: 'both',
//     id: '/Help',
//     isActive: false,
//     onClick: () => navigate('/Help'),
// },
