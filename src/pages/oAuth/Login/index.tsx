import { useNavigate } from 'react-router-dom';
import { setAuthorizeData } from 'src/api/axiosInstance';
import { useAppDispatch } from 'src/redux/hooks';
import { useCaptcha, useLoginFormSubmit } from '../../../app/queries/oAuth';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import Input from 'src/common/components/Input';
import { useTranslation } from 'react-i18next';
import { PasswordInput } from 'src/common/components/oAuth/passwordInput';
import Captcha from 'src/common/components/oAuth/Captcha';
import { ArrowLeftSVG } from 'src/common/icons';
import { AxiosError } from 'axios';
import { base64 } from 'src/utils/helpers';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { setAppState } from 'src/redux/slices/global';

type formDate = {
    username: string;
    password: string;
    captchaValue: string;
};


const Login = () => {

    const { t } = useTranslation()


    //*form
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setValue,
        watch,
        getValues
    } = useForm<formDate>({
        defaultValues: {
            username: '',
            password: '',
            captchaValue: '',
        },
        mode: 'onChange',
    });

    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    // 
    const { data: captchaData, refetch: refetchCaptcha, isFetching: isLoadingCaptcha } = useCaptcha();

    const handleRefetchCaptcha = (): void => {
        refetchCaptcha();
        resetField('captchaValue');
    };

    const { isLoading, mutate: loginFormSubmit } = useLoginFormSubmit({
        onSuccess: (result) => {
            if (result.loginResultType === 'Successful') {
                setAuthorizeData(result?.token);
                appDispatch(setAppState("LoggedIn"))
                navigate('/');
            }
        },
        onError: ({ response }: AxiosError<GlobalApiResponseType<IGTAuthorizationResultType>>) => {
            handleRefetchCaptcha()
        },
    });


    const onSubmit: SubmitHandler<formDate> = (data) => {
        loginFormSubmit({
            captchaValue: data.captchaValue,
            captchaKey: captchaData?.key as string,
            password: base64.encode(data.password),
            term: data.username,
        });
    }

    return (
        <WidgetLoading spining={isLoading || isLoadingCaptcha}>
            <h1 className="text-xl font-bold text-center text-L-primary-50 dark:text-D-primary-50 my-4">
                {t(`BrokerCode_${window.REACT_APP_BROKER_CODE}.FormSide.LogInText`)}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label htmlFor="username-login" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                        {t(`FormSide.Input.Username.Label`)}
                    </label>

                    <Input
                        {...register('username', {
                            required: {
                                value: true,
                                message: t('Errors.Input.Required', {
                                    n: t('FormSide.Input.Username.Label'),
                                    interpolation: { escapeValue: false },
                                }),
                            },
                        })}
                        id="username-login"
                        placeholder={t(`FormSide.Input.Username.Placeholder`)}
                        inputClassName="ltrInsert"
                        type={'text'}
                        data-cy="username"
                        containerClassName='mt-2 !h-10'
                        textError={errors.username?.message}
                    />
                </div>

                <div className="mt-4">

                    <label htmlFor="username-login" className="text-L-gray-700 dark:text-D-gray-700 font-medium">
                        {t(`FormSide.Input.Password.Label`)}
                    </label>

                    <PasswordInput
                        register={register}
                        error={errors.password}
                        setValues={setValue}
                        name="password"
                        labelInput={t(`FormSide.Input.Password.Label`)}
                        placeHolder={t(`FormSide.Input.Password.Placeholder`)}
                        watch={watch}
                    />
                </div>

                <span
                    onClick={() => navigate('/ForgetPassword')}
                    className={clsx(
                        'text-L-gray-600 dark:text-D-gray-600 text-xs float-left cursor-pointer relative mt-1',
                        {
                            'mt-[-16px]': errors.password,
                        }
                    )}
                >
                    {t(`FormSide.ForgetPasswordLabel`)}
                </span>

                <div className="mt-4">
                    <Captcha
                        register={register}
                        errors={errors}
                        captcha={captchaData}
                        onRefresh={handleRefetchCaptcha}
                        setValue={setValue}
                        getValues={getValues}
                    />
                </div>

                <div className={clsx("pt-6"
                )}>

                    <button data-cy="submit" className="w-full bg-L-primary-50 dark:bg-D-primary-50 rounded text-L-basic dark:text-D-basic p-2 text-sm mb-4 mt-5 flex justify-center items-center gap-x-1">
                        {t(`FormSide.Confirm.Login`)}

                        <ArrowLeftSVG width={16} height={16} />
                    </button>

                </div>

            </form>
        </WidgetLoading>
    );
};

export default Login;
