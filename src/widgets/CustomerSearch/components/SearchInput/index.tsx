import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
type ISearchInputType = {
    placeholder: string
};

const SearchInput = ({ placeholder }: ISearchInputType) => {
    const { setState, state } = useCustomerSearchState();
    const setParams = (input: string) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, term: input }, isSelectedActive: false }));
    };
    return (
        <div className="border-L-gray-400 dark:border-D-gray-400 border overflow-hidden rounded-md">
            <Input
                containerClassName="flex items-center w-[21.5rem] px-2 text-1.2 rounded-sm duration-250 dark:focus-within:border-D-info-100 focus-within:border-L-info-100"
                placeholder={placeholder}
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams(e.target.value)}
                value={state.params.term ?? ""}
            />
        </div>
    );
};

export default SearchInput;
