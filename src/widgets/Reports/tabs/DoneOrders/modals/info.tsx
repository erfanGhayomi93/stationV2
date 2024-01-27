import { ICellRendererParams } from "ag-grid-community"
import { FC, useMemo } from "react"
import { useGetTodayDoneTradesDetails } from "src/app/queries/order"
import AGTable, { ColDefType } from "src/common/components/AGTable"
import Modal from "src/common/components/Modal"
import WidgetLoading from "src/common/components/WidgetLoading"
import { CloseIcon } from "src/common/icons"
import { abbreviateNumber, valueFormatterSide } from "src/utils/helpers"

type InfoType = {
    isOpen: boolean,
    onClose: () => void,
    modalData?: IOrderGetType;
}


export const InfoDoneOrders: FC<InfoType> = ({ isOpen, onClose, modalData }) => {

    const { customerISIN, orderSide, symbolISIN } = modalData || {}

    const { data } = useGetTodayDoneTradesDetails({ customerISIN: customerISIN, orderSide: orderSide, symbolISIN: symbolISIN }, {
        enabled: !!modalData
    })

    const colDefs = useMemo(
        (): ColDefType<TTodayDoneTrades>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'میانگین قیمت', field: 'price', type: 'sepratedNumber' },
            {
                headerName: 'ارزش معامله',
                field: 'totalPrice',
                type: 'abbreviatedNumber',
                maxWidth: 170,
                cellRenderer: (row: ICellRendererParams<TTodayDoneTrades>) => (
                    <div className='flex justify-start ml-4 gap-x-5'>
                        <div className='flex-1 text-left'>
                            <span>{abbreviateNumber(row.value)}</span>
                        </div>
                    </div >
                ),
            },
        ],
        [],
    );


    return (
        <Modal isOpen={isOpen} onClose={onClose} className="w-[800px] h-[544px] rounded">
            <div className="w-full h-full bg-L-basic dark:bg-D-basic flex flex-col shadow-md">
                <div className="flex justify-between items-center bg-L-blue-200 dark:bg-D-primary-200 px-6 h-12">
                    <span className="font-normal text-sm text-white">
                        جزئیات سفارش <span className="text-L-info-50 dark:text-D-info-50">{'مشتری '} </span>
                    </span>
                    <button className="p-1" onClick={onClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>

                <div className="flex-1 p-6">
                    <WidgetLoading spining={false}>
                        <AGTable
                            columnDefs={colDefs}
                            rowData={data}
                            suppressRowVirtualisation={true}
                            suppressScrollOnNewData={true}
                            onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
                            onRowDataUpdated={({ api }) => api.sizeColumnsToFit()}
                            onFirstDataRendered={({ api }) => api.sizeColumnsToFit()}
                        />
                    </WidgetLoading>
                </div>
            </div>
        </Modal>
    )
}
