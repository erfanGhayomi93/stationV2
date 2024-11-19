import CheckboxButton from "@uiKit/CheckboxButton"
import { useBuySellContext } from "../../context/buySellContext"

export const ActionAdvance = () => {

    const { isKeepForm, setIsKeepForm } = useBuySellContext()
    return (
        <div className="flex justify-between gap-x-4">
            <CheckboxButton
                checked={isKeepForm}
                label="نگهداری فرم سفارش"
                onChange={() => setIsKeepForm(!isKeepForm)}
                classes={{ label: "text-xs !text-content-paragraph" }}
            />
        </div>
    )
}
