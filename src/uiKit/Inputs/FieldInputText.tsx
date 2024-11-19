import { XCircleOutlineIcon } from '@assets/icons';
import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';

interface TFieldInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'placeholder'> {
     onChange: (value: string) => void;
     placeholder: string;
     classes?: Partial<Record<'root', ClassesValue | undefined>>;
}

const FieldInputText = ({ onChange, placeholder, classes, ...props }: TFieldInputTextProps) => {
     const [inputValue, setInputValue] = useState<string | number>('');

     return (
          <div
               className={clsx(
                    classes?.root,
                    'rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default px-3 py-2 transition-colors focus-within:border-input-primary'
               )}
          >
               <div className="flex flex-1 items-center">
                    <input
                         value={inputValue}
                         onChange={e => {
                              onChange(e.target.value);
                              setInputValue(e.target.value);
                         }}
                         dir="rtl"
                         className="focus:outline-non z-20 h-12 w-full flex-1 border-none bg-transparent pl-2 text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         {...props}
                    />

                    <button
                         onClick={() => setInputValue('')}
                         className={clsx('flex justify-end text-icon-default transition-opacity', {
                              'opacity-0': !inputValue,
                         })}
                    >
                         <XCircleOutlineIcon />
                    </button>

                    <div
                         className={clsx(
                              'focus:outline-non text-xs text-input-default transition-all duration-100 group-focus-within:text-input-active',
                              {
                                   'absolute -top-3 right-2 bg-back-surface px-1': inputValue,
                                   'absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-transparent px-1': !inputValue,
                              }
                         )}
                    >
                         <span className="">{placeholder}</span>
                    </div>
               </div>
          </div>
     );
};

export default FieldInputText;
