import Modal from '@components/modal';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@store/modal';
import ManageBasketOrderTable from '@components/modal/ManageBasketOrderModal/components/ManageBasketOrderTable.tsx';
import { useQueryCartList } from '@api/basket';
import Divider from '@components/Divider.tsx';
import PlaceholderButton from '@components/PlaceholderButton.tsx';

const ManageBasketOrderModal = () => {
     const { t } = useTranslation();

     const { setManageBasketOrderModal, setCreateNewBasketModal , manageBasketOrderModal } = useModalStore();

     const { data: CartListData, isLoading } = useQueryCartList();

     const onClickCreateBasket = () => {
          setCreateNewBasketModal(true);
     };

     const onCloseModal = () => {
          setManageBasketOrderModal({
               isShow : false
          });
     };

     return (
          <Modal size="sm" loading={false} title={!manageBasketOrderModal?.isAdd ? t('manageBasketOrderModal.titleManage') : t('manageBasketOrderModal.titleAdd') } onCloseModal={onCloseModal}>
               <div className="flex flex-1 flex-col gap-6">
                    <div className="h-full flex-1">
                         <ManageBasketOrderTable data={CartListData} loading={isLoading} />
                    </div>

                    <Divider />

                    <PlaceholderButton title={t('manageBasketOrderModal.addBasketOrderBtn')} onClick={onClickCreateBasket} />
               </div>
          </Modal>
     );
};

export default ManageBasketOrderModal;
