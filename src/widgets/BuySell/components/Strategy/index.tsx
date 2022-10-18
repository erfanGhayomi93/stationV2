import { FC } from 'react';
import Select, { SelectOption } from 'src/common/components/Select';
import { STRATEGY_OPTIONS } from 'src/constant/strategy';
import { useBuySellDispatch } from '../../context/BuySellContext';

interface IBuySellStrategyType {}

const BuySellStrategy: FC<IBuySellStrategyType> = ({}) => {
    const dispatch = useBuySellDispatch();

    const setStrategy = (value: strategy) => dispatch({ type: 'SET_STRATEGY', value });
    return (
        <div className="pr-2">
            <Select
                onChange={(selected: typeof STRATEGY_OPTIONS[0]) => setStrategy(selected.value as strategy)}
                // value={t(BSModal.strategy_' + strategy)}
                value={'عادی'}
                title="استراتژی"
            >
                {STRATEGY_OPTIONS.map((item, inx) => (
                    <SelectOption key={inx} label={item.name} value={item} className="text-1.2 cursor-default select-none py-1 pl-10 pr-4" />
                ))}
            </Select>
        </div>
    );
};

export default BuySellStrategy;
