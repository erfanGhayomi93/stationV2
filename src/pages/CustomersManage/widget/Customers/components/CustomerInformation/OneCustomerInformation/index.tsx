import { CrownIcon } from '@assets/icons';
import Divider from '@components/Divider';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { CustomersContext } from '@pages/CustomersManage';
import clsx from 'clsx';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Contracts from './Contracts';
import FinancialStatus from './FinancialStatus';
import PersonalInformation from './PersonalInformation';

type TCustomerInformationTab = 'personalInformation' | 'financialStatus' | 'contracts';

const OneCustomerInformation = () => {
     const { t } = useTranslation();

     const [selectCustomerInformationTab, setSelectCustomerInformationTab] =
          useState<TCustomerInformationTab>('personalInformation');

     const { customers } = useContext(CustomersContext);

     const TABS = useMemo<{ id: TCustomerInformationTab; label: string }[]>(
          () => [
               { id: 'personalInformation', label: t('customersManage.personalInformationTab') },
               { id: 'financialStatus', label: t('customersManage.financialStatusTab') },
               {
                    id: 'contracts',
                    label: t('customersManage.contractsTab'),
               },
          ],
          []
     );

     const CustomerInformationRender = useCallback(() => {
          const customerInformationComponents = {
               personalInformation: <PersonalInformation />,
               financialStatus: <FinancialStatus />,
               contracts: <Contracts />,
          };

          return customerInformationComponents[selectCustomerInformationTab];
     }, [selectCustomerInformationTab]);

     return (
          <div className="flex max-h-full flex-1 flex-col gap-y-4 overflow-hidden pt-4">
               <div className="flex items-center justify-between px-20">
                    <span className="text-base font-bold text-content-title">{customers[0]?.title}</span>
                    <div className="flex items-center gap-2 rounded-[20px] border border-button-primary-selected bg-button-primary-bg-selected px-6 py-1 text-button-primary-selected">
                         <CrownIcon />
                         <span>ویژه</span>
                    </div>
               </div>

               <div className="px-20">
                    <Divider />
               </div>

               <TabGroup className="px-20">
                    <TabList className="flex items-center gap-x-4">
                         {TABS.map(({ id, label }) => (
                              <Tab
                                   onClick={() => setSelectCustomerInformationTab(id)}
                                   className={clsx(
                                        'tab-primary w-[134px] text-nowrap',
                                        id === selectCustomerInformationTab && 'active'
                                   )}
                                   key={id}
                              >
                                   {label}
                              </Tab>
                         ))}
                    </TabList>
               </TabGroup>

               <CustomerInformationRender />
          </div>
     );
};

export default OneCustomerInformation;
