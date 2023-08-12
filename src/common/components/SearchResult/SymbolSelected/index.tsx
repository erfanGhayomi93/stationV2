import { FC, Fragment } from 'react';
import Combo from '../../ComboSelect';

interface ISymbolSelectedType {
    selected: SymbolSearchResult[];
}

const SymbolSelected: FC<ISymbolSelectedType> = ({ selected }) => {
    return (
        <>
            {selected?.map((item, inx) => (
                <Fragment key={inx}>
                    <Combo.DataSet
                        key={inx}
                        className="even:bg-L-gray-100 even:dark:bg-D-gray-100 border-b last:border-none bg-L-basic dark:bg-D-basic   dark:  py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                        label={item.symbolTitle}
                        value={item}
                    >
                        <div className="flex justify-between w-full text-1">
                            {item.symbolTitle}
                            <span>{item.companyISIN}</span>
                        </div>
                    </Combo.DataSet>
                </Fragment>
            ))}
        </>
    );
};

export default SymbolSelected;
