import i18next from 'i18next';
import Input from 'src/common/components/Input';
import Select, { SelectOption } from 'src/common/components/Select';

type FilterData = {
    FilterData: {
        customerTitle: string;
        symbolTitle: string;
        side: string;
    };
    handleChangeFilterData: (type: string, data: string) => void; 
    
};

function FilterTable({ FilterData, handleChangeFilterData }: FilterData) {
    return (
        <div className="pb-4 flex items-center gap-8">
            <div className="border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md w-[136px]">
                <Input
                    placeholder="مشتری:"
                    value={FilterData.customerTitle}
                    onChange={(e) => handleChangeFilterData('customerTitle', e.target.value)}
                />
            </div>
            <div className="border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md w-[136px]">
                <Input
                    placeholder="نام نماد:"
                    value={FilterData.symbolTitle}
                    onChange={(e) => handleChangeFilterData('symbolTitle', e.target.value)}
                />
            </div>
            <div className="w-[175px]">
                <Select
                    onChange={(selected) => handleChangeFilterData('side', selected)}
                    value={i18next.t('BSModal.' + FilterData.side + '_side_tn')}
                    title="سمت:"
                >
                    {sideOption.map((item, ind) => (
                        <SelectOption
                            key={ind}
                            label={i18next.t('BSModal.' + item.value + '_side_tn')}
                            value={item.value}
                            className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                        />
                    ))}
                </Select>
            </div>
        </div>
    );
}

export default FilterTable;

const sideOption: {
    label: string;
    value: string;
}[] = [
    { label: 'همه', value: '' },
    { label: 'خرید', value: 'Buy' },
    { label: 'فروش', value: 'Sell' },
];
