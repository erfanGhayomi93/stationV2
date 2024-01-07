import { Paginator } from 'src/common/components/Paginator/Paginator';
import FilterCash from './components/FilterCash';
import AGTable from 'src/common/components/AGTable';

const Cash = () => {
    //
    return (
        <div className="flex flex-col gap-3 h-full w-full">
            <FilterCash />
            <div className="flex-1">
                <AGTable />
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
