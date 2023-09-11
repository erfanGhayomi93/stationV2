import { useEffect, useMemo } from 'react';
import { useAppValues } from 'src/redux/hooks';
import ChartController from './components/ChartController';
import SymbolLinearChart from './components/SymbolLinearChart';
import SymbolCandleChart from './components/SymbolCandleChart';
import ErrorBoundary from 'src/common/components/ErrorBoundary';
import { useChartSymbol } from 'src/app/queries/symbol';
import WidgetLoading from 'src/common/components/WidgetLoading';

const SymbolChart = () => {

    const {
        option: { selectedSymbol, symbolChartDate, symbolChartType },
    } = useAppValues();

    const { data, isFetching } = useChartSymbol(selectedSymbol, symbolChartDate)



    return (
        <div className="h-[355px] grid grid-rows-one-min gap-4">

            <div className="">
                <WidgetLoading spining={isFetching} blur>
                    {symbolChartType === 'Linear' ? (
                        <SymbolLinearChart date={symbolChartDate} data={data} />
                    ) : (
                        <SymbolCandleChart date={symbolChartDate} data={data} />
                    )}
                </WidgetLoading>
            </div>
            <div>
                <ErrorBoundary>
                    <ChartController />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default SymbolChart;