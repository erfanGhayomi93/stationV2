import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ReportFilter } from './components/ReportFilter';
import ReportTable from './components/ReportTable';

interface IReportsType {}

const Reports: FC<IReportsType> = ({}) => {
    const { activeTab } = useParams();
    console.log(activeTab);
    return (
        <div className="bg-L-basic dark:bg-D-basic p-6 grid grid-rows-min-one gap-5">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium font-[24px] text-2xl">گزارشات</h1>
            <div className="grid  grid-rows-min-one">
                <ReportFilter />
                <div className="grid grid-rows-one-min">
                    <ReportTable />
                </div>
            </div>
        </div>
    );
};

export default Reports;
