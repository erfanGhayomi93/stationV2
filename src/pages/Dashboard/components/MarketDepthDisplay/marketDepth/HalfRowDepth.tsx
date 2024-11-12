import { FC, useMemo, useState } from "react";
import { IHalfRowDepth } from ".";
import clsx from "clsx";
import { sepNumbers } from "@methods/helper";
import { MoreStatusIcon, UpFillArrowIcon } from "@assets/icons";
import Popup from "@components/popup";
// import { Virtuoso } from "react-virtuoso";



interface IHalfRowDepthProps {
    side: TSide;
    data: IHalfRowDepth;
    isInRange: boolean;
    isMarketDepth?: boolean,
    clickPrice?: (value: number, side?: TSide) => void
    clickVolume?: (value: number, side?: TSide) => void;
    clickTotalUpQueue?: (side: TSide) => void
}


const HalfRowDepth: FC<IHalfRowDepthProps> = ({
    data: { count, percent, price, volume, children },
    isInRange,
    side,
    isMarketDepth,
    clickPrice,
    clickVolume,
    clickTotalUpQueue
}) => {

    const [isOpenChild, setisOpenChild] = useState(false)


    const pickupPopup = useMemo(() => {
        return (
            <Popup
                margin={{
                    y: 5,
                    x: side === "Buy" ? 0 : -80,
                }}
                renderer={({ setOpen }) => (
                    <div className="rtl text-nowrap rounded-md bg-tooltip-back text-tooltip-content shadow-E6 flex flex-col px-3 py-2 gap-y-1 text-xs min-w-max">
                        <span
                            className="hover:text-button-info-hover cursor-pointer transition-colors"
                            onClick={() => {
                                clickPrice?.(price, 'Buy')
                                clickVolume?.(volume, 'Buy')
                                setOpen(false)
                            }}
                        >
                            خرید
                        </span>
                        <span
                            className="hover:text-button-info-hover cursor-pointer transition-colors"
                            onClick={() => {
                                clickPrice?.(price, 'Sell')
                                clickVolume?.(volume, 'Sell')
                                setOpen(false)
                            }}
                        >
                            فروش
                        </span>
                        <span
                            className="hover:text-button-info-hover cursor-pointer transition-colors"
                            onClick={() => {
                                clickTotalUpQueue?.(side)
                                setOpen(false)
                            }}
                        >
                            جمع کردن صف
                        </span>
                    </div>
                )}
            >
                {({ setOpen, open }) => (
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setOpen(!open)}>
                        <MoreStatusIcon width={18} height={18} className="text-icon-default" />
                    </button>
                )}
            </Popup>
        )
    }, [price])


    //     const childUi = useMemo(() => {
    //         return (
    // 
    //             < div style={{ height: 33 * (children?.length || 0) }} >
    //                 <Virtuoso
    //                     data={children}
    //                     itemContent={(index, child) => (
    //                         <div key={index} className={clsx("flex justify-between gap-x-1 px-2 items-center w-full border-b border-line-div-3 py-2", {
    //                             "flex-row-reverse pl-7": side === "Sell",
    //                             "flex-row pr-7": side === "Buy",
    //                             "opacity-40": !isInRange,
    //                         })}>
    //                             <span
    //                                 className={clsx("w-1/3 text-content-paragraph", {
    //                                     "text-right": side === "Buy",
    //                                     "text-left": side === "Sell",
    //                                 })}
    //                             >
    //                                 {sepNumbers(child.count)}
    //                             </span>
    //                             <span className="text-content-title text-center w-1/3">{sepNumbers(child.volume)}</span>
    //                             <span className={clsx("w-1/3", {
    //                                 "text-content-success-buy text-left": side === "Buy",
    //                                 "text-content-error-sell text-right": side === "Sell"
    //                             })}>
    //                                 {sepNumbers(child.price)}
    //                             </span>
    //                         </div>
    //                     )}
    //                     totalCount={children?.length}
    //                 />
    //             </div >
    //         )
    //     }, [children, side, isInRange]);


    return (
        <div className={clsx('text-xs group', {
        })}>
            <div className="relative w-full border-b border-line-div-3 group-last:border-none py-2">
                <div
                    className={clsx("h-5 rounded absolute transition-colors", {
                        "bg-back-green left-0": side === "Buy",
                        "bg-back-red right-0": side === "Sell",
                    })}
                    style={{ width: `${(percent || 0) * 100}%` }}
                ></div>

                <div className={clsx("flex justify-between gap-x-1 py-1 h-full items-center w-full relative", {
                    "opacity-40": !isInRange,
                    "flex-row-reverse": side === "Sell"
                })}>

                    {pickupPopup}

                    {
                        isMarketDepth && (
                            <div className={clsx("flex", {
                                "flex-row-reverse": side === "Sell"
                            })}>

                                <button
                                    disabled={count === 1}
                                    onClick={() => setisOpenChild(!isOpenChild)}

                                >

                                    <UpFillArrowIcon className={clsx("text-icon-default transition-transform", {
                                        "rotate-180": !isOpenChild,
                                        "opacity-40": count === 1
                                    })} />
                                </button>
                            </div>
                        )
                    }

                    <span
                        className={clsx("w-1/3 text-content-paragraph", {
                            "text-right": side === "Buy",
                            "text-left": side === "Sell",
                        })}
                        onClick={() => clickPrice?.(count)}
                    >
                        {count ? sepNumbers(count) : '-'}
                    </span>

                    <span
                        className="text-content-title text-center w-1/3 cursor-pointer"
                        onClick={() => clickVolume?.(volume)}
                    >
                        {volume ? sepNumbers(volume) : '-'}
                    </span>

                    <span
                        className={clsx("w-1/3 cursor-pointer", {
                            "text-content-success-buy text-left": side === "Buy",
                            "text-content-error-sell text-right": side === "Sell"
                        })}
                        onClick={() => clickPrice?.(price)}
                    >
                        {price ? sepNumbers(price) : "-"}
                    </span>
                </div>
            </div>


            {
                isOpenChild && (
                    <div>
                        {
                            children?.map((child, ind) => (
                                <div key={ind} className={clsx("flex justify-between gap-x-1 items-center w-full border-b border-line-div-3 py-2", {
                                    "flex-row-reverse pl-7": side === "Sell",
                                    "flex-row pr-7": side === "Buy",
                                    "opacity-40": !isInRange,
                                })}>
                                    <span
                                        className={clsx("w-1/3 text-content-paragraph", {
                                            "text-right": side === "Buy",
                                            "text-left": side === "Sell",
                                        })}

                                    >
                                        {sepNumbers(child.count)}
                                    </span>
                                    <span
                                        className="text-content-title text-center w-1/3 cursor-pointer"
                                        onClick={() => clickVolume?.(child.volume)}
                                    >
                                        {sepNumbers(child.volume)}
                                    </span>
                                    <span className={clsx("w-1/3 cursor-pointer", {
                                        "text-content-success-buy text-left": side === "Buy",
                                        "text-content-error-sell text-right": side === "Sell"
                                    })}
                                        onClick={() => clickPrice?.(child.price)}
                                    >
                                        {sepNumbers(child.price)}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }


        </div >
    )
}

export default HalfRowDepth