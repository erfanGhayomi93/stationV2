import { FC } from 'react';

const NameCellRenderer: FC<Pick<IGoCustomerSearchResult, 'groupName' | 'customerTitle' | 'bourseCode'>> = ({
    groupName,
    customerTitle,
    bourseCode,
}) => {
    return groupName ? (
        <div className="flex h-full flex-col leading-relaxed items-center justify-between w-full">
            <div>{groupName}</div>
            <div className="text-slate-400">{bourseCode}</div>
        </div>
    ) : (
        <div className="flex h-full  leading-relaxed items-center justify-start gap-2 w-full">
            <div className="text-center truncate max-w-[7rem]">{customerTitle}</div>
            <div className="text-slate-400">{bourseCode}</div>
        </div>
    );
};

export default NameCellRenderer;
