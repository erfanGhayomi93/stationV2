import { CalculatorIcon, ChevronDownIcon, ChevronUpIcon, LockIcon, XCircleOutlineIcon } from '@assets/icons';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { ChangeEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

interface TFieldInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'state' | 'className' | 'onChange' | 'placeholder' | 'type'> {
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
     value: string;
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
     value,
     ...props
}: TFieldInputProps) => {
     const [state, setState] = useState(value);
     const inputRef = useRef<HTMLInputElement>(null);

     const removeNonNumeric = (str: string) => {
          return str.replace(/[^0-9]/g, '');
     };

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value;
          // if (type === 'amount') {
          onChange(rawValue);
          // }
          //  else {
          //      setState(rawValue);
          // }
     };

     const onChange = (state: string) => {
          if (state.length > 20) return;
          setState(state);
          onChangeValue(state);
     };

     const handleKeyDown = (e: KeyboardEvent) => {
          if (inputRef.current && document.activeElement === inputRef.current && type === 'amount') {
               if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setState(prev => String(Number(prev) + 1));
               } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setState(prev => String(Math.max(0, Number(prev) - 1)));
               }
          }
     };

     const valueHandle = () => {
          if (type === 'amount') {
               if (Number(removeNonNumeric(state)) > 0) {
                    return sepNumbers(state || '');
               }
               return state;
          }
          return state;
     };

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
                         value={valueHandle()}
                         onChange={handleChange}
                         dir="ltr"
                         className="h-12 w-10/12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         {...props}
                    />

                    <button
                         onClick={() => setState('')}
                         className={clsx(
                              'flex w-2/12 justify-center text-input-default group-focus-within:text-input-active',
                              variant === 'simple' && 'flex justify-end'
                         )}
                    >
                         <XCircleOutlineIcon />
                    </button>

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
                                   <button className="cursor-pointer" onClick={() => onChange(value + 1)}>
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
                                   <button className="cursor-pointer" onClick={() => onChange(String(+value - 1))}>
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
