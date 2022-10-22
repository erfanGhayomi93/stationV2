import { useMemo, useState } from 'react';

type handleFilter = {
    dataBeforeFilter: IOrderGetType[] | undefined;
};

function useHandleFilterOrder({ dataBeforeFilter }: handleFilter) {
    const [FilterData, setFilterData] = useState({
        customerTitle: '',
        symbolTitle: '',
        side: '',
    });

    const handleChangeFilterData = (type: string, data: string) => {
        setFilterData((prev) => ({
            ...prev,
            [type]: data,
        }));
    };

    const dataAfterfilter = useMemo(() => {
        const { customerTitle, symbolTitle, side } = FilterData;

        if (!dataBeforeFilter) return [];
        return (dataBeforeFilter as any).filter((item: IOrderGetType) => {
            if (!customerTitle && !symbolTitle && !side) return true;
            else if (customerTitle && item.customerTitle.includes(customerTitle)) return true;
            else if (symbolTitle && item.symbolTitle && item.symbolTitle.includes(symbolTitle)) return true;
            else if (side && item.orderSide.includes(side)) return true;
            return false;
        });
    }, [dataBeforeFilter, FilterData]);
    return { FilterData, handleChangeFilterData, dataAfterfilter };
}

export default useHandleFilterOrder;
