import { useTranslation } from "react-i18next"
import clsx from "clsx"
import { sepNumbers } from "@methods/helper"
import { useCallback, useEffect, useRef, useState } from "react";
import { UpArrowIcon } from "@assets/icons";
import Dropdown from "@uiKit/Dropdown";
import { useQueryIndexMarket } from "@api/IndexMarket";
import { subscribeMarketIndices } from "@LS/subscribes";
import { pushEngine } from "@LS/pushEngine";

const MarketIndexes = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { data, isSuccess } = useQueryIndexMarket()

    const { t } = useTranslation()

    const refDropdown = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isSuccess) {
            subscribeMarketIndices([], ({ itemName, changedFields }) => {
                console.log(itemName, changedFields);
            })
        }

        return () => {
            pushEngine.unSubscribe('MarketIndices');
        }

    }, [data, isSuccess])


    const uiIndexes = useCallback((item: IIndexRes) => {

        const changePercent = item ? +item?.changePercent : 0

        return (
            <div
                className={clsx('flex items-center h-full gap-x-1 select-none font-medium w-full justify-between text-xs',)}
                key={item.symbolISIN}
            >
                <span className="ml-2">
                    {t(item.symbolISIN === "IRX6XTPI0006" ? "MarketIndexes.MainIndex" : item.symbolISIN === "IRXZXOCI0006" ? "MarketIndexes.FaraBourseIndex" : "MarketIndexes.HamvaznIndex")}
                    :
                </span>

                <div className="flex gap-x-1 justify-start">
                    <span
                        className={clsx("ltr", {
                            "text-content-success-buy": changePercent > 0,
                            "text-content-error-sell": changePercent < 0,
                        })}>
                        ({!!item && item?.changePercent.toFixed(1) + '%'})
                    </span>

                    <span
                        className={clsx("ltr", {
                            "text-content-success-buy": changePercent > 0,
                            "text-content-error-sell": changePercent < 0,
                        })}
                    >
                        {item && (sepNumbers(item?.indexChange.toFixed()))}
                    </span>

                    <span
                        className={clsx("ltr", {
                            "text-content-success-buy": changePercent > 0,
                            "text-content-error-sell": changePercent < 0,
                        })}
                    >
                        {item && (sepNumbers(item?.lastIndexValueInDay.toFixed()))}
                    </span>
                </div>
            </div>
        )
    }, [data])

    return (
        <div className="flex gap-x-4 text-xs items-center font-medium">
            <div>
                {data
                    ?.filter(item => item.symbolISIN === "IRX6XTPI0006")
                    ?.map(item => uiIndexes(item))}
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
                        <Dropdown<IIndexRes>
                            ref={refDropdown}
                            closeDropDowns={() => setIsDropdownOpen(false)}
                            data={data?.filter(item => item.symbolISIN !== "IRX6XTPI0006") || []}
                            isDropdownOpen={isDropdownOpen}
                            classes={{ position: "bottom-10 left-0" }}
                            animate="fadeInUp"
                            getLabel={
                                (options) => uiIndexes(options)
                            }
                        />
                    )
                }

            </div>
        </div>
    )
}

export default MarketIndexes

