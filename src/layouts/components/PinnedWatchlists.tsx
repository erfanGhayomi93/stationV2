import { Fragment } from "react/jsx-runtime"
import LastPriceTitle, { ILastPriceTitleProps } from "@components/LastPriceTitle"
import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { PinnedIcon, UpArrowIcon } from "@assets/icons"
import Dropdown from "@uiKit/Dropdown"



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

const PinnedWatchlists = () => {
    const [isLaptop, setIsLaptop] = useState(false);

    const [selectedItem, setselectedItem] = useState("222")

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const refDropdown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px) and (max-width: 1440px)');
        setIsLaptop(mediaQuery.matches);
    }, []);


    return (
        <div className="flex items-center">
            <PinnedIcon className="text-icon-warning" />

            <div className='flex items-center h-full'>
                {
                    initData
                        .slice(0, isLaptop ? 2 : 4)
                        .map((item) => (
                            <Fragment key={item.symbolISIN}>
                                <div className={clsx('px-3 last:pl-0 h-full flex items-center gap-x-1 transition-colors cursor-pointer')}>
                                    <LastPriceTitle
                                        {...item}
                                        onClick={() => setselectedItem(item.symbolISIN)}
                                        isSelected={selectedItem === item.symbolISIN}
                                    />
                                </div>
                            </Fragment>
                        ))
                }
            </div>

            <div
                ref={refDropdown}
            >
                <button
                    className='p-3 flex items-center rounded-lg'
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
                            closeDropDowns={() => setIsDropdownOpen(false)}
                            data={initData}
                            isDropdownOpen={isDropdownOpen}
                            classes={{ position: "bottom-10 left-0" }}
                            animate="fadeInUp"
                            getLabel={
                                (options) => (
                                    <LastPriceTitle
                                        {...options}
                                        // onClick={handleClickSymbol}
                                        isSelected={selectedItem === options.symbolISIN}
                                    />
                                )
                            }
                        />
                    )
                }

            </div>

        </div>
    )
}

export default PinnedWatchlists