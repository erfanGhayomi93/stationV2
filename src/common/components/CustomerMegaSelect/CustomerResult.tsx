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
                          <div className="flex justify-between w-full items-center px-2">
                              <div className="flex flex-col gap-2">
                                  <div className="flex gap-3 items-center">
                                      <span>{item.customerTitle}</span>
                                      <span className="text-L-primary-50">{item.customerType}</span>
                                  </div>
                                  <span className="text-L-gray-600 dark:text-D-gray-600">{item.bourseCode}</span>
                              </div>
                              <span>{item.nationalCode}</span>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default CustomerResult;
