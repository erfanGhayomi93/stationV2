import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import MinLen from 'src/common/components/SearchResult/MinLen';
import SearchLoading from 'src/common/components/SearchResult/SearchLoading';
import Combo from '../../ComboSelect';
import NotFoundResult from '../SearchNotFound';
interface ICustomerResultType {
    isLoading: boolean;
    min: boolean;
    qData: IGoMultiCustomerType[];
}
const CustomerResult: FC<ICustomerResultType> = ({ isLoading, qData, min }) => {
    const { t } = useTranslation();

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
                          className="even:bg-L-gray-100 even:dark:bg-D-gray-100 border-b last:border-none bg-L-basic dark:bg-D-basic   dark:  py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                          label={item.customerTitle}
                          value={item}
                      >
                          <div className="flex justify-between w-full items-center px-2 text-1.2">
                              <div className="flex flex-col gap-2">
                                  <div className="flex gap-3 items-center w-[180px]  justify-between">
                                      <span className="truncate text-L-gray-500 dark:text-D-gray-700">{item.customerTitle}</span>
                                  </div>
                                  <div className="flex gap-4 text-1.2">
                                      <span className="text-L-gray-600 dark:text-D-gray-600">{item.bourseCode}</span>
                                      <span className="text-L-primary-50 dark:text-D-primary-50">{t('CustomerType.' + item.customerType)}</span>
                                  </div>
                              </div>
                              <span className="text-1.2 text-L-gray-600 dark:text-D-gray-600">{item.nationalCode || '-'}</span>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default memo(CustomerResult);
