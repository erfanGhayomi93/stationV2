import { ChevronDownIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import useClickOutside from '@hooks/useClickOutside';
import CheckboxButton from '@uiKit/CheckboxButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useRef, useState } from 'react';

type TItem = { id: string; label: string };

interface TMultiSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder'> {
     placeholder?: string;
     onChange?: (item: TItem) => void;
     items?: TItem[];
}

const MultiSelectInput = ({ onChange, items, placeholder = '', ...props }: TMultiSelectInputProps) => {
     const selectInputRef = useRef<HTMLDivElement | null>(null);

     const [values, setValues] = useState<TItem[]>([]);

     const [open, setOpen] = useState(false);

     useClickOutside([selectInputRef], () => {
          setOpen(false);
     });

     const handleChange = (item: TItem) => {
          const findIndex = values.findIndex(value => value.id === item.id);

          if (findIndex !== -1) {
               const newValues = [...values];
               newValues.splice(findIndex, 1);
               setValues(newValues);
          } else {
               setValues(prev => [...prev, item]);
          }
     };

     return (
          <div
               ref={selectInputRef}
               style={{ width: 300 }}
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
                    value={values.map(item => item.label).join(', ')}
                    className="h-12 w-full border-none bg-transparent text-sm text-content-title outline-none"
                    {...props}
               />

               <div
                    className={clsx(
                         'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                         {
                              'absolute -top-3 right-2 bg-back-surface px-1': values.length > 0,
                              'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': values.length === 0,
                         }
                    )}
               >
                    <span className="">{placeholder}</span>
               </div>

               {open && (
                    <AnimatePresence initial={{ animation: 'fadeInDown' }} exit={{ animation: 'fadeOutDown' }}>
                         <ul className="rtl absolute right-0 top-14 flex w-full flex-col gap-1 rounded-lg bg-back-surface py-2">
                              {items?.map(item => (
                                   <li className="w-full cursor-pointer items-center justify-end px-2">
                                        <CheckboxButton
                                             label={item.label}
                                             checked={values.some(value => value.id === item.id)}
                                             onChange={() => handleChange(item)}
                                        />
                                   </li>
                              ))}
                         </ul>
                    </AnimatePresence>
               )}
          </div>
     );
};

export default MultiSelectInput;
