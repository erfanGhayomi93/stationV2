import { useQueryCustomerSearch, useQueryCustomerSearchGroup } from "@api/customer";
import { SearchCustomerGroupsIcon, SearchCustomersIcon } from "@assets/icons";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import useDebounce from "@hooks/useDebounce";
import clsx from "clsx";
import { useCallback, useState } from "react"



const CustomersSearch = () => {
    const [value, setValue] = useState([])

    const [query, setQuery] = useState('')

    const debouncedTerm = useDebounce(query, 400);

    const [isGroup, setIsGroup] = useState(false)


    const { data: customerSearchData } = useQueryCustomerSearch(debouncedTerm)

    const { data: customerSearchGroupData } = useQueryCustomerSearchGroup(debouncedTerm)


    const createOptions = useCallback(
        (customerSearchData ?: ICustomerAdvancedSearchRes[]) => customerSearchData?.map((customer) => (
            <ComboboxOption
                key={customer.customerISIN}
                value={customer}
                className={(_bag) =>
                    clsx(
                        'text-sm text-content-paragraph py-3 px-1 hover:bg-back-primary-container transition-colors rounded-md cursor-pointer',
                        { 'bg-back-primary-container': _bag.focus }
                    )
                }
            >
                {customer.title}
            </ComboboxOption>
        )),
        [])

    const handleOptions = useCallback(() => createOptions(customerSearchData),[customerSearchData])



    return (
        <div className="flex gap-x-3">
            <Combobox
                immediate
                value={value}
                onChange={(symbol) => {
                    if (symbol) {
                        setValue(symbol)
                        setQuery('')
                    }
                }}
            >

                <div className='relative flex-1'>
                    <ComboboxInput
                        // aria-label={searchSymbo l?.symbolTitle || ""}
                        displayValue={(symbol: SearchSymbol) => symbol?.symbolTitle}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className={clsx(
                            'w-full h-10 rounded-lg border-none bg-back-2 py-1.5 pr-8 pl-3 text-content-title rtl placeholder:text-content-placeholder placeholder:text-sm',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2'
                        )}
                        autoComplete='off'
                        placeholder={!isGroup ? 'جستجوی نماد' : 'جستجوی گروه'}
                    />
                </div>

                <ComboboxOptions anchor="bottom" className="border w-[var(--input-width)] rounded-xl bg-back-surface p-2 mt-1 empty:invisible rtl z-50">
                    <div className='max-h-80 overflow-y-auto'>
                        {handleOptions()}
                    </div>
                </ComboboxOptions>

            </Combobox>

            <button className={clsx("p-2 rounded-md border transition-colors", {
                "border-icon-default": isGroup,
                "border-icon-primary bg-button-primary-selected": !isGroup
            })}
                onClick={() => setIsGroup(false)}
            >

                <SearchCustomersIcon className={clsx({
                    "text-icon-default": isGroup,
                    "text-icon-primary": !isGroup
                })} />

            </button>

            <button className={clsx("p-2 rounded-md border transition-colors", {
                "border-icon-default": !isGroup,
                "border-icon-primary bg-button-primary-selected": isGroup
            })}
                onClick={() => setIsGroup(true)}
            >
                <SearchCustomerGroupsIcon className={clsx({
                    "text-icon-default": !isGroup,
                    "text-icon-primary": isGroup
                })} />
            </button>
        </div>
    )
}

export default CustomersSearch