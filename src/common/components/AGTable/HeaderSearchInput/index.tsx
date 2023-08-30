import { IHeaderParams } from 'ag-grid-community';
import React, { useState, useRef, useEffect } from 'react';
import Input from 'src/common/components/Input';
import { SearchIcon } from 'src/common/icons';

const CustomerHeader = ({ api, displayName }: IHeaderParams) => {
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
                <div className="w-full h-8 flex text-xs items-center rounded-md border border-transparent overflow-hidden dark:focus-within:border-L-info-100 focus-within:border-L-info-100">
                    <Input
                        className="bg-transparent outline-none text-D-basic px-2 font-medium"
                        containerClassName="bg-transparent"
                        placeholder={`نام ${displayName}`}
                        onChange={onInputChange}
                        ref={inputRef}
                        onBlur={() => setInputMode(false)}
                    />
                </div>
            ) : (
                <div className="w-full flex items-center justify-center gap-3" onClick={() => setInputMode(true)}>
                    <SearchIcon />
                    <span>{displayName}</span>
                </div>
            )}
        </>
    );
};

export default CustomerHeader;
