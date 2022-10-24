import { useMemo, FC } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterCustomerTitle, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterDraft from '../components/useHandleFilterDraft';
type IDraft = {
    ClickLeftNode: any;
};
const Drafts: FC<IDraft> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter });
    const { mutate } = useDeleteDraft();
    const { isFilter } = ClickLeftNode;

    const handleDelete = (data: IDraftRequsetType) => {
        mutate(data?.id);
    };

    const appDispath = useAppDispatch();
    const handleEdit = (data: IDraftRequsetType) => {
        appDispath(setDataBuySellAction(data));
    };

    const columns = useMemo(
        (): ColDefType<IDraftRequsetType>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customers', checkboxSelection: true, valueFormatter: valueFormatterCustomerTitle },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: any) => (
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT, TypeActionEnum.SEND]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ),
            },
        ],
        [],
    );

    // const onRowSelected = (event: RowSelectedEvent<IDraftRequsetType>) => {
    //     console.log(event);
    // };

    //
    return (
        <div className={'grid grid-rows-min-one h-full p-3'}>
            <div data-actived={isFilter} className="h-0 actived:h-auto transition-all opacity-0 actived:opacity-100">
                <FilterTable {...{ FilterData, handleChangeFilterData }} />
            </div>
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
