import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setAuthorizeData } from 'src/api/axiosInstance';
import cover from 'src/assets/images/login-image-1.png';
import PasswordInput from 'src/common/components/PasswordInput';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { RefreshIcon } from 'src/common/icons';
import { captions } from 'src/constant/captions';
import { onErrorNotif } from 'src/handlers/notification';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppUser } from 'src/redux/slices/global';
import { base64 } from 'src/utils/helpers';
import { useCaptcha, useLoginFormSubmit } from './queries';

interface ErrorTypes {
    userName?: string;
    password?: string;
    captcha?: string;
}
const Login = () => {
    //
    const [userString, setUserString] = useState('');
    const [passString, setPassString] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [errors, setErrors] = useState<ErrorTypes>();
    const { t } = useTranslation();
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: captchaData } = useCaptcha();
    const { isLoading, mutate: loginFormSubmit } = useLoginFormSubmit({
        onSuccess: (result) => {
            if (result.loginResultType === 'Successful') {
                setAuthorizeData(result?.token);
                appDispatch(setAppUser({ userName: 'soheilkh', firstName: 'جواد', lastName: 'بینایی' }));
                navigate('/');
            }
        },
        onError: ({ response }: AxiosError<GlobalApiResponseType<IGTAuthorizationResultType>>) => {
            console.log(response);
            if (response?.data.result.loginResultType === 'InvalidCaptcha') {
                queryClient.invalidateQueries(['Captcha']);
                setCaptchaValue('');
                onErrorNotif({ title: response?.data.result.loginResultType });
            } else {
                queryClient.invalidateQueries(['Captcha']);
                setCaptchaValue('');
                onErrorNotif({ title: response?.data.result.loginResultType as string });
            }
        },
    });

    const verifyForm = () => {
        setErrors({
            captcha: captchaValue.length === 0 ? 'کد امنیتی الزامی است' : undefined,
            password: passString.length === 0 ? 'رمز عبور الزامی است' : undefined,
            userName: userString.length === 0 ? 'نام کاربری الزامی است' : undefined,
        });
    };
    const onSubmitClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        verifyForm();
        captchaValue &&
            passString &&
            userString &&
            loginFormSubmit({
                captchaValue: captchaValue,
                captchaKey: captchaData?.key as string,
                password: base64.encode(passString),
                term: userString,
            });
    };

    const BrokerCode = +window.REACT_APP_BROKER_CODE;

    return (
        <WidgetLoading spining={isLoading}>
            <div className="bg-[#f8f8f8] w-screen h-screen flex flex-col min-w-[1200px] min-h-[700px] ">
                <div className=" p-10 pb-0 h-full flex flex-col justify-center items-center">
                    <div
                        className="bg-white rounded-3xl p-10  shadow-[#135CA460] grid grid-cols-2 gap-5   justify-items-center align-middle  max-w-[1500px] "
                        style={{
                            boxShadow: '0px 0px 63px -15px rgba(19, 92, 164, 0.3)',
                            backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/contour.svg'})`,
                            backgroundSize: ' 54.4rem',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right',
                        }}
                    >
                        <div className="w-full flex flex-col px-20 gap-6 pt-5 ">
                            <h5 className="text-1.6 font-semibold text-[#35435A] flex items-center ">
                                <img className="-mr-5" src={`/assets/images/logo_189.svg`} width={55} height={55} />
                                <span>کارگزاری {t('headerSec.' + BrokerCode + '_LogoTitle')}</span>
                            </h5>
                            <h3 className="text-2.4 font-semibold text-[#35435A]">
                                ورود به سامانه معاملاتی {t('headerSec.' + BrokerCode + '_LogoTitle')}
                            </h3>
                            <form onSubmit={(e) => onSubmitClick(e)}>
                                <div className="w-full flex flex-col gap-6 pt-5">
                                    <label className="flex flex-col gap-2 ">
                                        <span className="text-[#35435A] font-semibold pr-0.5">نام کاربری</span>
                                        <input
                                            name="username"
                                            data-cy="username"
                                            placeholder={t('FormSide.Input.Username.Placeholder')}
                                            className="border bg-white p-3 rounded-lg border-[#A4B2C9] focus:outline-none"
                                            type="text"
                                            value={userString}
                                            onChange={(e) => setUserString(e.target.value)}
                                        />
                                        <span className="text-rose-400 text-1.3">{errors?.userName}</span>
                                    </label>
                                    <label className="flex flex-col gap-2 -mb-4 ">
                                        <span className="text-[#35435A] font-semibold pr-0.5">رمز عبور</span>
                                        <div className="flex flex-col gap-2 items-end">
                                            <PasswordInput
                                                data-cy="password"
                                                onChange={setPassString}
                                                classname="bg-white  rounded-lg border-[#A4B2C9] w-full overflow-hidden"
                                                suffixClassName="text-[#7E93B4]"
                                            />
                                            <div className="flex w-full justify-between">
                                                <span className="text-rose-400 text-1.3">{errors?.password}</span>
                                                <button className="text-[#7E93B4] px-2 opacity-0">رمز عبور خود را فراموش کردم</button>
                                            </div>
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-2 w-full">
                                        <span className="text-[#35435A] font-semibold pr-0.5">کد امنیتی</span>
                                        <div className="items-center flex  overflow-hidden border bg-white  rounded-lg border-[#A4B2C9]">
                                            <input
                                                className="h-full w-full px-3 font-semibold text-1.8 tracking-[2rem] text-center focus:outline-none"
                                                type="text"
                                                value={captchaValue}
                                                // placeholder={t("FormSide.Input.Captcha.Placeholder")}
                                                data-cy="captcha"
                                                maxLength={5}
                                                minLength={5}
                                                onChange={(e) => setCaptchaValue(e?.target?.value || '')}
                                            />
                                            <button
                                                type={'button'}
                                                onClick={() => queryClient.invalidateQueries(['Captcha'])}
                                                className="h-full flex items-center justify-center aspect-square hover:bg-slate-200 text-slate-500 p-1"
                                            >
                                                <RefreshIcon />
                                            </button>
                                            <div>
                                                <img className="min-h-[46px]" src={captchaData?.base64String || ''} alt="captcha" />
                                            </div>
                                        </div>
                                        <span className="text-rose-400 text-1.3">{errors?.captcha}</span>
                                    </label>

                                    <button type={'submit'} className="bg-L-primary-50 hover:bg-opacity-75 py-3 rounded-md text-white">
                                        ورود
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="grid justify-items-center align-middle">
                            <img src={cover} className="aspect-square " />
                        </div>
                    </div>
                </div>
                <div className="flex text-1.4 h-full items-center justify-center py-5  ">
                    <div className="min-w-[1200px] px-10 w-full max-w-[1500px]">
                        <ul className="text-[#35435A] flex flex-col gap-2 text-theme-250 list-disc ">
                            {captions.map((item) => (
                                <li key={item.text}>{item.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </WidgetLoading>
    );
};

export default Login;
