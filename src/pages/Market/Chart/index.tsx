import TradingView from './TradingView'
import { useTradingState } from './context'
import TvSelectSymbolModal from './modal/TvSelectSymbolModal'
import TvLayoutModal from './modal/TvLayoutModal'
import TvIndicatorsModal from './modal/TvIndicatorsModal'
import TvSaveIndicatorsTemplate from './modal/TvSaveIndicatorsTemplate'
import TvSaveChart from './modal/TvSaveChart'
import TvLoadChartsModal from './modal/TvLoadChartsModal'

const TradingChart = () => {
    const { state: { modals: { tvCompareModal, tvSymbolSearchModal, tvLayoutModal, tvIndicatorsModal, tvSaveIndicatorsTemplate, tvSaveChartTemplate, tvLoadChartTemplate } } } = useTradingState()


    return (
        <div className="gap-8">
            <TradingView />

            {tvCompareModal && <TvSelectSymbolModal actionId='compare' />}
            {tvSymbolSearchModal && <TvSelectSymbolModal actionId='symbol_search' />}
            {tvLayoutModal && <TvLayoutModal />}
            {tvIndicatorsModal && <TvIndicatorsModal />}
            {tvSaveIndicatorsTemplate && <TvSaveIndicatorsTemplate />}
            {tvSaveChartTemplate && <TvSaveChart />}
            {tvLoadChartTemplate && <TvLoadChartsModal />}

        </div>
    )
}





export default TradingChart
