import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import CustomersSearch from '@components/customersSearch';
import { useSymbolStore } from '@store/symbol';
import ActionsOrder from './actions';
import Credit from './credit';
import InformationTrade from './informationTrade';
import Price from './price';
import Quantity from './quantity';
import { ActionAdvance } from './ActionAdvance.tsx';

const BodyBuySell = () => {
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
          <div className="flex w-full flex-col gap-y-4 px-4 py-2 outline-none">
               <CustomersSearch
                    isMainPage
               />
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

               <ActionAdvance />
          </div>
     );
};

export default BodyBuySell;
