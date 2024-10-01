import { DeleteIcon, DetailsIcon, EditIcon, MoreStatusIcon, UpArrowIcon } from "@assets/icons"
import Dropdown from "@uiKit/Dropdown";
import { useRef, useState } from "react";


interface IActionProps<T> {
    row: T;
    handleEditOnce?: (arg: T) => void;
    handleDeleteOnce?: (arg: T) => void;
    handleDetailsOnce?: (arg: T) => void;
}

export const Actions = <T,>({ row, handleDeleteOnce, handleDetailsOnce, handleEditOnce }: IActionProps<T>) => {

    const refDropdown = useRef<HTMLDivElement>(null)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)


    const drop = [
        { label: "ویرایش", icon: EditIcon, onclick: () => handleEditOnce?.(row) },
        { label: "حذف", icon: DeleteIcon, onclick: () => handleDeleteOnce?.(row) },
        { label: "جزيیات", icon: DeleteIcon, onclick: () => handleDetailsOnce?.(row) },
    ]


    return (
        <div className="relative"
            ref={refDropdown}
        >
            <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="flex justify-center cursor-pointer w-full">
                <MoreStatusIcon className="text-icon-default" />
            </button>

            {
                !!isDropdownOpen && (
                    <Dropdown<any>
                        ref={refDropdown}
                        isDropdownOpen={isDropdownOpen}
                        closeDropDowns={() => setIsDropdownOpen(false)}
                        data={drop}
                        classes={{ position: "top-2 left-0" }}
                        animate="fadeIn"
                        getLabel={
                            (option) => (
                                <button
                                    className="flex justify-between items-center w-full"
                                    onClick={() => {
                                        option.onclick()
                                        setIsDropdownOpen(false)
                                    }}
                                >
                                    <div className="flex gap-x-2">
                                        <option.icon className="text-icon-default" />
                                        <span className="text-content-paragraph">{option.label}</span>
                                    </div>

                                    <UpArrowIcon className="-rotate-90 text-icon-default" />
                                </button>
                            )
                        }
                    />
                )
            }

        </div>

    )
}

