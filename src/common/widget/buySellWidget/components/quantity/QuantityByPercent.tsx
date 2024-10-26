import FieldInput from "@uiKit/Inputs/FieldInput";
import SelectInput from "@uiKit/Inputs/SelectInput";
import { useBuySellContext } from "../../context/buySellContext";



const QuantityByPercent = () => {
    const { quantityWithPercent, isPercentQuantity, setQuantityWithPercent, setIsPercentQuantity } = useBuySellContext()




    const TICK_ITEMS = [
        { id: "remain", label: "وجه نقد" },
        { id: "purchasePower", label: "قدرت خرید" },
        { id: "stockDailyCredit", label: "اعتبار" },
    ]



    return (
        <div className="flex gap-x-2 w-full">
            <div className="w-1/3">
                <FieldInput
                    variant="simple"
                    value={`${quantityWithPercent.percent}`}
                    onChangeValue={value => setQuantityWithPercent({
                        percent: +value,
                        quantityBasedOn: quantityWithPercent.quantityBasedOn
                    })}
                    type='number'
                    placeholder="درصد"
                    direction='left'
                    isPercentage={true}
                    secondaryPrice={0}
                />
            </div>

            <div className="w-2/3">
                <SelectInput
                    value={TICK_ITEMS.find(item => item.id === quantityWithPercent.quantityBasedOn) || { id: '', label: '' }}
                    placeholder="انتخاب کنید"
                    items={TICK_ITEMS}
                    onChange={value => setQuantityWithPercent({
                        percent: quantityWithPercent.percent,
                        quantityBasedOn: value.id
                    })}
                />
            </div>

        </div>
    )
}

export default QuantityByPercent;