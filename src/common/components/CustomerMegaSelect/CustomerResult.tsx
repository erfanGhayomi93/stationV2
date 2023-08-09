import { FC } from 'react';
import Combo from '../ComboSelect';
import NotFoundResult from '../SearchResult/SearchNotFound';

import MinLen from 'src/common/components/SearchResult/MinLen';
import SearchLoading from 'src/common/components/SearchResult/SearchLoading';
interface ICustomerResultType {
    isLoading: boolean;
    min: boolean;
    qData: IGoMultiCustomerType[];
}
const CustomerResult: FC<ICustomerResultType> = ({ isLoading, qData, min }) => {
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
                          className="even:bg-L-gray-300 even:dark:bg-D-gray-300 border-b last:border-none   py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                          label={item.customerTitle}
                          value={item}
                      >
                          <div className="justify-between w-full overflow-hidden flex flex-col gap-2 px-1">
                              <div className="text-1 truncate">{item.customerTitle}</div>
                              <div className="flex justify-between">
                                  <span className="text-L-gray-600 text-1 dark:text-D-gray-600">{item.bourseCode}</span>
                                  <span className="text-L-primary-50 text-1">{item.customerType}</span>
                                  <span className="text-1">{item.nationalCode}</span>
                              </div>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default CustomerResult;
