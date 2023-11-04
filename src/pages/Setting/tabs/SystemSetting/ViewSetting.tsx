import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MoonIcon, SunIcon } from 'src/common/icons';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';

const ViewSetting = () => {
    //
    const { t } = useTranslation();
    const theme = useAppSelector(getTheme);
    const appDispatch = useAppDispatch();

    const toggleAppTheme = () => appDispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'));

    return (
        <div className="text-sm text-D-basic dark:text-L-basic h-full grid grid-cols-1 grid-rows-[0.45fr] justify-between">
            <div className="flex-1">
                <div className="font-medium mb-4">{t('setting.appView')}</div>
                <div className="flex justify-between items-center">
                    <span>{t('setting.backgroundColor')}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleAppTheme}
                            className={clsx('py-2 px-5 text-D-gray-600 flex gap-2 font-medium rounded-lg border-L-primary-50', {
                                'border bg-L-gray-200 text-L-primary-50': theme === 'light',
                            })}
                        >
                            <SunIcon />
                            {t('setting.lightTheme')}
                        </button>
                        <button
                            onClick={toggleAppTheme}
                            className={clsx(
                                'py-2 px-5 text-L-gray-600 dark:text-D-primary-50 flex gap-2 font-medium rounded-lg border-D-primary-50',
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
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div>{t('setting.changeLayout')}</div>
                <div className="flex-1 grid grid-cols-3 gap-1">
                    <div className="border"></div>
                    <div className="border"></div>
                    <div className="border"></div>
                </div>
            </div>
        </div>
    );
};

export default ViewSetting;
