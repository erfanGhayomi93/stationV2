import { Combobox, Transition } from '@headlessui/react';
import { FC, Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { useSymbolGeneralInfo, useSymbolSearch } from 'src/app/queries/symbol';
import { useRecentSymbolHistory } from 'src/app/queries/tradingView';
import SymbolState from 'src/common/components/SymbolState';
import { useGlobalSetterState } from 'src/common/context/globalSetterContext';
import useDebounce from 'src/common/hooks/useDebounce';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { Search } from 'src/common/icons';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol, setSelectedSymbol } from 'src/redux/slices/option';

const minSearchTermLength = 2;
interface ISymbolSearchType {
    placeholder?: string;
}
const SymbolSearch: FC<ISymbolSearchType> = ({ placeholder }) => {
    const comboButton = useRef<HTMLButtonElement>(null);
    const [localSymbolISIN, setLocalSymbolISIN] = useLocalStorage<string>('symbolISIN', '');
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const { resetBuySellState } = useGlobalSetterState();
    const [term, setTerm] = useState<string>('');
    const debouncedTerm = useDebounce(term, 500);
    const { data: searchResult, isLoading: isSearchLoading } = useSymbolSearch(debouncedTerm, {});
    const appDispatch = useAppDispatch();

    const { data: searchHistory } = useRecentSymbolHistory({type: "GeneralSearch"});

    const TextDisplay = useCallback(
        ({ text }: any) => <div className="relative cursor-default select-none py-2 px-4 text-L-gray-500 dark:text-D-gray-500">{text}</div>,
        [],
    );

    const createOptions = (symbols: SymbolSearchResult[]) => {
        if (!symbols.length) return [];

        return symbols.map((symbol) => (
            <Combobox.Option
                key={symbol.symbolISIN}
                className={({ active }) =>
                    `relative cursor-default text-1.2   select-none py-1 px-3 border-b last:border-none border-L-gray-400 dark:border-D-gray-400 ${
                        active
                            ? 'dark:bg-[#474F66] bg-[#DEEDFF] text-L-gray-500 dark:text-D-gray-700'
                            : 'text-L-gray-500 dark:text-D-gray-700 dark:odd:bg-D-gray-100 odd:bg-L-gray-100'
                    }`
                }
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
    };

    const optionsContent = useMemo(() => {
        if (term.length < minSearchTermLength && searchHistory) return createOptions(searchHistory);
        if (isSearchLoading || term !== debouncedTerm) return <TextDisplay text="در حال بارگذاری..." />;
        if (!Array.isArray(searchResult)) return <TextDisplay text="اطلاعاتی یافت نشد" />;
        if (debouncedTerm.length >= minSearchTermLength && searchResult?.length === 0) return <TextDisplay text="اطلاعاتی یافت نشد" />;

        return createOptions(searchResult);
    }, [term, debouncedTerm, isSearchLoading, searchResult, searchHistory]);

    const onSymbolSelect = (selected: any) => {
        selected?.symbolISIN && appDispatch(setSelectedSymbol(selected.symbolISIN));
        selected?.symbolISIN && setLocalSymbolISIN(selected.symbolISIN);
    };

    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => data.symbolData,
        onSuccess: () => {
            resetBuySellState();
        },
    });

    return (
        <div className="w-full  ">
            <Combobox value={symbolData || ''} onChange={onSymbolSelect}>
                {({ open }) => (
                    <div className="relative  ">
                        <div className="relative w-full cursor-default border-L-gray-400 dark:border-D-gray-400 border overflow-hidden rounded-md bg-L-basic dark:bg-D-basic text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 text-1.2  duration-250 dark:focus-visible:border-D-infoo-100 focus-within:border-L-info-100">
                            <div className="flex items-center px-2 ">
                                <Search className="text-L-gray-500 dark:text-L-gray-500" />
                                <Combobox.Input
                                    placeholder={placeholder ? placeholder : symbolData?.symbolTitle || 'جستجوی نماد'}
                                    className="grow  border-none p-2 text-1.2 leading-5 text-L-gray-500 dark:text-L-gray-500 focus:ring-0 outline-none bg-L-basic dark:bg-D-basic"
                                    onChange={(e) => setTerm(e?.target?.value || '')}
                                    onClick={() => {
                                        comboButton.current && comboButton.current.click()}}
                                />
                                <Combobox.Button ref={comboButton}></Combobox.Button>
                            </div>
                        </div>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setTerm('')}
                        >
                            <Combobox.Options className="z-[100] absolute mt-1 max-h-60 w-full border border-L-gray-400 dark:border-D-gray-400 overflow-auto rounded-md bg-L-basic dark:bg-D-basic dark:text-L-basic text-D-basic py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-1.2 ">
                                {optionsContent}
                            </Combobox.Options>
                        </Transition>
                    </div>
                )}
            </Combobox>
        </div>
    );
};

export default SymbolSearch;
