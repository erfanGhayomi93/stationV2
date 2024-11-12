import { useCustomerFinancialStatus } from '@api/customer';
import { RiskAnnouncementIcon } from '@assets/icons';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const FinancialStatus = () => {
     const { t } = useTranslation();

     const { data } = useCustomerFinancialStatus({ customerISIN: 18990069635676 });

     const FINANCIAL_STATUS_ITEMS = useMemo<
          { id: string; name: string; value: number | string | React.ReactElement; unit?: 'rial' }[]
     >(
          () => [
               {
                    id: 'customerStatus',
                    name: t('customersManage.financialStatusCustomerStatus'),
                    value: (
                         <div className="flex items-center gap-x-2">
                              <RiskAnnouncementIcon
                                   className={clsx({
                                        'hidden text-transparent': data?.status === 'Normal',
                                        'text-icon-error': data?.status === 'CallMargin',
                                        'text-icon-warning': data?.status === 'AtRisk',
                                   })}
                              />

                              <span>{t(`customersManage.financialStatusCustomerStatus${data?.status ?? 'Normal'}`)}</span>
                         </div>
                    ),
               },
               {
                    id: 'margin',
                    name: t('customersManage.financialStatusMargin'),
                    value: sepNumbers(data?.marginValue),
                    unit: 'rial',
               },
               {
                    id: 'purchasShares',
                    name: t('customersManage.financialStatusPurchasShares'),
                    value: data?.t1 ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'purchasOption',
                    name: t('customersManage.financialStatusPurchasOption'),
                    value: data?.t1 ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'sharesBlocked',
                    name: t('customersManage.financialStatusSharesBlocked'),
                    value: data?.orderBlockValue ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'optionBlocked',
                    name: t('customersManage.financialStatusOptionBlocked'),
                    value: data?.orderBlockValue ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'withdrawalBlocked',
                    name: t('customersManage.financialStatusWithdrawalBlocked'),
                    value: data?.orderBlockValue ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'sharesCredit',
                    name: t('customersManage.financialStatusSharesCredit'),
                    value: data?.credit ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'optionCredit',
                    name: t('customersManage.financialStatusOptionCredit'),
                    value: data?.credit ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'remainT1',
                    name: t('customersManage.financialStatusRemainT1'),
                    value: data?.t1 ?? '-',
                    unit: 'rial',
               },
               {
                    id: 'remainT2',
                    name: t('customersManage.financialStatusRemainT2'),
                    value: data?.t2 ?? '-',
                    unit: 'rial',
               },
          ],
          [data]
     );

     return (
          <ul className="flex flex-1 flex-col overflow-y-auto px-20">
               {FINANCIAL_STATUS_ITEMS.map(({ id, name, value, unit }) => (
                    <li
                         key={id}
                         className="flex items-center justify-between border-b border-line-div-2 py-4 text-sm font-medium last:border-none"
                    >
                         <span className="text-content-selected">{name}</span>
                         <div className="flex items-center gap-2">
                              <span className="text-content-title">{value ?? '-'}</span>
                              {unit && t(`common.${unit ?? 'rial'}`)}
                         </div>
                    </li>
               ))}
          </ul>
     );
};

export default FinancialStatus;
