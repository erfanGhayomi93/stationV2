import { CSSProperties } from 'react';

type TReportLayoutProps = {
    reportNode: React.ReactNode;
    hasBreadcrumb: boolean;
    HeaderLeftNode?: React.ReactNode;
    style?: CSSProperties;
    className?: string;
    BreadCumbBasePage?: string | React.ReactNode;
    BreadCumbCurrentPage?: string | React.ReactNode;
    title?: string;
    formFields?: React.ReactNode;
    onSubmit: () => void;
    onClear: () => void;
    isFiltered: boolean;
};

type TReportBodyProps = {
    style?: CSSProperties;
    className?: string;
    children: React.ReactNode;
};
