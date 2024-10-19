

import Input from "@components/inputs";
import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC, useState } from "react";


interface IPriceProps {
    minTradeQuantity?: number;
    maxTradeQuantity?: number;
}

const Quantity‌: FC<IPriceProps> = ({ minTradeQuantity, maxTradeQuantity }) => {
    const [value, setValue] = useState("");


    return (
        <div className="flex-1">
            <FieldInput
                onChangeValue={value => {
                    setValue(value)
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
