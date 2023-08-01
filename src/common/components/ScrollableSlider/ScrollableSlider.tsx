import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./ScrollableSlider.module.scss";
import { ArrowLeftSlider, ArrowRightSlider } from "src/common/icons";
import clsx from "clsx";


type IScrollableSliderType = {
    pixelsToScroll?: number,
    children: JSX.Element;
}

const ScrollableSlider: React.FC<IScrollableSliderType> = ({ pixelsToScroll, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDisable, setIsDisable] = useState({ left: false, right: true })

    const calcPixelsToScroll = (): number => {
        const container = containerRef.current;
        if (!container) return 50;
        const lastElementChildWidth = container.lastElementChild?.clientWidth || 50  //50 is default if container to be undefined
        return pixelsToScroll ? pixelsToScroll : lastElementChildWidth + 10     //10 is margin of arrow
    }

    const prevStock = () => {
        scrollToRight(-calcPixelsToScroll());
    };

    const nextStock = () => {
        scrollToRight(calcPixelsToScroll()); 
    };

    const handleMouseScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY < 0) {
            nextStock();
        } else if (event.deltaY > 0) {
            prevStock();
        }
    };

    const handleClassForOverflow = useCallback(() => {
        const container = containerRef.current;
        const parentElement = container?.parentElement;
        const nextElementSibling = container?.nextElementSibling
        const previousElementSibling = container?.previousElementSibling

        if (!container || !parentElement || !nextElementSibling || !previousElementSibling) return;

        const totalSiblingArrow = nextElementSibling.clientWidth + previousElementSibling.clientWidth + 5;

        if (container.clientWidth + totalSiblingArrow >= parentElement.clientWidth) {
            container?.classList.add("overflow-x-scroll")
            nextElementSibling?.classList.add("opacity-1")
            nextElementSibling?.classList.remove("opacity-0")
            previousElementSibling?.classList.add("opacity-1")
            previousElementSibling?.classList.remove("opacity-0")
        } else {
            container?.classList.remove("overflow-x-scroll")
            nextElementSibling?.classList.remove("opacity-1")
            nextElementSibling?.classList.add("opacity-0")
            previousElementSibling?.classList.remove("opacity-1")
            previousElementSibling?.classList.add("opacity-0")
        }
    },
        [],
    )

    useEffect(() => {
        handleClassForOverflow();
    }, [children.props.children]);

    const scrollToRight = (pixels: number) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollLeft = (container.scrollLeft) + (pixels)

        container.scrollLeft += pixels

        const isRightDisabled = scrollLeft + 1 >= 0;
        const isLeftDisabled = Math.abs(scrollLeft) >= container.scrollWidth - container.clientWidth - 1;


        setIsDisable({ left: isLeftDisabled, right: isRightDisabled });
    };

    return (
        <div
            className={styles["slider-container"]}
        >
            <div className="">
                <ArrowRightSlider
                    width="1.5rem"
                    height="1.5rem"
                    className={clsx("mx-2 cursor-pointer", {
                        "text-L-primary-100 dark:text-D-primary-100": isDisable.right,
                        "text-L-primary-50 dark:text-D-primary-50": !isDisable.right,
                    })}
                    onClick={nextStock}
                />
            </div>

            <div
                className={`${styles["stock-container"]}`}
                ref={containerRef}
                onWheel={handleMouseScroll}
            >
                {children}
            </div>

            <div className="">
                <ArrowLeftSlider
                    width="1.5rem"
                    height="1.5rem"
                    className={clsx("cursor-pointer mx-2", {
                        "text-L-primary-100 dark:text-D-primary-100": isDisable.left,
                        "text-L-primary-50 dark:text-D-primary-50": !isDisable.left,
                    })}
                    onClick={prevStock} />
            </div>
        </div>
    );
};

export default ScrollableSlider;