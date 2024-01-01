import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterCash from './components/FilterCash';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useMemo } from 'react';

const Cash = () => {
    //
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
                headerName: 'تعداد پذیرفته شده',
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
            <FilterCash />
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

export default Cash;
