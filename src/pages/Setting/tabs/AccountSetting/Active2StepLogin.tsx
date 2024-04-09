import clsx from 'clsx';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { MoonIcon, NumberIcon, SunIcon, TraderCodeIcon, UserIcon } from 'src/common/icons';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';

interface Props {
    fullName: string;
    traderCode: string;
    nationalCode: string;
}

const Active2StepLogin = ({ fullName, traderCode, nationalCode }: Props) => {
    //
    const { t } = useTranslation();
    const theme = useAppSelector(getTheme);
    const appDispatch = useAppDispatch();
    const toggleAppTheme = () => appDispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));


    return (
        <div className="flex">
            <div className="flex-1 flex flex-col justify-between">
                <RowDisplay name={t('common.fullName')} value={fullName} icon={<UserIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.traderCode')} value={traderCode} icon={<TraderCodeIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.nationalCode')} value={nationalCode} icon={<NumberIcon />} />
            </div>
            <div className="flex-1 flex flex-col gap-4 text-D-basic dark:text-L-basic py-2 px-4">

                <div className="flex gap-4 justify-between w-2/3">
                    <span>{t('setting.backgroundColor')}</span>

                    <div className='flex mt-4'>
                        <button
                            onClick={toggleAppTheme}
                            className={clsx('py-2 px-5 text-D-gray-600 flex items-center gap-2 font-medium rounded-lg border-L-primary-50', {
                                'border bg-L-gray-200 text-L-primary-50': theme === 'light',
                            })}
                        >
                            <SunIcon />
                            {t('setting.lightTheme')}
                        </button>
                        <button
                            onClick={toggleAppTheme}
                            className={clsx(
                                'py-2 px-5 text-L-gray-600 dark:text-D-primary-50 flex items-center gap-2 font-medium rounded-lg border-D-primary-50',
                                {
                                    'border bg-D-gray-200': theme === 'dark',
                                },
                            )}
                        >
                            <MoonIcon />
                            {t('setting.darkTheme')}
                        </button>
                    </div>
                </div>
                {/* <p>{t('setting.dearUser')}</p>
                <p>{t('setting.2StepLoginDesc')}</p>

                <div className="text-left">
                    <button className="bg-L-primary-50 py-2 px-4 rounded text-L-basic">{t('setting.active2StepLogin')}</button>
                </div> */}
            </div>
        </div>
    );
};

export default Active2StepLogin;

export const RowDisplay = ({ name, icon, value }: { name: string; icon: ReactElement; value: string }) => {
    return (
        <div className="w-2/3 flex justify-between items-center py-2">
            <div className="flex gap-1 items-center text-L-primary-50 dark:text-D-primary-50">
                <span>{icon}</span>
                <span>{name}</span>
            </div>
            <div className="text-D-basic dark:text-L-basic font-medium">{value}</div>
        </div>
    );
};
