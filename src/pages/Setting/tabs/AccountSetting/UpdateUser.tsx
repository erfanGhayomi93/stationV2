import React, { useState } from 'react';
import { RowDisplay } from './Active2StepLogin';
import { useTranslation } from 'react-i18next';
import { EditIcon, Envelope2Icon, Lock2Icon, NumberIcon, PhoneIcon, UsernameIcon } from 'src/common/icons';
import { useNavigate } from 'react-router-dom';
import EditUserNameInput from './EditUserNameInput';

const UpdateUser = () => {
    //
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const toggleEditing = () => setIsEditing(!isEditing);
    const goToChangePassword = () => navigate('/changePassword');

    return (
        <div className="flex min-h-[120px]">
            <div className="flex-1 flex flex-col justify-between">
                <RowDisplay name={t('common.stationName')} value="ایستگاه یک" icon={<NumberIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <div className="w-2/3 flex justify-between items-center">
                    <div className="flex gap-1 items-center text-L-primary-50 dark:text-D-primary-50">
                        <span>
                            <UsernameIcon />
                        </span>
                        <span>{t('ag_columns_headerName.userName')}</span>
                    </div>
                    <div className="text-D-basic dark:text-L-basic font-medium flex gap-2">
                        {isEditing ? (
                            <EditUserNameInput toggleEditing={toggleEditing}/>
                        ) : (
                            <>
                                {'username'}
                                <span className="cursor-pointer" onClick={toggleEditing}>
                                    <EditIcon />
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.phoneNumber')} value="09124565879" icon={<PhoneIcon />} />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <RowDisplay name={t('common.stationCode')} value="ایستگاه کد" icon={<NumberIcon />} />
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <div className="w-2/3 flex justify-between items-center">
                    <div className="flex gap-1 items-center text-L-primary-50 dark:text-D-primary-50">
                        <span>
                            <Lock2Icon />
                        </span>
                        <span>{t('common.password')}</span>
                    </div>
                    <div className="text-D-basic dark:text-L-basic font-medium flex gap-2">
                        {'******'}
                        <span className="cursor-pointer" onClick={goToChangePassword}>
                            <EditIcon />
                        </span>
                    </div>
                </div>
                <div className="border-b dark:border-D-gray-300 w-2/3"></div>
                <RowDisplay name={t('common.email')} value="ایستگاه یک" icon={<Envelope2Icon />} />
            </div>
        </div>
    );
};

export default UpdateUser;
