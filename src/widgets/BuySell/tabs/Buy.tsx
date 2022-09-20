import i18next from 'i18next';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Input from 'src/common/components/Input';
import Select, { SelectOption } from 'src/common/components/Select';
import { ModalBasketIcon } from 'src/common/icons';
import { STRATEGY_OPTIONS } from 'src/constant/strategy';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import BuySellDetail from '../components/Detail/BuySellDetail';
import BuySellPrice from '../components/Price';
import BuySellQuantity from '../components/Quantity';
import BuySellSymbol from '../components/Symbol';
import { useBuySellDispatch, useBuySellState } from '../context/BuySellContext';

const Buy = () => {
    const dispatch = useBuySellDispatch();

    const { validity } = useBuySellState();
    const setStrategy = (value: strategy) => dispatch({ type: 'SET_STRATEGY', value });
    const setValidity = (value: validity) => dispatch({ type: 'SET_VALIDITY', value });

    return (
        <div className="flex flex-col text-1.2 p-2 h-full relative">
            <div className="flex flex-col py-4 gap-2">
                <div className="flex w-full gap-4 pr-2">
                    <label className="w-full flex items-center justify-center ">
                        <span className="w-[64px] whitespace-nowrap ">مشتری</span>
                        <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                            <Input />
                        </div>
                    </label>
                </div>

                <BuySellSymbol />
                <BuySellPrice />
                <BuySellQuantity />

                <div className="flex w-full gap-4 pr-1">
                    <div className="flex w-full gap-4 pr-2">
                        <Select
                            title="اعتبار"
                            onChange={(select: typeof VALIDITY_OPTIONS[0]) => setValidity(select.value as validity)}
                            value={i18next.t('BSModal.validity_' + validity)}
                        >
                            {VALIDITY_OPTIONS.map((item, inx) => (
                                <SelectOption
                                    key={inx}
                                    label={i18next.t('BSModal.validity_' + item.value)}
                                    value={item}
                                    className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                                />
                            ))}
                        </Select>
                    </div>
                    <div className="flex w-full gap-4 ">
                        <Select
                            onChange={(selected: typeof STRATEGY_OPTIONS[0]) => setStrategy(selected.value as strategy)}
                            // value={i18next.t('BSModal.strategy_' + strategy)}
                            value={'عادی'}
                            title="استراتژی"
                        >
                            {STRATEGY_OPTIONS.map((item, inx) => (
                                <SelectOption
                                    key={inx}
                                    label={item.name}
                                    value={item}
                                    className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                                />
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            <BuySellDetail />
            <div className="flex gap-3 pt-2 ">
                <button className="bg-L-success-150 h-8 dark:bg-D-success-150 rounded text-L-basic dark:text-D-basic flex items-center justify-center grow">
                    ارسال خرید
                </button>
                <button className="flex items-center h-8 justify-center w-2/6 rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border ">
                    پیش نویس
                </button>
                <button className="flex items-center h-8 justify-center w-[32px] bg-L-primary-100  rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border">
                    <ModalBasketIcon />
                </button>
            </div>
        </div>
    );
};

export default Buy;
