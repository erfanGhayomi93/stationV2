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
                        className="even:bg-L-gray-100 even:dark:bg-D-gray-100 text-D-basic dark:text-L-basic bg-L-basic dark:bg-D-basic hover:bg-L-primary-100 dark:hover:bg-D-primary-100 py-2 flex items-center gap-2 cursor-pointer px-2"
                        label={item.symbolTitle}
                        value={item}
                        type="symbols"
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
