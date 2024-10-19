

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC, useEffect } from "react";
import { useBuySellContext } from "../../context/buySellContext";


interface IPriceProps {
    downTickValue?: number;
    upTickValue?: number;
}

const Price: FC<IPriceProps> = ({ downTickValue, upTickValue }) => {

    const { price, setPrice } = useBuySellContext()

    useEffect(() => {
        console.log('price', price)
    }, [price])


    return (
        <div className="flex-1">
            <FieldInput
                value={String(price)}
                onChangeValue={value => {
                    console.log("value", value)
                    setPrice(Number(value))
                }}
                placeholder="قیمت"
                upTickValue={upTickValue}
                downTickValue={downTickValue}
                variant="advanced"
                type="amount"
            />
        </div>
    );
};

export default Price;
