import { CalculatorIcon, ChevronDownIcon, ChevronUpIcon, LockIcon, XCircleOutlineIcon } from '@assets/icons';
import clsx from 'clsx';
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

interface TFieldInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'className' | 'onChange' | 'placeholder' | 'type'> {
     variant?: 'simple' | 'advanced';
     type?: 'amount' | 'text';
     unit?: 'rial' | 'share';
     upTickValue?: number;
     downTickValue?: number;
     onClickUpTick?: () => void;
     onClickDownTick?: () => void;
     onChangeValue: (v: string) => void;
     selectIcon?: 'calculator' | 'lock';
     onClickIcon?: () => void;
     placeholder?: string;
}

const FieldInput = ({
     variant = 'advanced',
     type = 'amount',
     unit = 'rial',
     upTickValue = 0,
     downTickValue = 0,
     onClickUpTick = () => null,
     onClickDownTick = () => null,
     selectIcon = 'calculator',
     onClickIcon = () => null,
     placeholder = '',
     onChangeValue,
     ...props
}: TFieldInputProps) => {
     const [value, setValue] = useState('');
     const inputRef = useRef<HTMLInputElement>(null);

     const formatNumber = (num: string) => {
          return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     };

     const removeNonNumeric = (str: string) => {
          return str.replace(/[^0-9]/g, '');
     };

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value;
          if (type === 'amount') {
               const numericValue = removeNonNumeric(rawValue);

               onChange(numericValue);
          } else {
               setValue(rawValue);
          }
     };

     const onChange = (value: string) => {
          if (value.length > 20) return;
          setValue(value);
          onChangeValue(formatNumber(value));
     };

     const handleKeyDown = (e: KeyboardEvent) => {
          if (inputRef.current && document.activeElement === inputRef.current && type === 'amount') {
               if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setValue(prev => String(Number(prev) + 1));
               } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setValue(prev => String(Math.max(0, Number(prev) - 1)));
               }
          }
     };

     useEffect(() => {
          window.addEventListener('keydown', handleKeyDown);
          return () => {
               window.removeEventListener('keydown', handleKeyDown);
          };
     }, []);

     return (
          <div
               style={{ width: 300 }}
               className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active"
          >
               <div
                    className={clsx('flex items-center', {
                         'w-7/12': variant === 'advanced',
                         'w-full': variant === 'simple',
                    })}
               >
                    <input
                         ref={inputRef}
                         value={value}
                         onChange={handleChange}
                         dir="ltr"
                         className="h-12 w-10/12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         {...props}
                    />
                    {value && (
                         <div
                              onClick={() => setValue('')}
                              className={clsx(
                                   'w-2/12 text-input-default group-focus-within:text-input-active',
                                   variant === 'simple' && 'flex justify-end'
                              )}
                         >
                              <XCircleOutlineIcon />
                         </div>
                    )}

                    <div
                         className={clsx(
                              'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                              {
                                   'absolute -top-3 right-2 bg-back-surface px-1': value,
                                   'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': !value,
                              }
                         )}
                    >
                         <span className="">{placeholder}</span>
                    </div>
               </div>

               {variant === 'advanced' && (
                    <div
                         style={{
                              minWidth: '1px',
                              minHeight: '16px',
                         }}
                         className="bg-input-default opacity-50 transition-colors group-focus-within:bg-input-active"
                    />
               )}

               {variant === 'advanced' && (
                    <div className="flex w-5/12 items-center justify-between gap-1 px-1 text-input-default group-focus-within:text-input-active">
                         <div className="flex w-10/12 flex-col text-xs font-normal">
                              <div className="flex items-center justify-between">
                                   <div className="cursor-pointer" onClick={() => setValue(prev => String(Number(prev) + 1))}>
                                        <ChevronUpIcon onClick={onClickUpTick} />
                                   </div>
                                   <button className="flex-1" onClick={() => setValue(String(upTickValue))}>
                                        {upTickValue}
                                   </button>
                              </div>
                              <div
                                   style={{
                                        minHeight: '1px',
                                   }}
                                   className="bg-input-default opacity-50 transition-colors group-focus-within:bg-input-active"
                              />
                              <div className="flex items-center justify-between">
                                   <div
                                        className="cursor-pointer"
                                        onClick={() => setValue(prev => String(Math.max(0, Number(prev) - 1)))}
                                   >
                                        <ChevronDownIcon />
                                   </div>
                                   <button className="flex-1" onClick={() => setValue(String(downTickValue))}>
                                        {downTickValue}
                                   </button>
                              </div>
                         </div>
                         <div className="w-2/12">
                              {selectIcon === 'lock' ? (
                                   <LockIcon onClick={onClickIcon} />
                              ) : (
                                   <CalculatorIcon onClick={onClickIcon} />
                              )}
                         </div>
                    </div>
               )}
          </div>
     );
};

export default FieldInput;
