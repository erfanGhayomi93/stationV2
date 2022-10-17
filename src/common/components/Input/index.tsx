import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
}

const Input = ({ disabled, addonAfter, addonBefore, ...rest }: Props) => {
    //
    return (
        <div className={`flex items-center w-full rounded-sm  ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
            <div>{addonBefore ? addonBefore : null}</div>
            <div className="grow">
                <input
                    disabled={disabled}
                    type="text"
                    className="w-full h-full px-2 py-2 outline-none bg-L-basic dark:bg-D-basic text-L-gray-400 dark:text-L-gray-400"
                    {...rest}
                />
            </div>
            <div>{addonAfter ? addonAfter : null}</div>
        </div>
    );
};

export default Input;
