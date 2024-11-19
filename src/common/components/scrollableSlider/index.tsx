import React, { useRef, useEffect, useCallback } from "react";
import styles from "./ScrollableSlider.module.scss";
import { ArrowLeftIcon } from "@assets/icons";


type IScrollableSliderType = {
    pixelsToScroll?: number,
    children: JSX.Element;
}

const ScrollableSlider: React.FC<IScrollableSliderType> = ({ pixelsToScroll, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);

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
    }, [])

    useEffect(() => {
        handleClassForOverflow();
    }, [children.props.children]);

    const scrollToRight = (pixels: number) => {
        const container = containerRef.current;
        if (!container) return;
        
        const nextElementSiblingSvg = container?.nextElementSibling?.firstElementChild
        const previousElementSiblingSvg = container?.previousElementSibling?.firstElementChild
        const scrollLeft = (container.scrollLeft) + (pixels)

        container.scrollLeft += pixels

        const isRightDisabled = scrollLeft + 1 >= 0;
        const isLeftDisabled = Math.abs(scrollLeft) >= container.scrollWidth - container.clientWidth - 1;

        const updateSvgClass = (svgElement: Element | null, isDisabled: boolean) => {
            svgElement?.classList.toggle("text-L-primary-100", isDisabled);
            svgElement?.classList.toggle("dark:text-D-primary-100", isDisabled);
            svgElement?.classList.toggle("text-L-primary-50", !isDisabled);
            svgElement?.classList.toggle("dark:text-D-primary-50", !isDisabled);
        };

        updateSvgClass(previousElementSiblingSvg as Element, isRightDisabled);
        updateSvgClass(nextElementSiblingSvg as Element, isLeftDisabled);
    };

    return (
        <div
            className={styles["slider-container"]}
        >
            <div className="">
                <ArrowLeftIcon
                    width="1.5rem"
                    height="1.5rem"
                    className={"mx-2 cursor-pointer text-icon-primary rotate-180"}
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
                <ArrowLeftIcon
                    width="1.5rem"
                    height="1.5rem"
                    className={"cursor-pointer mx-2 text-icon-primary"}
                    onClick={prevStock} />
            </div>
        </div>
    );
};

export default ScrollableSlider;