import clsx from 'clsx';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useAdvancedSearchQuery } from 'src/app/queries/customer';
import Combo from '../ComboSelect';
import CustomerResult from './CustomerResult';
import InputSearch from './input';

interface ICustomerMegaSelectType {
    setSelected: (x: IGoCustomerSearchResult[]) => void;
    selected: IGoCustomerSearchResult[];
}

const CustomerMegaSelect: FC<ICustomerMegaSelectType> = ({ setSelected, selected }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);

    useEffect(() => {
        selected.length === 0 && setTerm('');
    }, [selected]);

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useAdvancedSearchQuery(
        { term },
        {
            onSuccess: () => {
                setPanel(true);
                setMin(false);
            },
        },
    );

    
    const handleSelect = (selected: IGoCustomerSearchResult[]) => {
        setSelected(selected);
    };
    interface IOptionsType {
        active?: boolean;
        content?: string;
    }
    const Options = ({ active, content }: IOptionsType) =>
        useMemo(() => {
            return (
                <>
                    <div
                        className={clsx(
                            'bg-white max-h-[300px] overflow-y-auto absolute w-full z-10 top-0  origin-top shadow-md ',
                            !active && 'scale-y-0',
                        )}
                    >
                        {content === 'SELECT' ? (
                            <>
                                {selected?.map((item, inx) => (
                                    <Fragment key={inx}>
                                        <Combo.DataSet
                                            key={inx}
                                            className="even:bg-L-gray-300 even:dark:bg-D-gray-300 border-b last:border-none   py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                                            label={item.customerTitle}
                                            value={item}
                                        >
                                            <div className="flex gap-2 justify-between items-center w-full text-1">
                                                <div className="flex-1">{item.customerTitle}</div>
                                                <div className="min-w-min">{item.bourseCode}</div>
                                            </div>
                                        </Combo.DataSet>
                                    </Fragment>
                                ))}
                            </>
                        ) : (
                            <CustomerResult min={min} qData={qData || []} isLoading={isLoading} />
                        )}
                    </div>
                </>
            );
        }, [active, content, min]);

    return (
        <div>
            <Combo.Provider
                value={term}
                withDebounce={1000}
                placeholder="جستجوی مشتری"
                onInputChange={(value) => setTerm(value)}
                onSelectionChange={(selected) => handleSelect(selected)}
                onPanelVisibiltyChange={(value) => setPanel(value)}
                onMinimumEntered={setMin}
                multiple={true}
                selections={selected}
                keyId={'customerISIN'}
                showPanel={panel}
                min={3}
            >
                <div>
                    <InputSearch loading={isFetching} />
                    <Combo.Panel className="relative" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                        <Options />
                    </Combo.Panel>
                </div>
            </Combo.Provider>
        </div>
    );
};

export default CustomerMegaSelect;
