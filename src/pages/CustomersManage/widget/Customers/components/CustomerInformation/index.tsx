import { CrownIcon } from '@assets/icons';
import Divider from '@components/Divider';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import Button from '@uiKit/Button';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Contracts from './Contracts';
import FinancialStatus from './FinancialStatus';
import PersonalInformation from './PersonalInformation';

type TCustomerInformationTab = 'personalInformation' | 'financialStatus' | 'contracts';

const CustomerInformation = () => {
     const { t } = useTranslation();

     const [selectCustomerInformationTab, setSelectCustomerInformationTab] =
          useState<TCustomerInformationTab>('personalInformation');

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
          const CustomerInformationComponents = {
               personalInformation: <PersonalInformation />,
               financialStatus: <FinancialStatus />,
               contracts: <Contracts />,
          };

          return CustomerInformationComponents[selectCustomerInformationTab];
     }, [selectCustomerInformationTab]);

     return (
          <section className="flex flex-col items-center gap-4 overflow-hidden rounded-md bg-back-surface py-6">
               {/* <div>
                    <img
                         style={{ minWidth: '20rem' }}
                         className="w-full"
                         alt="financial-calculation"
                         src={financialCalculation}
                    />
               </div>
               <div className="min-w-full px-12">
                    <div className="min-h-[1px] min-w-full bg-line-div-2" />
               </div>
               <div className="flex flex-col items-center whitespace-nowrap text-sm font-medium text-content-paragraph">
                    <span>با انتخاب هر کدام از مشتریان از لیست روبرو</span>
                    <span>اطلاعات مربوط به آن را در این بخش خواهید دید.</span>
               </div> */}

               <div className="flex flex-1 flex-col justify-between overflow-hidden">
                    <div className="flex max-h-full flex-1 flex-col gap-y-4 overflow-hidden pt-4">
                         <div className="flex items-center justify-between px-20">
                              <span className="text-base font-bold text-content-title">سهیل خسروی</span>
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
                                                  'tab-primary text-nowrap',
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

                    <div className="flex items-center gap-4 p-6 shadow-E1">
                         <Button variant="primary-darkness">{t('customersManage.addGroupButton')}</Button>
                         <Button variant="primary-darkness-outline">{t('customersManage.createGroupButton')}</Button>
                    </div>
               </div>
          </section>
     );
};

export default CustomerInformation;
