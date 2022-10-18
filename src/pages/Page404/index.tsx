import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { useCustomerListInfinit } from 'src/app/queries/customer';
import Combo from 'src/common/components/ComboSelect';
import { ComboSelectContext } from 'src/common/components/ComboSelect/context';
import PasswordInput from 'src/common/components/PasswordInput';
import { useRef } from 'react';

const Page404 = () => {
    //
    // return <div>Page404</div>;
    const [term, setTerm] = useState('');
    const [panel, setPanel] = useState(false);
    const [selected, setSelected] = useState([]);

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useCustomerListInfinit({ term, pageNumber: 1, pageSize: 10, type: 'Customer' }, { onSuccess: () => setPanel(true) });

    const Options = ({ active }: { active?: boolean }) => {
        return (
            <div
                className={clsx('bg-white max-h-[200px] overflow-y-auto absolute w-full z-10 top-0 duration-200 origin-top', !active && 'scale-y-0')}
            >
                {(isLoading || isFetching) && '...Loading'}
                {qData?.pages
                    .flatMap((item) => item.searchResult.result)
                    .map((item, inx) => (
                        <Combo.DataSet
                            key={inx}
                            className="even:bg-slate-100 py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                            label={item.customerTitle}
                            value={item}
                        >
                            <div className="flex justify-between w-full">
                                {item.customerTitle}
                                <span>{item.bourseCode}</span>
                            </div>
                        </Combo.DataSet>
                    ))}
            </div>
        );
    };

    return (
        <div>
            not found
            <div hidden className="flex flex-col gap-2">
                <PasswordInput />

                <Combo.Provider
                    value={term}
                    withDebounce={1000}
                    placeholder="placeholder"
                    onInputChange={(value) => setTerm(value)}
                    onSelectionChange={(selected) => setSelected(selected)}
                    multiple={true}
                    selections={selected}
                    keyId={'customerISIN'}
                    showPanel={panel}
                >
                    <div>
                        <InputSearch />
                        <Combo.Panel className="relative" onBlur={() => setPanel(false)}>
                            <Options />
                        </Combo.Panel>
                    </div>
                </Combo.Provider>

                <PasswordInput />

                <button onClick={() => setTerm('مجید')}>majid</button>
                <button
                    onClick={() =>
                        setSelected([
                            {
                                balance: 0,
                                bourseCode: '123453',
                                customerISIN: '18990595541968',
                                customerTitle: 'محمد علی بینایی',
                                groupId: null,
                                groupName: null,
                                nationalCode: '0595541968',
                            },
                        ] as any)
                    }
                >
                    select mamad
                </button>
            </div>
        </div>
    );
};

export default Page404;

const InputSearch = () => {
    const {
        setPanel,
        setValue,
        state: { selections, value },
    } = useContext(ComboSelectContext);

    const searchRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
        setValue('');
        searchRef.current?.focus();
    };

    return (
        <div className="bg-white border rounded-md flex items-center gap-1 px-2 ">
            <div>prefix</div>
            <Combo.SearchBox
                ref={searchRef}
                className="py-2 w-full"
                onKeyDown={(e) => setPanel(e.key !== 'Escape' ? true : false)}
                // onDoubleClick={(e) => setPanel(true)}
            />
            <div onClick={() => handleClear()} hidden={!value?.length}>
                clear
            </div>

            <div>{selections?.map((item) => item.customerTitle)}</div>
        </div>
    );
};
