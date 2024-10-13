import { FC } from "react";
import { IHalfRowDepth } from ".";
import clsx from "clsx";
import { sepNumbers } from "@methods/helper";


interface IHalfRowDepthProps {
    side: TSide;
    data: IHalfRowDepth;
    isInRange: boolean;
}


const HalfRowDepth: FC<IHalfRowDepthProps> = ({
    data: { count, percent, price, volume },
    isInRange,
    side
}) => {

    // if (!isInRange) {
    //     return <span>it's not in the range</span>
    // }



    return (
        <div className={clsx('text-xs border-b last:border-none border-line-div-3 pb-3', {

        })}>
            <div className="relative w-full h-full">
                <div
                    className={clsx("rounded h-full absolute transition-colors duration-500", {
                        "bg-back-success-container left-0": side === "Buy",
                        "bg-back-error-container right-0": side === "Sell",
                    })}
                    style={{ width: `${percent * 100}%` }}
                ></div>

                <div className={clsx("flex justify-between px-2 py-1 h-full items-center group w-full relative", {
                    "opacity-40": !isInRange
                })}>
                    <span
                        className={clsx("text-right w-1/3 text-content-paragraph", {
                        })}
                    >
                        {sepNumbers(count)}
                    </span>
                    <span className="text-content-title text-center w-1/3">{sepNumbers(volume)}</span>
                    <span className={clsx(" w-1/3 text-left", {
                        "text-content-success-buy ": side === "Buy",
                        "text-content-error-sell": side === "Sell"
                    })}>
                        {sepNumbers(price)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HalfRowDepth