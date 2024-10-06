import { ReactElement, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import useClickOutside from '@hooks/useClickOutside';
import AnimatePresence from '@components/animation/AnimatePresence';

interface DropdownProps<T> {
     data: T[];
     isDropdownOpen: boolean;
     closeDropDowns: () => void;
     getLabel: (option: T) => string | ReactElement;
     classes?: Partial<Record<'root' | 'position' | 'options', ClassesValue | undefined>>;
     animate: string;
}

const Dropdown = <T,>(
     { data, getLabel, isDropdownOpen, closeDropDowns, classes, animate }: DropdownProps<T>,
     ref: React.Ref<HTMLDivElement>
) => {
     const dropdownRef = useRef<HTMLDivElement>(null);
     const combinedRef = (ref as React.MutableRefObject<HTMLDivElement | null>) || dropdownRef;

     // Close dropdown when clicking outside
     useClickOutside(combinedRef, () => {
          closeDropDowns();
     }, []);

     return (
          <div ref={dropdownRef} className={clsx('relative z-50', classes?.root, { 'opacity-0': !data.length })}>
               <AnimatePresence
                    initial={{ animation: animate }}
                    exit={{ animation: animate }}
                    // onRefLoad={onPortalLoad}
               >
                    <div
                         className={clsx('rtl absolute z-10 w-64 rounded-lg bg-back-surface p-4 shadow transition-opacity', {
                              'opacity-100': isDropdownOpen,
                              'opacity-0': !isDropdownOpen,
                              'left-0 top-10': !classes?.position,
                              [classes?.position as string]: !!classes?.position,
                         })}
                    >
                         <ul className="flex max-h-96 min-h-6 flex-col overflow-auto text-sm">
                              {data.map((item, index) => (
                                   <li
                                        key={index}
                                        className={clsx({
                                             'w-full rounded-lg border-b border-line-div-3 px-2 py-3 last:border-b-0 hover:bg-back-primary-container':
                                                  !classes?.options,
                                             [classes?.options as string]: !!classes?.options,
                                        })}
                                   >
                                        {getLabel(item)}
                                   </li>
                              ))}
                         </ul>
                    </div>
               </AnimatePresence>
          </div>
     );
};

export default forwardRef(Dropdown) as <T>(props: DropdownProps<T> & { ref?: React.Ref<HTMLDivElement> }) => ReactElement;
