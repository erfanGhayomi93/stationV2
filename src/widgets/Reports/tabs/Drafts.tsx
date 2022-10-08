import { useMemo } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterDraft from '../components/useHandleFilterDraft';

const Drafts = () => {
    const { data: dataBeforeFilter } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter });
    const { mutate } = useDeleteDraft();
    const handleDelete = (data: IDraftSelected) => {
        mutate(data.id);
    };

    const appDispath = useAppDispatch();
    const handleEdit = (data: IDraftSelected) => {
        appDispath(setDataBuySellAction(data));
    };

    const columns = useMemo(
        (): ColDefType<IDraftSelected>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitles', checkboxSelection: true },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: any) => (
                    <ActionCell data={row.data} type={TypeActionEnum.DRAFt} handleDelete={handleDelete} handleEdit={handleEdit} />
                ),
            },
        ],
        [],
    );

    // const onRowSelected = (event: RowSelectedEvent<IDraftSelected>) => {
    //     console.log(event);
    // };

    //
    return (
        <div className="w-full p-3 h-[calc(100%-50px)]">
            <FilterTable {...{ FilterData, handleChangeFilterData }} />

            <AGTable
                rowData={dataAfterfilter}
                columnDefs={columns}
                rowSelection="multiple"
                // enableBrowserTooltips={false}
                // suppressRowClickSelection={true}
                // onRowSelected={onRowSelected}
            />
        </div>
    );
};

export default Drafts;
