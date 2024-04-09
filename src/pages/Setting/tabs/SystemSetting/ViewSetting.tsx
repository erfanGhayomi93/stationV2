import { useTranslation } from 'react-i18next';

const ViewSetting = () => {
    //
    const { t } = useTranslation();



    return (
        <div className="text-xs text-D-basic dark:text-L-basic h-full grid grid-cols-1 grid-rows-[0.45fr] justify-between">
            <div className="flex-1">
                <div className="font-medium text-sm mb-4">{t('setting.appView')}</div>
                <div className="flex justify-between items-center">
                    
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
