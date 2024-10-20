import { ChevronDownIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import useClickOutside from '@hooks/useClickOutside';
import RadioButton from '@uiKit/RadioButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

interface TSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder' | 'value'> {
     placeholder?: string;
     onChange: (item: string) => void;
     items?: { value: string; label: string }[];
     value: string
}

const SelectInput = ({ onChange, items, value, placeholder = '', ...props }: TSelectInputProps) => {
     const selectInputRef = useRef<HTMLDivElement | null>(null);

     const [state, setState] = useState(value);

     const [open, setOpen] = useState(false);

     useClickOutside([selectInputRef], () => {
          setOpen(false);
     });

     useEffect(() => {
          setState(value)
     }, [value])


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
                    value={state}
                    onChange={() => null}
                    className="h-12 w-full border-none bg-transparent text-sm text-content-title outline-none"
                    {...props}
               />

               <div
                    className={clsx(
                         'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                         {
                              'absolute -top-3 right-2 bg-back-surface px-1': state,
                              'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': !state,
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
                                             checked={item.value === state}
                                             label={item.label}
                                             onChange={() => {
                                                  setState(item.value);
                                                  setOpen(false);
                                                  onChange(item.value);
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