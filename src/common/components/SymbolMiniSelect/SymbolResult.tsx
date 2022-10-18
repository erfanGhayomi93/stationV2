import { FC, memo } from 'react';
import Combo from '../ComboSelect';
import SymbolState from '../SymbolState';
import { SearchLoading, MinLen } from './index';
interface ISymbolResultType {
    isLoading: boolean;
    min: boolean;
    qData: SymbolSearchResult[];
}
const SymbolResult: FC<ISymbolResultType> = ({ isLoading, qData, min }) => {
    const NotFoundResult = <div className="py-5 flex items-center justify-center text-L-gray-450">نتیجه ای یافت نشد.</div>;
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
                          className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
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
