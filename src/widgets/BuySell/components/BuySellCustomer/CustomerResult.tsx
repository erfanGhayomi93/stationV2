import { FC } from 'react';
import Combo from 'src/common/components/ComboSelect';
import { SearchLoading, MinLen } from './index';
import { useTranslation } from 'react-i18next';

interface ICustomerResultType {
    isLoading: boolean;
    min: boolean;
    qData: IGoMultiCustomerType[];
}
const CustomerResult: FC<ICustomerResultType> = ({ isLoading, qData, min }) => {
    const NotFoundResult = <div className="py-5 flex items-center justify-center text-L-gray-450">نتیجه ای یافت نشد.</div>;
    if (min) {
        return <MinLen min={min} />;
    }
    if (isLoading) {
        return <SearchLoading {...{ isLoading }} />;
    }

    const { t } = useTranslation();
    return (
        <>
            {qData?.length
                ? qData.map((item, inx) => (
                      <Combo.DataSet
                          key={inx}
                          className="even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                          label={item.customerTitle}
                          value={item}
                      >
                          <div className="flex justify-between w-full items-center px-2 text-1.2">
                              <div className="flex flex-col gap-2">
                                  <div className="flex gap-3 items-center w-[180px]  justify-between">
                                      <span className="truncate">{item.customerTitle}</span>
                                  </div>
                                  <div className="flex gap-2">
                                      <span className="text-L-gray-450 dark:text-D-gray-450">{item.bourseCode}</span>
                                      <span className="text-L-primary-50">{t('CustomerType.' + item.customerType)}</span>
                                  </div>
                              </div>
                              <span className="text-1.2 text-gray-600">{item.nationalCode}</span>
                          </div>
                      </Combo.DataSet>
                  ))
                : NotFoundResult}
        </>
    );
};

export default CustomerResult;
