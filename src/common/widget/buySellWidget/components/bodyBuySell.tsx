import CustomersSearch from '@components/customersSearch';
import Price from './price';
import Quantity from './quantity';
import Credit from './credit';
import InformationTrade from './informationTrade';
import ActionsOrder from './actions';
import { FC } from 'react';
import { useQuerySymbolGeneralInformation } from '@api/Symbol';
import { useSymbolStore } from '@store/symbol';

interface IBodyBuySellProps {
     side: TSide
}

const BodyBuySell: FC<IBodyBuySellProps> = ({ side }) => {

     const { selectedSymbol } = useSymbolStore()

     const { data } = useQuerySymbolGeneralInformation<ISymbolData>(selectedSymbol, (data) => {
          return data.symbolData
     })

     return (
          <div className="gap-y-4 pt-3 flex flex-col w-full">
               <CustomersSearch />
               <Price
                    upTickValue={data?.highThreshold}
                    downTickValue={data?.lowThreshold}
               />
               <Quantity
                    minTradeQuantity={data?.minTradeQuantity}
                    maxTradeQuantity={data?.maxTradeQuantity}
               />
               <Credit />
               <InformationTrade />
               <ActionsOrder
                    side={side}
               />
          </div>
     );
};

export default BodyBuySell;
