

import Input from "@components/inputs";
import { useState } from "react";

const Price = () => {
    const [value, setValue] = useState("");




    return (
        <div className="flex-1">
            <Input
                value={value}
                onChange={(v) => setValue(v)}
                placeholder={"قیمت"}
                maxLength={10}
            />
        </div>
    );
};

export default Price;
