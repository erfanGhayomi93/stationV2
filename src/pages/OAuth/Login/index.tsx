import { useCaptcha, useLoginFormSubmit } from '@api/oAuth';
import { ProfileIcon, RamandIcon } from '@assets/icons';
import { setAuthorizeData } from '@config/axios';
import { base64 } from '@methods/helper';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Captcha from './components/Captch';
import Input from './components/Input';
import { PasswordInput } from './components/passwordInput';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppState } from '@store/appState';
import { useEffect } from 'react';
import { useSymbolStore } from '@store/symbol';

type formDate = {
     username: string;
     password: string;
     captchaValue: string;
};

const Login = () => {
     const { t } = useTranslation();

     const { appState, setAppState } = useAppState()

     const { setSelectedSymbol } = useSymbolStore()

     const {
          register,
          handleSubmit,
          formState: { errors },
          resetField,
          setValue,
          watch,
          getValues,
     } = useForm<formDate>({
          defaultValues: {
               username: '',
               password: '',
               captchaValue: '',
          },
          mode: 'onChange',
     });

     const navigate = useNavigate();

     const { data: captchaData, refetch: refetchCaptcha } = useCaptcha();

     const handleRefetchCaptcha = (): void => {
          refetchCaptcha();
          resetField('captchaValue');
     };

     const { mutate: loginFormSubmit } = useLoginFormSubmit({
          onSuccess: result => {
               if (result.loginResultType === 'Successful') {
                    setAuthorizeData(result?.token);
                    setAppState('LoggedIn')
                    // toast.success('با موفقیت وارد حساب کاربری شدید.');
                    navigate('/');
               } else {
                    setAppState('LoggedOut')
               }
          },
          onError: params => {
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               //@ts-expect-error
               toast.error(t(`loginError.${params.response.data.result.loginResultType}`));
               setAppState('LoggedOut')

               handleRefetchCaptcha();
          },
     });

     const onSubmit: SubmitHandler<formDate> = data => {
          loginFormSubmit({
               captchaValue: data.captchaValue,
               captchaKey: captchaData?.key as string,
               password: base64.encode(data.password),
               term: data.username,
          });
     };

     useEffect(() => {
          if (appState !== 'LoggedOut') {
               setAppState('LoggedOut')
          }
          setSelectedSymbol('')
     }, [])


     return (
          <main className="rtl flex h-screen items-center gap-10 bg-back-surface p-10">
               <div className="flex basis-5/12 items-center justify-center px-28">
                    <div className="flex flex-1 flex-col gap-6">
                         <div className="flex flex-col gap-6">
                              <span className="text-center text-3xl font-medium text-content-paragraph">{t('login.login')}</span>
                              <h1 className="text-L-primary-50 dark:text-D-primary-50 text-center text-base text-content-placeholder">
                                   {t(`brokerCode_${window.REACT_APP_BROKER_CODE}.formSideLogInText`)}
                              </h1>
                         </div>
                         <form className="flex flex-col gap-14" onSubmit={handleSubmit(onSubmit)}>
                              <Input
                                   {...register('username', {
                                        required: {
                                             value: true,
                                             message: t('login.inputUserNameLabelRequired'),
                                        },
                                   })}
                                   id="username-login"
                                   placeholder={t('login.inputUserNameLabel')}
                                   inputClassName="ltrInsert"
                                   type={'text'}
                                   data-cy="username"
                                   textError={errors.username?.message}
                                   icon={<ProfileIcon width="1.5rem" height="1.5rem" />}
                              />

                              <div className="flex flex-col gap-2">
                                   <PasswordInput
                                        register={register}
                                        error={errors.password}
                                        setValues={setValue}
                                        name="password"
                                        labelInput={t('login.inputPasswordLabel')}
                                        placeHolder={t('login.inputPasswordLabel')}
                                        watch={watch}
                                   />

                                   <span
                                        // onClick={() => navigate('/ForgetPassword')}
                                        className={clsx(
                                             'relative float-left mt-1 cursor-pointer text-left text-sm font-medium text-button-info-default',
                                             {
                                                  'mt-0': errors.password,
                                             }
                                        )}
                                   >
                                        {t('login.forgetPasswordLabel')}
                                   </span>
                              </div>

                              <Captcha
                                   register={register}
                                   errors={errors}
                                   captcha={captchaData}
                                   onRefresh={handleRefetchCaptcha}
                                   setValue={setValue}
                                   getValues={getValues}
                              />

                              <div className={clsx('pt-6')}>
                                   <button
                                        data-cy="submit"
                                        className="w-full rounded-2xl bg-button-primary-default py-4 text-2xl font-medium text-content-white"
                                   >
                                        {t('login.confirmLogin')}
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>

               <div className="relative h-full w-full basis-7/12 overflow-hidden rounded-[32px]">
                    <Swiper
                         spaceBetween={20}
                         slidesPerView={1}
                         autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                         }}
                         pagination={{
                              clickable: true,
                              bulletActiveClass: 'active',
                         }}
                         modules={[Pagination, Autoplay]}
                         centeredSlides={true}
                         className="h-full w-full"
                    >
                         {[1, 2, 3]?.map((slide, index) => (
                              <SwiperSlide key={index} className="h-full w-full overflow-hidden">
                                   <div className="h-full w-full">
                                        <img
                                             className="h-full w-full overflow-hidden object-cover"
                                             src="/assets/images/trade-room.png"
                                             alt="Trade Room"
                                        />

                                        <div
                                             className="absolute inset-0 z-10 overflow-hidden"
                                             style={{
                                                  background:
                                                       'linear-gradient(180deg, rgba(0, 3, 64, 0.5) 0%, rgba(0, 3, 64, 0.8) 100%)',
                                             }}
                                        ></div>
                                   </div>
                              </SwiperSlide>
                         ))}
                    </Swiper>

                    <div className="absolute left-6 top-6 z-50">
                         <RamandIcon />
                    </div>

                    <div className="absolute bottom-32 left-1/2 z-50 -translate-x-1/2">
                         <span className="text-4xl font-bold text-white">افزایش سرعت و کارایی معاملات</span>
                    </div>
               </div>
          </main>
     );
};

export default Login;
