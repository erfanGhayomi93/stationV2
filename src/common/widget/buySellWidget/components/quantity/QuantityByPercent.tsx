import SelectInput from "@uiKit/Inputs/SelectInput";
import { useBuySellContext } from "../../context/buySellContext";
import FieldInputNumber from "@uiKit/Inputs/FieldInputNumber";
import clsx from "clsx";



const QuantityByPercent = () => {
    const { quantityWithPercent, setQuantityWithBaseOn, setQuantityWithValue , side } = useBuySellContext()


    const TICK_ITEMS: { id: TQuantityBasedOn, label: string }[] = [
        { id: "remain", label: "وجه نقد" },
        { id: "purchasePower", label: "قدرت خرید" },
        { id: "stockDailyCredit", label: "اعتبار" },
    ]


    return (
        <div className="flex gap-x-2 w-full">
            <div className="w-1/3">
                <FieldInputNumber
                    variant="simple"
                    value={quantityWithPercent.percent}
                    onChangeValue={(value) => setQuantityWithValue(value)}
                    placeholder="درصد"
                    direction='left'
                    secondaryPrice={0}
                    bgPlaceholder={clsx({
                        'bg-button-error-bg-selected': side === 'Sell',
                        'bg-button-success-bg-selected': side === 'Buy',
                    })}
                />
            </div>

            <div className="w-2/3">
                <SelectInput
                    value={TICK_ITEMS.find(item => item.id === quantityWithPercent.quantityBasedOn) || { id: '', label: '' }}
                    placeholder="انتخاب کنید"
                    items={TICK_ITEMS}
                    onChange={value => setQuantityWithBaseOn(value.id as TQuantityBasedOn)}
                    bgPlaceholder={clsx({
                        'bg-button-error-bg-selected': side === 'Sell',
                        'bg-button-success-bg-selected': side === 'Buy',
                    })}
                />
            </div>

        </div>
    )
}

export default QuantityByPercent;