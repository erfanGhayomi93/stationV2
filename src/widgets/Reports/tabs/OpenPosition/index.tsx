import { ICellRendererParams } from "ag-grid-community"
import clsx from "clsx"
import dayjs from "dayjs"
import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useOpenPosition } from "src/app/queries/option"
import { useSymbolGeneralInfo } from "src/app/queries/symbol"
import AGTable, { ColDefType } from "src/common/components/AGTable"
import AGHeaderSearchInput from "src/common/components/AGTable/HeaderSearchInput"
import WidgetLoading from "src/common/components/WidgetLoading"
import useUpdateEffect from "src/common/hooks/useUpdateEffect"
import { ReverseOptionIcon } from "src/common/icons"
import { ComeFromKeepDataEnum } from "src/constant/enums"
import BlockedValueTableComponent from "src/pages/Reports/PositionHistory/BlockedValueTableComponent"
import { useAppDispatch } from "src/redux/hooks"
import { setPartDataBuySellAction } from "src/redux/slices/keepDataBuySell"
import { setSelectedSymbol } from "src/redux/slices/option"
import { seprateNumber } from "src/utils/helpers"

type RowStateType = {
    symbolISIN: string;
    availableClosePosition: number;
    positionSide: string;
    customerISIN: string;
}

const initRowState = {
    symbolISIN: "",
    availableClosePosition: 0,
    positionSide: "",
    customerISIN: ""
}

