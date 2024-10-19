import { ChevronDownIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import useClickOutside from '@hooks/useClickOutside';
import RadioButton from '@uiKit/RadioButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useRef, useState } from 'react';

interface TSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder'> {
     placeholder?: string;
     onChange: (item: { id: string; label: string }) => void;
     items?: { id: string; label: string }[];
}

const SelectInput = ({ onChange, items, placeholder = '', ...props }: TSelectInputProps) => {
     const selectInputRef = useRef<HTMLDivElement | null>(null);

     const [value, setValue] = useState({ id: '', label: '' });

     const [open, setOpen] = useState(false);

     useClickOutside([selectInputRef], () => {
          setOpen(false);
     });

     return (
          <div
               ref={selectInputRef}
               className="group relative flex h-12 w-full items-center justify-between gap-1 rounded-lg border border-input-default px-2 group-focus-within:border-input-active"
          >
               <div>
                    <ChevronDownIcon
                         className={clsx(
                              'text-input-default transition-transform group-focus-within:text-input-active',
                              open && 'rotate-180'
                         )}
                    />
               </div>
               <input
                    onFocus={() => setOpen(true)}
                    dir="rtl"
                    value={value.label}
                    className="h-12 w-full border-none bg-transparent text-sm text-content-title outline-none"
                    {...props}
               />

               <div
                    className={clsx(
                         'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                         {
                              'absolute -top-3 right-2 bg-back-surface px-1': value.id,
                              'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': !value.id,
                         }
                    )}
               >
                    <span className="">{placeholder}</span>
               </div>

               {open && (
                    <AnimatePresence initial={{ animation: 'fadeInDown' }} exit={{ animation: 'fadeOutDown' }}>
                         <ul className="rtl absolute right-0 top-14 flex w-full flex-col gap-1 rounded-lg bg-back-surface py-2">
                              {items?.map((item, ind) => (
                                   <li
                                        className="w-full cursor-pointer items-center justify-end px-2"
                                        key={ind}
                                   >
                                        <RadioButton
                                             checked={item.id === value.id}
                                             label={item.label}
                                             onChange={() => {
                                                  setValue(item);
                                                  setOpen(false);
                                                  onChange(item);
                                             }}
                                        />
                                   </li>
                              ))}
                         </ul>
                    </AnimatePresence>
               )}
          </div>
     );
};

export default SelectInput;
