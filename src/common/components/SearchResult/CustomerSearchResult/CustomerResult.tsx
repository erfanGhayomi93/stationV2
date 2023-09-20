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
                          className="even:bg-L-gray-100 even:dark:bg-D-gray-100  bg-L-basic dark:bg-D-basic   dark:  py-2 flex items-center gap-2 hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer px-2"
                          label={item.title}
                          value={item}
                      >
                          <div className="justify-between w-full overflow-hidden flex flex-col gap-2 px-1">
                              <div className="text-1 truncate text-D-basic dark:text-L-basic">{item.title}</div>
                              <div className="flex justify-between">
                                  <span className="text-L-gray-600 text-1 dark:text-D-gray-600">{item.bourseCode}</span>
                                  <span className="text-L-primary-50 dark:text-D-primary-50 text-1">{t('CustomerType.' + item.customerType)}</span>
                                  <span className="text-1 text-D-basic dark:text-L-basic">{item.nationalCode}</span>
                              </div>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default memo(CustomerResult);
