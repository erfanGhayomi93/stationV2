import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import CustomersSearch from '@components/customersSearch';
import { useSymbolStore } from '@store/symbol';
import { FC } from 'react';
import ActionsOrder from './actions';
import Credit from './credit';
import InformationTrade from './informationTrade';
import Price from './price';
import Quantity from './quantity';

interface IBodyBuySellProps {}

const BodyBuySell: FC<IBodyBuySellProps> = () => {
     const { selectedSymbol } = useSymbolStore();

     const { data } = useQuerySymbolGeneralInformation<{ symbolData: ISymbolData; ordersData: IOrdersData }>(
          selectedSymbol,
          data => {
               return {
                    symbolData: data.symbolData,
                    ordersData: data.ordersData,
               };
          }
     );

     return (
          <div className="flex w-full flex-col gap-y-4 py-4 px-4 outline-none">
               <CustomersSearch />
               <Quantity
                    minTradeQuantity={data?.symbolData.minTradeQuantity}
                    maxTradeQuantity={data?.symbolData.maxTradeQuantity}
                    marketUnit={data?.symbolData.marketUnit}
               />
               <Price
                    upTickValue={data?.symbolData.highThreshold}
                    downTickValue={data?.symbolData.lowThreshold}
                    bestSellLimitPrice_1={data?.ordersData.bestSellLimitPrice_1}
                    bestBuyLimitPrice_1={data?.ordersData.bestBuyLimitPrice_1}
               />
               <Credit />
               <InformationTrade marketUnit={data?.symbolData.marketUnit} />
               <ActionsOrder />
          </div>
     );
};

export default BodyBuySell;
