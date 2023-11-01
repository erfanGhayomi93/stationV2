import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberIcon, TraderCodeIcon, UserIcon } from 'src/common/icons';

interface Props {
    fullName: string;
    traderCode: string;
    nationalCode: string;
}

const Active2StepLogin = ({ fullName, traderCode, nationalCode }: Props) => {
    //
    const { t } = useTranslation();

    return (
        <div className="flex">
            <div className="flex-1 flex flex-col justify-between">
                <RowDisplay name={t('common.fullName')} value={fullName} icon={<UserIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.traderCode')} value={traderCode} icon={<TraderCodeIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.nationalCode')} value={nationalCode} icon={<NumberIcon />} />
            </div>
            <div className="flex-1 flex flex-col gap-4 text-D-basic dark:text-L-basic">
                <p>{t('setting.dearUser')}</p>
                <p>{t('setting.2StepLoginDesc')}</p>

                <div className="text-left">
                    <button className="bg-L-primary-50 py-2 px-4 rounded text-L-basic">{t('setting.active2StepLogin')}</button>
                </div>
            </div>
        </div>
    );
};

export default Active2StepLogin;

export const RowDisplay = ({ name, icon, value }: { name: string; icon: ReactElement; value: string }) => {
    return (
        <div className="w-2/3 flex justify-between items-center">
            <div className="flex gap-1 items-center text-L-primary-50 dark:text-D-primary-50">
                <span>{icon}</span>
                <span>{name}</span>
            </div>
            <div className="text-D-basic dark:text-L-basic font-medium">{value}</div>
        </div>
    );
};
