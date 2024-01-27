import { TReportBodyProps } from '../types';

const ReportBody = ({ children, style, className }: TReportBodyProps) => {
    return (
        <div className={`bg-white dark:bg-D-gray-300 p-4 flex flex-col gap-4 flex-1 w-full h-full rounded-lg ${className}`} style={style}>
            {children}
        </div>
    );
};

export default ReportBody;
