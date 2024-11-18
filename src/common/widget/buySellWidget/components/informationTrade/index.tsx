import { MoreInformationIcon } from "@assets/icons"
import { useCommission, useDrawValue, useTotalvalue } from "@hooks/useCommissionValue"
import { sepNumbers } from "@methods/helper"
import { useBuySellContext } from "../../context/buySellContext"
import { FC } from "react"
import Tippy from "@tippyjs/react"

interface InformationTradeProps {
    marketUnit?: TMarketUnit
}
const InformationTrade: FC<InformationTradeProps> = ({ marketUnit }) => {

    const { price, quantity, side } = useBuySellContext()

    const { totalValueWithCommissionValue, totalValueWithoutCommissionValue } = useTotalvalue({ price, side, marketUnit, quantity, contractSize: 1 })
    const drawValue = useDrawValue({ price, side, marketUnit, quantity, contractSize: 1 })
    const { commission } = useCommission({ quantity, price, marketUnit, side, contractSize: 1 });



    return (
        <div>
            <div className="flex justify-between gap-x-2 text-xs">
                <div className="flex gap-x-1 text-content-paragraph">
                    <Tippy className="min-w-80" content={<TooltipOrderInformation
                        commission={commission}
                        totalValueWithCommissionValue={totalValueWithCommissionValue}
                        totalValueWithoutCommissionValue={totalValueWithoutCommissionValue}
                    />} allowHTML>
                        <MoreInformationIcon width={16} height={16} className="text-button-info-default" />
                    </Tippy>
                    <span>مبلغ کل سفارش:</span>
                    <span className="ltr">{sepNumbers(totalValueWithCommissionValue)}</span>
                    <span className="text-content-placeholder">ریال</span>
                </div>

                {
                    side === 'Buy' && (
                        <div className="flex gap-x-2 text-content-paragraph">
                            <span>قیمت سر به سر:</span>
                            <span className="ltr">{sepNumbers(drawValue)}</span>
                            <span className="text-content-placeholder">ریال</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default InformationTrade

interface ITooltipOrderInformationProps {
    commission: number,
    totalValueWithoutCommissionValue: number,
    totalValueWithCommissionValue: number
}

const TooltipOrderInformation: FC<ITooltipOrderInformationProps> = ({ commission, totalValueWithoutCommissionValue, totalValueWithCommissionValue }) => {
    return (
        <div className="text-tooltip-content px-2 rtl">
            <div className="py-2 border-b border-line-div-1 w-full flex flex-col gap-y-2 text-nowrap">
                <div className="flex justify-between">
                    <span>کارمزد معامله:</span>
                    <p className="flex gap-x-1">
                        <span>{sepNumbers(commission)}</span>
                        <span>ریال</span>
                    </p>
                </div>

                <div className="flex justify-between">
                    <span>ارزش معامله(تعداد * قیمت):</span>
                    <p className="flex gap-x-1">
                        <span>{sepNumbers(totalValueWithoutCommissionValue)}</span>
                        <span>ریال</span>
                    </p>
                </div>
            </div>

            <div className="flex justify-between my-2">
                <span>مبلغ کل سفارش:</span>
                <p className="flex gap-x-1">
                    <span>{sepNumbers(totalValueWithCommissionValue)}</span>
                    <span>ریال</span>
                </p>
            </div>
        </div>
    )
}