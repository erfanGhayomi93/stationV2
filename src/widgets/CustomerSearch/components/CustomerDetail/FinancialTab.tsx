import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoFillIcon, InfoIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';

type PanelType = 'TradeRemain' | 'WithdrawalRemain' | 'BrokerRemain';

const FinancialTab = ({ data }: { data: ICustomerInformationResultType | undefined }) => {
    //
    const [activePanel, setActivePanel] = useState<PanelType>('TradeRemain');
    const { t } = useTranslation();

    const handleChangePanel = (p: PanelType) => {
        setActivePanel(p);
    };

    return (
        <div className="px-4 pt-6 pb-4 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('TradeRemain')}>
                    {activePanel === 'TradeRemain' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">{t('customer_financial_situation.negotiable_balance')}</span>
                </div>
                {activePanel === 'TradeRemain' && (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right duration-200">
                        {t('customer_financial_situation.negotiable_balance_information')}
                    </div>
                )}
                <div>
                    <div className="flex justify-between px-4 py-2 border-b border-L-gray-400 dark:border-D-gray-400">
                        <span className="text-L-gray-600 dark:text-D-gray-600">{t('customer_financial_situation.negotiable_balance_option_1')}</span>
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span className="text-L-gray-600 dark:text-D-gray-600">{t('customer_financial_situation.negotiable_balance_option_2')}</span>
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('WithdrawalRemain')}>
                    {activePanel === 'WithdrawalRemain' ? <InfoFillIcon /> : <InfoIcon />}
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
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span className="text-L-gray-600 dark:text-D-gray-600">
                            {t('customer_financial_situation.withdrawal_balance_option_2', {
                                n: dayjs().calendar('jalali').format('YYYY/MM/DD'),
                                interpolation: { escapeValue: false },
                            })}
                        </span>
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('BrokerRemain')}>
                    {activePanel === 'BrokerRemain' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">{t('customer_financial_situation.broker_balance')}</span>
                </div>
                {activePanel === 'BrokerRemain' && (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                        {t('customer_financial_situation.broker_balance_information')}
                    </div>
                )}
                <div>
                    <div className="flex justify-between px-4 py-2 border-b border-L-gray-400 dark:border-D-gray-400">
                        <span className="text-L-gray-600 dark:text-D-gray-600">{t('customer_financial_situation.broker_balance_option_1')} :</span>
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                    <div className="flex justify-between px-4 py-2">
                        <span className="text-L-gray-600 dark:text-D-gray-600">{t('customer_financial_situation.broker_balance_option_2')} :</span>
                        <span className="text-L-gray-700 dark:text-D-gray-700">{seprateNumber(654213)} ریال</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialTab;
