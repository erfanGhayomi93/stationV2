import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerInformation } from 'src/app/queries/customer';
import { seprateNumber } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type ICustomerDetailType = {};

const CustomerDetail = ({}: ICustomerDetailType) => {
    const { state } = useCustomerSearchState();
    const { data: customerInformation } = useCustomerInformation({ customerISIN: state.detailModalData?.customerISIN });
    const { t } = useTranslation();

    return (
        <>
            <div className="py-5 bg-L-basic dark:bg-D-basic">
                <div className="border-b border-L-gray-350 dark:border-D-gray-350 flex px-5">
                    <div className="border-b-2 border-L-primary-50 dark:border-D-primary-50  text-L-primary-50 pb-2 dark:text-D-primary-50">
                        اطلاعات مشتری
                    </div>
                </div>
                <div className="grid gap-5 px-5 py-7">
                    <div className="border-L-gray-350 dark:border-D-gray-350 border rounded-lg overflow-hidden">
                        <DescriptionRow>
                            <Block value={customerInformation?.customerTitle} label="نام و نام خانوادگی / شرکت" />
                            <Block value={customerInformation?.fatherName} label="نام پدر" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={seprateNumber(customerInformation?.remainT1)} label="موجودی" />
                            <Block value={customerInformation?.bourseCode} label="کد بورسی" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={seprateNumber(customerInformation?.blocked)} label="بلوکه شده" />
                            <Block value={seprateNumber(customerInformation?.stationCredit)} label="اعتبار داده شده" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={customerInformation?.nationalCode} label="کد ملی / شناسه ملی" />
                            <Block value={customerInformation?.customerISIN} label="شماره ثبت" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={t('CustomerType.' + customerInformation?.customerType)} label="نوع مشتری" />
                        </DescriptionRow>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerDetail;

interface IBlockType {
    value?: string | number;
    label: string;
}

const Block: FC<IBlockType> = ({ value, label }) => {
    return (
        <div className="flex justify-between w-full first:border-l-2 first:border-L-gray-350 first:dark:border-D-gray-350 first:pl-2">
            <div>{label}</div>
            <div>{value}</div>
        </div>
    );
};

interface IDescriptionRowType {
    children?: JSX.Element | JSX.Element[];
}

const DescriptionRow: FC<IDescriptionRowType> = ({ children }) => {
    return (
        <>
            <div className="odd:bg-L-gray-300 dark:odd:bg-D-gray-300 dark:text-L-basic text-D-basic py-2 px-2 border-b border-L-gray-350 dark:border-D-gray-350 last:border-none">
                <div className="grid grid-cols-2 gap-2 ">{children}</div>
            </div>
        </>
    );
};
