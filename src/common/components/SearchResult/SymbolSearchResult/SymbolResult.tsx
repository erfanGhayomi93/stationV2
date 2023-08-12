import { FC, memo } from 'react';
import MinLen from 'src/common/components/SearchResult/MinLen';
import SearchLoading from 'src/common/components/SearchResult/SearchLoading';
import Combo from '../../ComboSelect';
import SymbolState from '../../SymbolState';
import NotFoundResult from '../SearchNotFound';
import { AddRemoveToWatchlist } from '../../AddRemoveToWatchlist';

interface ISymbolResultType {
    isLoading: boolean;
    min: boolean;
    qData: SymbolSearchResult[];
    isOnModal?: boolean
    watchlistId : number
}
const SymbolResult: FC<ISymbolResultType> = ({ isLoading, qData, min, isOnModal, watchlistId }) => {
    if (min) {
        return <MinLen min={min} />;
    }
    if (isLoading) {
        return <SearchLoading {...{ isLoading }} />;
    }



    return (
        <>
            {qData?.length
                ? qData.map((item, inx) => (
                    <Combo.DataSet
                        key={inx}
                        className="even:bg-L-gray-100 even:dark:bg-D-gray-100 border-b last:border-none bg-L-basic dark:bg-D-basic py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                        label={item.symbolTitle}
                        value={item}
                    >
                        <div className="flex justify-between w-full items-center px-2 text-1.3">
                            <div className="flex items-center">
                                <span className="ml-2">
                                    <SymbolState symbolState={item?.symbolState || ''} />
                                </span>
                                <div className='text-right'>
                                    <span className={`block truncate font-normal text-L-gray-700 dark:text-D-gray-700`}>{item.symbolTitle}</span>
                                    <small className={`block truncate font-normal text-L-gray-500 dark:text-D-gray-700`}>{item.companyName}</small>
                                </div>
                            </div>
                            {
                                isOnModal && <AddRemoveToWatchlist symbolISIN={item.symbolISIN} watchlistId={watchlistId}/>
                            }
                        </div>
                    </Combo.DataSet>
                ))
                : NotFoundResult}
        </>
    );
};

export default memo(SymbolResult);
