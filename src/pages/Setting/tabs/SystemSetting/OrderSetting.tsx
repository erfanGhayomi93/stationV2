
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPlatformSetting, useSetPlatformSetting } from 'src/app/queries/settings/PlatformSetting';
import Switcher from 'src/common/components/SwitchButton';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getPlatformSettings, updatePlatformSetting } from 'src/redux/slices/platformSetting';
import TradeInput from 'src/widgets/BuySell/components/Input';

type settingStateType = {
    label: string;
    value: boolean;
    key: keyof PlatformSettingResultTypes;
};

const OrderSetting = () => {
    //
    const { t } = useTranslation();
    const dispatch=useAppDispatch()

    const settings = useAppSelector(getPlatformSettings);
    
    const { mutate: setOrderSettings, isLoading } = useSetPlatformSetting();
    
    const {} = useGetPlatformSetting({
        onSuccess: ({succeeded, result}) => {
            if(succeeded) {
                dispatch(updatePlatformSetting(result))
            }
        }
    })

    const [orderSetting, setOrderSetting] = useState<settingStateType[]>([
        { label: t('setting.confirmBeforeDeleteOrder'), value: settings['confirmBeforeOrderDelete'], key: 'confirmBeforeOrderDelete' },
        { label: t('setting.confirmBeforeSendOrder'), value: settings['confirmBeforeSendingOrder'], key: 'confirmBeforeSendingOrder' },
        { label: t('setting.sendSupervisorMessageAlarm'), value: settings['surveillanceMessages'], key: 'surveillanceMessages' },
        { label: t('setting.getFirstLinePrice'), value: settings['bestPriceFromTopOrder'], key: 'bestPriceFromTopOrder' },
        { label: t('setting.showSymbolDetailWhileSending'), value: settings['symbolInfoOnSendOrder'], key: 'symbolInfoOnSendOrder' },
        { label: t('setting.showDivideOrder'), value: settings['showOrderSplit'], key: 'showOrderSplit' },
        { label: t('setting.whenPressPlus'), value: settings['plusKeyBehaviorOn'], key: 'plusKeyBehaviorOn' },
        { label: t('setting.multipleBuySellModal'), value: settings['multipleOrderModal'], key: 'multipleOrderModal' },
        { label: t('setting.showGuideInFirstLogin'), value: settings['showIntroGuideOnLogin'], key: 'showIntroGuideOnLogin' },
    ]);

    useEffect(() => {
        setOrderSetting((pre) => pre.map((item) => ({ ...item, value: settings[item.key] as boolean })));
    }, [settings]);

    const onUpdateSettings = (name: keyof PlatformSettingResultTypes, value: boolean) => {
        setOrderSettings({ ...settings, [name]: value });
    };

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
                {orderSetting.map(({ key, label, value }) => (
                    <div key={key} className="flex w-1/2 items-center justify-between py-3 even:pr-2 odd:pl-2 border-b last:border-b-0">
                        <span>{label}</span>
                        <Switcher value={value} onCheck={(value) => onUpdateSettings(key, value)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSetting;
