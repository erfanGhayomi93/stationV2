import { IHeaderParams } from 'ag-grid-community';
import React, { useState, useRef, useEffect } from 'react';
import Input from 'src/common/components/Input';
import { SearchIcon } from 'src/common/icons';

const AGHeaderSearchInput = ({ api, displayName }: IHeaderParams) => {
    //
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputMode, setInputMode] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, [!!inputMode]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        api?.setQuickFilter(value);
    };

    return (
        <>
            {inputMode ? (
                <Input
                    className="bg-transparent outline-none text-D-basic dark:text-L-basic px-2 font-medium"
                    containerClassName="bg-transparent dark:bg-transparent"
                    placeholder={`نام ${displayName}`}
                    onChange={onInputChange}
                    ref={inputRef}
                    onBlur={() => setInputMode(false)}
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

export default AGHeaderSearchInput;
