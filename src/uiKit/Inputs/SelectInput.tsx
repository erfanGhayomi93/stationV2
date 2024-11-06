import { ChevronDownIcon } from '@assets/icons';
import Popup from '@components/popup';
import RadioButton from '@uiKit/RadioButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';

type TItem = { id: string; label: string; onClick?: () => void };

interface TSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'placeholder' | 'value'> {
     placeholder?: string;
     onChange: (item: TItem) => void;
     items?: TItem[];
     value: TItem;
}

const SelectInput = ({ onChange, items, value, placeholder = '', ...props }: TSelectInputProps) => {
     const [state, setState] = useState<{ id: string; label: string }>(value);

     return (
          <Popup
               margin={{}}
               renderer={({ setOpen }) => (
                    <ul className="rtl flex w-full flex-col gap-2 rounded-md bg-back-surface px-1 py-3 text-sm shadow-E5">
                         {items?.map((item, index) => (
                              <li
                                   className={clsx(
                                        'w-full cursor-pointer items-center justify-start rounded-md text-content-paragraph transition-colors hover:bg-back-primary',
                                        item.id === state.id && 'bg-back-primary'
                                   )}
                                   key={index}
                              >
                                   <RadioButton
                                        checked={item.id === state.id}
                                        label={item.label}
                                        onChange={() => {
                                             setState(item);
                                             onChange(item);
                                             setOpen(false);
                                             item.onClick?.();
                                        }}
                                   />
                              </li>
                         ))}
                    </ul>
               )}
               className="dropdown-portal"
          >
               {({ setOpen, open }) => (
                    <div className="group relative flex h-12 w-full items-center justify-between gap-1 rounded-lg border border-input-default px-2 group-focus-within:border-input-active">
                         <div className="w-full flex-1" onClick={() => setOpen(!open)}>
                              <input
                                   //    defaultValue={value.label}
                                   value={state.label}
                                   onChange={() => null}
                                   className="h-12 w-full border-none bg-transparent text-sm text-content-title outline-none"
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
                                        '-top-3 right-2 bg-back-surface px-1 text-input-active': value,
                                        'right-2 top-1/2 -translate-y-1/2 bg-transparent text-input-default': !value,
                                   })}
                              >
                                   <span className="">{placeholder}</span>
                              </div>
                         </div>
                    </div>
               )}
          </Popup>
     );
};

export default SelectInput;
