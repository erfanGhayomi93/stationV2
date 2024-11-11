import { useCustomerStore } from '@store/customer';
import { useModalStore } from '@store/modal';
import Button from '@uiKit/Button';
import RadioButton from '@uiKit/RadioButton';
import { useReducer, useState } from 'react';
import Modal from '..';
import CustomersSearchBody from './components/customerSearchBody';
import GroupSearchBody from './components/groupSearchBody';
import { customerReducer } from './store';

const CustomersSearchModal = () => {
     const [selectedValue, setSelectedValue] = useState<'nameGroup' | 'customerGroup'>('nameGroup'); // Default value

     const { selectedCustomers, setSelectedCustomers } = useCustomerStore();

     const [state, dispatch] = useReducer(customerReducer, { selectedCustomers: selectedCustomers });

     const { setCustomersSearchModalSheet } = useModalStore();

     const onCloseModal = () => {
          setCustomersSearchModalSheet(null);
     };

     const options: { value: 'nameGroup' | 'customerGroup'; label: string }[] = [
          { value: 'nameGroup', label: 'نام مشتری' },
          { value: 'customerGroup', label: 'گروه مشتری' },
     ];

     const addCustomerToGlobalStore = () => {
          setSelectedCustomers(state.selectedCustomers);
          onCloseModal();
     };

     return (
          <Modal title={'جستجوی مشتری'} onCloseModal={onCloseModal} size="lg">
               <div>
                    <div className="flex items-center gap-x-6">
                         <span className="text-content-title">جستجوی بر اساس:</span>

                         <div className="flex items-center gap-x-6">
                              {options.map(option => (
                                   <div key={option.value}>
                                        <RadioButton
                                             checked={selectedValue === option.value}
                                             label={option.label}
                                             onChange={() => setSelectedValue(option.value)}
                                             classes={{ label: 'text-content-title text-sm' }}
                                        />
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="mt-6">
                         {selectedValue === 'nameGroup' && (
                              <CustomersSearchBody selectedCustomers={state.selectedCustomers} dispatch={dispatch} />
                         )}
                         {selectedValue === 'customerGroup' && (
                              <GroupSearchBody selectedCustomers={state.selectedCustomers} dispatch={dispatch} />
                         )}
                    </div>
                    <div className="mt-6 flex gap-x-4">
                         <Button className="flex-1" variant="primary-outline" onClick={onCloseModal}>
                              انصراف
                         </Button>

                         <Button className="flex-1" variant="primary" onClick={addCustomerToGlobalStore}>
                              تایید و بستن
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default CustomersSearchModal;
