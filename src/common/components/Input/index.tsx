import React, { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
    containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
    (
        {
            disabled,
            addonAfter,
            addonBefore,
            containerClassName = 'flex items-center w-full rounded-sm duration-250 dark:focus-within:border-D-infoo-100 focus-within:border-L-info-100',
            ...rest
        },
        ref,
    ) => {
        //
        return (
            <div className={` ${containerClassName} ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
                <div>{addonBefore ? addonBefore : null}</div>
                <div className="grow">
                    <input
                        ref={ref}
                        disabled={disabled}
                        type="text"
                        className="w-full  px-2 h-8 outline-none bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-L-gray-500"
                        {...rest}
                    />
                </div>
                <div>{addonAfter ? addonAfter : null}</div>
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
