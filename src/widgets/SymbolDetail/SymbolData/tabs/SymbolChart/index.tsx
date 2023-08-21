import React from 'react';
import { useAppValues } from 'src/redux/hooks';
import ChartController from './components/ChartController';
import SymbolLinearChart from './components/SymbolLinearChart';
import SymbolCandleChart from './components/SymbolCandleChart';

const SymbolChart = () => {
    //
    const {
        option: { selectedSymbol, symbolChartDate, symbolChartType },
    } = useAppValues();

    return (
        <div className="h-[355px] grid grid-rows-one-min">
            <div className="">{symbolChartType === 'Linear' ? <SymbolLinearChart /> : <SymbolCandleChart />}</div>
            <div>
                <ChartController />
            </div>
        </div>
    );
};

export default SymbolChart;
