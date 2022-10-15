import i18next from 'i18next';
import { useState, useEffect } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType } from './components/FilterBasket';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';

function Basket() {
    const [activeBasket, setactiveBasket] = useState<number | undefined>(undefined);
    const { data: dataListDetailsBasket } = useGetDetailsBasket(activeBasket);
    const [listAfterFilter, setlistAfterFilter] = useState<IListDetailsBasket[] | undefined>(undefined);

    useEffect(() => {
        setlistAfterFilter(dataListDetailsBasket);
    }, [dataListDetailsBasket]);

    const saveIndexBasketSelected = (id: number) => {
        setactiveBasket(id);
    };

    const handleFilter = (dataFilter: filterStateType) => {
        const { customerTitles, symbolTitle, date } = dataFilter;
        if (!customerTitles && !symbolTitle && !date) return;
        else if (!listAfterFilter) return;

    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium font-[24px] text-2xl">سبد معامله گر</h1>

            <TopBasket {...{ activeBasket, saveIndexBasketSelected }} />
            <FilterBasket {...{ handleFilter }} />
            <TableBasket {...{ activeBasket, listAfterFilter }} />
        </div>
    );
}

export default Basket;
