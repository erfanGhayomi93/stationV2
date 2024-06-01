import { useEffect, useState } from 'react';
import { useGetDetailsBasket } from 'src/app/queries/basket';
import { FilterBasket, filterStateType, initialDataFilterBasket } from './components/FilterBasket';
import InsertBasketItem from './components/InsertBasketItem';
import { TableBasket } from './components/TableBasket';
import TopBasket from './components/TopBasket';
import { useBasketDispatch } from './context/BasketContext';
import { useTranslation } from 'react-i18next';
import { GridReadyEvent } from 'ag-grid-community';
import { cleanObjectOfFalsyValues } from 'src/utils/helpers';
import { useAppDispatch } from 'src/redux/hooks';
import { setComeFromBuySellAction } from 'src/redux/slices/keepDataBuySell';
import ipcMain from 'src/common/classes/IpcMain';

function BasketPage() {
    const [detailParams, setDetailParams] = useState<filterStateType>(cleanObjectOfFalsyValues(initialDataFilterBasket) as filterStateType);
    const [gridApi, setGridApi] = useState<GridReadyEvent<IGetWatchlistSymbol>>();
    const { t } = useTranslation();
    const dispatch = useBasketDispatch();
    const appDispatch = useAppDispatch();

    const {
        data: basketDetails,
        isLoading: basketDetailsIsLoading,
        refetch: fetchBasketDetails,
    } = useGetDetailsBasket(cleanObjectOfFalsyValues(detailParams) as filterStateType);

    // useEffect(() => {
    //     detailParams?.CartId && fetchBasketDetails();
    // }, [detailParams]);

    const saveIndexBasketSelected = (id: number) => {
        setDetailParams((prev) => ({ ...prev, CartId: id }));
        dispatch({ type: 'SET_BASKET_ID', value: id });
    };

    const handleRefetchDetailsBasket = () => {
        //
        const clearTime = setTimeout(() => {
            fetchBasketDetails()
            clearTimeout(clearTime)
        }, 1000);
    }

    useEffect(() => {
        return () => {
            appDispatch(setComeFromBuySellAction(""))
        }
    }, []);

    useEffect(() => {
        ipcMain.handle('refetchBasket', handleRefetchDetailsBasket)

        return () => ipcMain.removeChannel('refetchBasket')
    }, [])



    const handlePageInfoChange = (action: 'PageNumber' | 'PageSize', value: number) => setDetailParams((pre) => ({ ...pre, [action]: value }));


    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 flex flex-col">
            <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.basket')}</h1>
            <TopBasket params={detailParams} saveIndexBasketSelected={saveIndexBasketSelected} gridApi={gridApi} />
            <FilterBasket setDetailParams={setDetailParams} />
            <TableBasket
                {...{
                    activeBasket: detailParams.CartId,
                    listAfterFilter: basketDetails,
                    setGridApi,
                    dataListLoading: basketDetailsIsLoading,
                    handlePageInfoChange
                }}
            />
            <InsertBasketItem
                activeBasket={detailParams.CartId}
                basketDetails={basketDetails}
                fetchBasketDetails={fetchBasketDetails}
            />
        </div>
    );
}

export default BasketPage;
