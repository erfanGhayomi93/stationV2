import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
type ISearchInputType = {
    placeholder: string;
};

const SearchInput = ({ placeholder }: ISearchInputType) => {
    const { setState, state } = useCustomerSearchState();
    const setParams = (input: string) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, term: input }, isSelectedActive: false }));
    };
    return (
        <div>
            <Input
                placeholder={placeholder}
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams(e.target.value)}
                value={state.params.term ?? ''}
            />
        </div>
    );
};

export default SearchInput;
