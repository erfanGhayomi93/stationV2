import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';

const TurnOverTable = () => {
    //
    const { t } = useTranslation()

    const Columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: t("ag_columns_headerName.row"), field: 'index', width: 20 },
            { headerName: t("ag_columns_headerName.date"), field: 'customerTitle' },
            { headerName: t("ag_columns_headerName.actions"), field: 'bourceCode' },
            { headerName: t("ag_columns_headerName.transactionDesc"), field: 'symboTitle', type: 'sepratedNumber' },
            { headerName: t("ag_columns_headerName.debit"), field: 'orderSide', type: 'sepratedNumber'},
            { headerName: t("ag_columns_headerName.credit"), field: 'date', type: 'date' },
            { headerName: t("ag_columns_headerName.remain"), field: 'count', type: 'abbreviatedNumber' },
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

export default TurnOverTable;