import { useQueryGeneralUser } from '@api/trader';
import { useModalStore } from '@store/modal';
import clsx from 'clsx';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from 'store/theme';
import {
     ArrowLeftIcon,
     BackgroundModeIcon,
     CreditIcon,
     DarkModeIcon,
     LayoutIcon,
     LightModeIcon,
     LogoutIcon,
     NotificationIcon,
     SystemModeIcon,
} from '../../assets/icons';
import AnimatePresence from '../../common/components/animation/AnimatePresence';
import useClickOutside from '../../common/hooks/useClickOutside';
import { sepNumbers } from '../../common/methods/helper';

interface IMultiLevelDropdownProps {
     isDropdownOpen: boolean;
     isSubDropdownOpen: Record<number, boolean>;
     closeDropDowns: () => void;
     toggleSubDropdown: (ind: number) => void;
}

const MultiLevelDropdown: FC<IMultiLevelDropdownProps> = ({
     isDropdownOpen,
     isSubDropdownOpen,
     closeDropDowns,
     toggleSubDropdown,
}) => {
     const dropdownRef = useRef<HTMLDivElement>(null);

     const { t } = useTranslation();

     const { setConfirmLogoutModal } = useModalStore();

     const { theme, setTheme } = useThemeStore();

     const { data: dataUser } = useQueryGeneralUser();

     const { userName, credit, traderISIN } = dataUser || {};

     const menuItems = [
          {
               label: 'اعتبار',
               value: credit,
               type: 'price',
               Icon: CreditIcon,
          },
          {
               label: 'رنگ زمینه',
               value: t(`theme.${theme}`),
               subMenu: [
                    {
                         label: 'system',
                         icon: SystemModeIcon,
                         onClick: () => {
                              setTheme('system');
                         },
                    },
                    {
                         label: 'light',
                         icon: LightModeIcon,
                         onClick: () => {
                              setTheme('light');
                         },
                    },
                    {
                         label: 'dark',
                         icon: DarkModeIcon,

                         onClick: () => {
                              setTheme('dark');
                         },
                    },
               ],
               Icon: BackgroundModeIcon,
          },
          {
               label: 'چیدمان',
               value: 'کلاسیک',
               subMenu: [],
               Icon: LayoutIcon,
               disabled: true,
          },
          {
               label: 'اعلان',
               value: '2',
               Icon: NotificationIcon,
               subMenu: [],
               disabled: true,
          },
     ];

     useClickOutside([dropdownRef], () => {
          isDropdownOpen && closeDropDowns();
     });

     return (
          <div ref={dropdownRef} className="rtl relative">
               <AnimatePresence initial={{ animation: 'fadeInDown' }} exit={{ animation: 'fadeOutDown' }}>
                    <div
                         id="multi-dropdown"
                         className={clsx(
                              'absolute right-0 top-4 z-10 w-72 rounded-lg bg-back-surface shadow-E6 transition-opacity',
                              {
                                   'opacity-100': isDropdownOpen,
                                   'opacity-0': !isDropdownOpen,
                              }
                         )}
                    >
                         <button className="flex w-full items-center justify-between border-b border-line-div-2 p-4 text-sm">
                              <span className="text-content-title">{userName}</span>
                              <span className="text-content-paragraph">{traderISIN}</span>
                         </button>

                         <ul className="border-b border-line-div-2 px-4 py-1 text-sm">
                              {menuItems.map((item, index) => (
                                   <li
                                        key={index}
                                        className={clsx(
                                             'rounded-md px-2 transition-colors hover:bg-back-primary/80',
                                             item?.disabled && 'text-button-disable-disable opacity-55',
                                             item?.disabled,
                                             item.subMenu && 'relative'
                                        )}
                                   >
                                        <button
                                             onClick={() => toggleSubDropdown(index)}
                                             className="flex w-full items-center justify-between py-4 disabled:text-button-disable-disable"
                                             disabled={item?.disabled}
                                        >
                                             <div className="flex gap-x-2">
                                                  {<item.Icon width={18} height={18} className="text-icon-primary" />}
                                                  <span className="text-content-title">{item.label}</span>
                                             </div>

                                             <div className="flex items-center gap-x-2">
                                                  <span className="text-content-title">
                                                       {item.type === 'price' ? sepNumbers(item.value) : item.value}
                                                  </span>
                                                  {item.type === 'price' && (
                                                       <span className="text-content-deselecttab">{t('common.rial')}</span>
                                                  )}
                                                  {item.subMenu && (
                                                       <div>
                                                            <ArrowLeftIcon className="text-icon-primary" />
                                                       </div>
                                                  )}
                                             </div>
                                        </button>

                                        {isSubDropdownOpen[index] && !!item?.subMenu?.length && (
                                             <div className="absolute -left-5 top-0 z-10 w-44 -translate-x-full rounded-lg bg-back-surface shadow">
                                                  <ul className="text-sm">
                                                       {item?.subMenu.map((subItem, subIndex) => (
                                                            <li
                                                                 key={subIndex}
                                                                 className={clsx(
                                                                      'mx-3 my-2 cursor-pointer rounded-md p-2 transition-colors hover:bg-back-primary/80',
                                                                      subItem.label === theme && 'bg-back-primary'
                                                                 )}
                                                            >
                                                                 <div
                                                                      onClick={() => {
                                                                           subItem.onClick?.();
                                                                      }}
                                                                      className="flex gap-x-2"
                                                                 >
                                                                      <subItem.icon
                                                                           width={18}
                                                                           height={18}
                                                                           className="text-icon-primary"
                                                                      />
                                                                      <span className="text-content-title">
                                                                           {t(
                                                                                `theme.${subItem.label as 'light' | 'dark' | 'system'}`
                                                                           )}
                                                                      </span>
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
                              onClick={() => setConfirmLogoutModal(true)}
                              className="flex w-full items-center gap-2 p-4 text-sm hover:bg-back-primary/80"
                         >
                              <LogoutIcon width={20} height={20} className="text-icon-primary" />
                              <span className="text-content-title">خروج از حساب کاربری</span>
                         </button>
                    </div>
               </AnimatePresence>
          </div>
     );
};

export default MultiLevelDropdown;
