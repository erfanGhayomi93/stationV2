import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import { useMarketDepth } from '@hooks/useMarketDepth';
import { useSymbolStore } from '@store/symbol';
import { useCallback, useMemo } from 'react';
import HalfRowDepth from './HalfRowDepth';
import OrderBookHeader from './OrderBookHeader';
import { VirtuosoGrid } from 'react-virtuoso';

export interface IHalfRowDepth {
     price: number;
     volume: number;
     count: number;
     percent?: number;
     children?: IHalfRowDepth[];
}

interface ISelectGeneralInformation {
     lowThreshold: number;
     highThreshold: number;
}

const MarketDepthTab = () => {
     //
     const { selectedSymbol } = useSymbolStore();

     const {
          data: { bids, asks },
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

     const uiNode = useMemo(() => {
          return <VirtuosoGrid
               totalCount={buyData.length > sellData.length ? buyData.length : sellData.length}
               itemContent={(index) => {
                    const data = [buyData[index], sellData[index]];
                    return (
                         <div key={index} className="grid grid-cols-2 gap-x-2">
                              <div>
                                   {
                                        data[0] && <HalfRowDepth
                                             side={"Buy"}
                                             data={data[0]}
                                             isInRange={isPriceInRange(data[0]?.price)}
                                        />
                                   }
                              </div>
                              <div>
                                   {
                                        data[1] && <HalfRowDepth
                                             side={"Sell"}
                                             data={data[1]}
                                             isInRange={isPriceInRange(data[1]?.price)}
                                        />
                                   }
                              </div>
                         </div>
                    );
               }}
               components={{
                    Header: () => (
                         <div className="grid grid-cols-2 gap-x-2 px-2">
                              <OrderBookHeader side="Buy" />
                              <OrderBookHeader side="Sell" />
                         </div>
                    ),
               }}
          // style={{ height: "100%", marginLeft: 8, marginRight: 8 }}
          />
     }, [buyData, sellData])


     return (
          <div className="h-full grid grid-rows-1">
               <div className='overflow-y-auto'>
                    {uiNode}
               </div>
          </div>
     );
};

export default MarketDepthTab;
