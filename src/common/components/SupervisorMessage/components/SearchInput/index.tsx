import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
type ISearchInputType = {
    state: string;
    setState: (val: string) => void;
};

const SearchInput = ({ state, setState }: ISearchInputType) => {
    return (
        <div className="border-L-gray-400 dark:border-D-gray-400 border overflow-hidden rounded-md">
            <Input
                placeholder="جستجو پیام ها"
                addonBefore={<Search className="text-L-gray-500 dark:text-D-gray-500 mr-2" />}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
