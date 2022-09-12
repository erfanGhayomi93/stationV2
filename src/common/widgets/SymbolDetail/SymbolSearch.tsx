import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useSymbolSearch } from 'src/app/queries';
import SymbolState from 'src/common/components/SymbolState';
import useDebounce from 'src/common/hooks/useDebounce';
import { Search } from 'src/common/icons';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';

const minSearchTermLength = 2;

const SymbolSearch = () => {
    //
    const [term, setTerm] = useState<string>('');
    const debouncedTerm = useDebounce(term, 500);
    const { data: searchResult, isLoading: isSearchLoading } = useSymbolSearch(debouncedTerm);
    const appDispatch = useAppDispatch();

    const TextDisplay = useCallback(({ text }: any) => <div className="relative cursor-default select-none py-2 px-4 text-gray-700">{text}</div>, []);

    const optionsContent = useMemo(() => {
        if (term.length < minSearchTermLength) return <TextDisplay text={`حداقل ${minSearchTermLength} کاراکتر وارد نمایید.`} />;
        if (isSearchLoading || term !== debouncedTerm) return <TextDisplay text="در حال بارگذاری..." />;
        if (!Array.isArray(searchResult)) return <TextDisplay text="اطلاعاتی یافت نشد" />;
        if (debouncedTerm.length >= minSearchTermLength && searchResult?.length === 0) return <TextDisplay text="اطلاعاتی یافت نشد" />;

        return searchResult.map((symbol) => (
            <Combobox.Option
                key={symbol.symbolISIN}
                className={({ active }) => `relative cursor-default select-none py-2 px-3 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
                value={symbol}
            >
                <div className="flex items-center">
                    <span className="ml-2">
                        <SymbolState symbolState={symbol?.symbolState || ''} />
                    </span>
                    <div>
                        <span className={`block truncate font-normal`}>{symbol.symbolTitle}</span>
                        <small className={`block truncate font-normal`}>{symbol.companyName}</small>
                    </div>
                </div>
            </Combobox.Option>
        ));
    }, [term, debouncedTerm, isSearchLoading, searchResult]);

    const onSymbolSelect = useCallback((selected: any) => {
        selected?.symbolISIN && appDispatch(setSelectedSymbol(selected.symbolISIN));
    }, []);

    return (
        <div className="w-full">
            <Combobox value={null} onChange={onSymbolSelect}>
                <div className="relative">
                    <div className="relative w-full cursor-default border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md bg-L-basic dark:bg-D-basic text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <div className="flex items-center px-2 ">
                            <Search className="text-L-gray-400 dark:text-L-gray-400" />
                            <Combobox.Input
                                placeholder="جستجوی نماد"
                                className="grow border-none p-2 text-sm leading-5 text-L-gray-400 dark:text-L-gray-400 focus:ring-0 outline-none bg-L-basic dark:bg-D-basic"
                                onChange={(e) => setTerm(e?.target?.value || '')}
                            />
                        </div>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setTerm('')}
                    >
                        <Combobox.Options className="z-[100] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-L-basic dark:bg-D-basic dark:text-L-basic text-D-basic py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {optionsContent}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default SymbolSearch;
