import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    addonBefore?: JSX.Element;
    addonAfter?: JSX.Element;
}

const Input = ({ disabled, addonAfter, addonBefore, ...rest }: Props) => {
    //
    return (
        <div className={`flex items-center w-100 rounded-sm px-2 ${disabled ? 'bg-gray-100' : 'bg-white'}`}>
            <div>{addonBefore ? addonBefore : null}</div>
            <div className="grow">
                <input disabled={disabled} type="text" className="w-full h-full px-2 py-2 outline-none" {...rest} />
            </div>
            <div>{addonAfter ? addonAfter : null}</div>
        </div>
    );
};

export default Input;
