

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC } from "react";
import { useBuySellContext } from "../../context/buySellContext";
import PriceByPercent from "./PriceByPercent";
import ToggleSwitch from "@uiKit/ToggleSwitch";


interface IPriceProps {
    downTickValue?: number;
    upTickValue?: number;
}

const Price: FC<IPriceProps> = ({ downTickValue, upTickValue }) => {

    const { price, setPrice, isPercentPrice, setIsPercentPrice } = useBuySellContext()


    return (
        <div className="flex-1 flex gap-x-1">

            {!isPercentPrice &&
                <FieldInput
                    value={price}
                    onChangeValue={value => setPrice(+value)}
                    placeholder="قیمت"
                    upTickValue={upTickValue}
                    downTickValue={downTickValue}
                    variant="advanced"
                    type="number"
                    selectIcon="lock"
                />}

            {isPercentPrice && <PriceByPercent />}

            <ToggleSwitch
                checked={isPercentPrice}
                label="درصدی"
                onChange={() => setIsPercentPrice(!isPercentPrice)}
            />

        </div>
    );
};

export default Price;
