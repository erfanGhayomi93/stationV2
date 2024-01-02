import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterPhysical from './components/FilterPhysical';
import { useMemo, useState } from 'react';

const Physical = () => {
    //
    const [formValues, setFormValues] = useState({});

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
            {
                field: '',
                headerName: 'نماد',
            },
            {
                field: '',
                headerName: 'تعداد موقعیت باز',
            },
            {
                field: '',
                headerName: 'تاریخ تسویه فیزیکی',
            },
            {
                field: '',
                headerName: 'وضعیت قرارداد ( سود / زیان )',
            },
            {
                field: '',
                headerName: 'نوع اعمال',
            },
            {
                field: '',
                headerName: 'مبلغ تسویه',
            },
            {
                field: '',
                headerName: 'تعداد درخواست برای تسویه',
            },
            {
                field: '',
                headerName: 'تعداد اعمال شده',
            },
            {
                field: '',
                headerName: 'موافقت با تسویه فیزیکی در حالت زیان',
            },
            {
                field: '',
                headerName: 'تعداد نکول',
            },
            {
                field: '',
                headerName: 'مبلغ نکول',
            },
            {
                field: '',
                headerName: 'درخواست کننده',
            },
            {
                field: '',
                headerName: 'وضعیت',
            },
            {
                sortable: false,
                field: '',
                headerName: 'عملیات',
                pinned: 'left',
                minWidth: 280,
            },
        ],
        [],
    );

    return (
        <div className="flex flex-col gap-3 h-full w-full">
            <FilterPhysical formValues={formValues} setFormValues={setFormValues} onClear={() => {}} onSubmit={() => {}} />
            <div className="flex-1">
                <AGTable columnDefs={colDefs} />
            </div>
            <div className="border-t my-2"></div>
            <Paginator
                loading={false}
                pageNumber={0}
                pageSize={0}
                totalPages={0}
                hasNextPage={false}
                hasPreviousPage={false}
                PaginatorHandler={() => {}}
            />
        </div>
    );
};

export default Physical;
