import { FC, useState } from "react";
import { IHalfRowDepth } from ".";
import clsx from "clsx";
import { sepNumbers } from "@methods/helper";
import { UpFillArrowIcon } from "@assets/icons";


interface IHalfRowDepthProps {
    side: TSide;
    data: IHalfRowDepth;
    isInRange: boolean;

}


const HalfRowDepth: FC<IHalfRowDepthProps> = ({
    data: { count, percent, price, volume, children },
    isInRange,
    side
}) => {

    const [isOpenChild, setisOpenChild] = useState(false)

    // if (!isInRange) {
    //     return <span>it's not in the range</span>
    // }



    return (
        <div className={clsx('text-xs group', {
        })}>
            <div className="relative w-full border-b border-line-div-3 group-last:border-none  py-2">
                <div
                    className={clsx("h-5 rounded absolute transition-colors", {
                        "bg-back-success-container left-0": side === "Buy",
                        "bg-back-error-container right-0": side === "Sell",
                    })}
                    style={{ width: `${(percent || 0) * 100}%` }}
                ></div>

                <div className={clsx("flex justify-between gap-x-1 px-2 py-1 h-full items-center w-full relative", {
                    "opacity-40": !isInRange,
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
                    <span
                        className={clsx("w-1/3 text-content-paragraph", {
                            "text-right": side === "Buy",
                            "text-left": side === "Sell",
                        })}
                    >
                        {sepNumbers(count)}
                    </span>

                    <span className="text-content-title text-center w-1/3">{sepNumbers(volume)}</span>

                    <span className={clsx(" w-1/3", {
                        "text-content-success-buy text-left": side === "Buy",
                        "text-content-error-sell text-right": side === "Sell"
                    })}>
                        {sepNumbers(price)}
                    </span>
                </div>
            </div>

            {
                isOpenChild && (
                    <div>
                        {
                            children?.map((child, ind) => (
                                <div key={ind} className={clsx("flex justify-between gap-x-1 px-2 items-center w-full border-b border-line-div-3 py-2", {
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
                                    <span className="text-content-title text-center w-1/3">{sepNumbers(child.volume)}</span>
                                    <span className={clsx("w-1/3", {
                                        "text-content-success-buy text-left": side === "Buy",
                                        "text-content-error-sell text-right": side === "Sell"
                                    })}>
                                        {sepNumbers(child.price)}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }


        </div>
    )
}

export default HalfRowDepth