import { ProfileIcon, UpArrowIcon } from '@assets/icons';
import MultiLevelDropdown from '@uiKit/MultiLevelDropdown';
import clsx from 'clsx';
import { useState } from 'react';

const ProfileDropdown = () => {
     const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

     const [isSubDropdownOpen, setIsSubDropdownOpen] = useState<Record<number, boolean>>({});

     const closeDropDowns = () => {
          setIsSubDropdownOpen({});

          const timer = setTimeout(() => {
               setIsDropdownOpen(false);
               clearTimeout(timer);
          }, 200);
     };

     const toggleSubDropdown = (ind: number) => {
          setIsSubDropdownOpen(prev => ({
               [ind]: !prev[ind],
          }));
     };

     return (
          <div>
               <button onClick={() => setIsDropdownOpen(true)} className="flex items-center gap-2">
                    <ProfileIcon className="text-icon-primary" />
                    <UpArrowIcon
                         className={clsx('text-icon-default transition-transform', {
                              'rotate-180': !isDropdownOpen,
                         })}
                    />
               </button>

               {isDropdownOpen && (
                    <MultiLevelDropdown
                         isDropdownOpen={isDropdownOpen}
                         isSubDropdownOpen={isSubDropdownOpen}
                         closeDropDowns={closeDropDowns}
                         toggleSubDropdown={toggleSubDropdown}
                    />
               )}
          </div>
     );
};

export default ProfileDropdown;
