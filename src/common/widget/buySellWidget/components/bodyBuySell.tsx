import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import CustomersSearch from '@components/customersSearch';
import { useSymbolStore } from '@store/symbol';
import { FC } from 'react';
import ActionsOrder from './actions';
import Credit from './credit';
import InformationTrade from './informationTrade';
import Price from './price';
import Quantity from './quantity';

interface IBodyBuySellProps { }

const BodyBuySell: FC<IBodyBuySellProps> = () => {
     const { selectedSymbol } = useSymbolStore();

     const { data } = useQuerySymbolGeneralInformation<ISymbolData>(selectedSymbol, data => {
          return data.symbolData;
     });

     return (
          <div className="flex w-full flex-col gap-y-4 pt-3 outline-none">
               <CustomersSearch />
               <Price
                    upTickValue={data?.highThreshold}
                    downTickValue={data?.lowThreshold}
               />
               <Quantity
                    minTradeQuantity={data?.minTradeQuantity}
                    maxTradeQuantity={data?.maxTradeQuantity}
                    marketUnit={data?.marketUnit}
               />
               <Credit />
               <InformationTrade />
               <ActionsOrder />
          </div>
     );
};

export default BodyBuySell;
