import { FC, memo } from 'react';
import Combo from '../../ComboSelect';
import NotFoundResult from '../SearchNotFound';
import SymbolState from '../../SymbolState';
import MinLen from 'src/common/components/SearchResult/MinLen';
import SearchLoading from 'src/common/components/SearchResult/SearchLoading';
interface ISymbolResultType {
    isLoading: boolean;
    min: boolean;
    qData: SymbolSearchResult[];
}
const SymbolResult: FC<ISymbolResultType> = ({ isLoading, qData, min }) => {
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
                          className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none   text-L-gray-500 dark:text-D-gray-500 bg-L-basic dark:bg-D-basic border-L-gray-300 dark:border-D-gray-300 py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                          label={item.symbolTitle}
                          value={item}
                      >
                          <div className="flex justify-between w-full items-center px-2 text-1.3">
                              <div className="flex items-center">
                                  <span className="ml-2">
                                      <SymbolState symbolState={item?.symbolState || ''} />
                                  </span>
                                  <div>
                                      <span className={`block truncate font-normal`}>{item.symbolTitle}</span>
                                      <small className={`block truncate font-normal`}>{item.companyName}</small>
                                  </div>
                              </div>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default memo(SymbolResult);
