import clsx from 'clsx'
import LastPriceTitle from '@components/LastPriceTitle'
import { CloseIcon, UpArrowIcon } from '@assets/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import ProfileDropdown from './ProfileDropdown';
import Dropdown from '@uiKit/Dropdown';
import SearchSymbol from '@components/searchSymbol';
import { useSymbolManager } from '@zustand/symbol';


const HeaderLayout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const [isLaptop, setIsLaptop] = useState(false);

    const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null)

    const { tabsSymbol, setTabSymbol, selectedSymbol, setSelectedSymbol } = useSymbolManager()

    const refDropdown = useRef<HTMLDivElement>(null)

    const handleClickSymbol = (symbolISIN: string) => {
        let instanceTabSymbol: SearchSymbol[] = [...tabsSymbol]

        const symbol: SearchSymbol | undefined = instanceTabSymbol.find((item) => item.symbolISIN === symbolISIN)
        const otherData = instanceTabSymbol.filter(item => item.symbolISIN !== symbolISIN)

        symbol && setTabSymbol([{ ...symbol }, ...otherData])

        setSelectedSymbol(symbolISIN)

        setIsDropdownOpen(false)
    }

    const handleSetSelectedSymbol = (symbol: SearchSymbol | null) => {
        if (!symbol) return;

        setSearchSymbol(symbol)

        setSelectedSymbol(symbol.symbolISIN)

        const isExist = tabsSymbol.some(item => item.symbolISIN === symbol?.symbolISIN)
        if (isExist) {
            return
        }
        setTabSymbol([...tabsSymbol, { ...symbol }])
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
        setIsLaptop(mediaQuery.matches);
    }, []);

    return (
        <div className='flex justify-between h-full px-4'>

            <div className='flex-1 flex gap-x-2 items-center'>

                <div
                    className='flex items-center'
                    ref={refDropdown}
                >

                    <button
                        className='bg-back-2 p-3 flex items-center rounded-lg'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        disabled={!tabsSymbol.length}
                    >
                        <UpArrowIcon
                            className={clsx('text-icon-default h-min transition-transform', {
                                "rotate-180": !isDropdownOpen,
                                "text-icon-disable" : !tabsSymbol.length
                            })}
                        />
                    </button>

                    {
                        !!isDropdownOpen && (
                            <Dropdown<SearchSymbol>
                                ref={refDropdown}
                                isDropdownOpen={isDropdownOpen}
                                closeDropDowns={() => setIsDropdownOpen(false)}
                                data={tabsSymbol}
                                classes={{ position: 'top-10 -left-9' }}
                                animate="fadeInDown"
                                getLabel={
                                    (option) => (
                                        <LastPriceTitle
                                            PriceVar={option.lastTradedPriceVar}
                                            price={option.lastTradedPrice}
                                            symbolISIN={option.symbolISIN}
                                            symbolTitle={option.symbolTitle}
                                            key={option.symbolISIN}
                                            onClick={handleClickSymbol}
                                            isSelected={selectedSymbol === option.symbolISIN}
                                        />
                                    )
                                }
                            />
                        )
                    }
                </div>

                <div className='flex flex-1 items-center h-full'>
                    {
                        tabsSymbol
                            .slice(0, isLaptop ? 4 : 7)
                            .map((item, ind) => (
                                <Fragment key={item?.symbolISIN || ind}>

                                    <div className={clsx('px-5 h-full flex items-center transition-colors cursor-pointer', {
                                        'rounded-t-xl bg-back-2': selectedSymbol === item?.symbolISIN
                                    })}>
                                        {
                                            item?.symbolISIN === selectedSymbol && (
                                                <CloseIcon
                                                    width={10}
                                                    height={10}
                                                    className='text-icon-default' />
                                            )
                                        }
                                        <LastPriceTitle
                                            PriceVar={item?.lastTradedPriceVar}
                                            price={item?.lastTradedPrice}
                                            symbolISIN={item?.symbolISIN}
                                            symbolTitle={item?.symbolTitle}
                                            key={item?.symbolISIN}
                                            onClick={() => setSelectedSymbol(item?.symbolISIN)}
                                            isSelected={selectedSymbol === item?.symbolISIN}
                                        />
                                    </div>


                                    <span
                                        className={clsx(`w-[1px] h-4 bg-line-div-1 last:opacity-0 ${(!!tabsSymbol && tabsSymbol[ind + 1]?.symbolISIN === selectedSymbol) ? "opacity-0" : ""} `, {
                                            "opacity-0": item?.symbolISIN === selectedSymbol
                                        })}>
                                    </span>

                                </Fragment>
                            ))
                    }
                </div>

            </div>

            <div className='w-1/5 flex gap-x-4 justify-end items-center'>

                <div className='w-80'>
                    <SearchSymbol
                        searchSymbol={searchSymbol}
                        setSearchSymbol={handleSetSelectedSymbol}
                    />
                </div>

                <ProfileDropdown />
            </div>

        </div>
    )
}

export default HeaderLayout;