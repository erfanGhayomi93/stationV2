import { ICellRendererParams } from 'ag-grid-community';
import { FC, memo, useMemo } from 'react';
import { useGetDraft } from 'src/app/queries/draft';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';

interface IInnerTableType {}

const InnerTable: FC<IInnerTableType> = ({}) => {
    const { data } = useGetDraft();

    const columns = useMemo(
        (): ColDefType<IDraftCreateType>[] => [
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customerTitle',
            },
            {
                headerName: 'نام نماد',
                field: 'symbolTitle',
            },
            {
                headerName: 'سمت',
                field: 'orderSide',
                valueFormatter: valueFormatterSide,
            },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IDraftCreateType>) => <>actions</>,
            },
        ],
        [],
    );
    return (
        <div className="h-full w-full">
            <AGTable rowData={data} columnDefs={columns} enableBrowserTooltips={false} />
        </div>
    );
};

export default memo(InnerTable);
