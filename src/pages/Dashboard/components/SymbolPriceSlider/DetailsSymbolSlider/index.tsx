import { numFormatter, sepNumbers } from "@methods/helper"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface IDetailsSymbolSliderProps {
    firstTradedPrice: number;
    closingPrice: number;
    threeMonthEfficiency: string;
    oneMonthEfficiency: string;
    LowThreshold: string;
    HighThreshold: string;
    tommorowLowThreshold: string;
    tommorowHighThreshold: string;
    totalTradeValue: number;
    TickPrice: string
}

interface dataType {
    title: string;
    value: number | string;
    formatter?: (value: number | string) => string;
}

export const DetailsSymbolSlider: FC<IDetailsSymbolSliderProps> = ({
    firstTradedPrice,
    closingPrice,
    threeMonthEfficiency,
    oneMonthEfficiency,
    LowThreshold,
    HighThreshold,
    tommorowLowThreshold,
    tommorowHighThreshold,
    TickPrice,
    totalTradeValue
}) => {

    const { t } = useTranslation()


    const data: dataType[][] = [
        [{
            title: t("detailsSymbol.firstTradedPrice"),
            value: firstTradedPrice,
            formatter: (value) => sepNumbers(value)
        },
        {
            title: t("detailsSymbol.closingPrice"),
            value: closingPrice,
            formatter: (value) => sepNumbers(value)
        }],
        [{
            title: t("detailsSymbol.LowHighThreshold"),
            value: LowThreshold,
            formatter: () => LowThreshold ? `${sepNumbers(LowThreshold)}-${sepNumbers(HighThreshold)}` : '−'
        },
        {
            title: t("detailsSymbol.LowHighThreshold"),
            value: tommorowLowThreshold,
            formatter: () => tommorowLowThreshold ? `${sepNumbers(tommorowLowThreshold)}-${sepNumbers(tommorowHighThreshold)}` : "−"
        }],
        [{
            title: t("detailsSymbol.totalTradeValue"),
            value: totalTradeValue,
            formatter: (value) => numFormatter(Number(value))
        },
        {
            title: t("detailsSymbol.TickPrice"),
            value: TickPrice,
        }],
        [{
            title: t("detailsSymbol.oneMonthEfficiency"),
            value: oneMonthEfficiency,
        },
        {
            title: t("detailsSymbol.threeMonthEfficiency"),
            value: threeMonthEfficiency,
        }]
    ]


    return (
        <div className="mt-2">

            {
                data.map((item, index) => (
                    <div key={index} className="flex py-3 mx-3 last:border-none border-b border-line-div-3 text-xs">
                        {
                            item.map((child, ind) => (
                                <div key={ind} className="flex justify-between flex-1 odd:pl-3 even:pr-3 odd:border-l border-line-div-3">
                                    <span className="text-content-paragraph">{child.title}:</span>
                                    <span className="text-content-title ltr">{child?.formatter ? child.formatter(child.value) || "−" : child.value || "−"}</span>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}