export const OpenPosition = () => {
    const { t } = useTranslation()

    const appDispatch = useAppDispatch()

    const [rowState, setRowState] = useState<RowStateType>(initRowState)

    const { data, isFetching } = useOpenPosition()

    const { data: dataBestPrice, refetch } = useSymbolGeneralInfo<bestPriceBuySell>(rowState.symbolISIN, {
        select: (data) => {
            return {
                bestBuyLimitPrice_1: data.ordersData.bestBuyLimitPrice_1,
                bestSellLimitPrice_1: data.ordersData.bestSellLimitPrice_1,
            }
        }
    })

    useEffect(() => {
        if (!!dataBestPrice) {
            updateByeSellModal(dataBestPrice)
        }
    }, [dataBestPrice])


    const updateByeSellModal = (data?: bestPriceBuySell) => {
        const { symbolISIN, availableClosePosition, positionSide, customerISIN } = rowState
        if (!data) {
            alert("it hasnt data")
            return
        }

        else if (symbolISIN && data) {
            !!symbolISIN && appDispatch(setSelectedSymbol(symbolISIN));

            appDispatch(
                setPartDataBuySellAction({
                    data: {
                        price: positionSide === "Buy" ? data?.bestBuyLimitPrice_1 : data?.bestSellLimitPrice_1,
                        quantity: availableClosePosition,
                        side: positionSide === "Buy" ? "Sell" : "Buy",
                        symbolISIN: symbolISIN,
                    },
                    comeFrom: ComeFromKeepDataEnum.OpenPosition,
                    customerIsin: [customerISIN],
                }),
            )

            setRowState(initRowState)
        }
    }

    const clickReverseOption = (row: ICellRendererParams<IOpenPositionsRes>) => {
        if (!row.value) return

        const { symbolISIN, availableClosePosition, positionSide, customerISIN } = row.data as IOpenPositionsRes

        setRowState({
            symbolISIN,
            availableClosePosition,
            positionSide,
            customerISIN
        })

    }

    useUpdateEffect(() => {
        if (rowState.symbolISIN) refetch()
    }, [rowState])



    const columns = useMemo((): ColDefType<IOpenPositionsRes>[] => [
        /* مشتری */
        {
            headerName: t("options.column_customer_title"),
            field: "customerTitle",
            headerComponent: AGHeaderSearchInput,
            valueFormatter: (data) => data?.data?.customerTitle + " - " + data?.data?.bourseCode,
            minWidth: 200
        },
        /* نماد */
        {
            headerName: t("options.column_symbol_title"),
            field: "symbolTitle",
            headerComponent: AGHeaderSearchInput
        },
        /* موقعیت */
        {
            colId: 'column_position_side',
            headerName: t("options.column_position_side"),
            field: 'positionSide',
            valueFormatter: ({ value }) => t("orderSide." + String(value)),
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.positionSide === 'Buy') ? 'text-L-success-200' : 'text-L-error-200';
            },
            comparator: (valueA, valueB) => valueA.localeCompare(valueB)
        },
        /* تعداد موقعیت */
        {
            colId: 'column_position_count',
            headerName: t("options.column_position_count"),
            field: "positionCount",
            minWidth: 144,
            flex: 1,
            maxWidth: 100,
            // cellClass: ({ data }) => {
            //     if (!data) return '';
            // },
            valueFormatter: ({ value }) => seprateNumber(value ?? 0)
        },
        /* وجه مسدودی */
        // {
        //     colId: 'column_blocked_margin',
        //     headerName: t("options.column_blocked_margin"),
        //     field: "blockedMargin",
        //     minWidth: 144,
        //     flex: 1,
        //     valueFormatter: ({ value }) => seprateNumber(value ?? 0)
        // },
        //محل تضمین
        {
            colId: 'blockType',
            headerName: t("options.blockType"),
            field: "blockType",
            valueGetter: ({ data }) => {
                if (data?.positionSide === 'Sell') {
                    return t('option_blockType.' + data?.blockType);
                }

                return '-';
            }
        },
        //اندازه تضمین
        {
            colId: 'blockCount',
            headerName: t("options.blockCount"),
            field: "blockCount",
            minWidth: 150,
            cellRenderer: BlockedValueTableComponent,
        },
        /* وجه تضمین جبرانی */
        {
            colId: 'column_variation_margin',
            headerName: t("options.column_variation_margin"),
            field: "variationMargin",
            minWidth: 144,
            flex: 1,
            valueFormatter: ({ value }) => {
                if (!value) return '—';
                return seprateNumber(value ?? 0);
            }
        },

        /* تسویه فیزیکی */
        {
            colId: 'column_physical_settlement_date',
            headerName: t("options.column_physical_settlement_date"),
            field: "physicalSettlementDate",
            minWidth: 144,
            flex: 1,
            valueFormatter: ({ value }) => dayjs(value).calendar("jalali").format("YYYY/MM/DD")
            // type: "date"
        },

        /* قیمت اعمال */
        {
            colId: 'column_strike_price',
            headerName: t("options.column_strike_price"),
            field: "strikePrice",
            minWidth: 80,
            flex: 1,
            valueFormatter: ({ value }) => seprateNumber(value ?? 0)
        },

        /* روزهای مانده تا سررسید */
        {
            colId: 'column_remain_days',
            headerName: t("options.column_remain_days"),
            field: "remainDays",
            minWidth: 80,
            flex: 1,
            valueFormatter: ({ data }) => String(Math.max(data?.remainDays || 0, 0)),
        },
        {
            headerName: t('ag_columns_headerName.actions'),
            field: 'canClosePosition',
            cellRenderer: (row: ICellRendererParams<IOpenPositionsRes>) => (
                <div
                    className={clsx("h-full flex items-center justify-center")}
                >
                    <ReverseOptionIcon
                        className={clsx({
                            "text-L-gray-400 dark:text-D-gray-400": !row.value,
                            "text-L-gray-600 dark:text-D-gray-600 cursor-pointer": row.value,
                        })}
                        onClick={() => clickReverseOption(row)}
                    />
                </div>
            ),
        },

    ], [])


    return (
        <>
            <WidgetLoading spining={isFetching}>
                <div className='h-full'>
                    <AGTable
                        // agGridTheme="alpine"
                        rowData={data}
                        columnDefs={columns}
                        enableBrowserTooltips={true}
                        suppressRowVirtualisation={true}
                    />
                </div>
            </WidgetLoading>
        </>
    )
}
