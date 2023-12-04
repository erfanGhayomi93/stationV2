import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'src/common/components/Select';

const AlarmSetting = () => {
    //
    const { t } = useTranslation();

    return (
        <div className="h-full text-D-basic flex flex-col gap-4 text-xs dark:text-L-basic">
            <div className="font-medium text-sm">{t('setting.alarms')}</div>
            <div className="flex justify-between items-center">
                <span>{t('setting.alarmSendingType')}</span>
                <div className="w-1/3">
                    <Select onChange={() => {}} value={true} options={[{ label: 'درون برنامه ای', value: true }]} />
                </div>
            </div>
            <div className="border-b border-L-gray-300 dark:border-D-gray-300"></div>
            <div className="flex justify-between items-center">
                <span>{t('setting.alarmDisplayPosition')}</span>
                <div className="w-1/3">
                    <Select onChange={() => {}} value={true} options={[{ label: 'پایین - چپ', value: true }]} />
                </div>
            </div>
        </div>
    );
};

export default AlarmSetting;
