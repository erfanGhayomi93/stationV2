import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerInformation } from 'src/app/queries/customer';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { seprateNumber } from 'src/utils/helpers';
import WidgetLoading from 'src/common/components/WidgetLoading';

const IdentityTab = () => {
    //
    const { state } = useCustomerSearchState();
    const { data: customerInformation, isFetching } = useCustomerInformation({ customerISIN: state.detailModalData?.customerISIN });
    const { t } = useTranslation();

    return (
        <WidgetLoading spining={isFetching}>
            <div className="grid gap-5 px-5 py-7">
                <div className="overflow-hidden">
                    <DescriptionRow>
                        <Block value={customerInformation?.customerTitle} label={t("common.fullName")} />
                        <Block value={customerInformation?.fatherName} label={t("common.fatherName")} />
                    </DescriptionRow>
                    <DescriptionRow>
                        <Block value={customerInformation?.bourseCode} label={t("common.bourseCode")} />
                        <Block value={customerInformation?.nationalCode} label={t("common.nationalCode")} />
                    </DescriptionRow>
                    <DescriptionRow>
                        <Block value={customerInformation?.customerISIN} label={t("common.registerCode")} />
                        <Block value={'-'} label={t("common.phoneNumber")} />
                    </DescriptionRow>
                </div>
            </div>
        </WidgetLoading>
    );
};

export default IdentityTab;

interface IBlockType {
    value?: string | number;
    label: string;
}

export const Block: FC<IBlockType> = ({ value, label }) => {
    return (
        <div className="flex justify-between px-4 w-full first:border-l-2 first:border-L-gray-400 first:dark:border-D-gray-400">
            <div className='text-L-gray-600 dark:text-D-gray-600'>{label}</div>
            <div className='text-L-gray-700 dark:text-D-gray-700'>{value}</div>
        </div>
    );
};

interface IDescriptionRowType {
    children?: JSX.Element | JSX.Element[];
}

export const DescriptionRow: FC<IDescriptionRowType> = ({ children }) => {
    return <div className="grid grid-cols-2 py-2 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">{children}</div>;
};
