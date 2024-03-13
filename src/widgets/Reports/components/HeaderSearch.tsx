import { IHeaderParams } from 'ag-grid-community';
import React, { useState, useRef, useEffect } from 'react';
import Input from 'src/common/components/Input';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';
import { SearchIcon } from 'src/common/icons';

interface IProps extends IHeaderParams {
    onChange?: (value?: string) => void;
    onBlur?: (value?: string) => void;
    value: string;
}

const HeaderSearch = ({ displayName, onBlur = () => {}, onChange = () => {}, value }: IProps) => {
    //
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputMode, setInputMode] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const isFirstRender = useIsFirstRender();

    useEffect(() => {
        inputRef.current?.focus();
    });

    useEffect(() => {
        const timeOut = setTimeout(() => !isFirstRender && inputValue.length > 1 && onChange && onChange(inputValue), 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [inputValue]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value.trimStart());
    };

    const onBlurFunc = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        setInputMode(false);
        onBlur && onBlur(e.target.value);
    };

    return (
        <>
            {inputMode || inputValue ? (
                <Input
                    className="bg-transparent outline-none text-D-basic dark:text-L-basic px-2 font-medium"
                    containerClassName="bg-transparent dark:bg-transparent"
                    placeholder={`نام ${displayName}`}
                    onChange={onInputChange}
                    ref={inputRef}
                    value={inputValue}
                    onBlur={onBlurFunc}
                />
            ) : (
                <div className="w-full flex items-center justify-center gap-3" onClick={() => setInputMode(true)}>
                    <SearchIcon />
                    <span>{displayName}</span>
                </div>
            )}
        </>
    );
};

export default HeaderSearch;
