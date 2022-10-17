import clsx from 'clsx';
import { FC, useState } from 'react';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import GroupAnimationButton from 'src/common/components/GroupButton';
import { ReportFilter } from './components';

interface IReportsType {}

const Reports: FC<IReportsType> = ({}) => {
    const [active, setActive] = useState('1');
    return (
        <div className="bg-L-basic dark:bg-D-basic p-6">
            <h1 className="text-L-gray-500 dark:text-D-gray-500 font-medium font-[24px] text-2xl">گزارشات</h1>
            <div className="mt-10">
                <ReportFilter />
            </div>
        </div>
    );
};

export default Reports;
