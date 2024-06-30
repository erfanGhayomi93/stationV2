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
    searchHistory: SymbolSearchResult[];
    isOnModal?: boolean;
    watchlistId: number;
}
const SymbolResult: FC<ISymbolResultType> = ({ isLoading, qData, min, isOnModal, watchlistId, searchHistory }) => {
    //
    const createOptions = (symbols: any[]) => {
        if (!symbols.length) return [];

        return symbols.length
            ? symbols.map((item: any, inx: any) => (
                  <Combo.DataSet
                      key={inx}
                      className="even:bg-L-gray-100 even:dark:bg-D-gray-100 bg-L-basic dark:bg-D-basic py-2 flex items-center gap-2 hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer px-2"
                      label={item.symbolTitle}
                      value={item}
                      type="symbols"
                  >
                      <div className="flex justify-between w-full items-center pr-2 text-xs">
                          <div className="flex items-center">
                              <span className="ml-2">
                                  <SymbolState symbolState={item?.symbolState || ''} />
                              </span>
                              <div className="text-right">
                                  <span className={`block truncate font-normal text-L-gray-700 dark:text-D-gray-700`}>{item.symbolTitle}</span>
                                  <small className={`block truncate font-normal text-L-gray-500 dark:text-D-gray-700`}>{item.companyName}</small>
                              </div>
                          </div>
                          {isOnModal && <AddRemoveToWatchlist symbolISIN={item.symbolISIN} watchlistId={watchlistId} />}
                      </div>
                  </Combo.DataSet>
              ))
            : NotFoundResult;
    };
// 
    if (min && searchHistory) {
        return <>{createOptions(searchHistory)}</>;
    }
    if (isLoading) {
        return <SearchLoading {...{ isLoading }} />;
    }

    return <>{createOptions(qData)}</>;
};

export default memo(SymbolResult);
