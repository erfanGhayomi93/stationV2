import { ChevronDownIcon } from '@assets/icons';
import Popup from '@components/popup';
import RadioButton from '@uiKit/RadioButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useEffect, useState } from 'react';

interface TSelectInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder' | 'value'> {
     placeholder?: string;
     onChange: (item: string) => void;
     items?: { id: string; label: string }[];
     value: { id: string; label: string };
}

const SelectInput = ({ onChange, items, value, placeholder = '', ...props }: TSelectInputProps) => {
     const [state, setState] = useState<{ id: string; label: string }>(value);

     useEffect(() => {
          setState(value);
     }, [value]);

     return (
          <div className="group relative flex h-12 w-full items-center justify-between gap-1 rounded-lg border border-input-default px-2 group-focus-within:border-input-active">
               <Popup
                    margin={{
                         y: 70,
                    }}
                    renderer={({ setOpen }) => (
                         <ul className="rtl flex w-full flex-col gap-2 rounded-md bg-back-surface px-4 py-3 shadow-E5">
                              {items?.map((item, index) => (
                                   <li
                                        className={clsx(
                                             'w-full cursor-pointer items-center justify-start rounded-md px-2 transition-colors hover:bg-back-primary/80',
                                             item.id === state.id && 'bg-back-primary'
                                        )}
                                        key={index}
                                   >
                                        <RadioButton
                                             checked={item.id === state.id}
                                             label={item.label}
                                             onChange={() => {
                                                  setState(item);
                                                  onChange(item.id);
                                                  setOpen(false);
                                             }}
                                        />
                                   </li>
                              ))}
                         </ul>
                    )}
               >
                    {({ setOpen, open }) => (
                         <div className="w-full flex-1" onClick={() => setOpen(!open)}>
                              <input
                                   value={state.label}
                                   onChange={() => null}
                                   className="h-12 w-full border-none bg-transparent text-sm text-content-title outline-none"
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
                                   className={clsx(
                                        'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                                        {
                                             'absolute -top-3 right-2 bg-back-surface px-1': state,
                                             'absolute right-8 top-1/2 -translate-y-1/2 bg-transparent px-1': !state,
                                        }
                                   )}
                              >
                                   <span className="">{placeholder}</span>
                              </div>
                         </div>
                    )}
               </Popup>
          </div>
     );
};

export default SelectInput;
