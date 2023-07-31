import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerInformation } from 'src/app/queries/customer';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { seprateNumber } from 'src/utils/helpers';

const IdentityTab = () => {
    //
    const { state } = useCustomerSearchState();
    const { data: customerInformation } = useCustomerInformation({ customerISIN: state.detailModalData?.customerISIN });
    const { t } = useTranslation();

    return (
        <div className="grid gap-5 px-5 py-7">
            <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
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
                    <Block value={customerInformation?.nationalCode} label="کد ملی" />
                    <Block value={customerInformation?.customerISIN} label="شماره ثبت" />
                </DescriptionRow>
                <DescriptionRow>
                    <Block value={t('CustomerType.' + customerInformation?.customerType)} label="نوع مشتری" />
                </DescriptionRow>
            </div>
        </div>
    );
};

export default IdentityTab;

interface IBlockType {
    value?: string | number;
    label: string;
}

export const Block: FC<IBlockType> = ({ value, label }) => {
    return (
        <div className="flex justify-between w-full first:border-l-2 first:border-L-gray-400 first:dark:border-D-gray-400 first:pl-2">
            <div>{label}</div>
            <div>{value}</div>
        </div>
    );
};

interface IDescriptionRowType {
    children?: JSX.Element | JSX.Element[];
}

export const DescriptionRow: FC<IDescriptionRowType> = ({ children }) => {
    return (
        <>
            <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-2 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                <div className="grid grid-cols-2 gap-2 ">{children}</div>
            </div>
        </>
    );
};
