import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
    containerClassName?: string;
    inputClassName?: string
    label?: string;
    textError?: string

}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            disabled,
            addonAfter,
            addonBefore,
            containerClassName,
            inputClassName,
            label,
            textError,
            ...rest
        },
        ref,
    ) => {
        //
        return (
            // <div className={` ${containerClassName} ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
            <>
                <div
                    className={clsx(
                        'flex h-8 px-2 items-center w-full overflow-hidden rounded border border-L-gray-400 dark:border-D-gray-400 duration-250 dark:focus-within:border-D-info-100 focus-within:border-L-info-100',
                        containerClassName,
                        disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic',
                    )}
                >
                    <div>{addonBefore ? addonBefore : null}</div>
                    <div className="grow">
                        <input
                            ref={ref}
                            disabled={disabled}
                            type="text"
                            className={clsx("w-full px-2 h-full outline-none bg-L-basic dark:bg-D-basic text-L-gray-700 dark:text-D-gray-700", {
                                [inputClassName as string]: !!inputClassName
                            })}
                            {...rest}
                        />
                    </div>
                    <div>{addonAfter ? addonAfter : null}</div>
                </div>
                <p
                    className={clsx(
                        'text-L-error-300 dark:text-D-error-300 transition-all text-xs',
                        {
                            'pt-1': !!textError,
                        }
                    )}
                >
                    {textError}
                </p>
            </>
        );
    },
);

Input.displayName = 'Input';

export default Input;
