import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoFillIcon, InfoIcon } from 'src/common/icons';

type PanelType = 'TradeRemain' | 'WithdrawalRemain' | 'BrokerRemain';

const FinancialTab = () => {
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
                {activePanel === 'TradeRemain' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right duration-200">
                        {t('customer_financial_situation.negotiable_balance_information')}
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="bg-L-gray-100 dark:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400">
                        <div className="flex justify-between w-full">
                            <span>{t('customer_financial_situation.negotiable_balance_option_1')}</span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className="dark:text-L-basic text-D-basic py-2 px-4">
                        <div className="flex justify-between w-full">
                            <span>{t('customer_financial_situation.negotiable_balance_option_2')}</span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('WithdrawalRemain')}>
                    {activePanel === 'WithdrawalRemain' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">{t('customer_financial_situation.withdrawal_balance')}</span>
                </div>
                {activePanel === 'WithdrawalRemain' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                        {t('customer_financial_situation.withdrawal_balance_information')}
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="bg-L-gray-100 dark:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400">
                        <div className="flex justify-between w-full">
                            <span>
                                {t('customer_financial_situation.withdrawal_balance_option_1', {
                                    n: dayjs().calendar('jalali').format('YYYY/MM/DD'),
                                    interpolation: { escapeValue: false },
                                })}
                            </span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className=" dark:text-L-basic text-D-basic py-2 px-4">
                        <div className="flex justify-between w-full">
                            <span>
                                {t('customer_financial_situation.withdrawal_balance_option_2', {
                                    n: dayjs().calendar('jalali').format('YYYY/MM/DD'),
                                    interpolation: { escapeValue: false },
                                })}
                            </span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('BrokerRemain')}>
                    {activePanel === 'BrokerRemain' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">{t('customer_financial_situation.broker_balance')}</span>
                </div>
                {activePanel === 'BrokerRemain' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                      {t('customer_financial_situation.broker_balance_information')}
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="bg-L-gray-100 dark:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400">
                        <div className="flex justify-between w-full">
                            <span>{t('customer_financial_situation.broker_balance_option_1')}</span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className="dark:text-L-basic text-D-basic py-2 px-4">
                        <div className="flex justify-between w-full">
                            <span>{t('customer_financial_situation.broker_balance_option_2')}</span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialTab;
