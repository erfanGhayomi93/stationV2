import { FC, useMemo } from 'react';
import { useCustomerInformation, useGroupInformation } from 'src/app/queries';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type IGroupDetailType = {};

const GroupDetail = ({}: IGroupDetailType) => {
    const { state } = useCustomerSearchState();
    const { data: groupInformation } = useGroupInformation({ groupId: state.detailModalData?.groupId });
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
            <div className="py-5 h-full grid grid-rows-min-one w-full">
                <div className="border-b border-[#C6D8E7] flex px-5">
                    <div className="border-b-2 border-[#135CA4]">اطلاعات مشتری</div>
                </div>
                <div className=" px-5 py-7 h-full w-full ">
                    <AGTable rowData={groupInformation?.customer || []} columnDefs={Columns} rowSelection={'multiple'} rowHeight={50} />
                </div>
            </div>
        </>
    );
};

export default GroupDetail;
interface IBlockType {
    value?: string | number;
    label: string;
}
const Block: FC<IBlockType> = ({ value, label }) => {
    return (
        <div className="flex justify-between bg-[#F3F7FB] border border-[#C6D8E7] rounded-lg relative overflow-hidden ">
            <div className="w-full border-l border-l-[#C6D8E7] h-10 flex items-center justify-center">{label}</div>
            <div className="bg-white w-full h-10 flex items-center justify-center">{value}</div>
        </div>
    );
};
