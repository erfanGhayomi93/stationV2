

import Input from "@components/inputs";
import { useState } from "react";

const Credit = () => {
    const [value, setValue] = useState("");



    return (
        <div className="flex-1">
            <Input
                value={value}
                onChange={(v) => setValue(v)}
                placeholder={"اعتبار"}
                maxLength={10}
            />
        </div>
    );
};

export default Credit;
