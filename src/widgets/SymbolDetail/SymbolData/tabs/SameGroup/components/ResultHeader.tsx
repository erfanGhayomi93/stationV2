import { useTranslation } from 'react-i18next';

const ResultHeader = () => {
    const { t } = useTranslation();
            
    
    return (
        <div className="flex h-10 bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg font-medium"
        >
            <div className="w-1/5 flex items-center justify-center text-L-gray-500 dark:text-D-gray-500 border-l border-L-basic dark:border-D-basic">
                {t('Symbol.symbol')}
            </div>
            <div className="w-1/5 flex items-center justify-center text-L-gray-500 dark:text-D-gray-500 border-l border-L-basic dark:border-D-basic">
                {t('Symbol.volume')}
            </div>
            <div className="w-2/5 flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-500 border-l border-L-basic dark:border-D-basic">
                <div>{t('Symbol.lastTradedPrice')}</div>
                <div>{t('Symbol.lastTradedPercent')}</div>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-500">
                <div>{t('Symbol.offer')}</div>
                <div>{t('Symbol.demand')}</div>
            </div>
        </div>
    );
};

export default ResultHeader;
