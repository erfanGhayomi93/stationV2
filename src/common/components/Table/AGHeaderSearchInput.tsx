import { IHeaderParams } from '@ag-grid-community/core';
import { SearchInputIcon, XOutlineIcon } from '@assets/icons';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
// import { ArrowSortDownIcon, ArrowSortUpIcon, SearchIcon } from 'src/common/icons';

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
          api?.setFilterModel({
               [column.getColId()]: {
                    filterType: 'text',
                    type: 'contains',
                    filter: value,
               },
          });
     };

     const onSortChange = () => {
          setSort(!sortStatus ? 'asc' : sortStatus === 'asc' ? 'desc' : null);
     };

     const sortChanged = () => {
          setSortStatus(column.isSortAscending() ? 'asc' : column.isSortDescending() ? 'desc' : null);
     };

     useEffect(() => {
          column.addEventListener('sortChanged', sortChanged);
     }, []);

     return (
          <>
               {inputMode ? (
                    <div className="flex items-center bg-back-surface">
                         <input
                              className="w-full rounded-sm border-none bg-transparent p-1 outline-none"
                              placeholder={`${displayName}`}
                              onChange={onInputChange}
                              ref={inputRef}
                              value={value}
                              onBlur={() => !value && setInputMode(false)}
                         />

                         <button
                              className="block"
                              onClick={() => {
                                   setValue('');
                                   setInputMode(false);
                              }}
                         >
                              <XOutlineIcon />
                         </button>
                    </div>
               ) : (
                    <div className="flex w-full items-center justify-center gap-3">
                         <div>
                              <SearchInputIcon width="1rem" height="1rem" onClick={() => setInputMode(true)} />
                         </div>
                         <span onClick={() => onSortChange()} className="flex items-center">
                              <span>{displayName}</span>
                              {value}

                              <span
                                   className={clsx('ag-icon transform', {
                                        'ag-icon-desc': sortStatus === 'desc',
                                        'ag-icon-asc': sortStatus === 'asc',
                                   })}
                              ></span>
                         </span>
                    </div>
               )}
          </>
     );
};

export default AGHeaderSearchInput;
