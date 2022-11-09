import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from 'src/common/icons';

interface ICellSideFilterType {
    field?: string;
    placeholder?: string;
    columnName?: string;
    handleChangeFilterData: (type: string, data: string) => void;
}
type Item = { value: string; label: string };

const CellSideFilter: FC<ICellSideFilterType> = ({ handleChangeFilterData, field = 'side', placeholder = 'سمت:', columnName = 'سمت' }) => {
    const [show, setShow] = useState(true);
    const handleChange = (value: string) => {
        handleChangeFilterData(field, value);
    };
    const handleToggle = () => {
        handleChangeFilterData(field, show ? 'All' : 'All');
        setShow(!show);
    };

    const { t } = useTranslation();

    const sideOption: Item[] = [
        { label: t('OrderSide.All'), value: 'All' },
        { label: t('OrderSide.Buy'), value: 'Buy' },
        { label: t('OrderSide.Sell'), value: 'Sell' },
    ];
    const people = [
        { name: 'Wade Cooper' },
        { name: 'Arlene Mccoy' },
        { name: 'Devon Webb' },
        { name: 'Tom Cook' },
        { name: 'Tanya Fox' },
        { name: 'Hellen Schmidt' },
    ];
    const [selected, setSelected] = useState(people[0]);
    return (
        <div>
            {show ? (
                // <div className="w-full flex gap-1 items-center justify-center ">
                //     <GroupAnimationButton items={sideOption} width={44} onSelect={(value) => handleChange(value)} />
                //     <PlusIcon width={18} height={18} className="rotate-45" onClick={() => handleToggle()} />
                // </div>
                <div>
                    <select>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                        <option>yoyo54365</option>
                    </select>
                </div>
            ) : (
                <div className="w-full flex items-center justify-center gap-1" onClick={() => handleToggle()}>
                    <SearchIcon width={14} height={14} />
                    {columnName}
                </div>
            )}
        </div>
    );
};

export default memo(CellSideFilter);
