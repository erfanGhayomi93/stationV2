import { SearchInputIcon, XCircleOutlineIcon, XOutlineICon } from '@assets/icons';
import { InputHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

type TItem = {
     id: string;
     label: string;
};

interface TSearchInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'className' | 'onChange' | 'placeholder'> {
     values: TItem[];
     onChangeValue: (items: TItem[], value: string) => void;
     placeholder?: string;
}

const SearchInput = ({ values, onChangeValue, placeholder = '', ...props }: TSearchInputProps) => {
     const [items, setItems] = useState<TItem[]>(values);

     const [inputValue, setInputValue] = useState('');

     const [visibleChipsetsCount, setVisibleChipsetsCount] = useState(values.length);

     const searchInputRef = useRef<HTMLDivElement | null>(null);
     const chipsetsRef = useRef<HTMLUListElement | null>(null);
     const inputRef = useRef<HTMLInputElement | null>(null);

     const onChange = (value: string) => {
          setInputValue(value);
          onChangeValue(items, value);
     };

     const calcWidthWrapper = useMemo(() => {
          if (searchInputRef.current) {
               return searchInputRef.current.offsetWidth;
          } else {
               return 0;
          }
     }, [searchInputRef.current]);

     useEffect(() => {
          if (chipsetsRef.current && inputRef.current) {
               const ulWidth = chipsetsRef.current.offsetWidth;
               let totalChipsetsWidth = 0;
               let visibleCount = 0;

               const childNodes = chipsetsRef.current.childNodes;
               childNodes.forEach((chip: any) => {
                    const chipsetWidth = chip.offsetWidth;
                    totalChipsetsWidth += chipsetWidth;

                    if (totalChipsetsWidth <= ulWidth) {
                         visibleCount += 1;
                    }
               });

               setVisibleChipsetsCount(visibleCount);

               inputRef.current.style.paddingRight = `${totalChipsetsWidth - 8}px`;
          }
     }, [items, calcWidthWrapper]);

     return (
          <div
               ref={searchInputRef}
               style={{ width: 300 }}
               className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active"
          >
               <div className="flex w-full items-center">
                    <div className="pl-2">
                         <SearchInputIcon className="size-4 text-icon-default" />
                    </div>
                    <input
                         ref={inputRef}
                         value={inputValue}
                         onChange={e => onChange(e.target.value)}
                         className="h-12 flex-1 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                         inputMode="numeric"
                         {...props}
                    />
                    {items.length !== 0 && (
                         <div
                              onClick={() => setItems([])}
                              className="absolute left-2 text-input-default group-focus-within:text-input-active"
                         >
                              <XCircleOutlineIcon />
                         </div>
                    )}

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent text-xs text-input-default transition-all duration-100 group-focus-within:-top-1 group-focus-within:bg-back-surface group-focus-within:px-1 group-focus-within:text-input-active">
                         <span className="">{placeholder}</span>
                    </div>

                    <ul className="rtl absolute right-2 flex items-center gap-1 overflow-hidden" ref={chipsetsRef}>
                         {items.slice(0, visibleChipsetsCount).map(value => (
                              <li
                                   key={value.id}
                                   className="flex items-center gap-1 rounded-lg bg-progressbar-primary-line px-1 py-1 text-content-title"
                              >
                                   <span className="text-xs">{value.label}</span>
                                   <button
                                        onClick={() => {
                                             const findIndex = items.findIndex(item => item.id === value.id);
                                             const newValues = [...items];
                                             newValues.splice(findIndex, 1);
                                             setItems(newValues);
                                        }}
                                        className="text-icon-disable"
                                   >
                                        <XOutlineICon />
                                   </button>
                              </li>
                         ))}

                         {visibleChipsetsCount < items.length && (
                              <li className="flex items-center gap-1 rounded-lg bg-progressbar-primary-line p-2 text-content-title">
                                   <span className="text-xs">{items.length - visibleChipsetsCount}+</span>
                              </li>
                         )}
                    </ul>
               </div>
          </div>
     );
};

export default SearchInput;
