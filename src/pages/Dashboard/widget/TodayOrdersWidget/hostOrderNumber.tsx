import { CustomCellRendererProps } from "@ag-grid-community/react"
import { sepNumbers } from "@methods/helper"
import Tippy from "@tippyjs/react"
import { FC } from "react"



const HostOrderNumberRenderer = ({ data }: CustomCellRendererProps<IOpenOrder>) => {
    return (
        <Tippy className="rtl" allowHTML content={<TooltipOrderInformation
            hostOrderNumber={data?.hostOrderNumber}
            orderPlaceInPrice={data?.orderPlaceInPrice}
            orderVolumeInPrice={data?.orderVolumeInPrice}
        />} >
            <span>
                {data?.hostOrderNumber ? sepNumbers(data?.hostOrderNumber) : '-'}
            </span>
        </Tippy >
    )
}

export default HostOrderNumberRenderer;

interface ITooltipOrderInformationProps {
    hostOrderNumber?: string,
    orderPlaceInPrice?: number,
    orderVolumeInPrice?: number
}

const TooltipOrderInformation: FC<ITooltipOrderInformationProps> = ({ hostOrderNumber, orderPlaceInPrice, orderVolumeInPrice }) => {
    return (
        <div className="text-tooltip-content px-2 rtl min-w-40">
            <div className="py-2 w-full flex flex-col gap-y-2 text-nowrap">
                <div className="flex justify-between">
                    <span>جایگاه ثبت:</span>
                    <span>{sepNumbers(hostOrderNumber)}</span>
                </div>

                <div className="flex justify-between">
                    <span>جایگاه لحظه‌ای:</span>
                    <span>{sepNumbers(orderPlaceInPrice)}</span>
                </div>

                <div className="flex justify-between">
                    <span>جایگاه حجمی:</span>
                    <span>{sepNumbers(orderVolumeInPrice)}</span>
                </div>
            </div>
        </div>
    )
}