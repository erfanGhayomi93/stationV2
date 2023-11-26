import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from 'src/common/components/Input';
import Captcha from 'src/common/components/oAuth/Captcha';
import { useCaptcha, useForgetPasswordRequestMutate } from '../../../app/queries/oAuth';
import { useNavigate } from 'react-router-dom';



const ForgetPassword: FC = () => {

    //*global
    const { t } = useTranslation();
    const navigate = useNavigate()
    //*form
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        getValues,
        setValue
    } = useForm<IFormForgetPasswordRequest>({
        defaultValues: {
            userName: '',
            mobile: '',
            captchaValue: '',
        },
        mode: 'onChange',
    });
    //*getCaptchaData
    const { data: captchaData, refetch: refetchCaptcha, isFetching: isLoadingCaptcha } = useCaptcha();
    //*mutate api
    const { mutate } = useForgetPasswordRequestMutate({
        onSuccess: (data) => {
            if (data.succeeded) {
                const {
                    result: { expireDate, retryToken, starredMessage },
                } = data;
                navigate('/forgetPassword/validation', {
                    state: {
                        expireDate,
                        retryToken,
                        starredMessage,
                        mobile: getValues('mobile'),
                        userName: getValues('userName'),
                    },
                });
            } else {
                handleRefetchCaptch();
            }
        },
        onError: () => {
            handleRefetchCaptch();
        },
    })
    //*methods
    const handleRefetchCaptch = (): void => {
        refetchCaptcha();
        resetField('captchaValue');
    };

    const onSubmit: SubmitHandler<IFormForgetPasswordRequest> = (data) => {
        if (!captchaData?.key) {
            handleRefetchCaptch();
            return;
        }

        const reqData: ISubmitForgetPasswordRequest = {
            userName: data.userName,
            mobile: data.mobile,
            captchaValue: data.captchaValue,
            captchaKey: captchaData?.key,
        };
        mutate(reqData);
    }


    return <div>
        <h1 className="text-xl font-bold text-center text-L-primary-50 dark:text-D-primary-50 my-4">
            {t(`FormSide.ForgetPasswordText`)}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label htmlFor="userName-forget-request" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                    {t(`FormSide.Input.UserName.Label`)}
                </label>

                <Input
                    {...register('userName', {
                        required: {
                            value: true,
                            message: t('Errors.Input.Required', {
                                n: t('FormSide.Input.UserName.Label'),
                            }),
                        },
                    })}
                    id='userName-forget-request'
                    placeholder={t(`FormSide.Input.GtUsername.Placeholder`)}
                    inputClassName="ltrInsert"
                    type={'text'}
                    textError={errors.userName?.message}
                    containerClassName='mt-2 !h-10'
                />
            </div>


            <div className="mt-4" >
                <label htmlFor="username-login" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                    {t(`FormSide.Input.PhoneNumber.Label`)}
                </label>

                <Input
                    {...register('mobile', {
                        required: {
                            value: true, message: t('Errors.Input.Required', {
                                n: t('FormSide.Input.PhoneNumber.Label'),
                            }),
                        },
                    })}
                    placeholder={t(`FormSide.Input.PhoneNumber.Placeholder`)}
                    inputClassName="ltrInsert"
                    containerClassName='mt-2 !h-10'
                    type={'text'}
                    label={t(`FormSide.Input.PhoneNumber.Label`)}
                    textError={errors.mobile?.message}
                />
            </div>

            <div className="mt-4">
                <Captcha
                    register={register}
                    errors={errors}
                    captcha={captchaData}
                    onRefresh={handleRefetchCaptch}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>

            <div className="mt-12 text-center">
                <button className="w-full bg-L-primary-50 dark:bg-D-primary-50 rounded text-L-basic dark:text-D-basic p-2 text-sm mb-4 mt-5 flex justify-center items-center gap-x-1">
                    {t(`FormSide.NextStepButton`)}
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
    </div>;
};

export default ForgetPassword;
