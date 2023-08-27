import { ChartingLibrary } from './ChartingLibrary'
import RecentSymbols from './RecentSymbols'


const TradingView = () => {
  return (
    <div className='flex flex-1 flex-col gap-2 h-full'>
      
      <RecentSymbols />

      <ChartingLibrary />

    </div>
  )
}


export default TradingView
