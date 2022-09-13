const nameCellRenderer = ({ data }: { data: IGoCustomerSearchResult }) => {
    return data.groupName ? (
        <div className="flex h-full flex-col leading-relaxed items-start justify-between">
            <div>{data.groupName}</div>
            <div className="text-slate-400">bourceCode</div>
        </div>
    ) : (
        <div className="flex h-full flex-col leading-relaxed items-start justify-between">
            <div>{data.customerTitle}</div>
            <div className="text-slate-400">bourceCode</div>
        </div>
    );
};

export default nameCellRenderer;
