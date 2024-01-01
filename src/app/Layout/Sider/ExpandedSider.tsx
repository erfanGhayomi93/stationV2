import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { ChevronIcon } from 'src/common/icons';
import { MenuItemType } from '.';
import ToggleSlider from './ToggleSlider';
import clsx from 'clsx';
import styles from './expandedSider.module.scss';
import { useLocation } from 'react-router-dom';

interface IExpandedSiderType {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    menuItems: MenuItemType[];
}

const ExpandedSider: FC<IExpandedSiderType> = ({ isOpen, onClose, menuItems }) => {
    //
    const [openedList, setOpenedList] = useState<string>('');
    const { pathname } = useLocation();

    const findParentKey = (pathname: string) => {
        let parentKey: string = '';
        for (let i = 0; i < menuItems.length; i++) {
            const node = menuItems[i];
            if (node.children) {
                if (node.children.some((item) => pathname === item.id)) {
                    parentKey = node.id;
                }
            }
        }
        return parentKey;
    };

    useEffect(() => {
        setOpenedList(findParentKey(pathname));
    }, [pathname]);

    const renderMenu = (items: MenuItemType[]) => {
        //
        const onMenuItemClick = (menu: MenuItemType) => {
            if (menu.children) {
                openedList === menu.id ? setOpenedList('') : setOpenedList(menu.id);
                return;
            }
            onClose(true);
            menu?.onClick?.();
            setOpenedList('');
        };

        const onSubmenuItemClick = (subMenu: Omit<MenuItemType, 'position' | 'placeOfDisplay'>, parentId: string) => {
            subMenu.onClick?.();
            setOpenedList(parentId);
            onClose(true);
        };

        const isMenuHighlighted = (id: string) => {
            if (id !== '/') {
                return pathname.includes(id);
            } else {
                return pathname === id;
            }
        };

        return (
            <>
                {items.map((item, ind) => (
                    <div
                        key={ind}
                        className={clsx(
                            'overflow-hidden duration-300 ease-in-out flex flex-col',
                            openedList === item.id ? 'bg-L-blue-100 dark:bg-[#111523] max-h-[25rem]' : 'max-h-[2.5rem]',
                        )}
                    >
                        <button
                            className={clsx('flex text-sm gap-4 items-center px-6 py-4', isMenuHighlighted(item.id) ? 'text-L-secondary-50' : '')}
                            onClick={() => onMenuItemClick(item)}
                        >
                            {item.icon}
                            {item.label}
                            {item.children && (
                                <div className="flex flex-1 justify-end">
                                    <ChevronIcon className={`duration-200 ${openedList === item.id ? 'rotate-0' : 'rotate-180'}`} />
                                </div>
                            )}
                        </button>
                        {item.children?.length &&
                            item.children.map((child, ind) => (
                                <div key={ind} className="px-7">
                                    <button
                                        className={clsx(styles.submenu, pathname === child.id && styles['active-submenu'])}
                                        onClick={() => onSubmenuItemClick(child, item.id)}
                                    >
                                        <div
                                            className={clsx(
                                                'text-right text-sm py-2 px-2 rounded-md',
                                                pathname === child.id ? 'bg-L-blue-50 text-L-secondary-50' : '',
                                            )}
                                        >
                                            {child.label}
                                        </div>
                                    </button>
                                </div>
                            ))}
                    </div>
                ))}
            </>
        );
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[1000]" onClose={() => onClose(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
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
                                    <div className="w-[18rem] h-screen overflow-visible bar bg-L-blue-50 dark:bg-D-blue-50 text-white flex flex-col pt-3">
                                        <ToggleSlider type="close" onClose={() => onClose(false)} />
                                        <div className="flex flex-col h-full justify-between">
                                            <div className="bg-L-blue-50 dark:bg-D-blue-50 flex flex-col gap-3">
                                                {renderMenu(
                                                    menuItems.filter(
                                                        (item) =>
                                                            (item.placeOfDisplay === 'opened' || item.placeOfDisplay === 'both') &&
                                                            item.position === 'top',
                                                    ),
                                                )}
                                            </div>

                                            <div className="bg-L-blue-50 dark:bg-D-blue-50 flex flex-col gap-3">
                                                {renderMenu(
                                                    menuItems.filter(
                                                        (item) =>
                                                            (item.placeOfDisplay === 'opened' || item.placeOfDisplay === 'both') &&
                                                            item.position === 'bottom',
                                                    ),
                                                )}
                                                <div className="bg-L-blue-100 dark:bg-[#111523] p-2">{`نسخه ${'1.0.1'}`}</div>
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

export default React.memo(ExpandedSider);
