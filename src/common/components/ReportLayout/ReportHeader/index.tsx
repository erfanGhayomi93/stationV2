import React from 'react';
import { BreadcrumbSeprator } from 'src/common/icons';

type Props = {
    title?: string;
    hasBreadcrumb: boolean;
    leftNode?: React.ReactNode;
    basePage?: string | React.ReactNode;
    currentPage?: string | React.ReactNode;
};

const ReportHeader = ({ hasBreadcrumb, basePage, currentPage, title, leftNode }: Props) => {
    return (
        <div className="flex justify-between w-full items-center">
            {hasBreadcrumb ? (
                <span className="flex gap-2 items-center bg-white dark:bg-D-gray-300 py-1 px-2 rounded-md">
                    <span className="text-L-gray-500 text-sm flex items-center gap-2">
                        {basePage}
                        <span>
                            <BreadcrumbSeprator />
                        </span>
                    </span>
                    <span className="text-xl dark:text-D-primary-50 flex gap-2">{currentPage}</span>
                </span>
            ) : (
                <span>{title}</span>
            )}
            <span className="flex gap-2 items-center">{leftNode}</span>
        </div>
    );
};

export default ReportHeader;
