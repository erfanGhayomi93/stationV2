import { useState } from 'react';
import { FilterBasket } from './components/FilterBasket';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';

function Basket() {
    const [activeBasket, setactiveBasket] = useState(0);

    const saveIndexBasketSelected = (ind: number) => {
        setactiveBasket(ind);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium font-[24px] text-2xl">سبد معامله گر</h1>

            <TopBasket {...{ activeBasket, saveIndexBasketSelected }} />
            <FilterBasket />
            <TableBasket />
        </div>
    );
}

export default Basket;
