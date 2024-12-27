import { ChevronDownIcon, XOutlineIcon } from '@assets/icons';
import Popup from '@components/popup';
import CheckboxButton from '@uiKit/CheckboxButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useRef, useState } from 'react';

type TItem = { id: string; label: string };

interface TMultiSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder'> {
     placeholder?: string;
     onChange?: (item: TItem) => void;
     items: TItem[];
}

const MultiSelectInput = ({ onChange, items, value, placeholder = '', ...props }: TMultiSelectInputProps) => {
     const [values, setValues] = useState<TItem[]>([]);

     const wrapperRef = useRef<HTMLDivElement | null>(null);
     const chipsetsRef = useRef<HTMLUListElement | null>(null);
     const inputRef = useRef<HTMLInputElement | null>(null);

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
          <Popup
               margin={{}}
               renderer={({ setOpen }) => (
                    <ul className="rtl flex w-full flex-col gap-2 rounded-md bg-back-surface px-4 py-3 shadow-E5">
                         {items?.map((item, index) => (
                              <li
                                   className={clsx(
                                        'w-full cursor-pointer items-center justify-start rounded-md p-2 transition-colors hover:bg-back-primary/80',
                                        values.some(value => value.id === item.id) && 'bg-back-primary'
                                   )}
                                   key={index}
                              >
                                   <CheckboxButton
                                        label={item.label}
                                        checked={values.some(value => value.id === item.id)}
                                        onChange={() => handleChange(item)}
                                   />
                              </li>
                         ))}
                    </ul>
               )}
          >
               {({ setOpen, open }) => (
                    <div className="w-full">
                         <div
                              ref={wrapperRef}
                              onClick={() => {
                                   inputRef.current?.focus();
                              }}
                              className="rtl group relative flex h-12 w-full items-center justify-between gap-1 rounded-lg border border-input-default px-2 group-focus-within:border-input-active"
                         >
                              <div className="flex w-full flex-1 items-center" onClick={() => setOpen(!open)}>
                                   <ul ref={chipsetsRef} className="flex items-center gap-1">
                                        {values.map(value => (
                                             <li
                                                  key={value.id}
                                                  className="flex items-center gap-1 text-nowrap rounded-lg bg-progressbar-primary-line px-1 py-1 text-content-title"
                                             >
                                                  <span className="text-xs">{value.label}</span>
                                                  <button
                                                       onClick={e => {
                                                            e.stopPropagation();
                                                            const findIndex = values.findIndex(item => item.id === value.id);
                                                            const newValues = [...values];
                                                            newValues.splice(findIndex, 1);
                                                            setValues(newValues);
                                                       }}
                                                       className="text-icon-disable"
                                                  >
                                                       <XOutlineIcon />
                                                  </button>
                                             </li>
                                        ))}
                                   </ul>

                                   <input
                                        ref={inputRef}
                                        value=""
                                        onChange={() => null}
                                        className="h-12 w-2/12 border-none bg-transparent text-sm text-content-title outline-none"
                                        dir="rtl"
                                        {...props}
                                   />
                                   <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <ChevronDownIcon
                                             className={clsx(
                                                  'text-input-default transition-transform group-focus-within:text-input-active',
                                                  open && 'rotate-180'
                                             )}
                                        />
                                   </div>
                                   <div
                                        className={clsx('absolute text-xs transition-all duration-100', {
                                             '-top-3 bg-back-surface px-1 text-input-active': values.length > 0,
                                             'top-1/2 -translate-y-1/2 bg-transparent text-input-default': values.length === 0,
                                        })}
                                   >
                                        <span className="">{placeholder}</span>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </Popup>
     );
};

export default MultiSelectInput;
