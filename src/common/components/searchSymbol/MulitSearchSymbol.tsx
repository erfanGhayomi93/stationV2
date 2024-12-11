import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { DeleteIcon, SearchInputIcon, SpinnerIcon, UserGroupIcon } from '@assets/icons';
import useDebounce from '@hooks/useDebounce';
import { useQuerySearchHistory, useQuerySymbolSearch } from '@api/Symbol';
import Checkbox from '@components/Checkbox.tsx';
import Popup from '@components/popup';

interface IMultiSearchSymbolProps {
     searchSymbol: (SearchSymbol | null)[];
     setSearchSymbol: (symbol: (SearchSymbol | null)[]) => void;
}

function MultiSearchSymbol({ searchSymbol, setSearchSymbol }: IMultiSearchSymbolProps) {
     const [query, setQuery] = useState('');

     const debouncedTerm = useDebounce(query, 400);

     const { data, refetch, isFetching: isFetchingSearch } = useQuerySymbolSearch(debouncedTerm);

     const { data: historyData } = useQuerySearchHistory();

     const handleOptions = useCallback(() => {
          if (!debouncedTerm.length) {
               return createOptions(historyData);
          } else if (debouncedTerm.length > 2 && !!data?.length) {
               return createOptions(data);
          } else if (debouncedTerm.length > 0 && debouncedTerm.length <= 2) {
               return createNotice('حداقل سه کاراکتر وارد نمایید.');
          } else if (!isFetchingSearch) {
               return createNotice('نتیجه ای یافت نشد.');
          }
          return null;
     }, [historyData, data, debouncedTerm, isFetchingSearch, searchSymbol]);

     const createOptions = useCallback(
          (filteredPeople?: SearchSymbol[]) => {
               return filteredPeople?.map(symbol => (
                    <ComboboxOption
                         key={symbol.symbolISIN}
                         value={symbol}
                         className={_bag =>
                              clsx(
                                   'flex cursor-pointer items-center rounded-md px-1 py-3 text-sm text-content-paragraph transition-colors hover:bg-back-primary',
                                   { 'bg-back-primary-container': _bag.focus }
                              )
                         }
                    >
                         <Checkbox
                              label={symbol.symbolTitle}
                              checked={searchSymbol?.some(s => s?.symbolISIN === symbol.symbolISIN)}
                              onChange={() => null}
                         />
                    </ComboboxOption>
               ));
          },
          [searchSymbol]
     );

     const createNotice = useCallback((text: string) => {
          return <div className="text-content-paragraph">{text}</div>;
     }, []);

     return (
          <div className="flex items-center gap-4">
               <Combobox
                    multiple
                    value={searchSymbol}
                    onChange={symbols => setSearchSymbol(symbols)}
                    onClose={() => setQuery('')}
               >
                    <div
                         className={clsx(
                              'rtl group relative flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-input-default px-2 py-2 transition-colors focus-within:border-input-active'
                         )}
                    >
                         <div className="relative z-10">
                              <SearchInputIcon width="1rem" height="1rem" className="text-icon-default" />
                         </div>
                         <ComboboxInput
                              aria-label="Assignees"
                              onChange={event => setQuery(event.target.value)}
                              className="z-20 h-full w-full border-none bg-transparent text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                              autoComplete="off"
                         />

                         <span
                              className={clsx(
                                   'absolute right-6 z-10 bg-back-surface p-2 text-xs text-content-title transition-transform group-focus-within:-translate-y-6'
                              )}
                         >
                              نماد
                         </span>

                         <div
                              className={clsx('group absolute left-0 top-1/2 -translate-y-1/2 px-2.5', {
                                   'opacity-0': !isFetchingSearch,
                                   'opacity-100': isFetchingSearch,
                              })}
                         >
                              <SpinnerIcon className="size-5 text-icon-default" />
                         </div>
                    </div>

                    <ComboboxOptions
                         anchor="bottom"
                         className="rtl z-[1000] mt-8 w-[var(--input-width)] rounded-xl bg-back-surface p-2 shadow-E6 empty:invisible"
                    >
                         <div className="max-h-72 overflow-y-auto">{handleOptions()}</div>
                    </ComboboxOptions>
               </Combobox>

               <div className="flex w-3/12 items-center justify-center">
                    <Popup
                         margin={{
                              y: 8,
                         }}
                         defaultPopupWidth={200}
                         renderer={({ setOpen }) => (
                              <ul className="rtl flex flex-col rounded-md bg-back-surface p-4 shadow-E2">
                                   {searchSymbol?.map((item, index) => (
                                        <li
                                             key={index}
                                             className="group flex items-center justify-between rounded-lg p-2 text-xs text-content-paragraph hover:bg-back-primary/80"
                                        >
                                             <span>{item?.symbolTitle}</span>
                                             <button
                                                  onClick={() => {
                                                       const filterSelectCustomer = searchSymbol.filter(
                                                            symbol => symbol?.symbolISIN !== item?.symbolISIN
                                                       );

                                                       setSearchSymbol([...filterSelectCustomer]);

                                                       setOpen(false);
                                                  }}
                                             >
                                                  <DeleteIcon className="text-icon-error opacity-0 transition-opacity group-hover:opacity-100" />
                                             </button>
                                        </li>
                                   ))}
                              </ul>
                         )}
                    >
                         {({ setOpen, open }) => (
                              <button
                                   onClick={() => {
                                        if (searchSymbol.length === 0) return;
                                        setOpen(!open);
                                   }}
                                   className={clsx(
                                        'flex items-center gap-1 rounded-lg bg-button-success-bg-selected px-3 py-3 text-button-primary-default'
                                   )}
                              >
                                   <UserGroupIcon />

                                   <div
                                        className={clsx(
                                             'flex h-5 w-5 items-center justify-center rounded-full bg-button-primary-selected text-icon-white'
                                        )}
                                   >
                                        <span className="text-xs">{searchSymbol.length}</span>
                                   </div>
                              </button>
                         )}
                    </Popup>
               </div>
          </div>
     );
}

export default MultiSearchSymbol;
