import i18next from 'i18next';
import { useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Input from 'src/common/components/Input';
import Select, { SelectOption } from 'src/common/components/Select';
import Switcher from 'src/common/components/SwitchButton';
import useCommissionValue from 'src/common/hooks/useCommission/useCommissionValue';
import { CalculatorIcon, ChevronIcon, GearIcon, LockIcon } from 'src/common/icons';
import { useAppValues } from 'src/redux/hooks';
import { sepNumbers } from 'src/utils/helpers';
const people = [{ id: 1, name: 'عادی', value: 'false' }];

const VALIDITY_OPTIONS = [
    {
        id: 1,
        title: 'validity_option_Day',
        value: 'Day',
    },
    { id: 2, title: 'validity_Week', value: 'Week' },
    { id: 3, title: 'validity_Month', value: 'Month' },
    {
        id: 4,
        title: 'validity_GoodTillDate',
        value: 'GoodTillDate',
    },
    {
        id: 5,
        title: 'validity_FillAndKill',
        value: 'FillAndKill',
    },
    {
        id: 6,
        title: 'validity_option_GoodTillCancelled',
        value: 'GoodTillCancelled',
    },
];

const Buy = () => {
    const [selectedPerson, setSelectedPerson] = useState<typeof people[0]>();
    const [validity, setValidity] = useState<typeof VALIDITY_OPTIONS[0]>(VALIDITY_OPTIONS[0]);
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData });
    const { buyCommissionValue } = useCommissionValue({ marketUnit: symbolData?.marketUnit as MarketUnit });

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    //
    return (
        <div className="flex flex-col text-1.2 p-2 h-full relative">
            {/*  */}
            <div className="flex flex-col py-4 gap-2">
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder=" مشتری" />
                    </div>
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="نماد" value={symbolData?.symbolTitle} />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full flex border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <div className="w-full">
                            <Input placeholder="قیمت (ريال)" onChange={(e) => setPrice(+e.target.value)} />
                        </div>
                        <div className="flex w-36 justify-between items-center flex-row-reverse bg-L-gray-150 dark:bg-D-gray-150 border-r border-L-gray-400 dark:border-D-gray-400">
                            <button className="px-2">
                                <LockIcon className="text-L-gray-400 dark:text-D-gray-400" />
                            </button>
                            <span className="flex flex-col w-full ">
                                <button className="flex items-center justify-between px-2 gap-2">
                                    <ChevronIcon className=" text-L-gray-400 dark:text-D-gray-400" />
                                    <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">
                                        {sepNumbers(symbolData?.highThreshold)}
                                    </span>
                                </button>
                                <hr className="border-L-gray-400 dark:border-D-gray-400" />
                                <button className="flex items-center justify-between px-2 gap-2">
                                    <ChevronIcon className="rotate-180 text-L-gray-400 dark:text-D-gray-400" />
                                    <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">
                                        {sepNumbers(symbolData?.lowThreshold)}
                                    </span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full flex border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <div className="w-full">
                            <Input placeholder="تعداد" onChange={(e) => setQuantity(+e.target.value)} />
                        </div>
                        <div className="flex w-36 justify-between items-center flex-row-reverse bg-L-gray-150 dark:bg-D-gray-150 border-r border-L-gray-400 dark:border-D-gray-400">
                            <button className="px-2">
                                <CalculatorIcon className="text-L-gray-400 dark:text-D-gray-400" />
                            </button>
                            <span className="flex flex-col w-full ">
                                <button className="flex items-center justify-between px-2 gap-2">
                                    <ChevronIcon className=" text-L-gray-400 dark:text-D-gray-400" />
                                    <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">
                                        {sepNumbers(symbolData?.maxTradeQuantity)}
                                    </span>
                                </button>
                                <hr className="border-L-gray-400 dark:border-D-gray-400" />
                                <button className="flex items-center justify-between px-2 gap-2">
                                    <ChevronIcon className="rotate-180 text-L-gray-400 dark:text-D-gray-400" />
                                    <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">
                                        {sepNumbers(symbolData?.minTradeQuantity)}
                                    </span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <Select
                        onChange={setValidity}
                        value={i18next.t('BSModal.' + validity?.title)}
                        placeholder="اعتبار"
                        label={<span className="text-L-gray-400 dark:text-D-gray-400">اعتبار : </span>}
                    >
                        {VALIDITY_OPTIONS.map((item, inx) => (
                            <SelectOption
                                key={inx}
                                label={i18next.t('BSModal.' + item.title)}
                                value={item}
                                className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                            />
                        ))}
                    </Select>
                </div>
                <div className="flex w-full gap-4  ">
                    <Select
                        onChange={setSelectedPerson}
                        value={selectedPerson?.name}
                        placeholder="استراتژی"
                        label={<span className="text-L-gray-400 dark:text-D-gray-400">استراتژی : </span>}
                    >
                        {people.map((item, inx) => (
                            <SelectOption key={inx} label={item.name} value={item} className="text-1.2 cursor-default select-none py-1 pl-10 pr-4" />
                        ))}
                    </Select>
                </div>
            </div>

            {/*  */}
            <div className="border-t flex flex-col pt-4 border-L-gray-300  h-full gap-2 ">
                <div className="flex  text-L-gray-400 px-2 gap-16">
                    <div className="flex justify-between items-center text-L-gray-400 w-full">
                        <span>ارزش معامله</span>
                        <span>{sepNumbers(Math.ceil(quantity * price + buyCommissionValue * price * quantity))}</span>
                    </div>{' '}
                    <div className="flex justify-between items-center text-L-gray-400  w-full ">
                        <span>کارمزد معامله</span>
                        <span>{sepNumbers(Math.ceil(buyCommissionValue * price * quantity))}</span>
                    </div>
                </div>
                <div className="flex  text-L-gray-400 px-2 gap-16">
                    <div className="flex justify-between items-center text-L-gray-400 w-full">
                        <span>قیمت سر به سر</span>
                        <span>51435435435</span>
                    </div>
                    <div className="flex justify-between items-center text-L-gray-400  w-full ">
                        <span>سفارش پی در پی</span>
                        <Switcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buy;
