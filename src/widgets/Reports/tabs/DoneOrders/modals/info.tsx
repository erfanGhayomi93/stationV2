import { FC, Fragment, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useGetTodayDoneTradesDetails } from "src/app/queries/order"
import AGTable, { ColDefType } from "src/common/components/AGTable"
import Modal from "src/common/components/Modal"
import WidgetLoading from "src/common/components/WidgetLoading"
import { CloseIcon } from "src/common/icons"
import { seprateNumber, valueFormatterSide } from "src/utils/helpers"

type InfoType = {
    isOpen: boolean,
    onClose: () => void,
    modalData?: IOrderGetType;
}

type brifDataType = {
    row: number;
    quantity: number;
    price: number;
    commission: number;
    tradeValue: number;
}

const initBrif = { row: 0, quantity: 0, price: 0, commission: 0, tradeValue: 0 }




export const InfoDoneOrders: FC<InfoType> = ({ isOpen, onClose, modalData }) => {

    const { t } = useTranslation()

    const { customerISIN, orderSide, symbolISIN } = modalData || {}

    const [brifData, setBrifData] = useState<brifDataType>(initBrif)

    const { data, isFetching } = useGetTodayDoneTradesDetails({ customerISIN: customerISIN, orderSide: orderSide, symbolISIN: symbolISIN }, {
        enabled: !!modalData
    })



    const handleCheckValue = (value?: number) => {
        if (!value) return 0
        return Math.round(value)
    }

    useEffect(() => {
        if (!data) return

        const sumData = {
            row: data.length, quantity: 0, price: 0, commission: 0, tradeValue: 0
        }

        data.forEach(item => {
            sumData.quantity += handleCheckValue(item.quantity)
            sumData.price += handleCheckValue(item.price)
            sumData.commission += handleCheckValue(item?.commission || 0)
            sumData.tradeValue += handleCheckValue(item.totalPrice)
        })

        setBrifData({
            ...sumData,
            price: Math.round(sumData.price / data.length)
        })

        return () => setBrifData(initBrif)
    }, [data])


    const colDefs = useMemo(
        (): ColDefType<TTodayDoneTrades>[] => [
            {
                headerName: 'ردیف', type: 'agTableIndex', valueFormatter: ({ node }) => String(((1) - 1) * (1) + node?.rowIndex! + 1),
                lockVisible: true,
                sortable: false,
                pinned: 'right',
                maxWidth: 60,
            },
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle', pinned: 'right' },
            { headerName: 'نام نماد', field: 'symbolTitle', pinned: 'right' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide, maxWidth: 70 },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber', maxWidth: 70 },
            { headerName: 'میانگین قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'کارمزد', field: 'commission', type: 'sepratedNumber' },
            {
                headerName: 'ارزش معامله',
                field: 'totalPrice',
                type: 'abbreviatedNumber',
                maxWidth: 170,
            },
            { headerName: 'زمان', type: 'date', field: "tradeDate", minWidth: 170, pinned: "left" }
        ],
        [],
    );


    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-[850px] h-[544px] rounded">
            <div className="w-full bg-L-gray-100 dark:bg-D-gray-100 shadow-md grid grid-rows-min-one">

                <div className="flex justify-between items-center bg-L-blue-200 dark:bg-D-blue-200 px-6 h-12 min-h-[3rem]">
                    <span className="font-normal text-sm text-white">
                        جزئیات سفارش <span className="text-L-info-50 dark:text-D-info-50">{'مشتری '} </span>
                    </span>
                    <button className="p-1" onClick={onClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>

                <WidgetLoading spining={isFetching}>
                    <div className="p-4 box-border">
                        <div className="overflow-y-auto h-[393px]">
                            <AGTable
                                columnDefs={colDefs}
                                rowData={data}
                                suppressRowVirtualisation={true}
                                suppressScrollOnNewData={true}
                                onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
                                onRowDataUpdated={({ api }) => api.sizeColumnsToFit()}
                                onFirstDataRendered={({ api }) => api.sizeColumnsToFit()}
                                domLayout="autoHeight"
                                agGridTheme="balham"

                            />
                        </div>

                        <div className="bg-L-basic dark:bg-D-basic shadow-sm rounded-lg p-4 m-2 box-border">
                            <div className="flex items-center justify-between">
                                {
                                    Object.keys(brifData).map((item, ind) => {
                                        const value = brifData[item as keyof brifDataType]
                                        return (
                                            <Fragment key={ind}>
                                                <div>
                                                    <span className="text-L-gray-600 dark:text-D-gray-600 font-medium">
                                                        {t(`ag_columns_headerName.${item}`)}:
                                                    </span>
                                                    <span className="text-L-gray-700 dark:text-D-gray-700 font-medium mr-2">
                                                        {
                                                            item === "row" || item === "quantity" ? value :
                                                                <>
                                                                    <span>{seprateNumber(value)}</span>
                                                                    <span className="text-L-gray-500 dark:text-D-gray-500 mr-2">ریال</span>
                                                                </>
                                                        }
                                                    </span>
                                                </div>

                                                {ind < 4 && <span className="w-[1px] h-[19px] bg-L-gray-400 dark:bg-D-gray-400" />}
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    )
}



// const data: TTodayDoneTrades[] = [
//     {
//         "customerISIN": "18990013529595",
//         "customerTitle": "مهیار اکبری",
//         "symbolISIN": "IRO1SIPA0001",
//         "symbolTitle": "خساپا",
//         "orderSide": "Sell",
//         "price": 1600,
//         "quantity": 2,
//         "totalPrice": 2,
//         "tradeDate": "2024-01-30T00:00:00"
//     },
//     {
//         "customerISIN": "18990013529595",
//         "customerTitle": "مهیار اکبری",
//         "symbolISIN": "IRO1SIPA0001",
//         "symbolTitle": "خساپا",
//         "orderSide": "Sell",
//         "price": 1600,
//         "quantity": 2,
//         "totalPrice": 2,
//         "tradeDate": "2024-01-30T00:00:00"
//     }, {
//         "customerISIN": "18990013529595",
//         "customerTitle": "مهیار اکبری",
//         "symbolISIN": "IRO1SIPA0001",
//         "symbolTitle": "خساپا",
//         "orderSide": "Sell",
//         "price": 1600,
//         "quantity": 2,
//         "totalPrice": 2,
//         "tradeDate": "2024-01-30T00:00:00"
//     }
// ]
