// import clsx from "clsx"
import { useModalStore } from "@store/modal";
// import { Trans } from "react-i18next";
import { useRef, useState } from "react";
import Modal from "..";
import RadioButton from "@uiKit/RadioButton";
import CustomersSearchBody from "./components/customerSearchBody";
// import SearchInput from "@uiKit/Inputs/SearchInput";



const CustomersSearchModal = () => {

    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const [selectedValue, setSelectedValue] = useState<string>('name'); // Default value

    const [valueSearch, setValueSearch] = useState(["test"])


    const { setCustomersSearchModalSheet } = useModalStore();

    const onCloseModal = () => {
        setCustomersSearchModalSheet(null);
    };

    const options = [
        { value: 'name', label: 'نام و نام خانوادگی' },
        { value: 'bourseCode', label: 'کد بورسی' },
        { value: 'customerCode', label: 'کد مشتری' },
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
                    <span>جستجوی بر اساس:</span>

                    <div className="flex gap-x-6 items-center">
                        {options.map((option) => (
                            <div key={option.value}>
                                <RadioButton
                                    checked={selectedValue === option.value}
                                    label={option.label}
                                    onChange={() => setSelectedValue(option.value)}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="mt-6">
                    <CustomersSearchBody />
                </div>
            </div>
        </Modal>
    )
}

export default CustomersSearchModal