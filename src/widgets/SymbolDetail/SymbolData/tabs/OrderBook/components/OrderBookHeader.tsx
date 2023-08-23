import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const OrderBookHeader = () => {
    //
    const { t } = useTranslation()

    return (
        <div className=" grid grid-cols-2 grid-rows-1 sticky bg-L-basic dark:bg-D-basic top-0 z-50">
            <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-500 dark:text-D-gray-500 dark:border-D-gray-400 right-0">
                <span className="ml-4">{t("ag_columns_headerName.count")}</span>
                <span>{t("ag_columns_headerName.volume")}</span>
                <span className="mr-auto">{t("ag_columns_headerName.price")}</span>
            </div>
            <div className="border-b mb-1 flex px-2 py-1 text-xs font-bold text-L-gray-500 dark:text-D-gray-500 dark:border-D-gray-400  right-0">
                <span className="ml-auto">{t("ag_columns_headerName.price")}</span>
                <span>{t("ag_columns_headerName.volume")}</span>
                <span className="mr-4">{t("ag_columns_headerName.count")}</span>
            </div>
        </div>
    );
};

export default memo(OrderBookHeader);
