import { FC } from 'react'
import PriceView from 'src/common/components/PriceView'
import { useAppDispatch } from 'src/redux/hooks'
import { setPriceBuySellAction } from 'src/redux/slices/keepDataBuySell'

interface IHighLowPriceProps {
    yesterdayClosingPrice: number;
    lowestTradePriceOfTradingDay: number;
    highestTradePriceOfTradingDay: number;
    openPrice: number
}

export const HighLowPriceSymbol: FC<IHighLowPriceProps> = (
    {
        highestTradePriceOfTradingDay,
        lowestTradePriceOfTradingDay,
        yesterdayClosingPrice,
        openPrice
    }
) => {

    const appDispatch = useAppDispatch()


    const setPriceOnBuySellModal = (value: number) => {
        appDispatch(setPriceBuySellAction(value))
    }

    return (
        <div className='flex justify-between mt-2'>
            <PriceView
                onClickPrice={() => setPriceOnBuySellModal(0)}
                label="بیشترین"
                price={highestTradePriceOfTradingDay}
                percentage={Number((((highestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1}
            />

            <PriceView
                onClickPrice={() => setPriceOnBuySellModal(0)}
                label="اولین"
                price={openPrice}
                percentage={Number((((openPrice - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1}
            />

            <PriceView
                onClickPrice={() => setPriceOnBuySellModal(0)}
                label="کمترین"
                price={lowestTradePriceOfTradingDay}
                percentage={Number((((lowestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1}
            />
        </div>
    )
}
