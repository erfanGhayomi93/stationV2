import React, { useMemo } from 'react'
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';

const TurnOverTable = () => {
    //
    const Columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: 'ردیف', field: 'index', width: 20 },
            { headerName: 'تاریخ', field: 'customerTitle' },
            { headerName: 'عملیات', field: 'bourceCode' },
            { headerName: 'شرح تراکنش', field: 'symboTitle', type: 'sepratedNumber' },
            { headerName: 'بدهکار(ریال )', field: 'orderSide', type: 'sepratedNumber'},
            { headerName: 'بستانکار (ریال)', field: 'date', type: 'date' },
            { headerName: 'مانده (ریال)', field: 'count', type: 'abbreviatedNumber' },
        ],
        [],
    );
    return (
        <>
            <WidgetLoading spining={false}>
                <AGTable rowData={[]} columnDefs={Columns} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                <Paginator loading={false} current={1} total={50} onChange={()=>{}} />
            </div>
        </>
    );
}

export default TurnOverTable;