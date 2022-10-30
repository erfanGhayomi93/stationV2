import clsx from 'clsx';
import { createContext, FC, useEffect, useRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon, KeyboardIcon } from 'src/common/icons';
import Keyboard from './Keyboard';

interface IPasswordInputContextType {
    value?: string;
}

export const PasswordInputContext = createContext<IPasswordInputContextType>({});

interface IPasswordInputProviderType {
    defaultValue?: string;
    onChange?: (value: string) => void;
    classname?: string;
    inputClassName?: string;
    suffixClassName?: string;
    value?: string;
}

const PasswordInput: FC<IPasswordInputProviderType> = ({ onChange, classname, inputClassName, defaultValue, value, suffixClassName, ...rest }) => {
    const [inputValue, setInputValue] = useState<string | undefined>(defaultValue);
    const inputRef = useRef<HTMLDivElement>(null);
    const [showPass, setShowPass] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);

    const clickOutSide = (e: MouseEvent) => {
        if (!inputRef.current?.contains(e.target as Node)) {
            setShowKeyboard(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', clickOutSide);
        return () => {
            document.removeEventListener('click', clickOutSide);
        };
    }, []);

    const setInput = (value: string) => {
        setInputValue(value);
        onChange && onChange(value);
    };

    useEffect(() => {
        value && setInput(value);
    }, [value]);

    return (
        <PasswordInputContext.Provider value={{ value: inputValue }}>
            <div className="w-full relative" ref={inputRef}>
                <div className={clsx('flex border ', classname)}>
                    <input
                        {...rest}
                        name="password"
                        placeholder="password"
                        className={clsx('py-3 w-full px-3', inputClassName)}
                        type={showPass ? 'text' : 'password'}
                        value={inputValue}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className={clsx('flex items-center gap-1 px-2', suffixClassName)}>
                        <span className="cursor-pointer p-2" onClick={() => setShowPass(!showPass)}>
                            {showPass ? <EyeSlashIcon /> : <EyeIcon />}
                        </span>
                        <span className="cursor-pointer p-2" onClick={() => setShowKeyboard(!showKeyboard)}>
                            <KeyboardIcon />
                        </span>
                    </div>
                </div>
                <Keyboard onChange={(keyValue: string) => setInput(keyValue)} showKeyboard={showKeyboard} setShowKeyboard={setShowKeyboard} />
            </div>
        </PasswordInputContext.Provider>
    );
};

export default PasswordInput;
