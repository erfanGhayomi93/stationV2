import { useEffect, useState } from "react"
import { PortfolioListFilter } from "./components/porfolioListFilter"
import { initStatePortfolioFilter } from "./constant"
import Tippy from "@tippyjs/react"
import { Refresh2Icon } from "src/common/icons"
import { useTranslation } from "react-i18next"
import { PortfolioTable } from "./components/portfolioTable"
import { useCustomerPortfolio } from "src/app/queries/portfolio"
import { subscriptionPortfolio } from "src/ls/subscribes"
import { pushEngine } from "src/ls/pushEngine"
import { useAppDispatch } from "src/redux/hooks"
import { emptySelectedCustomers, emptySelectedSymbol } from "src/redux/slices/option"
import { GridReadyEvent } from "ag-grid-community"
import AGColumnEditor from "src/common/components/AGTable/AGColumnEditor"



const PortfolioMain = () => {
    const { t } = useTranslation()
    const [filterData, setFilterData] = useState<TPortfolioListFilter>(initStatePortfolioFilter)
    const [params, setParams] = useState<TPortfolioListFilter>(filterData)
    const dispatch = useAppDispatch();
    const [gridApi, setGridApi] = useState<GridReadyEvent>();



    const { SymbolISIN, CustomerISIN, customerType, MarketUnitType, PageNumber, PageSize, MarketType } = params

    const factoryParams = () => {
        return {
            CustomerISIN: CustomerISIN.map(item => item.customerISIN),
            SymbolISIN: SymbolISIN.map(item => item.symbolISIN),
            CustomerType: !!customerType ? customerType : undefined,
            pageNumber: PageNumber,
            pageSize: PageSize,
            MarketUnitType: !!MarketUnitType ? MarketUnitType : undefined,
            MarketType: !!MarketType ? MarketType : undefined
        }
    }

    const { data, isFetching, refetch } = useCustomerPortfolio(factoryParams(), {
        keepPreviousData: true,
        onSuccess(data) {
            pushEngine.unSubscribe('portfolioSymbols')
            const rowData = data?.result;

            if (rowData && rowData.length) {
                const symbols = rowData.map(({ symbolISIN }) => symbolISIN);
                subscriptionPortfolio(symbols, factoryParams());
            }
        },
    })


    useEffect(() => {
        return () => pushEngine.unSubscribe('portfolioSymbols');
    }, []);

    const PaginatorHandler = (action: 'PageNumber' | 'PageSize', value: number) => {
        setFilterData((pre) => ({ ...pre, [action]: value }));
        setParams((pre) => ({ ...pre, [action]: value }));
    }

    const onSubmitFilter = () => {
        setParams(filterData)
    }

    const onClearFilter = () => {
        dispatch(emptySelectedCustomers());
        dispatch(emptySelectedSymbol());
        setParams(initStatePortfolioFilter)
        setFilterData(initStatePortfolioFilter)
    }

    const refreshPage = () => {
        refetch()
    }

    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <div className="flex items-center justify-between">
                <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t('titlePage.portfolio')}</h1>
                <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                    <AGColumnEditor gridApi={gridApi} lsKey="requests" />

                    <Tippy content={t("Action_Button.Update")} className="text-xs">
                        <Refresh2Icon onClick={refreshPage} className="cursor-pointer outline-none" />
                    </Tippy>
                </div>
            </div>
            <div className="grid grid-rows-min-one gap-4">
                <PortfolioListFilter
                    filterData={filterData}
                    setFilterData={setFilterData}
                    onSubmit={onSubmitFilter}
                    onClear={onClearFilter}
                />
                <div className="grid grid-rows-one-min">
                    <PortfolioTable
                        loading={isFetching}
                        data={data}
                        PaginatorHandler={PaginatorHandler}
                        setGridApi={setGridApi}
                    />
                </div>
            </div>
        </div>
    )
}


export default PortfolioMain
