import { FC } from 'react';
import Modal from 'src/common/components/Modal';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

type ICustomerDetailType = {};

const CustomerDetail = ({}: ICustomerDetailType) => {
    const { setState, state } = useCustomerSearchState();

    const closeModal = () => {
        setState((prev) => ({ ...prev, detailModalData: undefined }));
    };
    return (
        <>
            <Modal isOpen={!!state.detailModalData} onClose={closeModal} className="min-h-[40rem] w-2/4 rounded-md ">
                <div className="flex flex-col">
                    <div className="w-full text-white font-semibold  bg-[#135CA4] h-10 flex items-center justify-between px-5">
                        <div>{state.detailModalData?.customerTitle}</div>
                        {/* <div>X</div> */}
                    </div>
                    <div className="py-5">
                        <div className="border-b border-[#C6D8E7] flex px-5">
                            <div className="border-b-2 border-[#135CA4]">اطلاعات مشتری</div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 px-5 py-7">
                            <Block
                                value={state.detailModalData?.customerTitle || state.detailModalData?.groupName}
                                label="نام و نام خانوادگی / شرکت"
                            />
                            {/* <Block value={state.detailModalData?.customerTitle} label="نام پدر" /> */}
                            <Block value={state.detailModalData?.balance} label="موجودی" />
                            <Block value={state.detailModalData?.bourseCode} label="کد بورسی" />
                            {/* <Block value={state.detailModalData?.customerTitle} label="بلوکه شده" /> */}
                            {/* <Block value={state.detailModalData?.customerTitle} label="اعتبار داده شده" /> */}
                            <Block value={state.detailModalData?.nationalCode || state.detailModalData?.groupId} label="کد ملی / شناسه ملی" />
                            {/* <Block value={state.detailModalData?.customerTitle} label="شماره ثبت" /> */}
                        </div>
                    </div>
                </div>
            </Modal>
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
        <div className="flex justify-between bg-[#F3F7FB] border border-[#C6D8E7] rounded-lg relative overflow-hidden ">
            <div className="w-full border-l border-l-[#C6D8E7] h-10 flex items-center justify-center">{label}</div>
            <div className="bg-white w-full h-10 flex items-center justify-center">{value}</div>
        </div>
    );
};
