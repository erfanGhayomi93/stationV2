import React from 'react';
import { useTranslation } from 'react-i18next';
import Switcher from 'src/common/components/SwitchButton';
import TradeInput from 'src/widgets/BuySell/components/Input';

const OrderSetting = () => {
    //
    const { t } = useTranslation();
  

    const items = [
        { label: t('setting.confirmBeforeDeleteOrder'), value: true, key: 'confirmBeforeOrderDelete' },
        { label: t('setting.confirmBeforeSendOrder'), value: true, key: 'confirmBeforeSendingOrder' },
        { label: t('setting.sendSupervisorMessageAlarm'), value: true, key: 'surveillanceMessages' },
        { label: t('setting.getFirstLinePrice'), value: true, key: 'bestPriceFromTopOrder' },
        { label: t('setting.showSymbolDetailWhileSending'), value: true, key: 'symbolInfoOnSendOrder' },
        { label: t('setting.showDivideOrder'), value: true, key: 'showOrderSplit' },
        { label: t('setting.whenPressPlus'), value: true, key: 'plusKeyBehaviorOn' },
        { label: t('setting.multipleBuySellModal'), value: true, key: 'multipleOrderModal' },
        { label: t('setting.showGuideInFirstLogin'), value: true, key: 'showIntroGuideOnLogin' },
    ];

    return (
        <div className="h-full text-D-basic flex flex-col gap-4 text-sm dark:text-L-basic">
            <div className="font-medium">{t('setting.order')}</div>
            <div className="flex gap-4">
                <div className="flex-1 flex items-center justify-between">
                    <span>{t('setting.defaultBuyVolume')}</span>
                    <div className="overflow-hidden h-8 w-1/3 rounded-md border border-L-gray-400 dark:border-D-gray-400 duration-400 dark:focus-within:border-D-info-100 focus-within:border-L-info-100">
                        <TradeInput onChange={() => {}} value={0} />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <span>{t('setting.defaultSellVolume')}</span>
                    <div className="overflow-hidden h-8 w-1/3 rounded-md border border-L-gray-400 dark:border-D-gray-400 duration-400 dark:focus-within:border-D-info-100 focus-within:border-L-info-100">
                        <TradeInput onChange={() => {}} value={0} />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-wrap">
                {items.map((item) => (
                    <div key={item.key} className="flex w-1/2 items-center justify-between py-3 even:pr-2 odd:pl-2 border-b last:border-b-0">
                        <span>{item.label}</span>
                        <Switcher value={item.value} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSetting;
