import Modal from '../Modal';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Table from './components/Table';
import FilterBlock from '../FilterBlock';
import { useTranslation } from 'react-i18next';
import SymbolMiniSelect from '../SymbolMiniSelect';
import { useGetOrders } from 'src/app/queries/order';
import Header from './components/Header';
import ipcMain from 'src/common/classes/IpcMain';
import CustomerMegaSelect from '../CustomerMegaSelect';
import { IBuySellGroup } from 'src/redux/slices/BuySellGroupSlice';
import Select from '../Select';

interface IProps {
    isOpen: IBuySellGroup["isOpen"];
    setIsOpen: (flag: boolean) => void;
    mode: IBuySellGroup["mode"]
}

export interface IData extends IOrderGetType {
}

const BuySellGroupModal = ({ isOpen, setIsOpen, mode }: IProps) => {
    //
    const { t } = useTranslation()

    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const handleCloseModal = () => setIsOpen(false);

    const [symbolIsinSearch, setSymbolIsinSearch] = useState<SymbolSearchResult[]>([])

    const [customerISINsSearch, setcustomerISINsSearch] = useState<IGoCustomerSearchResult[]>([])

    const [sideSearch, setSideSearch] = useState<BuySellSide>('')

    const [dataTable, setdataTable] = useState<IData[]>([])

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders(
        {
            GtOrderStateRequestType: 'OnBoard',
            symbolISIN: symbolIsinSearch[0]?.symbolISIN,
            CustomerISIN: !!customerISINsSearch.length ? customerISINsSearch.map(x => x.customerISIN) : undefined,
            side: sideSearch || undefined,
        },
        {
            // enabled: false,
            onSuccess(data) {
                if (data.length > 0) setdataTable(data)
                else setdataTable([])
            },
            onError() {
                setdataTable([])
            },
            staleTime: 0,
            cacheTime: 0
        }
    );

    const refetchOrderFromLs = () => {
        refetchOpenOrders()
    }
 
    const onChangeCustomerData = useCallback(
        (newValue: number, orderId: number | null, field: keyof IData, typeChange: 'All' | 'ONE') => {
            const res = dataTable.map((item) => {
                // const totalValue = CalcTotalValue(field === 'price' ? newValue : item.price, field === 'count' ? newValue : item.count);

                const value = field === 'quantity' ? newValue * item.price : field === 'price' ? newValue * item?.quantity : item.value;

                if (item.orderId === orderId) {
                    return { ...item, [field]: newValue, value };
                }

                return {
                    ...item,
                    [field]: typeChange === 'All' ? newValue : item[field],
                    value: typeChange === 'All' ? value : item.value
                };
            });

            setdataTable(res);
        },
        [dataTable]
    );

    useEffect(() => {
        ipcMain.handle('refetch_onBoard_order', refetchOrderFromLs)

        return () => ipcMain.removeHandler('refetch_onBoard_order', refetchOrderFromLs)
    }, [])


    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            style={{ width: isInfoOpen ? 1250 : 1000 }}
            className={clsx('h-[500px] flex flex-col rounded-xl border-r-[6px] ease-in-out duration-300 bg-L-basic dark:bg-D-basic', {
                "border-L-error-200": mode === "DELETE",
                "border-L-info-100": mode === "EDIT"
            })}
        >
            <Header handleClose={handleCloseModal} symbolTitle={`${mode === 'EDIT' ? 'ویرایش' : 'حذف'} گروهی نماد`} mode={mode} />


            <div className='m-3 mb-0 flex gap-x-4'>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="w-1/4">
                    <SymbolMiniSelect
                        selected={symbolIsinSearch}
                        setSelected={(selected) => {
                            setSymbolIsinSearch([selected[0]])
                            // selected[0]?.symbolISIN && dispatch(setSelectedSymbol(selected[0]?.symbolISIN))
                        }}
                    />
                </FilterBlock>

                <FilterBlock label={t('FilterFieldLabel.Customer')} className="w-1/4">
                    <CustomerMegaSelect
                        selected={customerISINsSearch}
                        setSelected={(value) => setcustomerISINsSearch(value)}
                    />
                </FilterBlock>

                <FilterBlock label={'سمت'} className="w-1/4">
                    <Select
                        onChange={(selected) => setSideSearch(selected)}
                        value={sideSearch}
                        // title="سمت:"
                        options={[
                            { value: '', label: 'همه' },
                            { value: 'buy', label: 'خرید' },
                            { value: 'sell', label: 'فروش' }
                        ]}
                        optionsClassName='text-right'
                    />
                </FilterBlock>
            </div>

            <div className="relative flex h-full items-center">
                <div className={clsx('h-full flex flex-col justify-between', isInfoOpen ? 'w-[1000px]' : 'w-full')}>
                    <Table
                        data={dataTable}
                        orders={orders}
                        onChangeCustomerData={onChangeCustomerData}
                        // refetchOrders={() => refetchOpenOrders()}
                        loadingOrders={loadingOrders}
                        handleCloseModal={handleCloseModal}
                        mode={mode}

                    />
                    {/* <Footer data={customersData} symbolData={symbolData} /> */}
                </div>


                {/* <div className={clsx('w-[350px] h-[451px] border-L-gray-200 border-r-[1px] ', !isInfoOpen && 'hidden')}> */}
                {/* <IpoInfo info={symbolData} /> */}
                {/* </div> */}
                {/* <div className="w-3 absolute left-[-7px] h-[381px] flex items-center self-start">
                    <ToggleButton isOpen={isInfoOpen} onClick={() => setIsInfoOpen((prev) => !prev)} />
                </div> */}


            </div>
        </Modal>
    );
};

export default BuySellGroupModal;
