import FieldInputText from '@uiKit/Inputs/FieldInputText';
import SelectInput from '@uiKit/Inputs/SelectInput';
import { useTranslation } from 'react-i18next';

interface ICustomersManageFilter {
     onChangeSearchInput: (value: string) => void;
     onChangeSelectInput: (item: TItem) => void;
}

const CustomersManageFilter = ({ onChangeSearchInput, onChangeSelectInput }: ICustomersManageFilter) => {
     const { t } = useTranslation();
     return (
          <div className="flex items-center justify-end">
               <div style={{ width: '20rem' }} className="ml-4">
                    <FieldInputText onChange={onChangeSearchInput} placeholder="جستجوی مشتری" />
               </div>

               <div>
                    <SelectInput
                         onChange={onChangeSelectInput}
                         items={[
                              { id: 'All', label: t('customersManage.customersFilterAll') },
                              { id: 'Natural', label: t('customersManage.customersFilterNatural') },
                              { id: 'Legal', label: t('customersManage.customersFilterLegal') },
                         ]}
                         value={{ id: 'All', label: t('customersManage.customersFilterAll') }}
                    />
               </div>
          </div>
     );
};

export default CustomersManageFilter;
