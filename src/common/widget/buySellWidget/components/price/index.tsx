

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC, useState } from "react";


interface IPriceProps {
    downTickValue?: number;
    upTickValue?: number;
}

const Price: FC<IPriceProps> = ({ downTickValue, upTickValue }) => {

    const [value, setValue] = useState("");




    return (
        <div className="flex-1">
            <FieldInput
                onChangeValue={value => {
                    setValue(value)
                }}
                placeholder="قیمت"
                upTickValue={upTickValue}
                downTickValue={downTickValue}
                variant="advanced"
                type="text"
            />
        </div>
    );
};

export default Price;
