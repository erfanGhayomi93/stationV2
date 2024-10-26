// import { cn, convertStringToInteger, sepNumbers } from '@/utils/helpers';
import { sepNumbers } from '@methods/helper';
import React from 'react';

interface InputProps<T extends string | number>
     extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'className' | 'onChange'> {
     onChange: (v: string) => void;
     value: T;
     prefix?: string;
     placeholder: string;
}

const Input = <T extends string | number>({ value, placeholder, prefix, onChange, ...props }: InputProps<T>) => {
     const valueFormatter = (value: number | string) => {
          if (!value) return '';
          return sepNumbers(String(value));
     };

     return (
          <>
               <input
                    {...props}
                    type="text"
                    inputMode="numeric"
                    className="h-full w-full flex-1 border border-input-default bg-transparent px-2 py-2 text-sm"
                    value={valueFormatter(value)}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
               />
               {prefix && (
                    <span className="border-r-gray-200 text-gray-500 text-tiny flex-justify-center h-6 w-9 border-r">
                         {prefix}
                    </span>
               )}
          </>
     );
};

export default Input;
