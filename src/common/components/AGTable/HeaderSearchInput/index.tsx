import { IHeaderParams } from 'ag-grid-community';
import React, { useState, useRef, useEffect } from 'react';
import Input from 'src/common/components/Input';
import { ArrowSortDownIcon, ArrowSortUpIcon, SearchIcon } from 'src/common/icons';

const AGHeaderSearchInput = ({ api, displayName, column, setSort }: IHeaderParams) => {
    //
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputMode, setInputMode] = useState(false);
    const [value, setValue] = useState('');


    const [sortStatus, setSortStatus] = useState<'asc' | 'desc' | null>(null);


    useEffect(() => {
        inputRef.current?.focus();
    }, [!!inputMode]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
        api?.setQuickFilter(value);
    };


    const onSortChange = () => {
        setSort(!sortStatus ? 'asc' : sortStatus === 'asc' ? 'desc' : null);
    }

    const sortChanged = () => {
        setSortStatus(column.isSortAscending() ? 'asc' : column.isSortDescending() ? 'desc' : null);
    }

    useEffect(() => {
        column.addEventListener("sortChanged", sortChanged);
    }, []);



    return (
        <>
            {inputMode ? (
                <Input
                    className="bg-transparent outline-none text-D-basic dark:text-L-basic px-2 font-medium"
                    containerClassName="bg-transparent dark:bg-transparent"
                    placeholder={`نام ${displayName}`}
                    onChange={onInputChange}
                    ref={inputRef}
                    value={value}
                    onBlur={() => !value && setInputMode(false)}
                />
            ) : (
                <div className="w-full flex items-center justify-center gap-3" >
                    <SearchIcon onClick={() => setInputMode(true)} />
                    <span
                        onClick={() => onSortChange()}
                        className='flex items-center'
                    >
                        <span
                        >
                            {displayName}
                        </span>
                        {
                            sortStatus === 'asc' && <ArrowSortUpIcon width={15} height={15} />
                        }
                        {
                            sortStatus === 'desc' && <ArrowSortDownIcon width={15} height={15} />
                        }
                    </span>
                </div>
            )}
        </>
    );
};

export default AGHeaderSearchInput;
