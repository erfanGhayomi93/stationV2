

import Input from "@components/inputs";
import SelectInput from "@uiKit/Inputs/SelectInput";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type validity = 'Day' | 'Week' | 'Month' | 'GoodTillDate' | 'FillAndKill' | 'GoodTillCancelled';


const Credit = () => {
    const [value, setValue] = useState({ id: '1', label: "Day" });

    const { t } = useTranslation()



    return (
        <div className="flex-1">
            <SelectInput
                onChange={(item) => setValue(item)}
                items={VALIDITY_OPTIONS.map(item => ({ id: String(item.id), label: t(`BSValidity.${item.value as validity}`) }))}
                placeholder="اعتبار"
            />
        </div>
    );
};

export default Credit;


export const VALIDITY_OPTIONS = [
    {
        id: 1,
        value: 'Day',
        validityDate: dayjs().format('YYYY-MM-DD'),
    },
    { id: 2, title: 'Week', value: 'Week', validityDate: dayjs().add(1, 'week').format('YYYY-MM-DD') },
    { id: 3, title: 'Month', value: 'Month', validityDate: dayjs().add(1, 'month').format('YYYY-MM-DD') },
    {
        id: 4,
        value: 'GoodTillDate',
        validityDate: dayjs().format('YYYY-MM-DD'),
    },
    {
        id: 5,
        value: 'FillAndKill',
        validityDate: null,
    },
    {
        id: 6,
        value: 'GoodTillCancelled',
        validityDate: null,
    },
];
