// import clsx from "clsx"
import { useModalStore } from "@store/modal";
// import { Trans } from "react-i18next";
import { useRef, useState } from "react";
import Modal from "..";
import RadioButton from "@uiKit/RadioButton";
import CustomersSearchBody from "./components/customerSearchBody";
import GroupSearchBody from "./components/groupSearchBody";
// import SearchInput from "@uiKit/Inputs/SearchInput";



const CustomersSearchModal = () => {

    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const [selectedValue, setSelectedValue] = useState<'nameGroup' | 'customerGroup'>('nameGroup'); // Default value

    // const [valueSearch, setValueSearch] = useState(["test"])


    const { setCustomersSearchModalSheet } = useModalStore();

    const onCloseModal = () => {
        setCustomersSearchModalSheet(null);
    };

    const options: { value: 'nameGroup' | 'customerGroup', label: string }[] = [
        { value: 'nameGroup', label: 'نام مشتری' },
        { value: 'customerGroup', label: 'گروه مشتری' },
    ];


    return (
        <Modal
            title={
                "جستجوی مشتری"
            }
            onCloseModal={onCloseModal}
            dependencies={[dropdownRef]}
        >
            <div>
                <div className="flex gap-x-6 items-center">
                    <span className="text-content-title">جستجوی بر اساس:</span>

                    <div className="flex gap-x-6 items-center">
                        {options.map((option) => (
                            <div key={option.value}>
                                <RadioButton
                                    checked={selectedValue === option.value}
                                    label={option.label}
                                    onChange={() => setSelectedValue(option.value)}
                                    classes={{ label: "text-content-title text-sm" }}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="mt-6">
                    {selectedValue === "nameGroup" && <CustomersSearchBody />}
                    {selectedValue === "customerGroup" && <GroupSearchBody />}
                </div>
            </div>
        </Modal>
    )
}

export default CustomersSearchModal