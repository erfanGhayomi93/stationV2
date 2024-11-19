import { useModalStore } from '@store/modal';
import { Trans } from 'react-i18next';
import Modal from '..';
import PortfolioCustomerTab from './components/PortfolioCustomerTab';
import PortfolioCustomerTable from './components/PortfolioCustomerTable';

const PortfolioCustomerModal = () => {
     const { portfolioCustomerModal, setPortfolioCustomerModal } = useModalStore();

     const onCloseModal = () => {
          setPortfolioCustomerModal(null);
     };

     return (
          <Modal
               size="xl"
               title={
                    <Trans
                         i18nKey="portfolioCustomerModal.title"
                         values={{
                              name: portfolioCustomerModal?.customer.title,
                         }}
                         components={{
                              span: <span className="text-content-selected" />,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
          >
               <div className="flex flex-col gap-6">
                    <PortfolioCustomerTab />

                    <PortfolioCustomerTable customer={portfolioCustomerModal?.customer} />
               </div>
          </Modal>
     );
};

export default PortfolioCustomerModal;
