import WidgetLoading from "src/common/components/WidgetLoading"
import SymbolTitleCellRenderer from "../components/SymbolTitleCellRenderer";
import { FC, useEffect, useMemo } from "react";
import AGTable, { ColDefType } from "src/common/components/AGTable";
import { useCommissionQuery } from "src/app/queries/trade";
import { useCustomerPortfolio } from "src/app/queries/portfolio";
import { seprateNumber } from "src/utils/helpers";
import { useTranslation } from "react-i18next";
import { subscriptionPortfolio } from "src/ls/subscribes";
import { pushEngine } from "src/ls/pushEngine";



interface IPortfolioProps {
    customerISIN: string[] ,
    isPortfolioModalOpen : boolean | undefined ,
}


export const Portfolio: FC<IPortfolioProps> = ({ customerISIN , isPortfolioModalOpen }) => {

    const { t } = useTranslation();


    const { data: commission } = useCommissionQuery();

    const { data, isFetching } = useCustomerPortfolio({ CustomerISIN: customerISIN });

    const { result: rowData } = data || {};


    const getCommission = (marketUnit: MarketUnit) => {
        return commission?.find((item) => item.marketUnitTitle === marketUnit)?.sellCommission;
    };

    const calcProfitAndLoss = (data?: IGTPortfolioResultType) => {
        if (!data || !data.averagePrice) return 0;
        const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
        const sellCommissionValue = getCommission(marketUnitTypeTitle);

        if (!sellCommissionValue) return null;

        const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

        const value = (price - averagePrice) * asset;
        const valueWithCommission = Math.abs(value) - Math.ceil(price * asset * sellCommissionValue);

        return (value < 0 || valueWithCommission < 0 ? -1 : 1) * Math.abs(valueWithCommission);
    };

    const calcProfitAndLossPercent = (data?: IGTPortfolioResultType) => {
        if (!data || !data.averagePrice) return 0;
        const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
        const sellCommissionValue = getCommission(marketUnitTypeTitle);

        if (!sellCommissionValue) return null;

        const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

        const profitLossPercent = ((Math.ceil(price * asset * (1 - sellCommissionValue)) - averagePrice * asset) / (averagePrice * asset)) * 100;

        return profitLossPercent;
    };

    useEffect(() => {
        if (rowData && !!rowData.length && !!isPortfolioModalOpen) {
            const symbols = rowData.map(({ symbolISIN }) => symbolISIN);
            subscriptionPortfolio(symbols, { CustomerISIN: customerISIN });
        }
    }, [rowData]);

    useEffect(() => {
        return () => pushEngine.unSubscribe('portfolioSymbols');
    }, []);


    const Columns = useMemo(
        (): ColDefType<IGTPortfolioResultType>[] => [
            {
                headerName: t('ag_columns_headerName.symbol'),
                field: 'symbolTitle',
                cellClass: 'font-bold',
                width: 100,
                cellRenderer: SymbolTitleCellRenderer
            },
            {
                headerName: t('ag_columns_headerName.count'),
                field: 'asset',
                type: 'sepratedNumber',
                width: 100
            },
            {
                headerName: t('ag_columns_headerName.lastPriceAverage'),
                field: 'averagePrice',
                type: 'sepratedNumber',
                minWidth: 120
            },
            {
                headerName: t('ag_columns_headerName.finalCost'),
                field: 'bep',
                type: 'sepratedNumber',
                width: 100
            },
            {
                headerName: t('ag_columns_headerName.pureDayValue'),
                field: 'dayValue',
                type: 'sepratedNumber',
                width: 100
            },
            {
                headerName: t('ag_columns_headerName.headToheadPrice'),
                field: 'bepPrice',
                type: 'sepratedNumber',
                width: 100
            },
            {
                headerName: t('ag_columns_headerName.profitAndLoss'),
                field: 'lostProfitValue',
                cellClass: ({ value }) => (value > 0 ? 'text-L-success-200' : 'text-L-error-200'),
                valueGetter: ({ data }) => calcProfitAndLoss(data),
                valueFormatter: ({ value }) => (value ? seprateNumber(Math.abs(value)) : '-'),
                width: 150
            },
            {
                headerName: t('ag_columns_headerName.profitAndLossPercent'),
                cellClass: ({ value }) => (value > 0 ? 'text-L-success-200' : 'text-L-error-200'),
                valueGetter: ({ data }) => calcProfitAndLossPercent(data),
                valueFormatter: ({ value }) => (value ? Math.abs(value).toFixed(2) + '%' : '-'),
                width: 150
            },
        ],
        [commission],
    );

    return (
        <div className="h-full">
            <WidgetLoading spining={isFetching}>
                    <AGTable
                        columnDefs={Columns}
                        rowData={rowData || []}
                        suppressScrollOnNewData
                        suppressRowVirtualisation
                    />
            </WidgetLoading>
        </div>
    )
}
