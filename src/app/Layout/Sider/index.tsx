import { useMutation } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { unAuthorized } from 'src/api/axiosInstance';
import { SupervisorMassage } from 'src/common/components/SupervisorMessage';
import Tooltip from 'src/common/components/Tooltip';
import { BasketIcon, Envelope2Icon, EyeFrameIcon, FileIcon, HelpIcon, HomeIcon, QuitIcon } from 'src/common/icons';
import { logOutReq } from '../Header/UserActions';
import { useSliderDispatch, useSliderValue } from './context';
import { SLiderActionEnum } from './context/types';
import ExpandedSider from './ExpandedSider';
import ToggleSlider from './ToggleSlider';

export type MenuItemType = {
    icon: JSX.Element;
    label: string | JSX.Element;
    position: 'top' | 'bottom';
    id?: string;
    placeOfDisplay: 'closed' | 'opened' | 'both';
    isActive: boolean;
    onClick: (() => void) | undefined;
    children?: Omit<MenuItemType, 'position' | 'placeOfDisplay' | 'children'>[];
};

const Sider = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isShowSupervisorMessage, countNumberSupervisorMessage } = useSliderValue();
    const dispatch = useSliderDispatch();
    const navigate = useNavigate();

    const tooggleSlider = () => {
        dispatch({ type: SLiderActionEnum.TOGGLE_MENU });
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
                onClick: () => navigate('/'),
            },
            {
                icon: <BasketIcon height={20} width={20} />,
                label: 'سبد معامله گر',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: 'basket',
                onClick: () => navigate('/basket'),
            },
            {
                icon: <EyeFrameIcon height={20} width={20} />,
                label: 'دیده بان',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: 'Watchlist',
                onClick: () => navigate('/Watchlist'),
            },
            {
                icon: <FileIcon height={20} width={20} />,
                label: 'گزارشات',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                id: 'Reports',
                onClick: () => navigate('/Reports'),
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
                icon: <HelpIcon height={20} width={20} />,
                label: 'راهنما',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: () => navigate('/Help'),
            },
            {
                icon: <Envelope2Icon height={20} width={20} />,
                label: 'پیام های بازار',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: tooggleSlider,
            },
            {
                icon: <QuitIcon height={20} width={20} />,
                label: 'خروج',
                position: 'bottom',
                placeOfDisplay: 'both',
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
                setFlagToggle={tooggleSlider}
                countNumberSupervisorMessage={countNumberSupervisorMessage}
            />
            <div className="w-[5rem] min-w-[80px] rounded-l-lg bg-L-secondary-200 text-white flex flex-col py-5 pt-3">
                <div className="flex flex-col items-center gap-5">
                    <ToggleSlider type="open" onOpen={() => setIsOpen(true)} />
                </div>
                <div className="flex flex-col justify-between h-full mt-8">
                    <div className="flex flex-col items-center gap-5">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'top')
                            .map((item, ind) => (
                                <Tooltip key={ind} title={item.label}>
                                    <button
                                        data-cy={item.id}
                                        className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md"
                                        onClick={item.onClick}
                                    >
                                        <>{item.icon}</>
                                    </button>
                                </Tooltip>
                            ))}
                    </div>
                    <div className="flex flex-col items-center gap-5 ">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'bottom')
                            .map((item, ind) => (
                                <Tooltip key={ind} title={item.label}>
                                    <button
                                        data-cy={item.id}
                                        className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md"
                                        onClick={item.onClick}
                                    >
                                        {item.icon}
                                    </button>
                                </Tooltip>
                            ))}
                    </div>
                </div>
            </div>
            <ExpandedSider isOpen={isOpen} onClose={() => setIsOpen(false)} menuItems={menuItems} />
        </>
    );
};

export default Sider;
