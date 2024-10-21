

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC } from "react";
import { useBuySellContext } from "../../context/buySellContext";


interface IPriceProps {
    downTickValue?: number;
    upTickValue?: number;
}

const Price: FC<IPriceProps> = ({ downTickValue, upTickValue }) => {

    const { price, setPrice } = useBuySellContext()


    return (
        <div className="flex-1">
            <FieldInput
                value={price}
                onChangeValue={value => {
                    setPrice(+value)
                }}
                placeholder="قیمت"
                upTickValue={upTickValue}
                downTickValue={downTickValue}
                variant="advanced"
                type="number"
                selectIcon="lock"
            />
        </div>
    );
};

export default Price;
