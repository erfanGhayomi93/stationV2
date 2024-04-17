import clsx from 'clsx';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useGetBasket, useInsertCustomerToBasket } from 'src/app/queries/basket';
import { useGlobalSetterState } from 'src/common/context/globalSetterContext';
import { BasketPlusIcon, CloseIcon, Excel2Icon } from 'src/common/icons';
import { useAppDispatch } from 'src/redux/hooks';
import { emptySelectedCustomers, setSelectedSymbol } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import { useBasketDispatch, useBasketState } from '../context/BasketContext';
import { read, utils } from 'xlsx';
import PapaParse, { ParseResult } from "papaparse"
import { InsertExcel } from './InsertExcel';
import dayjs from 'dayjs';
import { onInfoNotif, onSuccessNotif } from 'src/handlers/notification';

interface IInsertBasketItemType {
    activeBasket?: number;
    basketDetails: IListDetailsBasket | undefined;
    fetchBasketDetails: () => void
}

const InsertBasketItem: FC<IInsertBasketItemType> = ({ activeBasket, basketDetails, fetchBasketDetails }) => {
    //handle excel insert
    const inputElm = useRef<HTMLInputElement>(null)
    const [excelData, setExcelData] = useState<InputCustomerExcelType[]>([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const { mutate: mutateCreateBulk } = useInsertCustomerToBasket({
        onSuccess(data) {
            onSuccessNotif({ title: "با موفقیت انجام شد" })
            fetchBasketDetails()
            setIsOpenModal(false)
        }
        // ,
        // onError() {
        //     onInfoNotif({ title: "خطا در انجام عملیات(فایل ورودی را بررسی کنید)" })
        // }
    })


    const dispatch = useBasketDispatch();
    const { visible } = useBasketState();
    const { data: listBasket } = useGetBasket();
    const appDispatch = useAppDispatch();
    const { resetBuySellState } = useGlobalSetterState();
    const resetSelectedCustomer = () => {
        appDispatch(emptySelectedCustomers());
    };
    const setBuySellModalVisible = () => {
        appDispatch(setSelectedSymbol(''));
        dispatch({ type: 'SET_BUY_SELL_MODALL', value: true });
    };

    const setBuySellModalInVisible = () => {
        dispatch({ type: 'RESET' });
        resetBuySellState();
        resetSelectedCustomer();
    };


    const doneExcel = (data: any) => {
        setExcelData(data)
        setIsOpenModal(true)
    }


    const onFileUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | null = e.target.files ? e.target.files[0] : null;

        if (!selectedFile) {
            console.error('Please select a file first');
            return;
        }

        const reader = new FileReader();

        if (selectedFile && selectedFile.type.includes('csv')) {
            reader.readAsText(selectedFile); // Read as text (not strictly necessary)
            reader.onload = async () => {
                const csvData = reader.result as string;

                PapaParse.parse(csvData, {
                    header: true,
                    complete(results: ParseResult<InputCustomerExcelType>) {
                        const validateData = results.data
                            .filter((data) => !!data?.customerISIN && !!data?.symbolISIN)
                        doneExcel(validateData)
                    }
                });
            };
            reader.onerror = (error) => {
                console.error('Error reading the CSV file:', error);
            };
        } else if (selectedFile.type.includes('openxmlformats')) {
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const workbook = read(new Uint8Array(arrayBuffer), { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // Get the first sheet by default
                const worksheet = workbook.Sheets[sheetName];
                const data = utils.sheet_to_json(worksheet);
                doneExcel(data)
            };
            reader.onerror = (error) => {
                console.error('Error reading the Excel file:', error);
            }
        } else {
            console.error('Invalid file format. Please select a CSV or Excel file.');
        }
    }, []);

    const submitCreateBulk = () => {

        const payload = excelData.map((item) => ({
            ...item,
            customerISIN: item.customerISIN?.toString(),
            cartID: activeBasket as number,
            validity: "day",
            validityDate: dayjs().format("YYYY-MM-DD"),
            orderStrategy: 'Normal',
        }))

        mutateCreateBulk(payload)
    }



    return (
        <div className='flex gap-x-2'>
            <button
                className="shadow-sm flex gap-2 mt-2 py-1.5 drop-shadow-sm px-2  text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic border border-L-gray-400 dark:border-D-gray-400 p-1 text-1.3 rounded-md"
                onClick={setBuySellModalVisible}
            >
                <BasketPlusIcon />
                افزودن سفارش جدید به سبد
            </button>

            <div
                className={clsx(
                    visible ? 'fixed top-0 z-40 left-0 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center ' : 'hidden',
                )}
            >
                <div>
                    <div className="bg-L-primary-50 dark:bg-D-primary-50 text-L-basic py-2 flex px-3 relative rounded-t-lg">
                        افزودن سفارش به سبد :<span>{listBasket?.find((item) => item.id === activeBasket)?.name}</span>
                        <button
                            onClick={setBuySellModalInVisible}
                            className="absolute p-1 left-0 z-[888] top-0 -translate-x-1.5 -translate-y-1.5 rounded-full border-L-primary-50 text-L-primary-50 border bg-L-basic "
                        >
                            <CloseIcon width={12} height={12} />
                        </button>
                    </div>
                    <div className=" min-h-[475px] grid ">
                        <BuySellWidget />
                    </div>
                </div>
            </div>

            {
                !basketDetails?.result.length && (
                    <>
                        <button
                            className="shadow-sm flex gap-2 mt-2 py-1.5 drop-shadow-sm px-2  text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic border border-L-gray-400 dark:border-D-gray-400 p-1 text-1.3 rounded-md"
                            onClick={() => inputElm.current?.click()}
                        >
                            <Excel2Icon />
                            افزودن اکسل به سبد
                        </button>

                        <input
                            type="file"
                            onChange={onFileUpload}
                            accept=".csv, .xlsx, .xlsm, .xlsb" // Accept both CSV and Excel formats
                            className='hidden'
                            ref={inputElm}
                            value={""}
                        />

                        <InsertExcel
                            isOpenModal={isOpenModal}
                            setIsOpenModal={setIsOpenModal}
                            excelData={excelData}
                            setExcelData={setExcelData}
                            submitCreateBulk={submitCreateBulk}
                        />

                    </>
                )
            }
        </div >
    );
};

export default InsertBasketItem;
