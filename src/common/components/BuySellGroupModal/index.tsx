import Modal from '../Modal';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import Table from './components/Table';
import FilterBlock from '../FilterBlock';
import { useTranslation } from 'react-i18next';
import SymbolMiniSelect from '../SymbolMiniSelect';
import { useGetOrders } from 'src/app/queries/order';
import { queryClient } from 'src/app/queryClient';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol, setSelectedSymbol } from 'src/redux/slices/option';
import Header from './components/Header';
import ipcMain from 'src/common/classes/IpcMain';

interface IProps {
    isOpen: boolean;
    setIsOpen: (flag: boolean) => void;
}

export interface IData extends IOrderGetType {
}

const BuySellGroupModal = ({ isOpen, setIsOpen }: IProps) => {
    const { t } = useTranslation()

    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const dispatch = useAppDispatch()

    const symbolData = queryClient.getQueryData<SymbolGeneralInfoType>(['SymbolGeneralInfo', selectedSymbol])?.symbolData;

    const handleCloseModal = () => setIsOpen(false);

    const [symbolIsinSearch, setSymbolIsinSearch] = useState<SymbolSearchResult[]>([])

    const [dataTable, setdataTable] = useState<IData[]>([])

    const { data: orders, isFetching: loadingOrders, refetch: refetchOpenOrders } = useGetOrders(
        { GtOrderStateRequestType: 'OnBoard', symbolISIN: selectedSymbol },
        {
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


    useEffect(() => {
        selectedSymbol && refetchOpenOrders()
    }, [selectedSymbol])

   

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
            style={{ width: isInfoOpen ? 1250 : 900 }}
            className={clsx('h-[500px] flex flex-col border-L-success-300 rounded-xl border-r-[6px] ease-in-out duration-300')}
        >
            <Header handleClose={handleCloseModal} symbolTitle={symbolData?.symbolTitle || ''} symbolState={symbolData?.symbolState || ''} />


            <div className='m-3 mb-0'>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="w-1/4">
                    <SymbolMiniSelect
                        selected={symbolIsinSearch}
                        setSelected={(selected) => {
                            setSymbolIsinSearch([selected[0]])
                            selected[0]?.symbolISIN && dispatch(setSelectedSymbol(selected[0]?.symbolISIN))
                        }}
                    />
                </FilterBlock>
            </div>

            <div className="relative flex h-full items-center">
                <div className={clsx('h-full flex flex-col justify-between', isInfoOpen ? 'w-[900px]' : 'w-full')}>
                    <Table
                        data={dataTable}
                        orders={orders}
                        onChangeCustomerData={onChangeCustomerData}
                        // refetchOrders={() => refetchOpenOrders()}
                        loadingOrders={loadingOrders}

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
