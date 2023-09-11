import { useEffect, useState, useTransition } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType, initialDataFilterBasket } from './components/FilterBasket';
import InsertBasketItem from './components/InsertBasketItem';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';
import { useBasketDispatch } from './context/BasketContext';
import { useTranslation } from 'react-i18next';

function BasketPage() {
    const [activeBasket, setactiveBasket] = useState<number | undefined>(undefined);
    const { data: dataListDetailsBasket } = useGetDetailsBasket(activeBasket);
    const [listAfterFilter, setlistAfterFilter] = useState<IListDetailsBasket[] | undefined>(undefined);
    const [dataFilter, setdataFilter] = useState<filterStateType>(initialDataFilterBasket);
    const [isShowFilter, setisShowFilter] = useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useBasketDispatch();
    useEffect(() => {
        setlistAfterFilter(dataListDetailsBasket);
    }, [dataListDetailsBasket]);

    const saveIndexBasketSelected = (id: number) => {
        setactiveBasket(id);
        dispatch({ type: 'SET_BASKET_ID', value: id });
    };

    const handleFilter = (dataFilter: filterStateType) => {
        setdataFilter(dataFilter);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 flex flex-col">
            <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('page_title.basket')}</h1>
            <TopBasket {...{ activeBasket, saveIndexBasketSelected }} />
            <FilterBasket {...{ handleFilter, isShowFilter, setisShowFilter }} />
            <TableBasket {...{ activeBasket, listAfterFilter, dataFilter, isShowFilter }} />
            <InsertBasketItem activeBasket={activeBasket} />
        </div>
    );
}

export default BasketPage;
