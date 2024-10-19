

import Input from "@components/inputs";
import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC, useState } from "react";
import { useBuySellContext } from "../../context/buySellContext";


interface IPriceProps {
    minTradeQuantity?: number;
    maxTradeQuantity?: number;
}

const Quantity‌: FC<IPriceProps> = ({ minTradeQuantity, maxTradeQuantity }) => {
    const [value, setValue] = useState("");

    const { quantity, setQuantity } = useBuySellContext()



    return (
        <div className="flex-1">
            <FieldInput
                value={String(quantity)}
                onChangeValue={value => {
                    setQuantity(+value)
                }}
                placeholder="تعداد"
                upTickValue={maxTradeQuantity}
                downTickValue={minTradeQuantity}
                variant="advanced"
                type="text"
            />
        </div>
    );
};

export default Quantity‌;
