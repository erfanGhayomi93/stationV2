import { useCaptcha, useLoginFormSubmit } from '@api/oAuth';
import { ProfileIcon, RamandIcon } from '@assets/icons';
import { setAuthorizeData } from '@config/axios';
import { base64 } from '@methods/helper';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Captcha from './components/Captch';
import Input from './components/Input';
import { PasswordInput } from './components/passwordInput';

type formDate = {
     username: string;
     password: string;
     captchaValue: string;
};

const Login = () => {
     const { t } = useTranslation();

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

     const { data: captchaData, refetch: refetchCaptcha, isFetching: isLoadingCaptcha } = useCaptcha();

     const handleRefetchCaptcha = (): void => {
          refetchCaptcha();
          resetField('captchaValue');
     };

     const { mutate: loginFormSubmit } = useLoginFormSubmit({
          onSuccess: result => {
               console.log(result, 'result');
               if (result.loginResultType === 'Successful') {
                    setAuthorizeData(result?.token);
                    navigate('/');
               }
          },
          onError: () => {
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

     console.log(errors, 'errors');

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
                         <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
                              <div>
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
                                        icon={<ProfileIcon />}
                                   />
                              </div>

                              <div className="flex flex-col gap-2">
                                   <div className="relative">
                                        <PasswordInput
                                             register={register}
                                             error={errors.password}
                                             setValues={setValue}
                                             name="password"
                                             labelInput={t('login.inputPasswordLabel')}
                                             placeHolder={t('login.inputPasswordLabel')}
                                             watch={watch}
                                        />
                                   </div>

                                   <span
                                        // onClick={() => navigate('/ForgetPassword')}
                                        className={clsx(
                                             'relative float-left mt-1 cursor-pointer text-left text-sm font-medium text-button-info-default',
                                             {
                                                  'mt-[-16px]': errors.password,
                                             }
                                        )}
                                   >
                                        {t('login.forgetPasswordLabel')}
                                   </span>
                              </div>

                              <div className="">
                                   <Captcha
                                        register={register}
                                        errors={errors}
                                        captcha={captchaData}
                                        onRefresh={handleRefetchCaptcha}
                                        setValue={setValue}
                                        getValues={getValues}
                                   />
                              </div>

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

               <div className="relative basis-7/12">
                    <img className="h-full w-full object-cover" src="/assets/images/trade-room.png" alt="Trade Room" />

                    <div
                         className="absolute inset-0 rounded-[32px]"
                         style={{
                              background: 'linear-gradient(180deg, rgba(0, 3, 64, 0.5) 0%, rgba(0, 3, 64, 0.8) 100%)',
                         }}
                    ></div>

                    <div className="absolute left-6 top-6">
                         <RamandIcon />
                    </div>

                    <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col gap-8">
                         <span className="text-4xl font-bold text-content-white">افزایش سرعت و کارایی معاملات</span>
                         <div className="flex items-center justify-center gap-2">
                              <div className="h-2 w-28 rounded-[32px] bg-[rgba(217,217,217,1)]"></div>
                              <div className="h-2 w-28 rounded-[32px] bg-[rgba(217,217,217,0.2)]"></div>
                              <div className="h-2 w-28 rounded-[32px] bg-[rgba(217,217,217,0.2)]"></div>
                         </div>
                    </div>
               </div>
          </main>
     );
};

export default Login;
