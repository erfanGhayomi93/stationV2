import { useState, useEffect } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType, initialDataFilterBasket } from './components/FilterBasket';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';

function Basket() {
    const [activeBasket, setactiveBasket] = useState<number | undefined>(undefined);
    const { data: dataListDetailsBasket } = useGetDetailsBasket(activeBasket);
    const [listAfterFilter, setlistAfterFilter] = useState<IListDetailsBasket[] | undefined>(undefined);
    const [dataFilter, setdataFilter] = useState<filterStateType>(initialDataFilterBasket);
    const [isShowFilter, setisShowFilter] = useState<boolean>(false);

    useEffect(() => {
        setlistAfterFilter(dataListDetailsBasket);
    }, [dataListDetailsBasket]);

    const saveIndexBasketSelected = (id: number) => {
        setactiveBasket(id);
    };

    const handleFilter = (dataFilter: filterStateType) => {
        setdataFilter(dataFilter);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium text-2xl">سبد معامله گر</h1>

            <TopBasket {...{ activeBasket, saveIndexBasketSelected }} />
            <FilterBasket {...{ handleFilter, isShowFilter, setisShowFilter }} />
            <TableBasket {...{ activeBasket, listAfterFilter, dataFilter, isShowFilter }} />
        </div>
    );
}

export default Basket;