import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
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
interface IExpandedSiderType {
    isOpen: boolean;
    onClose: (value: boolean) => void;
}

const ExpandedSider: FC<IExpandedSiderType> = ({ isOpen, onClose }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => onClose(false)}>
                    <div className="fixed  inset-0 overflow-y-auto right-0">
                        <div className="   ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0  translate-x-40"
                                enterTo="opacity-100 "
                                leave="ease-out duration-300"
                                leaveFrom="opacity-100 "
                                leaveTo="opacity-0  translate-x-40"
                            >
                                <Dialog.Panel className="h-screen">
                                    <div className="w-[18rem] h-screen  rounded-l-lg bg-L-basics-20 text-white flex flex-col justify-between py-5 pt-3">
                                        <div className="flex flex-col items-center gap-5 px-6 ">
                                            <button
                                                className=" p-3 rounded-md flex items-center justify-between w-full"
                                                onClick={() => onClose(false)}
                                            >
                                                <MenuIcon height={20} width={20} />
                                                بستن
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <HomeIcon height={20} width={20} />
                                                منو آیتم 8
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <BasketIcon height={20} width={20} />
                                                منو آیتم 4
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <BasketIcon height={20} width={20} />
                                                منو آیتم 7
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <EyeFrameIcon height={20} width={20} />
                                                منو آیتم 4
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <FileIcon height={20} width={20} />
                                                منو آیتم 4
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <File2Icon height={20} width={20} />
                                                منو آیتم 1
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-center gap-5 px-6 ">
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <MonitorIcon height={20} width={20} />
                                                منو آیتم 8
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <GearIcon height={20} width={20} />
                                                منو آیتم 5
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <QMarkIcon height={20} width={20} />
                                                منو آیتم 9
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <Envelope2Icon height={20} width={20} />
                                                منو آیتم 7
                                            </button>
                                            <button className="hover:bg-L-menu-20 hover:text-white flex w-full items-center justify-between text-L-gray-5 p-3 rounded-md">
                                                <QuitIcon height={20} width={20} />
                                                منو آیتم 5
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ExpandedSider;
