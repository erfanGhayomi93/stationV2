// import clsx from "clsx"
import { useModalStore } from "@store/modal";
// import { Trans } from "react-i18next";
import { useRef, useState } from "react";
import Modal from "..";



const CustomersSearchModal = () => {

    const dropdownRef = useRef<HTMLUListElement | null>(null);

    const [checked, setChecked] = useState(false)


    const { customersSearchModalSheet, setCustomersSearchModalSheet } = useModalStore();

    const onCloseModal = () => {
        setCustomersSearchModalSheet(null);
    };


    return (
        <Modal
            title={
                "جستجوی مشتری"
            }
            onCloseModal={onCloseModal}
            dependencies={[dropdownRef]}
        >
            <div>
                <div>
                    <span>جستجوی بر اساس:</span>

                    <div>
                       
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CustomersSearchModal