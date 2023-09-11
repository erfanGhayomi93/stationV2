import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const IdentityTab = ({ data }: { data: ICustomerInformationResultType | undefined }) => {
    //
    const { t } = useTranslation();

    return (
        <div className="grid gap-5 px-5 py-7">
            <div className="overflow-hidden">
                <DescriptionRow>
                    <Block value={data?.customerTitle || '-'} label={t('common.fullName')} />
                    <Block value={data?.fatherName || '-'} label={t('common.fatherName')} />
                </DescriptionRow>
                <DescriptionRow>
                    <Block value={data?.bourseCode || '-'} label={t('common.bourseCode')} />
                    <Block value={data?.nationalCode || '-'} label={t('common.nationalCode')} />
                </DescriptionRow>
                <DescriptionRow>
                    <Block value={data?.registrationNo || '-'} label={t('common.registerCode')} />
                    <Block value={data?.phoneNumber || '-'} label={t('common.phoneNumber')} />
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
        <div className="flex justify-between px-4 w-full first:border-l-2 first:border-L-gray-400 first:dark:border-D-gray-400">
            <div className="text-L-gray-600 dark:text-D-gray-600">{label}</div>
            <div className="text-L-gray-700 dark:text-D-gray-700">{value}</div>
        </div>
    );
};

interface IDescriptionRowType {
    children?: JSX.Element | JSX.Element[];
}

export const DescriptionRow: FC<IDescriptionRowType> = ({ children }) => {
    return <div className="grid grid-cols-2 py-2 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">{children}</div>;
};
