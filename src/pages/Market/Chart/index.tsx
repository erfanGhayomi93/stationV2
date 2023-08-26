import { useEffect } from 'react'
import TradingView from './TradingView'
import { useTradingState } from './context'
import TvSelectSymbolModal from './modal/TvSelectSymbolModal'

const TradingChart = () => {
    const { state: { modals: { tvCompareModal, tvSymbolSearchModal } } } = useTradingState()

    useEffect(() => {
        console.log("tvCompareModalEffect3", tvCompareModal)
    }, [tvCompareModal])

    return (
        <div className="gap-8">
            <TradingView />

            {tvCompareModal && <TvSelectSymbolModal actionId='compare' />}
            {tvSymbolSearchModal && <TvSelectSymbolModal actionId='symbol_search' />}


        </div>
    )
}





export default TradingChart
