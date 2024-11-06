// import PriceView from '@components/priceView';
import PriceView from '@components/priceView';
import { FC } from 'react';
// import { useAppDispatch } from 'src/redux/hooks'
// import { setPriceBuySellAction } from 'src/redux/slices/keepDataBuySell'

interface IHighLowPriceProps {
     yesterdayClosingPrice: number;
     lowestTradePriceOfTradingDay: number;
     highestTradePriceOfTradingDay: number;
}

export const HighLowPriceSymbol: FC<IHighLowPriceProps> = ({
     highestTradePriceOfTradingDay,
     lowestTradePriceOfTradingDay,
     yesterdayClosingPrice,
}) => {
     // const appDispatch = useAppDispatch()

     const percentagelowestTradePriceOfTradingDay =
          Number((((lowestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1;

     const percentageHighestTradePriceOfTradingDay =
          Number((((highestTradePriceOfTradingDay - yesterdayClosingPrice) / yesterdayClosingPrice) * 100).toFixed(2)) * 1;

     const amountChangeHighestTrade = highestTradePriceOfTradingDay - yesterdayClosingPrice;
     const amountChangeLowestTrade = lowestTradePriceOfTradingDay - yesterdayClosingPrice;

     // const setPriceOnBuySellModal = (value: number) => {
     //      // appDispatch(setPriceBuySellAction(value))
     // };

     return (
          <div className="mt-2 grid grid-cols-2 gap-x-1 rounded bg-line-div-3 px-2">
               <PriceView
                    // onClickPrice={() => setPriceOnBuySellModal(highestTradePriceOfTradingDay)}
                    price={highestTradePriceOfTradingDay}
                    percentage={percentageHighestTradePriceOfTradingDay}
                    label="بیشترین"
                    amountChange={amountChangeHighestTrade}
               />

               <PriceView
                    // onClickPrice={() => setPriceOnBuySellModal(lowestTradePriceOfTradingDay)}
                    price={lowestTradePriceOfTradingDay}
                    percentage={percentagelowestTradePriceOfTradingDay}
                    label="کمترین"
                    amountChange={amountChangeLowestTrade}
               />
          </div>
     );
};
