import { useCustomerInformation } from '@api/customer';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const PersonalInformation = () => {
     const { t } = useTranslation();

     const { data } = useCustomerInformation({ customerISIN: 18990069635676 });

     const PERSONAL_INFORMATION_ITEMS = useMemo(
          () => [
               { id: 'fatherName', name: t('customersManage.personalInformationFatherName'), value: data?.fatherName },
               { id: 'bourseCode', name: t('customersManage.personalInformationBourseCode'), value: data?.bourseCode },
               { id: 'nationalCode', name: t('customersManage.personalInformationNationalCode'), value: data?.nationalCode },
               { id: 'recordNumber', name: t('customersManage.personalInformationRecordNumber'), value: data?.registrationNo },
               { id: 'phoneNumber', name: t('customersManage.personalInformationPhoneNumber'), value: data?.phoneNumber },
               { id: 'mobileNumber', name: t('customersManage.personalInformationMobileNumber'), value: data?.phoneNumber },
               {
                    id: 'kind',
                    name: t('customersManage.personalInformationKind'),
                    value: t(`customersManage.customerKind${data?.customerType ?? 'Natural'}`),
               },
               { id: 'referral', name: t('customersManage.personalInformationReferral'), value: data?.stationName },
          ],
          [data]
     );

     return (
          <ul className="flex flex-1 flex-col overflow-auto px-20">
               {PERSONAL_INFORMATION_ITEMS.map(({ id, name, value }) => (
                    <li
                         key={id}
                         className="flex items-center justify-between border-b border-b-line-div-2 py-4 text-sm font-medium last:border-none"
                    >
                         <span className="text-content-selected">{name}</span>
                         <span className="text-content-title">{value ?? '-'}</span>
                    </li>
               ))}
          </ul>
     );
};

export default PersonalInformation;
