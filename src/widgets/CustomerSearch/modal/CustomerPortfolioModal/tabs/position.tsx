import React, { FC, useMemo } from 'react'
import { useListOptionOrders } from 'src/app/queries/option';
import AGTable, { ColDefType } from 'src/common/components/AGTable'
import WidgetLoading from 'src/common/components/WidgetLoading'
import SymbolTitleCellRenderer from '../components/SymbolTitleCellRenderer';
import { useTranslation } from 'react-i18next';
import { useCommissionQuery } from 'src/app/queries/trade';
import { ICellRendererParams } from 'ag-grid-community';
import { sepNumbersNavigateNumber, seprateNumber } from 'src/utils/helpers';
import { ClosingPrice, LastTradedPrice } from 'src/widgets/Watchlist/components/CellRenderer';

interface IPositionProps {
    customerISIN: string[],
    isPortfolioModalOpen: boolean | undefined,
}


export const Position: FC<IPositionProps> = ({ customerISIN, isPortfolioModalOpen }) => {

    const { t } = useTranslation();

    const { data: commissionsData } = useCommissionQuery();

    const { data: rowData, isFetching } = useListOptionOrders({ customerISIN: customerISIN[0] });

    const optionCommission = useMemo(() => {
        const commission = commissionsData?.find(c => c.marketUnitTitle === "OptionToBuyInBourse" && c.marketTitle === 'Option');

        return commission?.buyCommission || commission?.sellCommission || 0;
    }, [commissionsData]);



    const COLUMNS = useMemo((): ColDefType<IResponseOptionOrders>[] => {
        return [
            /* نماد */
            {
                colId: 'column_symbol_title',
                headerName: t("orders.column_symbol_title"),
                field: "symbolTitle",
                pinned: window.innerWidth > 992 ? "right" : false,
                minWidth: 136,
                maxWidth: 200,
                checkboxSelection: false,
                cellRenderer: SymbolTitleCellRenderer,
                cellClass: "justify-start rounded-r border-0 border-r-4 pr-8",
                cellClassRules: {
                    "border-L-error-200": ({ data }) => !!data && data.positionSide === "Sell",
                    "border-L-success-200": ({ data }) => !!data && data.positionSide === "Buy"
                },
                valueGetter: ({ data }) => (data && data?.symbolTitle) ? data.symbolTitle : '-',
                comparator: (valueA, valueB) => valueA.localeCompare(valueB)
            },

            /* موقعیت */
            {
                colId: 'column_position_side',
                headerName: t("orders.column_position_side"),
                field: 'positionSide',
                maxWidth: 110,
                valueFormatter: ({ value }) => t("common." + String(value).toLowerCase()),
                cellClass: ({ data }) => {
                    if (!data) return '';
                    return (data.positionSide === 'Buy') ? 'text-L-success-200' : 'text-L-error-200';
                },
                comparator: (valueA, valueB) => valueA.localeCompare(valueB)
            },

            /* تعداد موقعیت */
            {
                colId: 'column_position_count',
                headerName: t("orders.column_position_count"),
                field: "positionCount",
                maxWidth: 110,
                cellClass: ({ data }) => {
                    if (!data) return '';
                    return (data?.positionSide === 'Buy') ? 'text-L-success-200' : 'text-L-error-200';
                },
                type: 'sepratedNumber'
            },

            /* محل تضمین */
            {
                colId: 'column_blocked',
                headerName: t("orders.column_option_blockType"),
                field: "blockType",
                valueGetter: ({ data }) => {
                    if (data?.positionSide === 'Buy') return '-';
                    if (data?.blockType) return t('option_blockType.' + data.blockType);
                    return '-';
                }
            },

            /* تسویه فیزیکی */
            {
                colId: 'column_physical_settlement_date',
                headerName: t("orders.column_physical_settlement_date"),
                field: "physicalSettlementDate",
                type: "dateWithoutTime"
            },

            /* روزهای مانده تا سررسید */
            {
                colId: 'column_remain_days',
                headerName: t("orders.column_remain_days"),
                field: "remainDays",
                valueFormatter: ({ value }) => String(Math.max(value || 0, 0)),
                minWidth: 150
            },

            /* قیمت اعمال */
            {
                colId: 'column_strike_price',
                headerName: t("orders.column_strike_price"),
                field: "strikePrice",
                type: "sepratedNumber"
            },

            /* سود وزیان */
            {
                colId: 'column_pandL',
                headerName: t("orders.column_profit_loss"),
                minWidth: 165,
                cellClass: "ltr",
                // cellRendererParams: { optionCommission },
                cellRenderer: ({ data }: ICellRendererParams<IResponseOptionOrders>) => {
                    const avgPrice = (data?.positionSide === 'Buy' ? data?.avgBuyPrice : data?.avgSellPrice) || 0;

                    const bestPrice = data?.lastTradedPrice || 0;

                    const price = data?.positionSide === 'Buy' ? (bestPrice - avgPrice) : (avgPrice - bestPrice);

                    const valuePrice = price * (data?.contractSize || 0) * (data?.positionCount || 0);

                    const valueWithCommission = data?.positionSide === 'Buy' ? Math.round(valuePrice * (1 + optionCommission)) : Math.round(valuePrice * (1 - optionCommission));

                    return seprateNumber(((valueWithCommission < 0) ? -1 : 1) * Math.abs(valueWithCommission));
                },
            },
            /*  ارزش بستن موقعیت */
            {
                colId: 'column_close_pandL',
                headerName: t("orders.column_closePosition_value"),
                valueGetter: ({ data }) => {
                    if (!data) return 0;

                    const price = data?.lastTradedPrice || 0;

                    const value = price * data.contractSize * data.positionCount;
                    const valueWithCommission = data.positionSide === 'Buy' ? Math.round(value * (1 + optionCommission)) : Math.round(value * (1 - optionCommission));

                    return ((data.positionSide === 'Sell') ? -1 : 1) * Math.abs(valueWithCommission);

                },
                valueFormatter: ({ value }) => sepNumbersNavigateNumber(value),
                cellClassRules: {
                    'ltr text-center text-L-gray-600 dark:text-D-gray-600': ({ value }) => value === 0,
                    'ltr text-center text-L-success-200': ({ value }) => value > 0,
                    'ltr text-center text-L-error-200': ({ value }) => value < 2000,
                },
                minWidth: 150
            },
            /* میانگین خرید فروش */
            {
                colId: 'column_avg_price',
                headerName: t("orders.column_buySell_average"),
                valueGetter: ({ data }) =>
                    data?.positionSide === 'Buy' ? data?.avgBuyPrice : data?.positionSide === 'Sell' ? data?.avgSellPrice : 0
                ,
                type: "sepratedNumber",
                minWidth: 150
            },
            /* آخرین قیمت */
            {
                colId: 'lastTradedPrice',
                field: 'lastTradedPrice',
                headerName: t('table_columns.lastTradedPrice'),
                minWidth: 140,
                cellRenderer: LastTradedPrice,
                cellRendererParams: ({ data }: ICellRendererParams<IResponseOptionOrders>) => ({
                    percent: data ? data.lastTradedPriceVarPercent : 0
                })
            },

            /* قیمت پایانی */
            {
                colId: 'closingPrice',
                headerName: t('table_columns.closingPrice'),
                minWidth: 140,
                cellRenderer: ClosingPrice,
                cellRendererParams: ({ data }: ICellRendererParams<IResponseOptionOrders>) => ({
                    percent: data ? data.closingPriceVarPercent : 0
                })
            },

            /* عملیات */
            // {
            //     colId: 'column_actions',
            //     headerName: t("orders.column_actions"),
            //     field: 'canClosePosition',
            //     maxWidth: 145,
            //     minWidth: 145,
            //     pinned: window.innerWidth > 992 ? "left" : false,
            //     sortable: false,
            //     cellRendererParams: { handleOptionSettlement },
            //     cellRenderer: OptionAction
            // },
        ];
    }, [optionCommission]);


    return (
        <div className="h-full border-L-success-200">
            <WidgetLoading spining={isFetching}>
                <AGTable
                    columnDefs={COLUMNS}
                    rowData={rowData?.result || []}
                    suppressScrollOnNewData
                    suppressRowVirtualisation
                />
            </WidgetLoading>
        </div>
    )
}
