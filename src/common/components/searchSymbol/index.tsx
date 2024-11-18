import { useQuerySearchHistory, useQuerySymbolSearch } from '@api/Symbol';
import { SearchInputIcon, SpinnerIcon } from '@assets/icons';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import useDebounce from '@hooks/useDebounce';
import clsx from 'clsx';
import { FC, useCallback, useEffect, useState } from 'react';

interface ISymbolSearchProps {
     searchSymbol: SearchSymbol | null;
     setSearchSymbol: (symbol: SearchSymbol | null) => void;
     isMainPage?: boolean;
}

const SymbolSearch: FC<ISymbolSearchProps> = ({ searchSymbol, setSearchSymbol, isMainPage }) => {
     const [query, setQuery] = useState('');

     const debouncedTerm = useDebounce(query, 400);

     const { data, refetch, isFetching: isFetchingSearch } = useQuerySymbolSearch(debouncedTerm);

     const { data: historyData } = useQuerySearchHistory();

     useEffect(() => {
          if (debouncedTerm.length > 2) refetch();
     }, [debouncedTerm]);

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
     }, [historyData, data, debouncedTerm, isFetchingSearch]);

     const createOptions = useCallback(
          (filteredPeople?: SearchSymbol[]) =>
               filteredPeople?.map(symbol => (
                    <ComboboxOption
                         key={symbol.symbolISIN}
                         value={symbol}
                         className={_bag =>
                              clsx(
                                   'cursor-pointer rounded-md px-1 py-3 text-sm text-content-paragraph transition-colors hover:bg-back-primary',
                                   { 'bg-back-primary-container': _bag.focus }
                              )
                         }
                    >
                         {symbol.symbolTitle}
                    </ComboboxOption>
               )),
          []
     );

     const createNotice = useCallback((text: string) => {
          return <div className="text-content-paragraph">{text}</div>;
     }, []);

     return (
          <Combobox
               immediate
               value={searchSymbol}
               onChange={symbol => {
                    if (symbol) {
                         setSearchSymbol(symbol);
                         if (!isMainPage && symbol?.symbolTitle) setQuery(symbol.symbolTitle);
                    }
               }}
          >
               <div className={clsx('relative', {
                    'rtl group flex h-12 w-full items-center justify-between rounded-lg border border-input-default py-2 transition-colors focus-within:border-input-active': !isMainPage
               })}>
                    <ComboboxInput
                         aria-label={searchSymbol?.symbolTitle || ''}
                         displayValue={(symbol: SearchSymbol) => symbol?.symbolTitle}
                         value={query}
                         onChange={event => setQuery(event.target.value)}
                         className={clsx(
                              'rtl w-full rounded-lg text-content-title placeholder:text-sm placeholder:text-content-placeholder border-none',
                              'focus:outline-none outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 px-8',
                              {
                                   "bg-back-2 py-1.5": isMainPage,
                                   "h-12 bg-transparent text-right": !isMainPage,
                              }
                         )}
                         autoComplete="off"
                         placeholder="جستجوی نماد"

                    />

                    <div className="group absolute right-0 top-1/4 px-2.5">
                         <SearchInputIcon className="size-4 text-icon-default" />
                    </div>

                    <div
                         className={clsx('group absolute left-0 top-1/4 px-2.5', {
                              'opacity-0': !isFetchingSearch,
                              'opacity-100': isFetchingSearch,
                         })}
                    >
                         <SpinnerIcon className="size-5 text-icon-default" />
                    </div>
               </div>

               {!!handleOptions() && (
                    <ComboboxOptions
                         anchor="bottom"
                         className="rtl z-[1000] mt-1 w-[var(--input-width)] rounded-xl bg-back-surface p-2 shadow-E6 empty:invisible"
                    >
                         <div className="max-h-72 overflow-y-auto">{handleOptions()}</div>
                    </ComboboxOptions>
               )}
          </Combobox>
     );
};

export default SymbolSearch;
