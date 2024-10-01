import { FC, useRef } from 'react';
import clsx from 'clsx';
import { BackgroundModeIcon, CreditIcon, DarkModeIcon, LayoutIcon, LightModeIcon, LogoutIcon, NotificationIcon, SystemModeIcon, UpArrowIcon } from '../../assets/icons';
import { useTranslation } from 'react-i18next';
import { sepNumbers } from '../../common/methods/helper';
import useClickOutside from '../../common/hooks/useClickOutside';
import AnimatePresence from '../../common/components/animation/AnimatePresence';

interface IMultiLevelDropdownProps {
    isDropdownOpen: boolean;
    isSubDropdownOpen: Record<number, boolean>;
    closeDropDowns: () => void;
    toggleSubDropdown: (ind: number) => void
}

const MultiLevelDropdown: FC<IMultiLevelDropdownProps> = ({ isDropdownOpen, isSubDropdownOpen, closeDropDowns, toggleSubDropdown }) => {


    const dropdownRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation()


    const menuItems = [
        {
            label: "اعتبار",
            value: "10000000000",
            type: "price",
            Icon: CreditIcon
        },
        {
            label: "رنگ زمینه",
            value: "روشن",
            subMenu: [
                { label: "سیستم", icon: SystemModeIcon },
                { label: "روشن", icon: LightModeIcon },
                { label: "تیره", icon: DarkModeIcon },
            ],
            Icon: BackgroundModeIcon
        },
        {
            label: "چیدمان",
            value: "کلاسیک",
            subMenu: [],
            Icon: LayoutIcon
        },
        {
            label: "اعلان",
            value: "2",
            Icon: NotificationIcon,
            subMenu: [],
        },
    ];

    // Close dropdown when clicking outside
    useClickOutside(dropdownRef, () => {
        isDropdownOpen && closeDropDowns()
    }, [])


    return (
        <div ref={dropdownRef} className='relative rtl'>
            <AnimatePresence
                initial={{ animation: 'fadeInDown' }}
                exit={{ animation: 'fadeOutDown' }}
            >
                <div
                    id="multi-dropdown"
                    className={clsx("z-10 rounded-lg shadow w-72 absolute top-10 right-0 bg-back-surface px-4 transition-opacity", {
                        "opacity-100": isDropdownOpen,
                        "opacity-0": !isDropdownOpen,
                    })}
                >
                    <button
                        className="flex items-center justify-between w-full py-4 border-b border-line-div-2 text-sm"
                    >
                        <span className='text-content-title'>سهیل خسروی</span>
                        <span className='text-content-paragraph'>س خ ی 25814</span>
                    </button>

                    <ul className="text-sm border-b border-line-div-2">
                        {menuItems.map((item, index) => (
                            <li key={index} className={item.subMenu ? 'relative' : ''}>
                                <button
                                    onClick={() => toggleSubDropdown(index)}
                                    className="flex items-center justify-between w-full py-4"
                                >
                                    <div className='flex gap-x-2'>
                                        {<item.Icon width={18} height={18} className='text-icon-primary' />}
                                        <span className='text-content-title'>{item.label}</span>
                                    </div>

                                    <div className='flex gap-x-2 items-center'>
                                        <span className='text-content-title'>{item.type === "price" ? sepNumbers(item.value) : item.value}</span>
                                        {item.type === "price" && <span className='text-content-deselecttab'>{t('common.rial')}</span>}
                                        {item.subMenu && <UpArrowIcon className='-rotate-90' />}
                                    </div>
                                </button>

                                {(isSubDropdownOpen[index] && !!item?.subMenu?.length) && (
                                    <div
                                        className="z-10 bg-back-surface rounded-lg shadow w-44 absolute top-0 -left-5 -translate-x-full"
                                    >
                                        <ul className="text-sm">
                                            {item?.subMenu.map((subItem, subIndex) => (
                                                <li key={subIndex} className='p-2 my-2 mx-3 hover:bg-back-primary-container transition-colors cursor-pointer rounded-md'>
                                                    <div className='flex gap-x-2'>
                                                        <subItem.icon width={18} height={18} className='text-icon-primary' />
                                                        <span className='text-content-title'>{subItem.label}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>


                    <button
                        className='flex items-center gap-2 my-4 text-sm'
                    >
                        <LogoutIcon width={20} height={20} className='text-icon-primary' />
                        <span className='text-content-title'>خروج از حساب کاربری</span>
                    </button>

                </div>
            </AnimatePresence>
        </div>
    );
};

export default MultiLevelDropdown;
