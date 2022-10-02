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
        <div className="flex h-full flex-col leading-relaxed items-center justify-between">
            <div className="text-center">{customerTitle}</div>
            <div className="text-slate-400">{bourseCode}</div>
        </div>
    );
};

export default NameCellRenderer;
