import { Dispatch, FC, SetStateAction, useEffect, useMemo } from 'react'
import AGTable, { ColDefType } from 'src/common/components/AGTable'
import Modal from 'src/common/components/Modal'
import { CloseIcon } from 'src/common/icons'


type InsertExcelProps = {
    isOpenModal: boolean,
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    excelData: InputCustomerExcelType[],
    setExcelData: Dispatch<SetStateAction<InputCustomerExcelType[]>>
    submitCreateBulk: () => void
}

export const InsertExcel: FC<InsertExcelProps> = ({ isOpenModal, setIsOpenModal, excelData, setExcelData, submitCreateBulk }) => {

    const columns = useMemo((): ColDefType<InputCustomerExcelType>[] => [
        {
            headerName: "شناسه نماد",
            field: "symbolISIN",
        },
        {
            headerName: "قیمت",
            field: "price",
        },
        {
            headerName: "تعداد",
            field: "quantity",
        },
        {
            headerName: "درصد",
            field: "percent",
        }, {
            headerName: "سمت",
            field: "side",
        },
        {
            headerName: "شناسه مشتری",
            field: "customerISIN",
        }
    ], [])

    const setFlagToggle = () => {
        setIsOpenModal(prev => !prev)
    }

// 
//     useEffect(() => {
//         () => setExcelData([]);
//     }, [])



    return (
        <Modal isOpen={isOpenModal} onClose={setIsOpenModal} className="min-h-[30rem] w-2/5 bg-L-basic dark:bg-D-basic rounded-md h-full grid">
            <div className="grid grid-rows-min-one">

                <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                    <p>نمایش محتوای فایل</p>
                    <CloseIcon onClick={setFlagToggle} className="cursor-pointer" />
                </div>

                <div>
                    <AGTable columnDefs={columns} rowData={excelData} />
                </div>

                <div className='flex gap-x-3 justify-end m-2 px-3'>
                    <button onClick={setFlagToggle} className="border rounded border-[#135CA4] text-[#135CA4] px-2 py-2">
                        انصراف
                    </button>
                    <button
                        onClick={submitCreateBulk}
                        className="border rounded border-[#135CA4] bg-[#135CA4] disabled:opacity-50 text-white px-2 py-2"
                    >
                        ثبت درخواست
                    </button>
                </div>
            </div>
        </Modal>
    )
}
