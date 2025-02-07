import { ChevronDownIcon } from '@assets/icons';
import Popup from '@components/popup';
import RadioButton from '@uiKit/RadioButton';
import clsx from 'clsx';
import { InputHTMLAttributes, useEffect, useState } from 'react';

type TItem<T> = { id: T; label: string; onClick?: () => void };

interface TSelectInputProps<T> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'placeholder' | 'value'> {
     placeholder?: string;
     onChange: (item: TItem<T>) => void;
     items?: TItem<T>[];
     value: TItem<T> | null;
     bgPlaceholder?: string;
}

const SelectInput = <T,>({ onChange, items, value, placeholder = '', bgPlaceholder, ...props }: TSelectInputProps<T>) => {
     const [selectItem, setSelectItem] = useState<{ id: T; label: string } | null>(value);

     useEffect(() => {
          setSelectItem(value);
     }, [value]);

     return (
          <Popup
               renderer={({ setOpen }) => (
                    <ul className="rtl flex w-full flex-col gap-2 rounded-md bg-back-surface px-1 py-3 text-sm shadow-E5">
                         {items?.map((item, index) => (
                              <li
                                   className={clsx(
                                        'w-full cursor-pointer items-center justify-start rounded-md text-content-paragraph transition-colors hover:bg-back-primary',
                                        item.id === selectItem?.id && 'bg-back-primary'
                                   )}
                                   key={index}
                              >
                                   <RadioButton
                                        checked={item.id === selectItem?.id}
                                        label={item.label}
                                        onChange={() => {
                                             setSelectItem(item);
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
                    <div className="group relative flex h-10 w-full items-center justify-between gap-1 rounded-lg border border-input-default px-2 focus-within:border-input-active">
                         <div className="w-full flex-1 cursor-pointer" onClick={() => setOpen(!open)}>
                              <input
                                   //    defaultValue={value.label}
                                   value={selectItem?.label}
                                   onChange={() => null}
                                   className="h-12 w-full cursor-pointer border-none bg-transparent text-sm text-content-title outline-none"
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
                                        '-top-3 right-2 bg-back-surface px-1 text-input-active': selectItem,
                                        [bgPlaceholder as string]: bgPlaceholder && selectItem,
                                        'right-2 top-1/2 -translate-y-1/2 bg-transparent text-input-default': !selectItem,
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
