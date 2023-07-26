import clsx from 'clsx';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useMultiCustomerListQuery } from 'src/app/queries/customer';
import Combo from '../ComboSelect';
import CustomerResult from './CustomerResult';
import InputSearch from './input';

interface ICustomerMegaSelectType {
    onChange?: (x: IGoCustomerSearchResult[]) => void;
}

const CustomerMegaSelect: FC<ICustomerMegaSelectType> = ({ onChange }) => {
    const [term, setTerm] = useState('');
    const [min, setMin] = useState(false);
    const [panel, setPanel] = useState(false);
    const [selected, setSelected] = useState<IGoCustomerSearchResult[]>([]);

    useEffect(() => {
        onChange && onChange(selected);
    }, [selected]);

    const {
        data: qData,
        isLoading,
        isFetching,
    } = useMultiCustomerListQuery<IGoMultiCustomerType[]>(
        { term },
        {
            onSuccess: () => {
                setPanel(true);
                setMin(false);
            },
        },
    );
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
                                            <div className="flex justify-between w-full">
                                                {item.customerTitle}
                                                <span>{item.bourseCode}</span>
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
                onSelectionChange={(selected) => setSelected(selected)}
                onPanelVisibiltyChange={(value) => setPanel(value)}
                onMinimumEntered={setMin}
                multiple={true}
                selections={selected}
                keyId={'customerISIN'}
                showPanel={panel}
                min={3}
            >
                <div>
                    <InputSearch loading={isLoading || isFetching} />
                    <Combo.Panel className="relative" onBlur={() => setPanel(false)} renderDepend={[min, isLoading, qData]}>
                        <Options />
                    </Combo.Panel>
                </div>
            </Combo.Provider>
        </div>
    );
};

export default CustomerMegaSelect;
