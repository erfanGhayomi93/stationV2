import React, { useRef, useEffect, useState } from 'react';
import { useSetUsername } from 'src/app/queries/settings/PlatformSetting';
import ConfirmationModal from 'src/common/components/ConfirmModal/ConfirmationModal';
import Input from 'src/common/components/Input';
import { Check, UnCheck } from 'src/common/icons';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';

const EditUserNameInput = ({ defaultValue, toggleEditing, userId }: { defaultValue: string; toggleEditing: () => void, userId?: number }) => {
    //
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(defaultValue);
    const { mutate } = useSetUsername();

    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleConfirm = () => {
        if (!userId) {
            onErrorNotif({ title: 'مشکلی در دریافت اطلاعات نماد وجود دارد' });
            return
        }

        mutate({ newUserName: value, userId }, {
            onSuccess: (data) => {
                if (data.succeeded) {
                    onSuccessNotif({ title: "نام کاربری با موفقیت تغییر یافت" })
                    toggleEditing()
                }
            }
        })
    }

    const setUsername = () => {
        setIsConfirmModalOpen(true)
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={inputRef}
                style={{ direction: 'ltr' }}
                addonBefore={
                    <div className="flex gap-1 items-center bg-L-basic dark:bg-D-basic">
                        <span
                            onClick={toggleEditing}
                            className="cursor-pointer text-L-error-200 w-6 h-6 rounded bg-L-gray-200 dark:bg-D-gray-200 flex items-center justify-center"
                        >
                            <UnCheck />
                        </span>
                        <span
                            className="cursor-pointer text-L-success-200 w-6 h-6 rounded bg-L-gray-200 dark:bg-D-gray-200 flex items-center justify-center"
                            onClick={setUsername}
                        >
                            <Check />
                        </span>
                    </div>
                }
            />

            {isConfirmModalOpen && (
                <ConfirmationModal
                    isOpen={isConfirmModalOpen}
                    title={"تغییر نام کاربری"}
                    description={"بعد از تغییر نام کاربری به صفحه ورود انتقال پیدا می کنید"}
                    onConfirm={handleConfirm}
                    onCancel={() => {
                        setIsConfirmModalOpen(false)
                        toggleEditing()
                    }}
                    confirmBtnLabel="تایید"
                />
            )}
        </>
    );
};

export default EditUserNameInput;
