import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GroupAnimationButton from 'src/common/components/GroupButton';
import { PlusIcon, SearchIcon } from 'src/common/icons';

interface ICellSideFilterType {
    field?: string;
    placeholder?: string;
    columnName?: string;
    handleChangeFilterData: (type: string, data: string) => void;
}
type Item = { value: string; label: string };

const CellSideFilter: FC<ICellSideFilterType> = ({ handleChangeFilterData, field = 'side', placeholder = 'سمت:', columnName = 'سمت' }) => {
    const [show, setShow] = useState(false);
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
    return (
        <div>
            {show ? (
                <div className="w-full flex gap-1 items-center justify-center ">
                    <GroupAnimationButton items={sideOption} width={44} onSelect={(value) => handleChange(value)} />
                    <PlusIcon width={18} height={18} className="rotate-45" onClick={() => handleToggle()} />
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
