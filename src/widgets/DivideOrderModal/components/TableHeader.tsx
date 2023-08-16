import { useTranslation } from 'react-i18next';

const TableHeader = () => {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-5 h-8 text-xs bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg font-medium">
            <div className="flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                {t('ag_columns_headerName.customer')}
            </div>
            <div className="flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                {t('ag_columns_headerName.count')}
            </div>
            <div className="flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                {t('ag_columns_headerName.price')}
            </div>
            <div className="flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic">
                {t('ag_columns_headerName.status')}
            </div>
            <div className="flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-700">{t('ag_columns_headerName.actions')}</div>
        </div>
    );
};

export default TableHeader;
