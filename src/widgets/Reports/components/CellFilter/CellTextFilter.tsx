import { FC, memo, useState } from 'react';
import Input from 'src/common/components/Input';
import { PlusIcon, SearchIcon } from 'src/common/icons';

interface ICellTextFilterType {
    field: string;
    placeholder: string;
    columnName: string;
    handleChangeFilterData: (type: string, data: string) => void;
}

const CellTextFilter: FC<ICellTextFilterType> = ({ handleChangeFilterData, field, placeholder, columnName }) => {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const handleChange = (value: string) => {
        handleChangeFilterData(field, value);
        setValue(value);
    };
    const handleClear = () => {
        handleChangeFilterData(field, '');
        setShow(false);
        setValue('');
    };
    return (
        <div>
            {show ? (
                <div className="w-full flex gap-1 items-center justify-center ">
                    <Input
                        className="bg-L-basic dark:bg-D-basic w-full border rounded-lg outline-none px-1 py-0.5 font-normal focus:border-L-info-100 dark:focus:border-D-info-100"
                        containerClassName="bg-transparent w-full flex items-center justify-center "
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <PlusIcon width={18} height={18} className="rotate-45" onClick={() => handleClear()} />
                </div>
            ) : (
                <div className="w-full flex items-center justify-center gap-1" onClick={() => setShow(true)}>
                    <SearchIcon width={14} height={14} />
                    {columnName}
                </div>
            )}
        </div>
    );
};

export default memo(CellTextFilter);
