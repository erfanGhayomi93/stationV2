import { FC } from 'react';
import { useCustomerInformation } from 'src/app/queries';
import { sepNumbers } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type ICustomerDetailType = {};

const CustomerDetail = ({}: ICustomerDetailType) => {
    const { state } = useCustomerSearchState();
    const { data: customerInformation } = useCustomerInformation({ customerISIN: state.detailModalData?.customerISIN });

    return (
        <>
            <div className="py-5">
                <div className="border-b border-[#C6D8E7] flex px-5">
                    <div className="border-b-2 border-[#135CA4]">اطلاعات مشتری</div>
                </div>
                <div className="grid gap-5 px-5 py-7">
                    <div className="border-[#DFEBF5] border rounded-lg overflow-hidden">
                        <DescriptionRow>
                            <Block value={customerInformation?.customerTitle} label="نام و نام خانوادگی / شرکت" />
                            <Block value={customerInformation?.fatherName} label="نام پدر" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={sepNumbers(customerInformation?.remainT1)} label="موجودی" />
                            <Block value={customerInformation?.bourseCode} label="کد بورسی" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={sepNumbers(customerInformation?.blocked)} label="بلوکه شده" />
                            <Block value={sepNumbers(customerInformation?.stationCredit)} label="اعتبار داده شده" />
                        </DescriptionRow>
                        <DescriptionRow>
                            <Block value={customerInformation?.nationalCode} label="کد ملی / شناسه ملی" />
                            <Block value={customerInformation?.customerISIN} label="شماره ثبت" />
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
        <div className="flex justify-between w-full first:border-l-2 first:border-slate-300 first:pl-2">
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
            <div className="odd:bg-[#F3F7FB] py-2 px-2 border-b border-[#DFEBF5] last:border-none">
                <div className="grid grid-cols-2 gap-2 ">{children}</div>
            </div>
        </>
    );
};
