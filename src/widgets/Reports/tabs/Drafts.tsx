import { useMemo } from 'react';
import { useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell from '../components/actionCell';



const Drafts = () => {
    const { data } = useGetDraft('Side=None', {
        select: (data: IDraftSelected[]) =>
            data.map((item: IDraftSelected) => ({
                customerTitles: item.customerTitles,
                symbolTitle: item.symbolTitle,
                side: item.side,
                quantity: item.quantity,
                price: item.price,
                validity: item.validity,
                validityDate: item.validityDate,
            })),
    });


    const columns = useMemo(
        (): ColDefType<IDraftSelected>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitles', checkboxSelection: true },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity' , valueFormatter : valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: () => <ActionCell />,
            },
        ],
        [],
    );

    // const onRowSelected = (event: RowSelectedEvent<IDraftSelected>) => {
    //     console.log(event);
    // };

    //
    return (
        <div className="w-full h-full p-3">
            <AGTable
                rowData={data}
                columnDefs={columns}
                rowSelection="multiple"
                // suppressRowClickSelection={true}
                // onRowSelected={onRowSelected}
            />
        </div>
    );
};

export default Drafts;
