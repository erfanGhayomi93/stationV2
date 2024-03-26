import React, { useMemo, useState } from 'react';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import DescriptionModal from './DescriptionModal';
import { useQuery } from '@tanstack/react-query';
import { useCustomerSearchState } from 'src/widgets/CustomerSearch/context/CustomerSearchContext';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { t } from 'i18next';

const Agreements = () => {
    const [descriptionModalInfo, setDescriptionModalInfo] = useState({ data: {}, isOpen: false });

    const { state } = useCustomerSearchState();

    const { data: agreements } = useQuery(['GetAgreements', state.detailModalData?.customerISIN], ({ queryKey }) =>
        getAggrements(queryKey[1] as string),
    );

    const colDefs = useMemo(
        (): ColDefType<any>[] => [
            {
                headerName: 'عنوان توافق‌نامه',
                field: 'title',
                onCellClicked: ({ data }) => setDescriptionModalInfo({ data, isOpen: true }),
                cellClass: 'cursor-pointer text-L-info-100 flex',
            },
            {
                headerName: 'وضعیت',
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('AgreementState.' + value) : value),
                cellClass: ({ value }) => (value === 'Accepted' ? 'text-L-success-200' : 'text-L-warning'),
            },
            { headerName: 'تاریخ رد/تایید', field: 'changeDate', type: 'date' },
        ],
        [],
    );

    return (
        <div className="h-full">
            <AGTable columnDefs={colDefs} rowData={agreements} />
            {descriptionModalInfo.isOpen && (
                <DescriptionModal
                    data={descriptionModalInfo?.data}
                    isOpen={descriptionModalInfo.isOpen}
                    handleClose={() => setDescriptionModalInfo({ data: {}, isOpen: false })}
                />
            )}
        </div>
    );
};

const getAggrements = async (customerISIN: string) => {
    const { data } = await AXIOS.get(Apis().Aggrements.Get, { params: { customerISIN } });
    return data?.result || [];
};

export default Agreements;
