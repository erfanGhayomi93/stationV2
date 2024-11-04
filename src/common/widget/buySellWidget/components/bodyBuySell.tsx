import CustomersSearch from '@components/customersSearch';
import { useSymbolStore } from '@store/symbol';
import ActionsOrder from './actions';
import Credit from './credit';
import InformationTrade from './informationTrade';
import Price from './price';
import Quantity from './quantity';
import { useQueryClient } from '@tanstack/react-query';


const BodyBuySell = () => {
     const { selectedSymbol } = useSymbolStore();

     const queryClient = useQueryClient()


     const symbolGeneral = queryClient.getQueryData<ISymbolGeneralInformationRes>(['SymbolGeneralInformation', selectedSymbol]);

     const bestBuyLimitPrice_1 = symbolGeneral?.ordersData?.bestBuyLimitPrice_1;
     const bestSellLimitPrice_1 = symbolGeneral?.ordersData?.bestSellLimitPrice_1;

     const highThreshold = symbolGeneral?.symbolData?.highThreshold;
     const lowThreshold = symbolGeneral?.symbolData?.lowThreshold;
     const minTradeQuantity = symbolGeneral?.symbolData?.minTradeQuantity;
     const maxTradeQuantity = symbolGeneral?.symbolData?.maxTradeQuantity;
     const marketUnit = symbolGeneral?.symbolData?.marketUnit;


     return (
          <div className="flex w-full flex-col gap-y-4 px-4 py-4 outline-none">
               <CustomersSearch />
               <Price
                    upTickValue={highThreshold}
                    downTickValue={lowThreshold}
                    bestSellLimitPrice_1={bestSellLimitPrice_1}
                    bestBuyLimitPrice_1={bestBuyLimitPrice_1}
               />
               <Quantity
                    minTradeQuantity={minTradeQuantity}
                    maxTradeQuantity={maxTradeQuantity}
                    marketUnit={marketUnit}
               />
               <Credit />
               <InformationTrade marketUnit={marketUnit} />
               <ActionsOrder />
          </div>
     );
};

export default BodyBuySell;
