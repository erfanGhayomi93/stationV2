import { RefreshIcon, ShieldIcon } from '@assets/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface CaptchaType {
     register: UseFormRegister<any>;
     errors: any;
     captcha: IGetCaptchaType | undefined;
     onRefresh: () => void;
     className?: string;
     setValue: UseFormSetValue<any>;
     getValues: UseFormGetValues<any>;
}

export const Captcha = ({ register, errors, captcha, onRefresh, className = '', setValue, getValues }: CaptchaType) => {
     const { t } = useTranslation();

     const genarateNumber = () => {
          return Math.floor(Math.random() * 1000);
     };

     const randomNum = genarateNumber();
     const [state, setState] = useState('');

     // const placeHolder = t(`FormSide.Input.Captcha.Placeholder`);
     const placeHolder = t('login.inputCaptchaLabel');

     const { name, ref } = register('captchaValue', {
          required: {
               value: true,
               message: t('validation.InputRequired', {
                    n: t('login.inputCaptchaLabel'),
               }),
          },
          minLength: {
               value: 5,
               message: t('validation.InputDigits', {
                    n: 5,
               }),
          },
     });

     const getSessionCaptcha = sessionStorage.getItem('isInvalidCaptcha');
     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;
          // if (value.length >= 5 && state.length === 4) {
          //   console.log("to be have to blur")
          //   e.target.blur()
          // }
          if (value.length > 5) return;
          setState(value);
     };

     useEffect(() => {
          const valueForm = getValues(name);
          if (valueForm !== state) {
               setValue(name, state, { shouldValidate: true });
          }
     }, [state]);

     useEffect(() => {
          const valueForm = getValues(name);
          if (valueForm !== state) {
               setState(valueForm);
          }
     }, [getValues(name)]);

     useEffect(() => {
          const handleFocus = () => {
               // Refetch data when the window gains focus or becomes visible
               if (document.visibilityState === 'visible') {
                    onRefresh();

                    // isInitialMount.current = false;
               }
          };

          // Set up event listeners for visibilitychange and focus
          if (typeof window !== 'undefined' && window.addEventListener) {
               window.addEventListener('visibilitychange', handleFocus, false);
          }

          return () => {
               // Clean up event listeners
               if (typeof window !== 'undefined' && window.removeEventListener) {
                    window.removeEventListener('visibilitychange', handleFocus);
               }
          };
     }, []);

     return (
          <div
               className={clsx(
                    'group relative z-10 h-14 rounded-2xl border border-input-default bg-transparent focus-within:border-input-primary',
                    {
                         'border-input-error': !!errors.captchaValue,
                    },
                    className
               )}
          >
               {/* <label htmlFor={'captcha' + randomNum} className="text-L-gray-700 dark:text-D-gray-700 mb-2 block font-medium">
                    {t('login.inputCaptchaLabel')}
               </label> */}
               <div className="relative flex h-full items-center justify-between pr-4">
                    <div className="flex flex-1 items-center gap-2">
                         <div>
                              <ShieldIcon className="text-content-placeholder" />
                         </div>
                         <div className="flex-1">
                              <input
                                   data-cy="captcha"
                                   id={'captcha' + randomNum}
                                   type="number"
                                   inputMode="numeric"
                                   dir="ltr"
                                   placeholder=""
                                   className={clsx(
                                        'relative z-20 h-full w-full border-none bg-transparent pl-2 text-content-title outline-none placeholder:text-right placeholder:text-content-placeholder',
                                        {
                                             'h-full w-full border-none outline-none': !!errors.captchaValue,
                                        }
                                   )}
                                   ref={ref}
                                   name={name}
                                   value={state}
                                   onChange={handleOnChange}
                              />
                         </div>
                         <div className="absolute right-12 top-1/2 z-10 -translate-y-1/2 text-content-placeholder transition-all duration-100 group-focus-within:-top-1 group-focus-within:right-4 group-focus-within:bg-back-surface group-focus-within:p-2 group-focus-within:text-xs group-focus-within:text-input-primary group-focus-within:after:content-['*']">
                              {placeHolder}
                         </div>
                    </div>

                    <div className="flex items-center">
                         <div className="flex cursor-pointer items-center pl-1">
                              <RefreshIcon
                                   className="text-icon-default"
                                   onClick={e => {
                                        document.getElementById('captcha' + randomNum)?.focus();
                                        onRefresh();
                                   }}
                              />
                         </div>
                         <div className="ml-2 select-none items-center bg-transparent">
                              {!captcha?.base64String || getSessionCaptcha ? (
                                   <p>{t('login.pleaseTryAgain')}</p>
                              ) : (
                                   <img
                                        src={captcha?.base64String}
                                        // src={"/assets/images/defaultCaptcha.png"}
                                        width="180px"
                                        height="100%"
                                        alt=""
                                        className="h-[37px] object-fill"
                                   />
                              )}
                         </div>
                    </div>
               </div>

               {!!errors.captchaValue && (
                    <p className="pt-2 text-xs text-input-error transition-all">{errors.captchaValue.message}</p>
               )}
          </div>
     );
};

export default Captcha;
