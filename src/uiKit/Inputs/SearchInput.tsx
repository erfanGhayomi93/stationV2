import { SearchInputIcon, XCircleOutlineIcon, XOutlineIcon } from '@assets/icons';
import clsx from 'clsx';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';

type TItem = {
     id: string;
     label: string;
};

interface TSearchInputProps
     extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'className' | 'onChange' | 'placeholder'> {
     values: TItem[];
     onChangeValue: (items: TItem[], value: string) => void;
     placeholder?: string;
     handleOpenModal?: () => void;
     removeSelectedCustomers: (customerISIN: string) => void;
     removeAllSelectedCustomers: () => void;
}

const SearchInput = ({
     values,
     onChangeValue,
     placeholder = '',
     handleOpenModal,
     removeAllSelectedCustomers,
     removeSelectedCustomers,
     ...props
}: TSearchInputProps) => {
     const [items, setItems] = useState<TItem[]>(values);

     const [inputValue, setInputValue] = useState('');

     const [widthSize, setWidthSize] = useState(0)

     //  const [visibleChipsetsCount, setVisibleChipsetsCount] = useState(values.length);

     const searchInputRef = useRef<HTMLButtonElement | null>(null);
     const chipsetsRef = useRef<HTMLUListElement | null>(null);
     const inputRef = useRef<HTMLInputElement | null>(null);

     const onChange = (value: string) => {
          setInputValue(value);
          onChangeValue(items, value);
     };

     //  useEffect(() => {
     //       if (chipsetsRef.current && searchInputRef.current) {
     //            const ulWidth = searchInputRef.current.offsetWidth - 110;

     //            console.log(ulWidth, 'ulWidth');

     //            let totalChipsetsWidth = 0;
     //            let visibleCount = 0;

     //            const childNodes = Array.from(chipsetsRef.current.childNodes) as HTMLElement[];

     //            childNodes.forEach(chip => {
     //                 const chipsetWidth = chip.getBoundingClientRect().width;

     //                 totalChipsetsWidth += chipsetWidth;

     //                 if (totalChipsetsWidth <= ulWidth) {
     //                      visibleCount += 1;
     //                 }
     //            });

     //            setVisibleChipsetsCount(visibleCount);
     //       }
     //  }, [searchInputRef, chipsetsRef, items]);

     useEffect(() => {
          if (searchInputRef.current) {
               const resizeObserver = new ResizeObserver(() => {
                    setWidthSize(searchInputRef?.current?.offsetWidth ?? 0)
               });

               resizeObserver.observe(searchInputRef.current);

               return () => resizeObserver.disconnect(); // Cleanup observer on unmount
          }
     }, []);


     useEffect(() => {
          setItems(values);
     }, [values]);

     return (
          <div className="w-full">
               <button
                    onClick={() => {
                         inputRef.current?.focus();
                         handleOpenModal?.();
                    }}
                    ref={searchInputRef}
                    // style={{width}}
                    className="rtl group relative flex h-12 w-full items-center justify-between rounded-lg border border-input-default p-2 transition-colors focus-within:border-input-active"
               >
                    <div className="flex w-full items-center gap-1 pr-6">
                         <div className="absolute right-2 flex h-full items-center justify-center bg-back-surface">
                              <SearchInputIcon className="size-4 text-icon-default" />
                         </div>
                         <ul
                              ref={chipsetsRef}
                              className="rtl transparent-scrollbar flex items-center gap-1 overflow-x-auto pt-1 truncate"
                              style={{ maxWidth: widthSize - 70 }}
                         >
                              {items.map(value => (
                                   <li
                                        key={value.id}
                                        className="flex items-center gap-1 text-nowrap rounded-lg bg-progressbar-primary-line px-1 py-1 text-content-title"
                                   >
                                        <span className="text-xs">{value.label}</span>
                                        <button
                                             onClick={e => {
                                                  e.stopPropagation();
                                                  removeSelectedCustomers(value.id);
                                                  // console.log('hi');
                                                  // const findIndex = items.findIndex(item => item.id === value.id);
                                                  // const newValues = [...items];
                                                  // newValues.splice(findIndex, 1);
                                                  // setItems(newValues);
                                             }}
                                             className="text-icon-disable"
                                        >
                                             <XOutlineIcon />
                                        </button>
                                   </li>
                              ))}
                         </ul>

                         <input
                              ref={inputRef}
                              value={inputValue}
                              onChange={e => onChange(e.target.value)}
                              className="h-12 w-2/12 border-none bg-transparent text-right text-sm text-content-title outline-none placeholder:text-xs placeholder:text-content-placeholder"
                              inputMode="numeric"
                              {...props}
                         />

                         <div className="flex items-center justify-center">
                              {items.length !== 0 && (
                                   <button
                                        onClick={e => {
                                             e.stopPropagation();
                                             setItems([]);
                                             removeAllSelectedCustomers();
                                        }}
                                        className="absolute left-2 text-input-default group-focus-within:text-input-active"
                                   >
                                        <XCircleOutlineIcon />
                                   </button>
                              )}
                         </div>

                    </div>

                    <div
                         className={clsx('absolute text-xs transition-all duration-100', {
                              '-top-3 right-8 bg-back-surface px-1 text-input-active': items.length > 0 || !!inputValue,
                              'right-8 top-1/2 -translate-y-1/2 bg-transparent text-input-default':
                                   items.length === 0 && !inputValue,
                         })}
                    >
                         <span className="">{placeholder}</span>
                    </div>
               </button>
          </div>
     );
};

export default SearchInput;
