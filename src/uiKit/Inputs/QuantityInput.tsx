import { CalculatorIcon, ChevronDownIcon, ChevronUpIcon, LockIcon, XCircleOutlineIcon } from '@assets/icons';
import { ChangeEvent, InputHTMLAttributes, useState } from 'react';

interface TQuantityInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'className' | 'onChange' | 'placeholder'> {
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

const QuantityInput = ({
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
}: TQuantityInputProps) => {
     const [value, setValue] = useState('');

     const formatNumber = (num: string) => {
          return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     };

     const removeNonNumeric = (str: string) => {
          return str.replace(/[^0-9]/g, '');
     };

     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value;
          const numericValue = removeNonNumeric(rawValue); // Remove non-numeric characters

          // Update the state to the formatted number
          onChange(formatNumber(numericValue));
     };

     const onChange = (value: string) => {
          if (value.length > 20) return;
          setValue(value);
     };
     return (
          <div
               style={{ width: 300 }}
               className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active"
          >
               <div className="flex w-7/12 items-center">
                    <input
                         value={value}
                         onChange={handleChange}
                         dir="ltr"
                         className="h-12 w-10/12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         inputMode="numeric"
                         {...props}
                    />
                    <div onClick={() => setValue('')} className="w-2/12 text-input-default group-focus-within:text-input-active">
                         <XCircleOutlineIcon />
                    </div>

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-xs text-input-default transition-all duration-100 group-focus-within:-top-1 group-focus-within:bg-back-surface group-focus-within:px-1 group-focus-within:text-input-active">
                         <span className="">{placeholder}</span>
                    </div>
               </div>

               <div
                    style={{
                         minWidth: '1px',
                         minHeight: '16px',
                    }}
                    className="bg-input-default opacity-50 transition-colors group-focus-within:bg-input-active"
               />

               <div className="flex w-5/12 items-center justify-between gap-1 px-1 text-input-default group-focus-within:text-input-active">
                    <div className="flex w-10/12 flex-col text-xs font-normal">
                         <div className="flex items-center justify-between">
                              <div>
                                   <ChevronUpIcon onClick={onClickUpTick} />
                              </div>
                              <span>{upTickValue}</span>
                         </div>
                         <div
                              style={{
                                   minHeight: '1px',
                              }}
                              className="bg-input-default opacity-50 transition-colors group-focus-within:bg-input-active"
                         />
                         <div className="flex items-center justify-between">
                              <div onClick={onClickDownTick}>
                                   <ChevronDownIcon />
                              </div>
                              <span>{downTickValue}</span>
                         </div>
                    </div>
                    <div className="w-2/12">
                         {selectIcon === 'lock' ? <LockIcon onClick={onClickIcon} /> : <CalculatorIcon onClick={onClickIcon} />}
                    </div>
               </div>
          </div>
     );
};

export default QuantityInput;
