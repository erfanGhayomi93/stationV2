import { Tab, TabGroup, TabList } from '@headlessui/react';
import { useTabSlice } from '@store/tab';
import FieldInputText from '@uiKit/Inputs/FieldInputText';
import SelectInput from '@uiKit/Inputs/SelectInput';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TCustomersManageFiltersProps = {
     onChangeSearchInput: (value: string) => void;
     onChangeSelectInput: (item: TItem) => void;
};

const CustomersManageFilters = ({ onChangeSearchInput, onChangeSelectInput }: TCustomersManageFiltersProps) => {
     const { t } = useTranslation();

     const { customersManageTab, setCustomersManageTab } = useTabSlice();

     const TABS = useMemo<{ id: TCustomersManageTab; label: string }[]>(
          () => [
               { id: 'customers', label: t('customersManage.customersTab') },
               { id: 'customerGroup', label: t('customersManage.customerGroupTab') },
               { id: 'myGroups', label: t('customersManage.myGroupsTab') },
          ],
          []
     );

     return (
          <div className="flex items-center justify-between">
               <TabGroup>
                    <TabList className="flex gap-x-4">
                         {TABS.map(({ id, label }) => (
                              <Tab
                                   className={clsx('tab-primary', id === customersManageTab && 'active')}
                                   onClick={() => setCustomersManageTab(id)}
                              >
                                   {label}
                              </Tab>
                         ))}
                    </TabList>
               </TabGroup>
               <div className="flex items-center">
                    <div style={{ width: '20rem' }} className="ml-4">
                         <FieldInputText onChange={onChangeSearchInput} placeholder="جستجوی مشتری" />
                    </div>

                    <div>
                         <SelectInput
                              onChange={onChangeSelectInput}
                              items={[{ id: 'df', label: '' }]}
                              value={{ id: '', label: '' }}
                         />
                    </div>
               </div>
          </div>
     );
};

export default CustomersManageFilters;
