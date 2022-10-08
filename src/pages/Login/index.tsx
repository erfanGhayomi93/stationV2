import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { base64 } from 'src/utils/helpers';
import { useCaptcha, useLoginFormSubmit } from './queries';
import cover from 'src/assets/images/login-image-1.png';
import PasswordInput from 'src/common/components/PasswordInput';
import logo from 'src/assets/images/logo.svg';
import { RefreshIcon } from 'src/common/icons';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { captions } from 'src/constant/captions';
import { Link, useNavigate } from 'react-router-dom';
import { unAuthorizedRoutes } from 'src/app/routes/appRoutes';
import { setAuthorizeData } from 'src/api/axiosInstance';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppUser } from 'src/redux/slices/global';
import { AxiosResponse, AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
                toast.error(response?.data.result.loginResultType);
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
    const onSubmitClick = () => {
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
                            <img src={logo} width={170} />
                            <h3 className="text-2.4 font-semibold text-[#35435A]">ورود به سامانه معاملاتی {t('Login.title')}</h3>
                            <div className="w-full flex flex-col gap-6 pt-5">
                                <label className="flex flex-col gap-2 ">
                                    <span className="text-[#35435A] font-semibold pr-0.5">نام کاربری</span>
                                    <input
                                        name="username"
                                        placeholder="username"
                                        className="border bg-white p-3 rounded-lg border-[#A4B2C9]"
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
                                            className="h-full w-full px-3 font-semibold text-1.8 tracking-[2rem] text-center"
                                            type="text"
                                            value={captchaValue}
                                            maxLength={5}
                                            minLength={5}
                                            onChange={(e) => setCaptchaValue(e?.target?.value || '')}
                                        />
                                        <button
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

                                <button className="bg-L-primary-50 hover:bg-opacity-75 py-3 rounded-md text-white" onClick={onSubmitClick}>
                                    ادامه
                                </button>
                            </div>
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
