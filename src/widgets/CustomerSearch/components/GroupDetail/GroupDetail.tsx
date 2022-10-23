import { useMemo } from 'react';
import { useGroupInformation } from 'src/app/queries/group';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type IGroupDetailType = {};

const GroupDetail = ({}: IGroupDetailType) => {
    const { state } = useCustomerSearchState();
    const { data: groupInformation } = useGroupInformation({ groupId: state.detailModalData?.customerISIN });
    // FIXME:group and group tag is diffrent
    const Columns = useMemo<ColDefType<ICustomerInformationResultType>[]>(
        () => [
            { field: 'customerTitle', headerName: 'نام و نام خانوادگی' },
            { field: 'nationalCode', headerName: 'کد ملی' },
            { field: 'bourseCode', headerName: 'کد بورسی' },
            { field: 'remainT1', headerName: 'دارایی', type: 'sepratedNumber' },
        ],
        [],
    );
    return (
        <>
            <div className="py-5 h-full grid grid-rows-min-one w-full bg-L-basic dark:bg-D-basic">
                <div className="border-b  border-L-gray-350 dark:border-D-gray-350 flex px-5">
                    <div className="border-b-2  border-L-primary-50 dark:border-D-primary-50  text-L-primary-50 pb-2 dark:text-D-primary-50 ">
                        اطلاعات مشتری
                    </div>
                </div>
                <div className=" px-5 py-7 h-full w-full ">
                    <AGTable rowData={groupInformation?.customer || []} columnDefs={Columns} rowSelection={'multiple'} rowHeight={50} />
                </div>
            </div>
        </>
    );
};

export default GroupDetail;
