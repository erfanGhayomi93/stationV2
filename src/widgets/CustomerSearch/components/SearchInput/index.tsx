import Input from 'src/common/components/Input';
import { Search } from 'src/common/icons';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
type ISearchInputType = {};

const SearchInput = ({}: ISearchInputType) => {
    const { setState, state } = useCustomerSearchState();
    const setParams = (input: string) => {
        setState((prev) => ({ ...prev, params: { ...prev.params, term: input }, isSelectedActive: false }));
    };
    return (
        <div className="border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md  ">
            <Input
                containerClassName="flex items-center w-full px-2 text-1.2 rounded-sm duration-250 dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50"
                placeholder="جستجوی مشتری / گروه مشتری"
                addonBefore={<Search className="text-gray-400 " />}
                onChange={(e) => setParams(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;