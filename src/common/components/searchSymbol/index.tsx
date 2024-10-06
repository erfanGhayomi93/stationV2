import { useQuerySearchHistory, useQuerySymbolSearch } from '@api/Symbol';
import { SearchInputIcon, SpinnerIcon } from '@assets/icons';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import useDebounce from '@hooks/useDebounce';
import { FC, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

interface ISymbolSearchProps {
     searchSymbol: SearchSymbol | null;
     setSearchSymbol: (symbol: SearchSymbol | null) => void;
}

const SymbolSearch: FC<ISymbolSearchProps> = ({ searchSymbol, setSearchSymbol }) => {
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
                                   'cursor-pointer rounded-md px-1 py-3 text-sm text-content-paragraph transition-colors hover:bg-back-primary-container',
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
                         setQuery('');
                    }
               }}
          >
               <div className="relative">
                    <ComboboxInput
                         aria-label={searchSymbol?.symbolTitle || ''}
                         displayValue={(symbol: SearchSymbol) => symbol?.symbolTitle}
                         value={query}
                         onChange={event => setQuery(event.target.value)}
                         className={clsx(
                              'rtl w-full rounded-lg border-none bg-back-2 py-1.5 pl-3 pr-8 text-content-title placeholder:text-sm placeholder:text-content-placeholder',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2'
                         )}
                         autoComplete="off"
                         placeholder="جستجوی نماد"
                    />

                    <div className="group absolute right-0 top-2 px-2.5">
                         <SearchInputIcon className="size-4 text-icon-default" />
                    </div>

                    <div
                         className={clsx('group absolute left-0 top-2 px-2.5', {
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
                         className="rtl z-50 mt-1 w-[var(--input-width)] rounded-xl border bg-back-surface p-2 empty:invisible"
                    >
                         <div className="max-h-80 overflow-y-auto">{handleOptions()}</div>
                    </ComboboxOptions>
               )}
          </Combobox>
     );
};

export default SymbolSearch;
