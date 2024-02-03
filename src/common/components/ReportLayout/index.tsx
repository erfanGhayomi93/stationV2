import clsx from 'clsx';
import { TReportLayoutProps } from './types';
import ReportHeader from './ReportHeader';
import ReportBody from './ReportBody';
import { useState } from 'react';
import OpenFilterBoxBtn from '../Buttons/OpenFilterBoxBtn';
import FilterBox from '../FilterBox';

const ReportLayout = ({
    hasBreadcrumb,
    title,
    BreadCumbBasePage,
    BreadCumbCurrentPage,
    HeaderLeftNode,
    reportNode,
    className,
    style,
    formFields,
    onSubmit,
    onClear,
    isFiltered,
}: TReportLayoutProps) => {
    //
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(true);

    return (
        <div style={style} className={`grid grid-cols-6 gap-4 my-2 ${className}`}>
            <div className={clsx('flex flex-col gap-2', isFilterBoxOpen ? 'col-span-5' : 'col-span-6')}>
                <ReportHeader
                    hasBreadcrumb={hasBreadcrumb}
                    title={title}
                    basePage={BreadCumbBasePage}
                    currentPage={BreadCumbCurrentPage}
                    leftNode={
                        <>
                            {HeaderLeftNode}
                            {!isFilterBoxOpen && (
                                <OpenFilterBoxBtn
                                    className={clsx(
                                        'bg-white dark:bg-D-gray-300 p-2  dark:text-D-gray-600 rounded-md ',
                                        isFiltered ? 'text-L-primary-50' : 'text-L-gray-600',
                                    )}
                                    onClick={() => setIsFilterBoxOpen(true)}
                                    isFilterActive={isFiltered}
                                />
                            )}
                        </>
                    }
                />
                <ReportBody>{reportNode}</ReportBody>
            </div>
            {isFilterBoxOpen && (
                <div className="col-span-1 overflow-hidden">
                    <FilterBox fieldDefs={formFields} onCloseFilterBoxClick={() => setIsFilterBoxOpen(false)} onSubmit={onSubmit} onClear={onClear} />
                </div>
            )}
        </div>
    );
};

export default ReportLayout;
