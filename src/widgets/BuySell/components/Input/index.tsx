import { FC, ChangeEvent } from 'react';
import { seprateNumber, validNumber } from 'src/utils/helpers';

interface ITradeInputType {
    disabled?: boolean;
    onChange: (value: number) => void;
    value: number;
    placeholder?: string;
    max?: number;
    unit?: JSX.Element;
    type?: 'text' | 'percent';
}

const TradeInput: FC<ITradeInputType> = ({ disabled, value, onChange, placeholder, unit, max = 25000000000, type = 'text' }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = type === 'percent' ? +parseFloat(e.target.value).toFixed(2) : validNumber(e.target.value);
        value <= max && onChange(value);
    };
    return (
        <div className={`flex items-center w-100 rounded-sm px-2 ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
            <div className="grow flex items-center justify-center flex-row-reverse">
                <input
                    dir="ltr"
                    disabled={disabled}
                    type={type === 'percent' ? 'number' : 'text'}
                    className="w-full text-left h-full px-2 py-2 outline-none bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-500"
                    onChange={handleChange}
                    value={type === 'percent' ? value : seprateNumber(value)}
                    step={type === 'percent' ? '.01' : undefined}
                    placeholder={placeholder}
                />

                {unit}
            </div>
        </div>
    );
};

export default TradeInput;
