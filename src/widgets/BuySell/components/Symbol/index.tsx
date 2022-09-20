import { FC, useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Input from 'src/common/components/Input';
import { useAppValues } from 'src/redux/hooks';
import SymbolSearch from 'src/widgets/SymbolDetail/SymbolSearch';
import { useBuySellDispatch } from '../../context/BuySellContext';

interface IBuySellSymbolType {}

const BuySellSymbol: FC<IBuySellSymbolType> = ({}) => {
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const dispatch = useBuySellDispatch();
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData });
    const setSymbolISIN = (value: string) => dispatch({ type: 'SET_SYMBOL', value });
    //FIXME:please make sure you create a reusable symbol selector component !!!
    useEffect(() => {
        setSymbolISIN(selectedSymbol);
    }, [selectedSymbol]);

    return (
        <label className="w-full flex items-center justify-center pr-2">
            <span className="w-[64px] whitespace-nowrap ">نماد</span>
            <SymbolSearch />
        </label>
    );
};

export default BuySellSymbol;
