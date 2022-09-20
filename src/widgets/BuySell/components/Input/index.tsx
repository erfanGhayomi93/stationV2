import { FC, ChangeEvent } from 'react';
import { seprateNumber, validNumber } from 'src/utils/helpers';

interface ITradeInputType {
    disabled?: boolean;
    onChange: (value: number) => void;
    value: number;
    placeholder?: string;
    max?: number;
}

const TradeInput: FC<ITradeInputType> = ({ disabled, value, onChange, placeholder, max = 25000000000 }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = validNumber(e.target.value);

        value < max && onChange(value);
    };
    return (
        <div className={`flex items-center w-100 rounded-sm px-2 ${disabled ? 'opacity-80' : 'bg-L-basic dark:bg-D-basic'}`}>
            <div className="grow">
                <input
                    dir="ltr"
                    disabled={disabled}
                    type="text"
                    className="w-full text-left h-full px-2 py-2 outline-none bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-500"
                    onChange={handleChange}
                    value={seprateNumber(value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default TradeInput;
