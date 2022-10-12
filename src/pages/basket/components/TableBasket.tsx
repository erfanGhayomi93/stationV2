import React, { useMemo } from 'react'
import AGTable , { ColDefType } from 'src/common/components/AGTable'

export const TableBasket = () => {

    const columns = useMemo(
        (): ColDefType<any>[] => [
            { headerName: 'ردیف', field: 'customerTitles', checkboxSelection: true },
            { headerName: 'نام', field: 'symbolTitle' },
            { headerName: 'مشتری', field: 'symbolTitle' },
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'symbolTitle' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'side' },
            { headerName: 'اعتبار درخواست', field: 'validity' },
            // {
            //     headerName: 'عملیات',
            //     field: 'customTitle',
            //     cellRenderer: (row: any) => (
            //         <ActionCell data={row.data} type={TypeActionEnum.DRAFt} handleDelete={handleDelete} handleEdit={handleEdit} />
            //     ),
            // },
        ],
        [],
    );


  return (
    <div>
         <AGTable
                rowData={[]}
                columnDefs={columns}
                rowSelection="multiple"
                // enableBrowserTooltips={false}
                // suppressRowClickSelection={true}
                // onRowSelected={onRowSelected}
            />
    </div>
  )
}
