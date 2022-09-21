import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
type ISearchInputType = {
    state: string;
    setState: (val: string) => void;
};

const SearchInput = ({ state, setState }: ISearchInputType) => {
    return (
        <div className="border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
            <Input placeholder="جستجو پیام ها" addonBefore={<Search className="text-gray-400" />} value={state} onChange={(e) => setState(e.target.value)} />
        </div>
    );
};

export default SearchInput;
