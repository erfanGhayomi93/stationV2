import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCaptcha, useChangePasswordSetPasswordMutate } from 'src/app/queries/oAuth';
import Captcha from 'src/common/components/oAuth/Captcha';
import { RadioValidate } from 'src/common/components/oAuth/checkSetPassword/RadioValidate';
import { PasswordInput } from 'src/common/components/oAuth/passwordInput';
import { changePasswordValidate } from 'src/common/components/oAuth/validations/changePassword';
import { onSuccessNotif } from 'src/handlers/notification';
import { base64 } from 'src/utils/helpers';

type formDataType = {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    captchaValue: string;
};

type reqDataType = {
    otp: string;
    currentPassword: string;
    newPassword: string;
    captchaValue: string;
    captchaKey: string;
};


const SetPasswordChangePassword = () => {
    const { t } = useTranslation();
    const { state: { otp } } = useLocation()
    const navigate = useNavigate()

    const { data: captcha, refetch: refetchCaptcha } = useCaptcha();
    const { mutate: mutateSetPassword } = useChangePasswordSetPasswordMutate({
        onSuccess(data) {
            if (data.succeeded) {
                onSuccessNotif({ title: t("FormSide.Success.Change.Password") })
                navigate("/setting")
            }
            else {
                handleRefetchCaptch()
            }
        },
        onError() {
            handleRefetchCaptch()
        }
    })

    const schema = changePasswordValidate()

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<formDataType>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            captchaValue: '',
        },
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<formDataType> = (data) => {
        if (!captcha?.key) {
            handleRefetchCaptch();
            return;
        }

        const reqData: reqDataType = {
            otp: otp,
            currentPassword: base64.encode(data.currentPassword),
            newPassword: base64.encode(data.newPassword),
            captchaValue: data.captchaValue,
            captchaKey: captcha?.key,
        };


        mutateSetPassword(reqData)

    };

    const handleRefetchCaptch = (): void => {
        refetchCaptcha();
        resetField('captchaValue');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="currentPassword-changePassword" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                    {t(`FormSide.Input.CurrentPassword.Label`)}
                </label>

                <PasswordInput
                    register={register}
                    error={errors.currentPassword}
                    setValues={setValue}
                    name="currentPassword"
                    labelInput={t(`FormSide.Input.CurrentPassword.Label`)}
                    placeHolder={t(`FormSide.Input.CurrentPassword.Placeholder`)}
                    watch={watch}
                />
            </div>

            <div className='mt-6'>
                <label htmlFor="newPassword-changePassword" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                    {t(`FormSide.Input.NewPassword.Label`)}
                </label>

                <PasswordInput
                    register={register}
                    error={errors.newPassword}
                    setValues={setValue}
                    name="newPassword"
                    labelInput={t(`FormSide.Input.NewPassword.Label`)}
                    placeHolder={t(`FormSide.Input.NewPassword.Placeholder`)}
                    watch={watch}
                />
            </div>

            <RadioValidate value={watch('newPassword')} />

            <div className='mt-6'>
                <label htmlFor="newPasswordConfirm-changePassword" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                    {t(`FormSide.Input.ConfirmNewPassword.Label`)}
                </label>

                <PasswordInput
                    register={register}
                    error={errors.newPasswordConfirm}
                    setValues={setValue}
                    name="newPasswordConfirm"
                    labelInput={t(`FormSide.Input.ConfirmNewPassword.Label`)}
                    placeHolder={t(`FormSide.Input.ConfirmNewPassword.Placeholder`)}
                    watch={watch}
                />
            </div>

            <div className="mt-6">
                <Captcha
                    register={register}
                    errors={errors}
                    captcha={captcha}
                    onRefresh={handleRefetchCaptch}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>

            <div className="mt-12 text-center">
                <button className="w-full bg-L-primary-50 dark:bg-D-primary-50 rounded text-L-basic dark:text-D-basic p-2 text-sm mb-4 mt-5 flex justify-center items-center gap-x-1">
                    {t(`FormSide.Confirm.Done`)}
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        navigate("/login")
                    }}
                    className="text-L-primary-50 dark:text-D-primary-50"
                >
                    {t(`FormSide.BackText.Login`)}
                </button>
            </div>

        </form>
    )
}


export default SetPasswordChangePassword
