import { useMemo, useState } from 'react';
import { SupervisorMassage } from 'src/common/components/SupervisorMessage';
import Tooltip from 'src/common/components/Tooltip';
import { BasketIcon, Envelope2Icon, EyeFrameIcon, FileIcon, GearIcon, HomeIcon, MonitorIcon, QMarkIcon, QuitIcon } from 'src/common/icons';
import { useSliderDispatch, useSliderValue } from './context';
import { SLiderActionEnum } from './context/types';
import ExpandedSider from './ExpandedSider';
import ToggleSlider from './ToggleSlider';

export type MenuItemType = {
    icon: JSX.Element;
    label: string | JSX.Element;
    position: 'top' | 'bottom';
    placeOfDisplay: 'closed' | 'opened' | 'both';
    isActive: boolean;
    onClick: (() => void) | undefined;
    children?: Omit<MenuItemType, 'position' | 'placeOfDisplay' | 'children'>[];
};

const Sider = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isShowSupervisorMessage, countNumberSupervisorMessage } = useSliderValue();
    const dispatch = useSliderDispatch();

    const tooggleSlider = () => {
        dispatch({ type: SLiderActionEnum.TOGGLE_MENU });
    };

    const menuItems = useMemo(
        (): MenuItemType[] => [
            {
                icon: <HomeIcon height={20} width={20} />,
                label: 'منو آیتم 1',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
                children: [
                    { icon: <HomeIcon height={20} width={20} />, label: 'زیر منو 1-1', isActive: false, onClick: undefined },
                    { icon: <HomeIcon height={20} width={20} />, label: 'زیر منو 2-1', isActive: false, onClick: undefined },
                ],
            },
            {
                icon: <BasketIcon height={20} width={20} />,
                label: 'منو آیتم 2',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <BasketIcon height={20} width={20} />,
                label: 'منو آیتم 3',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <EyeFrameIcon height={20} width={20} />,
                label: 'منو آیتم 4',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <FileIcon height={20} width={20} />,
                label: 'منو آیتم 5',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <FileIcon height={20} width={20} />,
                label: 'گزارشات',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },

            {
                icon: <MonitorIcon height={20} width={20} />,
                label: 'منو آیتم 8',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <GearIcon height={20} width={20} />,
                label: 'منو آیتم 9',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <QMarkIcon height={20} width={20} />,
                label: 'منو آیتم 10',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
            {
                icon: <Envelope2Icon height={20} width={20} />,
                label: 'پیام‌ها',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: tooggleSlider,
            },
            {
                icon: <QuitIcon height={20} width={20} />,
                label: 'منو آیتم 12',
                position: 'bottom',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
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
                                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md" onClick={item.onClick}>
                                        <>{item.icon}</>
                                    </button>
                                </Tooltip>
                            ))}
                    </div>
                    <div className="flex flex-col items-center gap-5 ">
                        {menuItems
                            .filter((item) => (item.placeOfDisplay === 'closed' || item.placeOfDisplay === 'both') && item.position === 'bottom')
                            .map((item, ind) => (
                                <button
                                    key={ind}
                                    className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md"
                                    onClick={item.onClick}
                                >
                                    {item.icon}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
            <ExpandedSider isOpen={isOpen} onClose={() => setIsOpen(false)} menuItems={menuItems} />
        </>
    );
};

export default Sider;
