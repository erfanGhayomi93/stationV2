import CustomersSearch from '@components/customersSearch';
import Price from './price';
import Quantity from './quantity';
import Credit from './credit';
import InformationTrade from './informationTrade';
import ActionsOrder from './actions';
import { FC } from 'react';

interface IBodyBuySellProps {
     side: TSide
}

const BodyBuySell: FC<IBodyBuySellProps> = ({ side }) => {
     return (
          <div className="gap-y-4 pt-3 flex flex-col w-full">
               <CustomersSearch />
               <Price />
               <Quantity />
               <Credit />
               <InformationTrade />
               <ActionsOrder
                    side={side}
               />
          </div>
     );
};

export default BodyBuySell;
