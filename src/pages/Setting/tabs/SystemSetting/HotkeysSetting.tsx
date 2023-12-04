import React, { useState } from 'react';
import clsx from 'clsx';
import Switcher from 'src/common/components/SwitchButton';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/redux/hooks';
import { getPlatformSettings } from 'src/redux/slices/platformSetting';
import { useSetPlatformSetting } from 'src/app/queries/settings/PlatformSetting';
import WidgetLoading from 'src/common/components/WidgetLoading';

const HotkeysSetting = () => {
    //
    const { t } = useTranslation();
    const { hotKeyEnabled, ...rest } = useAppSelector(getPlatformSettings);

    const { mutate: toggleHotkeyEnabled, isLoading } = useSetPlatformSetting();

    const onChangeHandler = (value: boolean) => {
        toggleHotkeyEnabled({ ...rest, hotKeyEnabled: value });
    };

    const Hotkey = ({ label, keys }: { label: string; keys: (null | string)[] }) => (
        <div className="flex flex-1 items-center justify-between w-full">
            <span className="text-xs">{label}:</span>

            <div dir="ltr" className="flex items-center gap-2">
                {keys.map((key) => (
                    <button
                        role="button"
                        key={key}
                        type="button"
                        className={clsx(
                            'flex text-xs items-center justify-center rounded',
                            key && [
                                'bg-L-basic dark:bg-D-basic border border-L-gray-300 dark:border-D-gray-300 h-7',
                                key.length === 1 ? 'w-7' : 'w-12',
                            ],
                        )}
                    >
                        {key ?? '+'}
                    </button>
                ))}
            </div>
        </div>
    );
    return (
        <WidgetLoading spining={isLoading}>
            <div className="h-full text-D-basic flex flex-col justify-between text-sm dark:text-L-basic">
                <div className="flex items-center gap-36">
                    <span className="font-medium">{t('setting.hotkeys')}</span>
                    <Switcher onCheck={onChangeHandler} value={hotKeyEnabled} />
                </div>
                <div className="flex gap-20">
                    <Hotkey label={t('setting.key_open_buy_window')} keys={['Shift', null, '+']} />
                    <Hotkey label={t('setting.key_open_sell_window')} keys={['Shift', null, '-']} />
                </div>
                <div className="flex gap-20">
                    <Hotkey label={t('setting.key_symbol_search')} keys={['Shift', null, 'F']} />
                    <Hotkey label={t('setting.key_portoflio')} keys={['Shift', null, 'P']} />
                </div>
                <div className="flex gap-20">
                    <Hotkey label={t('setting.key_deposit')} keys={['Shift', null, 'A']} />
                    <Hotkey label={t('setting.key_withdrawal')} keys={['Shift', null, 'R']} />
                </div>
                <div className="flex gap-20">
                    <Hotkey label={t('setting.key_setting')} keys={['Shift', null, 'S']} />
                    <Hotkey label={t('setting.key_send_order')} keys={['Enter']} />
                </div>
            </div>
        </WidgetLoading>
    );
};

export default HotkeysSetting;
