import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerFinancialInformation } from 'src/app/queries/customer';
import { InfoFillIcon, InfoIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import WidgetLoading from 'src/common/components/WidgetLoading';
import clsx from 'clsx';

type PanelType = 'TradeRemain' | 'WithdrawalRemain' | 'BrokerRemain';

const FinancialTab = () => {
    //
    const [activePanel, setActivePanel] = useState<PanelType>('TradeRemain');
    const { t } = useTranslation();

    const handleChangePanel = (p: PanelType) => {
        setActivePanel(p);
    };
    const { state } = useCustomerSearchState();
    const { data, isFetching } = useCustomerFinancialInformation(state?.detailModalData?.customerISIN);

    const blockValue = data ? data.orderBlockValue + data.paymentRequestBlockValue : 0

    return (
        <WidgetLoading spining={isFetching}>
            <div className="px-4 pt-6 pb-4 flex flex-col gap-5">
                {data?.status && (
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-medium">وضعیت مشتری:</span>
                            <span
                                className={clsx({
                                    'text-L-error-200 dark:text-D-error-200': data.status === 'AtRisk',
                                    'text-L-warning dark:text-D-warning': data.status === 'CallMargin',
                                    'text-L-gray-600 dark:text-D-gray-600': data.status === 'Normal',
                                })}
                            >
                                {t('CustomerType.customer_status_' + data.status)}
                            </span>
                        </div>

                        <div className='gap-2 flex items-center'>
                            <span className='text-sm font-medium'>مبلغ بلوکه شده:</span>
                            <span>{blockValue}</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <span className="text-sm font-medium">وجه تضمین:</span>
                            <span className="text-L-gray-600 dark:text-D-gray-600">{'\u200E' + seprateNumber(data.marginValue)}</span>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('TradeRemain')}>
                        {activePanel === 'TradeRemain' ? (
                            <span className="text-L-info-100">
                                <InfoFillIcon width={24} height={24} />
                            </span>
                        ) : (
                            <InfoIcon />
                        )}
                        <span className="text-sm font-medium ">{t('customer_financial_situation.negotiable_balance')}</span>
                    </div>
                    {activePanel === 'TradeRemain' && (
                        <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                            {t('customer_financial_situation.negotiable_balance_information')}
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between px-4 py-2 border-b border-L-gray-400 dark:border-D-gray-400">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.negotiable_balance_option_1')}
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.t1) || '-'} ریال</span>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.negotiable_balance_option_2')}
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.t2) || '-'} ریال</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('WithdrawalRemain')}>
                        {activePanel === 'WithdrawalRemain' ? (
                            <span className="text-L-info-100">
                                <InfoFillIcon width={24} height={24} />
                            </span>
                        ) : (
                            <InfoIcon />
                        )}
                        <span className="text-sm font-medium ">{t('customer_financial_situation.withdrawal_balance')}</span>
                    </div>
                    {activePanel === 'WithdrawalRemain' && (
                        <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                            {t('customer_financial_situation.withdrawal_balance_information')}
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between px-4 py-2 border-b border-L-gray-400 dark:border-D-gray-400">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.withdrawal_balance_option_1', {
                                    n: dayjs().calendar('jalali').format('YYYY/MM/DD'),
                                    interpolation: { escapeValue: false },
                                })}
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.t1) || '-'} ریال</span>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.withdrawal_balance_option_2', {
                                    n: dayjs().calendar('jalali').format('YYYY/MM/DD'),
                                    interpolation: { escapeValue: false },
                                })}
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.t2) || '-'} ریال</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('BrokerRemain')}>
                        {activePanel === 'BrokerRemain' ? (
                            <span className="text-L-info-100">
                                <InfoFillIcon width={24} height={24} />
                            </span>
                        ) : (
                            <InfoIcon />
                        )}
                        <span className="text-sm font-medium ">{t('customer_financial_situation.broker_balance')}</span>
                    </div>
                    {activePanel === 'BrokerRemain' && (
                        <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                            {t('customer_financial_situation.broker_balance_information')}
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between px-4 py-2 border-b border-L-gray-400 dark:border-D-gray-400">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.broker_balance_option_1')} :
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.finalRemain) || '-'} ریال</span>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <span className="text-L-gray-600 dark:text-D-gray-600">
                                {t('customer_financial_situation.broker_balance_option_2')} :
                            </span>
                            <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(data?.credit) || '-'} ریال</span>
                        </div>
                    </div>
                </div>
            </div>
        </WidgetLoading>
    );
};

export default FinancialTab;
