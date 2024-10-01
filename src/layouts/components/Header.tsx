import clsx from 'clsx'
import LastPriceTitle, { ILastPriceTitleProps } from '@components/LastPriceTitle'
import { CloseIcon, UpArrowIcon } from '@assets/icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import ProfileDropdown from './ProfileDropdown';
import Dropdown from '@uiKit/Dropdown';
import SearchSymbol from '@components/searchSymbol';

const initData: ILastPriceTitleProps[] = [
    {
        lastPrice: 56454,
        lastPriceVar: 3,
        symbolTitle: "خساپا",
        isSelected: false,
        symbolISIN: "11111111111111"
    },
    {
        lastPrice: 56454,
        lastPriceVar: 0,
        symbolTitle: "شستا",
        isSelected: false,
        symbolISIN: "222"
    },
    {
        lastPrice: 4234,
        lastPriceVar: -2,
        symbolTitle: "ریشمک",
        isSelected: false,
        symbolISIN: "3333"
    },
    {
        lastPrice: 5342,
        lastPriceVar: -1.6,
        symbolTitle: "1خساپا",
        isSelected: false,
        symbolISIN: "4441"
    },
    {
        lastPrice: 56454,
        lastPriceVar: 3,
        symbolTitle: "خساپا1",
        isSelected: false,
        symbolISIN: "111111111111111"
    },
    {
        lastPrice: 56454,
        lastPriceVar: 0,
        symbolTitle: "شستا1",
        isSelected: false,
        symbolISIN: "2221"
    },
    {
        lastPrice: 4234,
        lastPriceVar: -2,
        symbolTitle: "ریشمک1",
        isSelected: false,
        symbolISIN: "33331"
    },
    {
        lastPrice: 5342,
        lastPriceVar: -1.6,
        symbolTitle: "خساپا1",
        isSelected: false,
        symbolISIN: "4441"
    },
    {
        lastPrice: 56454,
        lastPriceVar: 3,
        symbolTitle: "خساپا2",
        isSelected: false,
        symbolISIN: "1111111111111112"
    },
    {
        lastPrice: 56454,
        lastPriceVar: 0,
        symbolTitle: "شستا2",
        isSelected: false,
        symbolISIN: "22212"
    },
    {
        lastPrice: 4234,
        lastPriceVar: -2,
        symbolTitle: "ریشمک2",
        isSelected: false,
        symbolISIN: "333312"
    },
    {
        lastPrice: 5342,
        lastPriceVar: -1.6,
        symbolTitle: "خساپا2",
        isSelected: false,
        symbolISIN: "44412"
    }
]


const HeaderLayout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const [isLaptop, setIsLaptop] = useState(false);

    const [selectedItem, setselectedItem] = useState("222")

    const [data, setData] = useState(initData)

    const [selectedSymbol, setSelectedSymbol] = useState<SearchSymbol[] | null>(null)

    const refDropdown = useRef<HTMLDivElement>(null)

    const handleClickSymbol = (symbolISIN: string) => {

        const symbol = data.find((item) => item.symbolISIN === symbolISIN) as ILastPriceTitleProps

        const dataa = data.filter(item => item.symbolISIN !== symbolISIN)

        setData([symbol, ...dataa]);

        setselectedItem(symbolISIN)
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
                    >
                        <UpArrowIcon
                            className={clsx('text-icon-default h-min transition-transform', {
                                "rotate-180": !isDropdownOpen,
                            })}
                        />
                    </button>

                    {
                        !!isDropdownOpen && (
                            <Dropdown<ILastPriceTitleProps>
                                ref={refDropdown}
                                isDropdownOpen={isDropdownOpen}
                                closeDropDowns={() => setIsDropdownOpen(false)}
                                data={data}
                                classes={{ position: 'top-10 -left-9' }}
                                animate="fadeInDown"
                                getLabel={
                                    (option) => (
                                        <LastPriceTitle
                                            {...option}
                                            onClick={handleClickSymbol}
                                            isSelected={selectedItem === option.symbolISIN}
                                        />
                                    )
                                }
                            />
                        )
                    }
                </div>

                <div className='flex flex-1 items-center h-full'>
                    {
                        data
                            .slice(0, isLaptop ? 4 : 7)
                            .map((item, ind) => (
                                <Fragment key={item.symbolISIN}>

                                    <div className={clsx('px-5 h-full flex items-center transition-colors cursor-pointer', {
                                        'rounded-t-xl bg-back-2': selectedItem === item.symbolISIN
                                    })}>
                                        {
                                            item.symbolISIN === selectedItem && (
                                                <CloseIcon
                                                    width={10}
                                                    height={10}
                                                    className='text-icon-default' />
                                            )
                                        }
                                        <LastPriceTitle
                                            {...item}
                                            onClick={() => setselectedItem(item.symbolISIN)}
                                            isSelected={selectedItem === item.symbolISIN}
                                        />
                                    </div>


                                    <span
                                        className={clsx(`w-[1px] h-4 bg-line-div-1 last:opacity-0 ${(!!data && data[ind + 1]?.symbolISIN === selectedItem) ? "opacity-0" : ""} `, {
                                            "opacity-0": item.symbolISIN === selectedItem
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
                        selectedSymbol={selectedSymbol}
                        setSelectedSymbol={setSelectedSymbol}
                    />
                </div>

                <ProfileDropdown />
            </div>

        </div>
    )
}

export default HeaderLayout;