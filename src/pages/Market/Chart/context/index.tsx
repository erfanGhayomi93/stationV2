import { useReducer } from 'react'
import { TradingViewReducer } from './reducer'
import { createContainer } from 'react-tracked'
import TradingChart from '..'



const initState: initStateType = {
    selectedSymbol: '',
    tvChartActiveLayout: '1',
    modals: {
        tvCompareModal: false,
        tvIndicatorsModal: false,
        tvLayoutModal: false,
        tvLoadChartTemplate: false,
        tvSaveChartTemplate: false,
        tvSaveIndicatorsTemplate: false
    }
}

const useValue = () => useReducer(TradingViewReducer, initState)

export const { Provider: TradingProvider, useUpdate, useTrackedState } = createContainer(useValue)

export const useTradingState = () => {
    const setState = useUpdate()
    const state = useTrackedState()
    return { state, setState }
}


const TradingViewContext = () => {
    return (
        <TradingProvider>
            <TradingChart />
        </TradingProvider>
    )
}



export default TradingViewContext