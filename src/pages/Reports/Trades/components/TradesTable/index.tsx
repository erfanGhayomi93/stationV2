import React, { useMemo } from 'react'
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';

const TradesTable = () => {
    //
    const Columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: 'ردیف', field: 'index', width: 20 },
            { headerName: 'مشتری', field: 'customerTitle' },
            { headerName: 'کد بورسی', field: 'bourceCode' },
            { headerName: 'نماد', field: 'symboTitle', type: 'sepratedNumber' },
            { headerName: 'سمت', field: 'orderSide', type: 'sepratedNumber'},
            { headerName: 'زمان', field: 'date', type: 'date' },
            { headerName: 'تعداد', field: 'count', type: 'abbreviatedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'بهای تمام شده', field: 'cost', type: 'sepratedNumber' },
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
                <Paginator loading={false} current={1} total={50} onChange={()=>{}} />
            </div>
        </>
    );
}

export default TradesTable