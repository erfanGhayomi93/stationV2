import { Menu } from '@headlessui/react';
import React from 'react';
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
} from 'src/components/Icons';

const Sider = () => {
    //
    return (
        <div className="w-[5.5rem] rounded-l-lg bg-L-basics-20 text-white flex flex-col justify-between py-5 pt-3">
            <div className="flex flex-col items-center gap-5 ">
                <button className=" p-3 rounded-md">
                    <MenuIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <HomeIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <BasketIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <BasketIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <EyeFrameIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <FileIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <File2Icon height={20} width={20} />
                </button>
            </div>
            <div className="flex flex-col items-center gap-5 ">
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <MonitorIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <GearIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <QMarkIcon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <Envelope2Icon height={20} width={20} />
                </button>
                <button className="hover:bg-L-menu-20 hover:text-white text-L-gray-5 p-3 rounded-md">
                    <QuitIcon height={20} width={20} />
                </button>
            </div>
        </div>
    );
};

export default Sider;
