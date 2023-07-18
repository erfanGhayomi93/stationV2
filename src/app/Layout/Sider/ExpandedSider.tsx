import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { ChevronIcon } from 'src/common/icons';
import { MenuItemType } from '.';
import ToggleSlider from './ToggleSlider';

interface IExpandedSiderType {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    menuItems: MenuItemType[];
}

const ExpandedSider: FC<IExpandedSiderType> = ({ isOpen, onClose, menuItems }) => {
    let buttonWithChildren = (item: MenuItemType, ind: number) => (
        <Disclosure key={ind} defaultOpen={false}>
            {({ open }) => (
                <>
                    <Disclosure.Button as={Fragment}>
                        <button
                            // onClick={item.onClick}
                            className="hover:bg-L-secondary-150 hover:text-white flex gap-2 w-full items-center text-menu p-3 rounded-md"
                        >
                            {item.icon}
                            {item.label}
                            <div className="flex flex-1 justify-end">
                                <ChevronIcon className={`rotate-180 duration-200 ${open ? 'rotate-0' : ''}`} />
                            </div>
                        </button>
                    </Disclosure.Button>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0  translate-x-10"
                        enterTo="opacity-100 "
                        leave="ease-out duration-300"
                        leaveFrom="opacity-100 "
                        leaveTo="opacity-0  translate-x-10"
                    >
                        <Disclosure.Panel className="pr-3 w-full" data-cy="expanded-sider">
                            <div className=" w-full border-solid border-r-2 border-L-secondary-150">
                                {item.children &&
                                    item.children.map((itemChild: Omit<MenuItemType, 'position' | 'placeOfDisplay' | 'children'>, ind: number) => (
                                        <button
                                            key={ind}
                                            className="hover:bg-L-secondary-150 hover:text-white flex gap-2 w-full items-center text-menu p-3 rounded-md"
                                            onClick={itemChild.onClick}
                                        >
                                            {itemChild.icon}
                                            {itemChild.label}
                                        </button>
                                    ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => onClose(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white  bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0  translate-x-40"
                                enterTo="opacity-100 "
                                leave="ease-out duration-300"
                                leaveFrom="opacity-100 "
                                leaveTo="opacity-0  translate-x-40"
                            >
                                <Dialog.Panel className="w-[calc(18rem+12px)] h-screen absolute right-0">
                                    <div className="w-[18rem] h-screen overflow-visible bar rounded-l-lg bg-L-secondary-200 text-white flex flex-col py-5 pt-3">
                                        <div className="flex flex-col items-center gap-5">
                                            <ToggleSlider type="close" onClose={() => onClose(false)} />
                                        </div>
                                        <div className="flex flex-col justify-between h-full mt-8">
                                            <div className="flex flex-col items-center gap-5 px-6 ">
                                                {menuItems
                                                    .filter(
                                                        (item) =>
                                                            (item.placeOfDisplay === 'opened' || item.placeOfDisplay === 'both') &&
                                                            item.position === 'top',
                                                    )
                                                    .map((item, ind) => {
                                                        if (item.children) {
                                                            return buttonWithChildren(item, ind);
                                                        } else {
                                                            return (
                                                                <button
                                                                    key={ind}
                                                                    className="hover:bg-L-secondary-150 hover:text-white flex gap-2 w-full items-center text-menu p-3 rounded-md"
                                                                    onClick={item.onClick}
                                                                >
                                                                    {item.icon}
                                                                    {item.label}
                                                                </button>
                                                            );
                                                        }
                                                    })}
                                            </div>

                                            <div className="flex flex-col items-center gap-5 px-6 ">
                                                {menuItems
                                                    .filter(
                                                        (item) =>
                                                            (item.placeOfDisplay === 'opened' || item.placeOfDisplay === 'both') &&
                                                            item.position === 'bottom',
                                                    )
                                                    .map((item, ind) => {
                                                        if (item.children) {
                                                            return buttonWithChildren(item, ind);
                                                        } else {
                                                            return (
                                                                <button
                                                                    key={ind}
                                                                    className="hover:bg-L-secondary-150 hover:text-white flex gap-2 w-full items-center text-menu p-3 rounded-md"
                                                                    onClick={item.onClick}
                                                                >
                                                                    {item.icon}
                                                                    {item.label}
                                                                </button>
                                                            );
                                                        }
                                                    })}
                                            </div>
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
