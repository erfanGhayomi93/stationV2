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
import { useAppDispatch } from "src/redux/hooks"
import { setPartDataBuySellAction } from "src/redux/slices/keepDataBuySell"
import { setSelectedSymbol } from "src/redux/slices/option"
import { seprateNumber } from "src/utils/helpers"

type RowStateType = {
    symbolISIN: string;
    availableClosePosition: number;
    side: string;
    customerISIN: string;
}

const initRowState = {
    symbolISIN: "",
    availableClosePosition: 0,
    side: "",
    customerISIN: ""
}

export const OpenPosition = () => {
    const { t } = useTranslation()
    const appDispatch = useAppDispatch()

    const [rowState, setRowState] = useState<RowStateType>(initRowState)
    const [InputSearch, setInputSearch] = useState("")

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
        const { symbolISIN, availableClosePosition, side, customerISIN } = rowState
        if (!data) {
            alert("it hasnt data")
            return
        }

        else if (symbolISIN && data) {
            !!symbolISIN && appDispatch(setSelectedSymbol(symbolISIN));

            appDispatch(
                setPartDataBuySellAction({
                    data: {
                        price: side === "Buy" ? data?.bestBuyLimitPrice_1 : data?.bestSellLimitPrice_1,
                        quantity: availableClosePosition,
                        side: side === "Buy" ? "Sell" : "Buy",
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

        const { symbolISIN, availableClosePosition, side, customerISIN } = row.data as IOpenPositionsRes

        setRowState({
            symbolISIN,
            availableClosePosition,
            side,
            customerISIN
        })

    }


    useUpdateEffect(() => {
        if (rowState.symbolISIN) refetch()
    }, [rowState])


    const filterData = () => {
        if (!InputSearch) return data
        if (!data) return []

        return data.filter((item) => item.customerTitle.trim().includes(InputSearch.trim()))
    }


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
            field: 'side',
            valueFormatter: ({ value }) => t("orderSide." + String(value)),
            cellClass: ({ data }) => {
                if (!data) return '';
                return (data.side === 'Buy') ? 'text-L-success-200' : 'text-L-error-200';
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
            maxWidth : 100,
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
                if (data?.side === 'Sell') {
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
            valueGetter: ({ data }) => {
                if (data?.side !== 'Sell') return '-';
                const label = data.blockType === 'Account' ? ` ${t('common.rial')}` : data.blockType === 'Position' ? `${t('common.position')}` + (data.positionBlockTitle ? ` (${data.positionBlockTitle})` : '') : data.blockType === 'Portfolio' ? ` ${t('common.share')}` : "";
                if (data.blockType === 'Account') return seprateNumber(data.marginBlockedValue || 0) + label;
                if (data.blockType === 'Portfolio') return seprateNumber(data.blockCount || 0) + label;
                if (data.blockType === 'Position') return seprateNumber(data.positionCount || 0) + label;
            }
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
            valueFormatter: ({ data }) => Math.max(data?.remainDays || 0, 0),
        },
        {
            headerName: t('ag_columns_headerName.actions'),
            field: 'canClosePosition',
            minWidth: 80,
            cellRenderer: (row: ICellRendererParams<IOpenPositionsRes>) => (
                <div
                    className={clsx("h-full flex items-center justify-center", {

                    })}

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
                <div className={'h-full p-3'}>
                    <AGTable
                        agGridTheme="alpine"
                        rowData={filterData()}
                        columnDefs={columns}
                        enableBrowserTooltips={true}
                    />
                </div>
            </WidgetLoading>
        </>
    )
}
