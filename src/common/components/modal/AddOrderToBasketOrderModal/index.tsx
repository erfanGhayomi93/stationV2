import Modal from '@components/modal';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@store/modal';
import PlaceholderButton from '@components/PlaceholderButton.tsx';
import CheckboxButton from '@uiKit/CheckboxButton.tsx';
import { useState } from 'react';
import Divider from '@components/Divider.tsx';
import { useQueryCartList } from '@api/basket';

const AddOrderToBasketOrderModal = () => {
     const { t } = useTranslation();

     const { setAddOrderToBasketModal, setCreateNewBasketModal } = useModalStore();

     const [selectBasketOrder, setSelectBasketOrder] = useState<number[]>([]);

     const { data: cartListData } = useQueryCartList();

     const onChangeSelectBasketOrder = (basketOrderId: number) => {
          const isSelected = selectBasketOrder.includes(basketOrderId);

          if (isSelected) {
               setSelectBasketOrder(prev => prev.filter(item => item !== basketOrderId));
          } else {
               setSelectBasketOrder(prev => [...prev, basketOrderId]);
          }
     };

     const onCloseModal = () => {
          setAddOrderToBasketModal(null);
     };

     const onCreateNewBasketOrder = () => {
          setCreateNewBasketModal(true);
     };

     return (
          <Modal title={t('addOrderToBasketOrderModal.title')} size="sm" onCloseModal={onCloseModal}>
               <div className="flex flex-col gap-6 overflow-hidden">
                    <ul className="flex max-h-96 flex-1 flex-col gap-6 overflow-y-auto">
                         {cartListData?.map(basket => (
                              <li key={basket.id} className="flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                        <CheckboxButton
                                             checked={selectBasketOrder.includes(basket.id)}
                                             onChange={() => onChangeSelectBasketOrder(basket.id)}
                                        />
                                   </div>
                              </li>
                         ))}
                    </ul>

                    <Divider />

                    <PlaceholderButton title={t('addCustomersToGroupModal.addToGroupButton')} onClick={onCreateNewBasketOrder} />
               </div>
          </Modal>
     );
};

export default AddOrderToBasketOrderModal;
