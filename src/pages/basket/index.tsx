import { useEffect, useState, useTransition } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType, initialDataFilterBasket } from './components/FilterBasket';
import InsertBasketItem from './components/InsertBasketItem';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';
import { useBasketDispatch } from './context/BasketContext';
import { useTranslation } from 'react-i18next';
import { GridReadyEvent } from 'ag-grid-community';

function BasketPage() {
    const [activeBasket, setActiveBasket] = useState<number>(0);
    const [dataListParams, setDataListParams] = useState<{ PageNumber: number; PageSize: number }>({ PageNumber: 1, PageSize: 10 });
    const [listAfterFilter, setListAfterFilter] = useState<IListDetailsBasket>();
    const [dataFilter, setDataFilter] = useState<filterStateType>(initialDataFilterBasket);
    const [isShowFilter, setisShowFilter] = useState<boolean>(false);
    const [gridApi, setGridApi] = useState<GridReadyEvent<IGetWatchlistSymbol>>();
    const { t } = useTranslation();
    const dispatch = useBasketDispatch();

    const { data: dataListDetailsBasket, isLoading: dataListLoading } = useGetDetailsBasket(activeBasket, dataListParams);

    useEffect(() => {
        setListAfterFilter(dataListDetailsBasket);
    }, [dataListDetailsBasket]);

    const saveIndexBasketSelected = (id: number) => {
        setActiveBasket(id);
        dispatch({ type: 'SET_BASKET_ID', value: id });
    };

    const handleFilter = (dataFilter: filterStateType) => {
        setDataFilter(dataFilter);
    };

    const handlePageInfoChange = (action: 'PageNumber' | 'PageSize', value: number) => {
        setDataListParams((pre) => ({ ...pre, [action]: value }));
    };

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 flex flex-col">
            <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.basket')}</h1>
            <TopBasket {...{ activeBasket, saveIndexBasketSelected, gridApi }} />
            <FilterBasket {...{ handleFilter, isShowFilter, setisShowFilter }} />
            <TableBasket {...{ activeBasket, listAfterFilter, dataFilter, isShowFilter, setGridApi, dataListLoading, handlePageInfoChange }} />
            <InsertBasketItem activeBasket={activeBasket} />
        </div>
    );
}

export default BasketPage;
