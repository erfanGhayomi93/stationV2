import Input from 'src/common/components/Input';
import { CloseIcon, PlusIcon, Search, SpinnerIcon } from 'src/common/icons';
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
        <div className='w-[22.5rem]'>
            <Input
                placeholder={placeholder}
                // className='text-L-gray-700 dark:text-D-gray-700'
                addonBefore={<Search className="text-gray-400" />}
                onChange={(e) => setParams(e.target.value)}
                value={state.params.term ?? ''}
                addonAfter={<div
                    onClick={() => setParams("")}
                    hidden={!state.params.term?.length}
                    className=" scale-[0.6] rounded-full bg-L-gray-400 dark:bg-D-gray-400 cursor-pointer"
                >
                    <PlusIcon className="rotate-45 text-white" />
                </div>}
            />
        </div>
    );
};

export default SearchInput;
