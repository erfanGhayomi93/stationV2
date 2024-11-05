import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
     addonBefore?: JSX.Element;
     addonAfter?: JSX.Element;
     containerClassName?: string;
     inputClassName?: string;
     label?: string;
     textError?: string;
     icon?: JSX.Element;
     placeholder: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
     (
          { disabled, addonAfter, addonBefore, containerClassName, inputClassName, icon, label, textError, placeholder, ...rest },
          ref
     ) => {
          //
          return (
               // <div className={` ${containerClassName} ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
               <div className="group relative">
                    <div
                         className={clsx(
                              'duration-250 flex h-14 w-full items-center overflow-hidden rounded-2xl border border-input-default focus-within:border-input-primary',
                              containerClassName,
                              disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic',
                              textError && 'border-input-error'
                         )}
                    >
                         <div>{addonBefore ? addonBefore : null}</div>
                         <div className="flex h-full grow items-center gap-2 text-content-placeholder">
                              <div className="pr-4">{icon}</div>
                              <input
                                   ref={ref}
                                   disabled={disabled}
                                   type="text"
                                   dir="ltr"
                                   placeholder=""
                                   className={clsx(
                                        'text-L-gray-700 dark:text-D-gray-700 z-10 h-full w-full bg-transparent pl-4 outline-none placeholder:text-right',
                                        {
                                             [inputClassName as string]: !!inputClassName,
                                        }
                                   )}
                                   {...rest}
                              />
                         </div>
                         <div>{addonAfter ? addonAfter : null}</div>
                    </div>
                    <p
                         className={clsx('text-xs text-icon-error transition-all', {
                              'pt-2': !!textError,
                         })}
                    >
                         {textError}
                    </p>

                    <div className="absolute right-12 top-1/2 z-0 -translate-y-1/2 text-content-placeholder transition-all duration-100 group-focus-within:-top-1 group-focus-within:right-4 group-focus-within:bg-back-surface group-focus-within:p-2 group-focus-within:text-xs group-focus-within:text-input-primary group-focus-within:after:content-['*']">
                         <span>{placeholder}</span>
                    </div>
               </div>
          );
     }
);

Input.displayName = 'Input';

export default Input;
