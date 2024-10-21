import { CalculatorIcon, ChevronDownIcon, ChevronUpIcon, LockIcon, XCircleOutlineIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

interface TFieldInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'onChange' | 'placeholder' | 'type'> {
     variant?: 'simple' | 'advanced';
     type?: 'number' | 'text';
     unit?: 'rial' | 'share';
     upTickValue?: number;
     downTickValue?: number;
     onClickUpTick?: () => void;
     onClickDownTick?: () => void;
     onChangeValue: (v: string | number) => void;
     selectIcon?: 'calculator' | 'lock';
     onClickIcon?: () => void;
     placeholder?: string;
     value: string | number;
}

const FieldInput = ({
     variant = 'advanced',
     type = 'number',
     unit = 'rial',
     upTickValue = 0,
     downTickValue = 0,
     onClickUpTick = () => null,
     onClickDownTick = () => null,
     selectIcon = 'calculator',
     onClickIcon = () => null,
     placeholder = '',
     onChangeValue,
     value,
     ...props
}: TFieldInputProps) => {
     const [inputValue, setInputValue] = useState<string | number>(value);

     const inputRef = useRef<HTMLInputElement>(null);


     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;

          const numericValue = newValue.replace(/[^\d]/g, '');

          onChange(type === 'number' ? numericValue : newValue);
     };

     const onChange = (newValue: string | number) => {
          if (String(inputValue).length > 20) return;

          if (type === "number") {
               setInputValue(sepNumbers(newValue))
               onChangeValue(newValue);
          } else {
               setInputValue(newValue)
               onChangeValue(newValue);
          }


     };

     const handleKeyDown = (e: KeyboardEvent) => {
          if (inputRef.current && document.activeElement === inputRef.current && type === 'number') {
               if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setInputValue(prev => String(Number(prev) + 1));
               } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setInputValue(prev => String(Math.max(0, Number(prev) - 1)));
               }
          }
     };

     useEffect(() => {
          if (type === 'number') {
               setInputValue(value === 0 ? '' : sepNumbers(value.toString()));
          } else {
               setInputValue(value.toString());
          }
     }, [value, type]);

     useEffect(() => {
          window.addEventListener('keydown', handleKeyDown);
          return () => {
               window.removeEventListener('keydown', handleKeyDown);
          };
     }, []);

     return (
          <div className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active">
               <div
                    className={clsx('flex items-center', {
                         'w-9/12': variant === 'advanced',
                         'w-full': variant === 'simple',
                    })}
               >
                    <input
                         ref={inputRef}
                         value={inputValue}
                         onChange={handleChange}
                         dir="ltr"
                         className="h-12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder focus:outline-non"
                         {...props}
                    />

                    {
                         variant !== 'advanced' && (
                              <button
                                   onClick={() => setInputValue('')}
                                   className={clsx('flex justify-center text-input-default group-focus-within:text-input-active transition-opacity', {
                                        "opacity-0": !inputValue
                                   })}
                              >
                                   <XCircleOutlineIcon />
                              </button>
                         )
                    }


                    <div
                         className={clsx(
                              'text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active focus:outline-non',
                              {
                                   'absolute -top-3 right-2 bg-back-surface px-1': inputValue,
                                   'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': !inputValue,
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
                    <div className="ml-2 flex w-3/12 items-center justify-between gap-1 px-1 text-input-default group-focus-within:text-input-active">
                         <div className="flex w-10/12 flex-col text-xs font-normal">
                              <div className="flex items-center justify-between">
                                   <button className="cursor-pointer" onClick={() => onChange(String(Number(value) + 1))}>
                                        <ChevronUpIcon onClick={onClickUpTick} />
                                   </button>
                                   <button className="flex-1" onClick={() => onChange(String(upTickValue))}>
                                        {sepNumbers(upTickValue)}
                                   </button>
                              </div>
                              <div
                                   style={{
                                        minHeight: '1px',
                                   }}
                                   className="bg-input-default opacity-50 transition-colors group-focus-within:bg-input-active"
                              />
                              <div className="flex items-center justify-between">
                                   <button className="cursor-pointer" onClick={() => onChange(String(Number(value) - 1))}>
                                        <ChevronDownIcon />
                                   </button>
                                   <button className="flex-1" onClick={() => onChange(String(downTickValue))}>
                                        {sepNumbers(downTickValue)}
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
