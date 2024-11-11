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
          <section className="flex flex-col items-center gap-4 rounded-md bg-back-surface py-6">
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

               <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col gap-y-4 px-20 pt-4">
                         <span className="text-base font-bold text-content-title">سهیل خسروی</span>

                         <Divider />

                         <TabGroup>
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
                         <Button variant="primary-darkness">افزودن گروه</Button>
                         <Button variant="primary-darkness-outline">ایجاد گروه جدید</Button>
                    </div>
               </div>
          </section>
     );
};

export default CustomerInformation;
