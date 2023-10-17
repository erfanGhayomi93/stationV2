import clsx from 'clsx';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useAdvancedSearchQuery } from 'src/app/queries/customer';
import Combo from '../ComboSelect';
import CustomerResult from './CustomerResult';
import InputSearch from './input';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers } from 'src/redux/slices/option';

interface ICustomerMegaSelectType {
    setSelected: (x: IGoCustomerSearchResult[]) => void;
    selected: IGoCustomerSearchResult[];
}

const CustomerMegaSelect: FC<ICustomerMegaSelectType> = ({ setSelected, selected }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);

    const selectedCustomers = useAppSelector(getSelectedCustomers)


    // useEffect(() => {
    //     selected.length === 0 && setTerm('');
    // }, [selected]);

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
  
    useEffect(() => {
        selected.length === 0 && setTerm('');
    }, [selected]);
    
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
                            'bg-L-basic dark:bg-D-basic max-h-[300px] rounded border border-L-gray-400 dark:border-D-gray-400 overflow-y-auto absolute w-full z-10 top-0  origin-top shadow-md ',
                            !active && 'scale-y-0',
                        )}
                    >
                        {content === 'SELECT' ? (
                            <>
                                {selectedCustomers?.map((item, inx) => (
                                    <Fragment key={inx}>
                                        <Combo.DataSet
                                            key={inx}
                                            className="even:bg-L-gray-100 dark:bg-D-basic dark:text-D-gray-700 even:dark:bg-D-gray-100 hover:bg-L-primary-100 dark:hover:bg-D-primary-100 py-2 flex items-center gap-2 cursor-pointer px-2"
                                            label={item.title}
                                            value={item}
                                        >
                                            <div className="flex gap-2 justify-between items-center w-full text-1">
                                                <div className="flex-1">{item.title}</div>
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
                selections={selectedCustomers}
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
