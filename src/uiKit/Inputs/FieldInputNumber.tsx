import { ChangeEvent, InputHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { CalculatorIcon, ChevronDownIcon, ChevronUpIcon, LockCloseIcon, LockIcon, MoreInformationIcon } from '@assets/icons';
import { sepNumbers } from '@methods/helper';
import AnimatePresence from '@components/animation/AnimatePresence';
import Tippy from '@tippyjs/react';

interface TFieldInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'placeholder' | 'onChange' | 'type'> {
     onChangeValue: (v: number) => void;
     value: number;
     upTickValue?: number;
     downTickValue?: number;
     selectIcon?: 'calculator-0' | 'calculator-1' | 'lock-0' | 'lock-1';
     onClickIcon?: () => void;
     variant?: 'simple' | 'advanced';
     placeholder?: string;
     isError?: boolean;
     isInfo?: boolean;
     textError?: string;
     direction?: 'left' | 'right';
     secondaryPrice?: number;
     bgPlaceholder?: string
}

const FieldInputNumber = ({
     onChangeValue,
     value,
     upTickValue = 0,
     downTickValue = 0,
     selectIcon,
     onClickIcon = () => null,
     placeholder = '',
     variant = 'advanced',
     isError,
     isInfo,
     textError,
     direction = 'right',
     secondaryPrice,
     bgPlaceholder,
     ...props
}: TFieldInputProps) => {
     const [inputValue, setInputValue] = useState<string>(value.toString());
     const inputRef = useRef<HTMLInputElement>(null);
     const [isBlurred, setIsBlurred] = useState(false);

     const isErrorInput = useMemo(() => isError && isBlurred, [isError, isBlurred])

     const handleNumericValue = (value: string) => value.replace(/[^\d]/g, '');

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const sanitizedValue = handleNumericValue(e.target.value);
          // setInputValue(sanitizedValue);
          onChangeValue(Number(sanitizedValue) || 0);
     };

     useEffect(() => {
          setInputValue(value.toString());
     }, [value]);

     const handleKeyDown = (e: KeyboardEvent) => {
          if (inputRef.current && document.activeElement === inputRef.current) {
               if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    onChangeValue(value + 1);
               } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    onChangeValue(Math.max(0, value - 1));
               }
          }
     };

     useEffect(() => {
          window.addEventListener('keydown', handleKeyDown);
          return () => {
               window.removeEventListener('keydown', handleKeyDown);
          };
     }, [value]);


     return (
          <div className={clsx('rtl mb-3 group relative flex h-10 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active', {
               "border-input-error focus-within:border-input-error ": isErrorInput,
               "border-input-focus focus-within:border-input-focus bg-button-info-bg-selected": isInfo,

          })}>
               {(!!secondaryPrice && !!value) && <div className="ml-2 text-xs text-content-selected">{`(${sepNumbers(secondaryPrice)})`}</div>}

               <div
                    className={clsx('flex items-center', {
                         'w-8/12': variant === 'advanced',
                         'w-full': variant === 'simple',
                    })}
               >
                    {isInfo && <Tippy content={'تقسیم سفارش'} allowHTML>
                         <MoreInformationIcon width={16} height={16} className="text-button-info-default ml-1" />
                    </Tippy>}

                    <input
                         ref={inputRef}
                         value={+inputValue ? sepNumbers(inputValue) : ''}
                         onChange={handleChange}
                         dir="ltr"
                         className={clsx('focus:outline-none text-content-title h-12 w-full flex-1 border-none bg-transparent text-sm placeholder:text-xs placeholder:text-content-placeholder', {
                              'text-right': direction !== 'left',
                              'text-left': direction === 'left',
                         })}
                         onBlur={() => setIsBlurred(true)}
                         onFocus={() => setIsBlurred(false)}
                         {...props}
                    />

                    <div
                         className={clsx(
                              'focus:outline-non text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active px-1',
                              {
                                   'absolute -top-3 right-2 px-1 bg-back-surface': +inputValue,
                                   [bgPlaceholder as string]: bgPlaceholder && +inputValue,
                                   'absolute right-1 top-1/2 -translate-y-1/2 bg-transparent px-1': !+inputValue,
                                   "text-input-error group-focus-within:text-input-error": isErrorInput,
                                   "text-input-focus group-focus-within:text-input-focus": isInfo,
                              }
                         )}
                    >
                         <span className="">{placeholder}</span>
                    </div>

               </div>

               {variant === 'advanced' && (
                    <div className="ml-2 flex w-4/12 items-center justify-between gap-1 px-1 text-input-default">
                         <div className={clsx("flex flex-col text-xs font-normal group-focus-within:text-input-active" , {
                              'w-10/12' : !!selectIcon ,
                              'w-full' : !selectIcon ,
                         })}>
                              <div className="flex items-center justify-between">
                                   <button className="cursor-pointer" onClick={() => onChangeValue(value + 1)}>
                                        <ChevronUpIcon />
                                   </button>
                                   <button className="flex-1" onClick={() => onChangeValue(upTickValue)}>
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
                                   <button className="cursor-pointer" onClick={() => onChangeValue(Math.max(0, value - 1))}>
                                        <ChevronDownIcon />
                                   </button>
                                   <button className="flex-1" onClick={() => onChangeValue(downTickValue)}>
                                        {sepNumbers(downTickValue)}
                                   </button>
                              </div>
                         </div>

                         <div className={clsx({
                              "w-2/12": !!selectIcon,
                              "hidden": !selectIcon,
                         })}>
                              {selectIcon === 'lock-0' && <LockIcon className="text-icon-disable transition-colors" onClick={onClickIcon} />}
                              {selectIcon === 'lock-1' && <LockCloseIcon className="text-icon-primary transition-colors" onClick={onClickIcon} />}
                              {(selectIcon?.includes('calculator')) &&
                                   (
                                        <CalculatorIcon className={clsx("transition-colors", {
                                             "text-icon-disable": selectIcon === 'calculator-0',
                                             "text-icon-primary": selectIcon === 'calculator-1'
                                        })} onClick={onClickIcon} />
                                   )
                              }
                         </div>
                    </div>
               )}


               <AnimatePresence
                    initial={{ animation: 'fadeIn' }}
                    exit={{ animation: 'fadeOutDown' }}
               >
                    <div className={clsx("transition-all absolute -bottom-6 right-1", {
                         "opacity-0 invisible hidden": !isErrorInput,
                         "opacity-100 visible": isErrorInput,
                    })}>
                         <span className='text-xs text-input-error whitespace-nowrap'>{textError}</span>
                    </div>
               </AnimatePresence>
          </div>
     );
};

export default FieldInputNumber;
