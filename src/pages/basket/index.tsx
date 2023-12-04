import { useEffect, useState, useTransition } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType, initialDataFilterBasket } from './components/FilterBasket';
import InsertBasketItem from './components/InsertBasketItem';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';
import { useBasketDispatch } from './context/BasketContext';
import { useTranslation } from 'react-i18next';

function BasketPage() {
    const [activeBasket, setActiveBasket] = useState<number>(0);
    const [listAfterFilter, setListAfterFilter] = useState<IListDetailsBasket[]>([]);
    const [dataFilter, setDataFilter] = useState<filterStateType>(initialDataFilterBasket);
    const [isShowFilter, setisShowFilter] = useState<boolean>(false);
    const { t } = useTranslation();
    const dispatch = useBasketDispatch();

    const { data: dataListDetailsBasket } = useGetDetailsBasket(activeBasket);


    useEffect(() => {
        !!dataListDetailsBasket && setListAfterFilter(dataListDetailsBasket);
    }, [dataListDetailsBasket]);

    const saveIndexBasketSelected = (id: number) => {
        setActiveBasket(id);
        dispatch({ type: 'SET_BASKET_ID', value: id });
    };

    const handleFilter = (dataFilter: filterStateType) => {
        setDataFilter(dataFilter);
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 flex flex-col">
            <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.basket')}</h1>
            <TopBasket {...{ activeBasket, saveIndexBasketSelected }} />
            <FilterBasket {...{ handleFilter, isShowFilter, setisShowFilter }} />
            <TableBasket {...{ activeBasket, listAfterFilter, dataFilter, isShowFilter }} />
            <InsertBasketItem activeBasket={activeBasket} />
        </div>
    );
}

export default BasketPage;
