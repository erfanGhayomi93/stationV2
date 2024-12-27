import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import { useMarketDepth } from '@hooks/useMarketDepth';
import { useSymbolStore } from '@store/symbol';
import { FC, useCallback, useEffect, useMemo } from 'react';
import HalfRowDepth from './HalfRowDepth';
import OrderBookHeader from './OrderBookHeader';
import Spinner from '@components/Spinner';
import { useBuySellStore } from 'common/widget/buySellWidget/context/buySellContext';

export interface IHalfRowDepth {
     price: number;
     volume: number;
     count: number;
     percent?: number;
     children?: IHalfRowDepth[];
     isOrder?: string;
}

interface ISelectGeneralInformation {
     lowThreshold: number;
     highThreshold: number;
}

interface IMarketDepthTabProps {
     onDataStatus: (flag: boolean) => void;
}

const MarketDepthTab: FC<IMarketDepthTabProps> = ({ onDataStatus }) => {
     //
     const { selectedSymbol } = useSymbolStore();

     const { setPrice, setQuantity, setSide, setIsLockPrice } = useBuySellStore()

     const {
          data: { bids, asks },
          isLoading
     } = useMarketDepth(selectedSymbol);

     const { data: symbolGeneral } = useQuerySymbolGeneralInformation<ISelectGeneralInformation>(selectedSymbol, data => ({
          lowThreshold: data.symbolData.lowThreshold,
          highThreshold: data.symbolData.highThreshold,
     }));

     const isPriceInRange = useCallback(
          (price: number) => {
               if (!symbolGeneral?.lowThreshold || !symbolGeneral?.highThreshold)
                    return true; // or maybe false
               else return +symbolGeneral.lowThreshold <= +price && +price <= +symbolGeneral.highThreshold;
          },
          [symbolGeneral]
     );

     const buyData = useMemo(() => {
          const data: IHalfRowDepth[] = [];

          if (bids?.data) {
               for (const key in bids.data) {
                    if (Array.isArray(bids.data?.[key])) {
                         const tempObj: IHalfRowDepth = { price: 0, volume: 0, count: 0, percent: 0, isOrder: 'False' };

                         tempObj.price = bids.data[key][0];
                         tempObj.volume = bids.data[key][1];
                         tempObj.count = bids.data[key][2];
                         tempObj.percent = Number(bids.data[key][1]) / Number(bids.totalQuantity) || 0;
                         tempObj.children = bids.data[key][3].map(child => ({
                              price: +child[3],
                              volume: +child[4],
                              count: 1,
                              isOrder: child[9]
                         }));

                         tempObj.isOrder = bids.data[key][3].some(child => child[9] === 'True') ? 'True' : 'False';

                         data.push(tempObj);
                    }
               }
          }

          return data.sort((a, b) => +b.price - +a.price);
     }, [bids]);

     const sellData = useMemo(() => {
          const data: IHalfRowDepth[] = [];

          if (asks?.data) {
               for (const key in asks.data) {
                    if (Array.isArray(asks.data?.[key])) {
                         const tempObj: IHalfRowDepth = { price: 0, volume: 0, count: 0, percent: 0, children: [], isOrder: 'False' };

                         tempObj.price = asks.data[key][0];
                         tempObj.volume = asks.data[key][1];
                         tempObj.count = asks.data[key][2];
                         tempObj.percent = Number(asks.data[key][1]) / Number(asks.totalQuantity) || 0;
                         tempObj.children = asks.data[key][3].map(child => ({
                              price: +child[3],
                              volume: +child[4],
                              count: 1,
                              isOrder: child[9]
                         })); 

                         tempObj.isOrder = asks.data[key][3].some(child => child[9] === 'True') ? 'True' : 'False';

                         data.push(tempObj);
                    }
               }
          }

          return data.sort((a, b) => +a.price - +b.price);
     }, [asks]);

     const clickPrice = (price: number, side?: TSide) => {
          setPrice(price)
          if (side) setSide(side)
          setIsLockPrice(false)
     }

     const clickVolume = (volume: number, side?: TSide) => {
          setQuantity(volume)
          if (side) setSide(side)
          setIsLockPrice(false)
     }

     const clickTotalUpQueue = (side: TSide, ind: number) => {
          const data = side == "Buy" ? buyData : sellData;
          const price = side === 'Sell' ? data[0].price : data[ind].price;
          const mode = side === "Buy" ? "Sell" : "Buy";
          const collectData = data.slice(0, ind + 1);


          let collectVolume = 0;
          collectData.forEach(item => {
               collectVolume += item.volume
          })

          clickPrice(price, mode)
          clickVolume(collectVolume)
     }


     useEffect(() => {
          if ((!!buyData.length || !!sellData.length) && !isLoading) {
               onDataStatus(true)
          } else {
               onDataStatus(false)
          }
     }, [buyData, sellData])

     if (isLoading) {
          return <Spinner />
     }


     return (
          <div className="h-full max-h-full">
               <div className="grid grid-cols-2 grid-rows-1 gap-x-2 overflow-y-auto">
                    <div className="flex flex-col gap-y-4">
                         <div className='pr-2'>
                              <OrderBookHeader side="Buy" />
                         </div>
                         <div className="flex flex-col">
                              {buyData
                                   .slice(0, 100)
                                   .map((item, ind) => (
                                        <HalfRowDepth
                                             key={item.price + 'Buy' + ind}
                                             side="Buy"
                                             data={item}
                                             isInRange={isPriceInRange(item.price)}
                                             clickPrice={clickPrice}
                                             clickVolume={clickVolume}
                                             clickTotalUpQueue={(side) => clickTotalUpQueue(side, ind)}
                                             isMarketDepth
                                        />
                                   ))}
                         </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                         <div className='pl-2'>
                              <OrderBookHeader side="Sell" />
                         </div>
                         <div className="flex flex-col">
                              {sellData
                                   .slice(0, 100)
                                   .map((item, ind) => (
                                        <HalfRowDepth
                                             key={item.price + 'Sell' + ind}
                                             side="Sell"
                                             data={item}
                                             isInRange={isPriceInRange(item.price)}
                                             clickPrice={clickPrice}
                                             clickVolume={clickVolume}
                                             clickTotalUpQueue={(side) => clickTotalUpQueue(side, ind)}
                                             isMarketDepth
                                        />
                                   ))}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default MarketDepthTab;
