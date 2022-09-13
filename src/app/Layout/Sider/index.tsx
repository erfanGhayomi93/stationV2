import React, { useMemo, useState } from 'react';
import { CounterBalloon } from 'src/common/components/CounterBalloon/CounterBalloon';
import {
    BasketIcon,
    Envelope2Icon,
    EyeFrameIcon,
    FileIcon,
    File2Icon,
    GearIcon,
    HomeIcon,
    MonitorIcon,
    QMarkIcon,
    QuitIcon,
    MenuIcon,
} from 'src/common/icons';

import ExpandedSider from './ExpandedSider';

type MenuItemType = {
    icon: JSX.Element;
    label: string | JSX.Element;
    position: 'top' | 'bottom';
    placeOfDisplay: 'closed' | 'opened' | 'both';
    isActive: boolean;
    onClick: (() => void) | undefined;
    children?: Omit<MenuItemType, 'position' | 'placeOfDisplay' | 'children'>[];
};

const Sider = () => {
    //
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = useMemo(
        (): MenuItemType[] => [
            {
                icon: <HomeIcon height={20} width={20} />,
                label: 'صفحه اصلی',
                position: 'top',
                placeOfDisplay: 'both',
                isActive: false,
                onClick: undefined,
            },
        ],
        [],
    );

    return (
        <>
            <div className="w-[5.5rem] min-w-[88px] rounded-l-lg bg-L-secondary-200 text-white flex flex-col justify-between py-5 pt-3">
                <div className="flex flex-col items-center gap-5 ">
                    <button className=" p-3 rounded-md" onClick={() => setIsOpen(true)}>
                        <MenuIcon height={20} width={20} />
                    </button>
                    <button className=" hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <HomeIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <BasketIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <BasketIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <EyeFrameIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <FileIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <File2Icon height={20} width={20} />
                    </button>
                </div>
                <div className="flex flex-col items-center gap-5 ">
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <MonitorIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <GearIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <QMarkIcon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <Envelope2Icon height={20} width={20} />
                    </button>
                    <button className="hover:bg-L-secondary-150 hover:text-white text-menu p-3 rounded-md">
                        <QuitIcon height={20} width={20} />
                    </button>
                </div>
            </div>
            <ExpandedSider isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default Sider;
