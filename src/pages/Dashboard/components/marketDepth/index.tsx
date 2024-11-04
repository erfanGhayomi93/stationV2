import { useMarketDepth } from '@hooks/useMarketDepth';
import { useSymbolStore } from '@store/symbol';
import { useCallback, useEffect, useMemo } from 'react';
import HalfRowDepth from './HalfRowDepth';
import OrderBookHeader from './OrderBookHeader';
import { useQueryClient } from '@tanstack/react-query';

export interface IHalfRowDepth {
     price: number;
     volume: number;
     count: number;
     percent?: number;
     children?: IHalfRowDepth[];
}


const MarketDepthTab = () => {
     //
     const { selectedSymbol } = useSymbolStore();

     const {
          data: { bids, asks },
     } = useMarketDepth(selectedSymbol);

     const queryClient = useQueryClient()


     const symbolGeneral = queryClient.getQueryData<ISymbolGeneralInformationRes>(['SymbolGeneralInformation', selectedSymbol]);
     const lowThreshold = symbolGeneral?.symbolData.lowThreshold;
     const highThreshold = symbolGeneral?.symbolData.highThreshold;

//      useEffect(() => {
//           console.log({ symbolGeneral })
//      }, [symbolGeneral])
// 
//      console.log('render')


     const isPriceInRange = useCallback(
          (price: number) => {
               if (!lowThreshold || !highThreshold)
                    return true; // or maybe false
               else return +lowThreshold <= +price && +price <= +highThreshold;
          },
          [lowThreshold, highThreshold]
     );

     const buyData = useMemo(() => {
          const data: IHalfRowDepth[] = [];

          if (bids?.data) {
               for (const key in bids.data) {
                    if (Array.isArray(bids.data?.[key])) {
                         const tempObj: IHalfRowDepth = { price: 0, volume: 0, count: 0, percent: 0 };

                         tempObj.price = bids.data[key][0];
                         tempObj.volume = bids.data[key][1];
                         tempObj.count = bids.data[key][2];
                         tempObj.percent = Number(bids.data[key][1]) / Number(bids.totalQuantity) || 0;
                         tempObj.children = bids.data[key][3].map(child => ({
                              price: +child[3],
                              volume: +child[4],
                              count: 1,
                         }));

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
                         const tempObj: IHalfRowDepth = { price: 0, volume: 0, count: 0, percent: 0, children: [] };

                         tempObj.price = asks.data[key][0];
                         tempObj.volume = asks.data[key][1];
                         tempObj.count = asks.data[key][2];
                         tempObj.percent = Number(asks.data[key][1]) / Number(asks.totalQuantity) || 0;
                         tempObj.children = asks.data[key][3].map(child => ({
                              price: +child[3],
                              volume: +child[4],
                              count: 1,
                         }));

                         data.push(tempObj);
                    }
               }
          }

          return data.sort((a, b) => +a.price - +b.price);
     }, [asks]);


     return (
          <div className="h-full max-h-full overflow-y-auto px-2">
               <div className="grid grid-cols-2 grid-rows-1 gap-x-2">
                    <div className="flex flex-col gap-y-4">
                         <div>
                              <OrderBookHeader side="Buy" />
                         </div>
                         <div className="flex flex-col">
                              {buyData.slice(0, 100).map((item, ind) => (
                                   <HalfRowDepth
                                        key={ind + '-' + item.price}
                                        side="Buy"
                                        data={item}
                                        isInRange={isPriceInRange(item.price)}
                                   />
                              ))}
                         </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                         <div>
                              <OrderBookHeader side="Sell" />
                         </div>
                         <div className="flex flex-col">
                              {sellData.slice(0, 100).map((item, ind) => (
                                   <HalfRowDepth
                                        key={ind + '-' + item.price}
                                        side="Sell"
                                        data={item}
                                        isInRange={isPriceInRange(item.price)}
                                   />
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default MarketDepthTab;