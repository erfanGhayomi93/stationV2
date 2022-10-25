import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
    containerClassName?: string;
}

const Input = ({
    disabled,
    addonAfter,
    addonBefore,
    containerClassName = 'flex items-center w-full rounded-sm duration-250 dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50',
    ...rest
}: Props) => {
    //
    return (
        <div className={` ${containerClassName} ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
            <div>{addonBefore ? addonBefore : null}</div>
            <div className="grow">
                <input
                    disabled={disabled}
                    type="text"
                    className="w-full  h-full px-2 py-2 outline-none bg-L-basic dark:bg-D-basic text-L-gray-400 dark:text-L-gray-400"
                    {...rest}
                />
            </div>
            <div>{addonAfter ? addonAfter : null}</div>
        </div>
    );
};

export default Input;
