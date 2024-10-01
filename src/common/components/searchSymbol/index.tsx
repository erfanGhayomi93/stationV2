import { useQuerySearchHistory, useQuerySymbolSearch } from '@api/Symbol'
import { SearchInputIcon, SpinnerIcon } from '@assets/icons'
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import useDebounce from '@hooks/useDebounce'
import { FC, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

interface ISymbolSearchProps {
	searchSymbol: SearchSymbol | null
	setSearchSymbol: (symbol: SearchSymbol | null) => void;
}


const SymbolSearch: FC<ISymbolSearchProps> = ({ searchSymbol, setSearchSymbol }) => {

	const [query, setQuery] = useState('')

	const debouncedTerm = useDebounce(query, 400);

	const { data, refetch, isFetching: isFetchingSearch } = useQuerySymbolSearch(debouncedTerm);

	const { data: historyData } = useQuerySearchHistory();


	useEffect(() => {
		if (debouncedTerm.length > 2) refetch();
	}, [debouncedTerm]);

	const handleOptions = useCallback(() => {

		if (!debouncedTerm.length) {
			return createOptions(historyData)
		}
		else if (debouncedTerm.length > 2 && !!data?.length) {
			return createOptions(data)
		}
		else if (debouncedTerm.length > 0 && debouncedTerm.length <= 2) {
			return createNotice('حداقل سه کاراکتر وارد نمایید.')
		}
		else if (!isFetchingSearch) {
			return createNotice('نتیجه ای یافت نشد.')
		}
		return null

	}, [historyData, data, debouncedTerm, isFetchingSearch])


	const createOptions = useCallback(
		(filteredPeople?: SearchSymbol[]) => filteredPeople?.map((symbol) => (
			<ComboboxOption
				key={symbol.symbolISIN}
				value={symbol}
				className={(_bag) =>
					clsx(
						'text-sm text-content-paragraph py-3 px-1 hover:bg-back-primary-container transition-colors rounded-md cursor-pointer',
						{ 'bg-back-primary-container': _bag.focus }
					)
				}
			>
				{symbol.symbolTitle}
			</ComboboxOption>
		)),
		[])

	const createNotice = useCallback(
		(text: string) => {
			return (
				<div className='text-content-paragraph'>
					{text}
				</div>
			)
		}, [])



	return (
		<Combobox
			immediate
			value={searchSymbol}
			onChange={(symbol) => {
				if (symbol) {
					setSearchSymbol(symbol)
					setQuery('')
				}
			}}
		>
			<div className='relative'>
				<ComboboxInput
					aria-label={searchSymbol?.symbolTitle || ""}
					displayValue={(symbol: SearchSymbol) => symbol?.symbolTitle}
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					className={clsx(
						'w-full rounded-lg border-none bg-back-2 py-1.5 pr-8 pl-3 text-content-title rtl placeholder:text-content-placeholder placeholder:text-sm',
						'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2'
					)}
					autoComplete='off'
					placeholder='جستجوی نماد'
				/>

				<div className="group absolute top-2 right-0 px-2.5">
					<SearchInputIcon className="size-4 text-icon-default" />
				</div>


				<div className={clsx('group absolute top-2 left-0 px-2.5', {
					'opacity-0': !isFetchingSearch,
					'opacity-100': isFetchingSearch,
				})}>
					<SpinnerIcon className="size-5 text-icon-default" />
				</div>

			</div>

			{
				!!handleOptions() && (
					<ComboboxOptions anchor="bottom" className="border w-[var(--input-width)] rounded-xl bg-back-surface p-2 mt-1 empty:invisible rtl z-50">
						<div className='max-h-80 overflow-y-auto'>
							{handleOptions()}
						</div>
					</ComboboxOptions>
				)
			}

		</Combobox>
	)
}

export default SymbolSearch;