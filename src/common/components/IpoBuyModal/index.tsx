import Modal from '../Modal';
import clsx from 'clsx';
import Header from './components/Header';
import Footer from './components/Footer';
import ToggleButton from './components/ToggleButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import IpoInfo from './components/IpoInfo';
import Table from './components/Table';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers } from 'src/redux/slices/option';

interface IProps {
    symbolData: TIpoInfo;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IData extends IGoMultiCustomerType {
    uniqId: number;
    count: number;
    price: number;
    tradeValue: number;
}

const IpoBuyModal = ({ symbolData, isOpen, setIsOpen }: IProps) => {
    //
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const handleCloseModal = () => setIsOpen(false);
    const selectedCustomers = useAppSelector(getSelectedCustomers);
    const [customersData, setCustomersData] = useState<IData[]>(
        selectedCustomers.length
            ? selectedCustomers.map((item, index) => ({ ...item, uniqId: index + 1, credit: item.creditValue, price: 0, count: 0, tradeValue: 0 }))
            : [],
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            style={{ width: isInfoOpen ? 1250 : 900 }}
            className={clsx('h-[500px] flex flex-col overflow-visible border-L-success-300 rounded-xl border-r-[6px] ease-in-out duration-300')}
        >
            <Header handleClose={handleCloseModal} symbolTitle={symbolData?.symbolTitle} symbolState={symbolData?.symbolState} />
            <div className="relative flex h-full items-center">
                <div className={clsx('h-full flex flex-col justify-between', isInfoOpen ? 'w-[900px]' : 'w-full')}>
                    <Table data={customersData} dataSetter={setCustomersData} />
                    <Footer data={customersData} symbolData={symbolData} />
                </div>
                <div className={clsx('w-[350px] h-[451px] border-L-gray-200 border-r-[1px] ', !isInfoOpen && 'hidden')}>
                    <IpoInfo info={symbolData} />
                </div>
                <div className="w-3 absolute left-[-7px] h-[381px] flex items-center self-start">
                    <ToggleButton isOpen={isInfoOpen} onClick={() => setIsInfoOpen((prev) => !prev)} />
                </div>
            </div>
        </Modal>
    );
};

export default IpoBuyModal;
