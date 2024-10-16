

import Input from "@components/inputs";
import { useState } from "react";

const Quantity = () => {
    const [value, setValue] = useState("");


    return (
        <div className="flex-1">
            <Input
                value={value}
                onChange={(v) => setValue(v)}
                placeholder={"تعداد"}
                maxLength={10}
            />
        </div>
    );
};

export default Quantity;
