import { FC } from 'react';
import Select from 'src/common/components/Select';
import { STRATEGY_OPTIONS } from 'src/constant/strategy';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IBuySellStrategyType {}

const BuySellStrategy: FC<IBuySellStrategyType> = ({}) => {
    const dispatch = useBuySellDispatch();

    const setStrategy = (value: strategy) => dispatch({ type: 'SET_STRATEGY', value });
    const { strategy } = useBuySellState();
    return (
        <div className="pr-2">
            <Select
                onChange={(selected) => setStrategy(selected)}
                // value={t(BSModal.strategy_' + strategy)}
                value={strategy}
                title="استراتژی"
                options={STRATEGY_OPTIONS.map((x) => ({ value: x.value, label: x.name }))}
            />
            {/* {STRATEGY_OPTIONS.map((item, inx) => (
                    <SelectOption key={inx} label={item.name} value={item} className="text-1.2 cursor-default select-none py-1 pl-10 pr-4" />
                ))}
            </Select> */}
        </div>
    );
};

export default BuySellStrategy;
