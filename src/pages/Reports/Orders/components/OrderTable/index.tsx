import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';

const OrdersTable = () => {
    //
    const { t } = useTranslation()

    const Columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: t("ag_columns_headerName.row"), field: 'index', width: 20 },
            { headerName: t("ag_columns_headerName.customer"), field: 'customerTitle' },
            { headerName: t("ag_columns_headerName.symbol"), field: 'symboTitle', type: 'sepratedNumber' },
            { headerName: t("ag_columns_headerName.side"), field: 'orderSide', type: 'sepratedNumber'},
            { headerName: t("ag_columns_headerName.count"), field: 'count', type: 'abbreviatedNumber' },
            { headerName: t("ag_columns_headerName.price"), field: 'price', type: 'sepratedNumber' },
            { headerName: t("ag_columns_headerName.tradeValue"), field: 'price', type: 'sepratedNumber' },
            { headerName: t("ag_columns_headerName.status"), field: 'price', type: 'sepratedNumber' },
            { headerName: t("ag_columns_headerName.date"), field: 'date', type: 'date' },
            // { headerName: 'کارمزد معامله', field: 'lastTradedPrice', type: 'sepratedNumber' },
        ],
        [],
    );
    return (
        <>
            <WidgetLoading spining={false}>
                <AGTable rowData={[]} columnDefs={Columns} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                {/* <Paginator loading={false} current={1} total={50} onChange={()=>{}} /> */}
            </div>
        </>
    );
}

export default OrdersTable