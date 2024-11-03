import { useModalStore } from '@store/modal';
import RadioButton from '@uiKit/RadioButton';
import { useState } from 'react';
import Modal from '..';
import CustomersSearchBody from './components/customerSearchBody';
import GroupSearchBody from './components/groupSearchBody';

const CustomersSearchModal = () => {
     const [selectedValue, setSelectedValue] = useState<'nameGroup' | 'customerGroup'>('nameGroup'); // Default value

     const { setCustomersSearchModalSheet } = useModalStore();

     const onCloseModal = () => {
          setCustomersSearchModalSheet(null);
     };

     const options: { value: 'nameGroup' | 'customerGroup'; label: string }[] = [
          { value: 'nameGroup', label: 'نام مشتری' },
          { value: 'customerGroup', label: 'گروه مشتری' },
     ];

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
                         {selectedValue === 'nameGroup' && <CustomersSearchBody />}
                         {selectedValue === 'customerGroup' && <GroupSearchBody />}
                    </div>
               </div>
          </Modal>
     );
};

export default CustomersSearchModal;
