import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordValidate } from 'src/common/components/oAuth/validations/changePassword';
import { useCaptcha, useForgetPasswordChangeMutate } from 'src/app/queries/oAuth';
import { PasswordInput } from 'src/common/components/oAuth/passwordInput';
import { useTranslation } from 'react-i18next';
import { RadioValidate } from 'src/common/components/oAuth/checkSetPassword/RadioValidate';
import Captcha from 'src/common/components/oAuth/Captcha';
import { useLocation, useNavigate } from 'react-router-dom';
import { base64 } from 'src/utils/helpers';
import { onSuccessNotif } from 'src/handlers/notification';


type formDate = {
    isForget: boolean;
    newPassword: string;
    newPasswordConfirm: string;
    captchaValue: string;
};


const ChangePasswordForgetPassword = () => {
    const { t } = useTranslation()
    const schema = changePasswordValidate()
    const navigate = useNavigate()

    const { data: captcha, refetch: refetchCaptcha } = useCaptcha();
    const { state: { mobile, userName, otp } } = useLocation()


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        resetField,
        watch,
        formState: { errors },
    } = useForm<formDate>({
        defaultValues: {
            isForget: true, //*isForget just use for validation
            newPassword: '',
            newPasswordConfirm: '',
            captchaValue: '',
        },
        mode: 'onChange',
        resolver: yupResolver(schema as any),
    });

    const { mutate } = useForgetPasswordChangeMutate({
        onSuccess(data) {
            if (data.succeeded) {
                onSuccessNotif({ title: t("FormSide.Success.Change.Password") })
                navigate("/login")
            } else {
                handleRefetchCaptch()
            }
        },
        onMutate() {
            handleRefetchCaptch()
        },
    })


    const onSubmit: SubmitHandler<formDate> = (data) => {
        if (!captcha?.key) {
            handleRefetchCaptch();
            return;
        }
        try {
            mutate({
                captchaKey: captcha.key,
                captchaValue: data.captchaValue,
                mobile: mobile,
                userName: userName,
                newPassword: base64.encode(data.newPassword),
                otp: otp,
            });
        }
        catch (err) {
            console.log(err)
        }
    };

    //*hanle methode
    const handleRefetchCaptch = (): void => {
        refetchCaptcha();
        resetField('captchaValue');
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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


export default ChangePasswordForgetPassword
