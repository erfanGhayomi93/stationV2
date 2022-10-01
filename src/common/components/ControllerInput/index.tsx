import { FC, memo, useMemo } from 'react';
import { ChevronIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';
import TradeInput from 'src/widgets/BuySell/components/Input';

interface IControllerInputType {
    onChange: (value: number) => void;
    inputValue: number;
    highValue: number;
    lowValue: number;
    children?: JSX.Element;
    title?: string;
    placeholder?: string;
    unit?: JSX.Element;
    max?: number;
}
const ControllerInput: FC<IControllerInputType> = ({ onChange, highValue, inputValue, lowValue, children, placeholder, title, unit, max }) => {
    const chevronIconUp = useMemo(() => <ChevronIcon className=" text-L-gray-400 dark:text-D-gray-400" />, []);
    const chevronIconDown = useMemo(() => <ChevronIcon className="rotate-180 text-L-gray-400 dark:text-D-gray-400" />, []);
    return (
        <label className="w-full flex items-center justify-center ">
            <span className="w-[64px] whitespace-nowrap ">{title}</span>
            <div className="w-full flex border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                <div className="w-full">
                    <TradeInput onChange={onChange} value={inputValue} placeholder={placeholder} unit={unit} max={max} />
                </div>
                <div className="flex w-48 justify-between items-center flex-row-reverse bg-L-gray-150 dark:bg-D-gray-150 border-r border-L-gray-400 dark:border-D-gray-400">
                    {children}
                    <span className="flex flex-col w-full ">
                        <button className="flex items-center justify-between px-2 gap-2" onClick={(e) => onChange(highValue)}>
                            {chevronIconUp}
                            <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">{seprateNumber(highValue)}</span>
                        </button>
                        <hr className="border-L-gray-400 dark:border-D-gray-400" />
                        <button className="flex items-center justify-between px-2 gap-2" onClick={(e) => onChange(lowValue)}>
                            {chevronIconDown}
                            <span className="text-L-gray-450 dark:text-D-gray-450 h-4 select-none">{seprateNumber(lowValue)}</span>
                        </button>
                    </span>
                </div>
            </div>
        </label>
    );
};

export default memo(ControllerInput);
