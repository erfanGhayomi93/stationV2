import { useCustomerFinancialStatus } from '@api/customer';
import { RiskAnnouncementIcon, TickFillIcon } from '@assets/icons';
import { sepNumbers } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import clsx from 'clsx';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const FinancialStatus = () => {
     const { t } = useTranslation();

     const { customers } = useContext(CustomersContext);

     const { data } = useCustomerFinancialStatus({ customerISIN: customers[0].customerISIN });

     const FINANCIAL_STATUS_ITEMS = useMemo<
          { id: string; name: string; value: number | string | React.ReactElement; unit?: 'rial' }[]
     >(
          () => [
               {
                    id: 'customerStatus',
                    name: t('customersManage.financialStatusCustomerStatus'),
                    value: (
                         <div className="flex items-center gap-x-2">
                              {data?.status === 'Normal' ? (
                                   <TickFillIcon className="text-icon-success" />
                              ) : (
                                   <RiskAnnouncementIcon
                                        className={clsx({
                                             'text-icon-error': data?.status === 'CallMargin',
                                             'text-icon-warning': data?.status === 'AtRisk',
                                        })}
                                   />
                              )}

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
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.purchasePower),
                    unit: 'rial',
               },
               {
                    id: 'purchasOption',
                    name: t('customersManage.financialStatusPurchasOption'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.purchaseOptionPower),
                    unit: 'rial',
               },
               {
                    id: 'sharesBlocked',
                    name: t('customersManage.financialStatusSharesBlocked'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.stockBlockValue),
                    unit: 'rial',
               },
               {
                    id: 'optionBlocked',
                    name: t('customersManage.financialStatusOptionBlocked'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.optionBlockValue),
                    unit: 'rial',
               },
               {
                    id: 'withdrawalBlocked',
                    name: t('customersManage.financialStatusWithdrawalBlocked'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.blockedValue),
                    unit: 'rial',
               },
               {
                    id: 'sharesCredit',
                    name: t('customersManage.financialStatusSharesCredit'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.stockDailyCredit),
                    unit: 'rial',
               },
               {
                    id: 'optionCredit',
                    name: t('customersManage.financialStatusOptionCredit'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.optionDailyCredit),
                    unit: 'rial',
               },
               {
                    id: 'remainT1',
                    name: t('customersManage.financialStatusRemainT1'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.remainT1),
                    unit: 'rial',
               },
               {
                    id: 'remainT2',
                    name: t('customersManage.financialStatusRemainT2'),
                    value: sepNumbers(data?.customerRemainAndOptionRemainDto.remainT2),
                    unit: 'rial',
               },
          ],
          [data]
     );

     return (
          <div className="max-h-full flex-1 overflow-hidden px-20">
               <ul className="flex h-full flex-1 flex-col overflow-y-auto">
                    {FINANCIAL_STATUS_ITEMS.map(({ id, name, value, unit }) => (
                         <li
                              key={id}
                              className="flex items-center justify-between border-b border-line-div-2 py-4 text-sm font-medium last:border-none"
                         >
                              <span className="text-content-selected">{name}</span>
                              <div className="flex items-center gap-2 pl-2 text-content-title">
                                   <span className="ltr">{value ?? '-'}</span>
                                   {unit && t(`common.${unit ?? 'rial'}`)}
                              </div>
                         </li>
                    ))}
               </ul>
          </div>
     );
};

export default FinancialStatus;
