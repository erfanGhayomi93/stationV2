import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { useTranslation } from 'react-i18next';
import TabsList, { ITabItemType } from 'src/common/components/TabsList'
import { useMemo, useState } from 'react';
import { Portfolio } from './tabs/portfolio';
import { Position } from './tabs/position';






const CustomerPortfolioModal = () => {
    //
    const { t } = useTranslation();

    const [tabInd, seTabInd] = useState('PORTFOLIO');

    const { setState, state: { detailModalData, isPortfolioModalOpen } } = useCustomerSearchState();

    const customerISIN = detailModalData?.customerISIN ? [detailModalData?.customerISIN] : [];

    const closeModal = () => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: false, detailModalData: undefined }));
    };

    const items: ITabItemType[] = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'PORTFOLIO',
                title: <>پرتفوی</>,
                content: <Portfolio
                    customerISIN={customerISIN}
                    isPortfolioModalOpen={isPortfolioModalOpen}
                />,
            },
            {
                key: 'POSITIONS',
                title: <>موقعیت‌ها</>,
                content: <Position
                    customerISIN={customerISIN}
                    isPortfolioModalOpen={isPortfolioModalOpen}
                />,
            },
        ],
        [],
    );



    return (
        <Modal
            isOpen={!!isPortfolioModalOpen}
            onClose={closeModal}
            className="min-h-[40rem] w-3/5 bg-L-basic dark:bg-D-basic rounded-md h-full grid"
        >
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>{`${t('common.customerPortfolio')} (${detailModalData?.title ?? ''})`}</div>
                    <CloseIcon onClick={closeModal} className="cursor-pointer" />
                </div>

                <div className='mt-1'>
                    <TabsList
                        onChange={(idx) => seTabInd(idx)}
                        selectedIndex={tabInd}
                        items={items}
                        className='h-full grid grid-rows-min-one'
                    />
                </div>

            </div>
        </Modal>
    );
};

export default CustomerPortfolioModal;
