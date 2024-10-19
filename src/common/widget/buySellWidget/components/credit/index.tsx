

import SelectInput from "@uiKit/Inputs/SelectInput";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useBuySellContext } from "../../context/buySellContext";
import { useEffect } from "react";



const Credit = () => {
    const { validity, setValidity } = useBuySellContext();


    const { t } = useTranslation()

    useEffect(() => {
        console.log('validity', validity)
    }, [validity])



    return (
        <div className="flex-1">
            <SelectInput
                onChange={(item) => setValidity(item as TValidity)}
                items={VALIDITY_OPTIONS.map(item => ({ value: String(item.value), label: t(`BSValidity.${item.value as TValidity}`) }))}
                placeholder="اعتبار"
                value={validity}
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
