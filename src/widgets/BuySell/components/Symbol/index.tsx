import { FC, useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useAppSelector } from 'src/redux/hooks';
import SymbolSearch from 'src/widgets/SymbolDetail/SymbolSearch';
import { useBuySellDispatch } from '../../context/BuySellContext';
import { getSelectedSymbol } from 'src/redux/slices/option';

interface IBuySellSymbolType {}

const BuySellSymbol: FC<IBuySellSymbolType> = ({}) => {
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const dispatch = useBuySellDispatch();
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData });
    const setSymbolISIN = (value: string) => dispatch({ type: 'SET_SYMBOL', value });
    //FIXME:please make sure you create a reusable symbol selector component !!!
    useEffect(() => {
        setSymbolISIN(selectedSymbol);
        // dispatch({ type: 'SOFT_RESET' });
    }, [selectedSymbol]);

    return (
        <div className="w-full flex items-center justify-center pr-2">
            <span className="w-[64px] whitespace-nowrap ">نماد</span>
            <SymbolSearch />
        </div>
    );
};

export default BuySellSymbol;
