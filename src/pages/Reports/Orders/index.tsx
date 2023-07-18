import { FC } from 'react';
import { OrderFilter } from './components/OrderFilter';
import OrderTable from './components/OrderTable';


interface IOrdersType {}

const Orders: FC<IOrdersType> = ({}) => {
    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium text-2xl">سفارشات</h1>
            <div className="grid  grid-rows-min-one">
                <OrderFilter />
                <div className="grid grid-rows-one-min">
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default Orders;
