import { SearchInputIcon, XCircleOutlineIcon } from '@assets/icons';
import { InputHTMLAttributes, useState } from 'react';

interface TSearchInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'className' | 'onChange' | 'placeholder'> {
     values: string[];
     onChangeValue: (value: string[]) => void;
     placeholder?: string;
}

const SearchInput = ({ values, onChangeValue, placeholder = '', ...props }: TSearchInputProps) => {
     const [value, setValue] = useState(values);

     const onChange = () => {
          onChangeValue(value);
     };

     return (
          <div
               style={{ width: 300 }}
               className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active"
          >
               <div className="flex w-full items-center">
                    <div className="pl-2">
                         <SearchInputIcon className="size-4 text-icon-default" />
                    </div>
                    <input
                         value={value.join(',')}
                         onChange={() => onChange()}
                         dir="ltr"
                         className="h-12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         inputMode="numeric"
                         {...props}
                    />
                    {value.length !== 0 && (
                         <div onClick={() => setValue([])} className="text-input-default group-focus-within:text-input-active">
                              <XCircleOutlineIcon />
                         </div>
                    )}

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-xs text-input-default transition-all duration-100 group-focus-within:-top-1 group-focus-within:bg-back-surface group-focus-within:px-1 group-focus-within:text-input-active">
                         <span className="">{placeholder}</span>
                    </div>
               </div>
          </div>
     );
};

export default SearchInput;
