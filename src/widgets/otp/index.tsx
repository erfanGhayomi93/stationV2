// import { ChevronLeftIcon } from 'common/Icons';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { useGetCaptch, useRetrySms } from 'services/login';
// import Captcha from 'common/Components/Captcha';
import { useLocation, useNavigate, useNavigation, useRoutes, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trans, useTranslation } from 'react-i18next';
import InputPin from 'src/common/components/oAuth/inputPin';
import { useCaptcha } from 'src/app/queries/oAuth';
import Captcha from 'src/common/components/oAuth/Captcha';
import ipcMain from 'src/common/classes/IpcMain';

/////////////////////need ///////////////////
//retryToken ,starredMessage , expireDate , ?temporaryToken from state in react-router
////////////////////////////////////////////

type IFormOtpType = {
    handleSubmitOtp: (data: ISubmitOtpModuleType) => void;
    SendCodeAgainApi: () => void
};

type formDataType = {
    captchaValue: string;
};

const OtpModule: FC<IFormOtpType> = ({ handleSubmitOtp, SendCodeAgainApi }) => {
    //*global
    const { t } = useTranslation();
    const {
        state
    } = useLocation();
    const navigate = useNavigate()

    const { retryToken, starredMessage, expireDate, temporaryToken, mobile, userName } =
        state || {};
    // const [searchParams] = useSearchParams();

    //*form
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setValue,
        getValues
    } = useForm<formDataType>({
        defaultValues: {
            captchaValue: '',
        },
        mode: 'onChange',
    });
    //*otp state
    const [otp, setOtp] = useState<string>('');
    //*handle captch
    const { data: captcha, refetch: refetchCaptcha } = useCaptcha();

    const refetchCaptchaMethod = () => {
        refetchCaptcha();
        resetField('captchaValue');
    };

    // const handleNavigate = (result: any) => {
    //     let retryTokenVar = '';
    //     let starredMessageVar = '';
    //     let expireDateVar = '';
    //     let temporaryTokenVar = '';
    //     if (result.riModel) {
    //         const {
    //             riModel: {
    //                 retryToken,
    //                 starredMessage,
    //                 expireDate,
    //                 userIdentity: { token },
    //             },
    //         } = result;
    //         retryTokenVar = retryToken;
    //         starredMessageVar = starredMessage;
    //         expireDateVar = expireDate;
    //         temporaryTokenVar = token;
    //     } else if (result.fpDto) {
    //         const {
    //             fpDto: {
    //                 result: { retryToken, starredMessage, expireDate },
    //             },
    //         } = result;
    //         retryTokenVar = retryToken;
    //         starredMessageVar = starredMessage;
    //         expireDateVar = expireDate;
    //     }

    // navigate.pushHere({
    //     state: {
    //         ...state,
    //         retryToken: retryTokenVar,
    //         starredMessage: starredMessageVar,
    //         expireDate: expireDateVar,
    //         temporaryToken: temporaryTokenVar,
    //     },
    //     replace: true,
    // });
    // };

    //*RetrySms
    //   const { mutate: mutateRetrySms } = useRetrySms({
    //     onSuccess: (data) => {
    //       if (data.succeeded) {
    //         handleNavigate(data.result);
    //       } else {
    //         if (data?.errors && data?.errors[0] === 'InvalidToken') {
    //           navigate.pushLogin();
    //         }
    //       }
    //     },
    //   });

    const SendCodeAgain = () => {
        setOtp('');
        SendCodeAgainApi()
        // mutateRetrySms({
        //   token: retryToken,
        // });
    };

    const onSubmit: SubmitHandler<formDataType> = (data) => {
        // navigate("/forgetPassword/changePassword")
        const otpRes = otp.replaceAll(' ', '').replaceAll('_', '');
        if (!captcha?.key) {
            refetchCaptchaMethod();
            return;
        }
        if (!retryToken) {
            navigate("/login");
            return;
        }
        if (otpRes.length !== 6) {
            refetchCaptchaMethod();
            toast.warning(t('Errors.OtpIsNotValid'));
            return;
        }

        sessionStorage.setItem('otp', JSON.stringify(otpRes));

        const res: ISubmitOtpModuleType = {
            otp: otpRes,
            captchaValue: data.captchaValue,
            captchaKey: captcha.key,
            token: temporaryToken,
            mobile: mobile,
            userName: userName
        };
        // setTimeout(() => {
        //     refetchCaptchaMethod();
        // }, 500);
        handleSubmitOtp(res);

    };

    useEffect(() => {
        ipcMain.handle("Refresh-captcha", refetchCaptchaMethod)

        return () => ipcMain.removeHandler("Refresh-captcha")
    }, [])


    useLayoutEffect(() => {
        if (!retryToken) {
            toast.error('لطفا دوباره ورود کنید');
            // navigate.pushLogin();
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center pr-5">
                <h1 className="text-xl font-bold text-center text-L-primary-50 dark:text-D-primary-50 my-4">
                    {t(`FormSide.ValidationCodeText`)}
                </h1>
                <p className="pt-4 text-right text-L-gray-700 dark:text-D-gray-700 text-sm font-medium">
                    <Trans
                        i18nKey={`FormSide.Input.OTP.Placeholder`}
                        values={{
                            n: starredMessage,
                        }}
                        components={{ tag: <span className="inline-block ltr p-1" /> }}
                    />
                </p>
            </div>

            <div className="mt-2">
                <InputPin
                    sendCodeAgain={SendCodeAgain}
                    value={otp}
                    onChange={setOtp}
                    expireDate={expireDate}
                />
            </div>

            <div className="mt-4">
                <Captcha
                    register={register}
                    errors={errors}
                    captcha={captcha}
                    onRefresh={refetchCaptchaMethod}
                    setValue={setValue}
                    getValues={getValues}
                />
            </div>

            <div className="mt-8 py-4 text-center">
                <button className="w-full bg-L-primary-50 dark:bg-D-primary-50 rounded text-L-basic dark:text-D-basic p-2 text-sm mb-4 mt-5 flex justify-center items-center gap-x-1">
                    {t(`FormSide.NextStepButton`)}
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgetPassword")
                    }}
                    className="text-L-primary-50 dark:text-D-primary-50"
                >
                    {t(`FormSide.CancelText`)}
                </button>
            </div>
        </form>
    );
};

export default OtpModule;
