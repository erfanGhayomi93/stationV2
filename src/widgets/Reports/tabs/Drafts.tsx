import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useDeleteDraft, useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterDraft from '../components/useHandleFilterDraft';
type IDraft = {
    ClickLeftNode: any;
};
const Drafts: FC<IDraft> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter } = useGetDraft();
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterDraft({ dataBeforeFilter } as any);
    const { mutate } = useDeleteDraft();
    const { isFilter } = ClickLeftNode;

    const handleDelete = (data?: IDraftResponseType) => {
        data && mutate(data?.orderId);
    };

    const appDispath = useAppDispatch();
    const handleEdit = (data?: IDraftResponseType) => {
        appDispath(setDataBuySellAction(data));
    };

    const columns = useMemo(
        (): ColDefType<IDraftResponseType>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitles', checkboxSelection: true },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IDraftResponseType>) => (
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

    // const onRowSelected = (event: RowSelectedEvent<IDraftResponseType>) => {
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
