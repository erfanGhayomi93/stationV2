import clsx from 'clsx';
import { UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Refresh2Icon } from 'src/common/icons';

interface CaptchaType {
  register: UseFormRegister<any>;
  errors: any;
  captcha: IGetCaptchaType | undefined;
  onRefresh: () => void;
  className?: string;
  setValue: UseFormSetValue<any>,
  getValues: UseFormGetValues<any>,
}

export const Captcha = ({
  register,
  errors,
  captcha,
  onRefresh,
  className = '',
  setValue,
  getValues
}: CaptchaType) => {

  const genarateNumber = () => {
    return Math.floor(Math.random() * 1000);
  };

  const randomNum = genarateNumber();
  const [state, setState] = useState("")
  const { t } = useTranslation();

  // const placeHolder = t(`FormSide.Input.Captcha.Placeholder`);
  const placeHolder = "کد امنیتی را وارد کنید";

  const { name, ref } = register('captchaValue', {
    required: {
      value: true,
      message: t('Errors.Input.Required', {
        n: t('FormSide.Input.Captcha.Label'),
      }),
    },
    minLength: {
      value: 5,
      message: t('Errors.Input.Digits', {
        n: 5,
      }),
    },
  })

  const getSessionCaptcha = sessionStorage.getItem("isInvalidCaptcha")
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // if (value.length >= 5 && state.length === 4) {
    //   console.log("to be have to blur")
    //   e.target.blur()
    // }
    if (value.length > 5) return
    setState(value)
  }

  useEffect(() => {
    const valueForm = getValues(name)
    if (valueForm !== state) {
      setValue(name, state, { shouldValidate: true })
    }
  }, [state])

  useEffect(() => {
    const valueForm = getValues(name)
    if (valueForm !== state) {
      setState(valueForm)
    }
  }, [getValues(name)])


  return (
    <div className={className}>
      <label
        htmlFor={'captcha' + randomNum}
        className="block mb-2 text-L-gray-700 dark:text-D-gray-700 font-medium"
      >
        {t(`FormSide.Input.Captcha.Label`)}
      </label>
      <div className="relative">
        <input
          data-cy="captcha"
          id={'captcha' + randomNum}
          type="number"
          inputMode="numeric"
          placeholder={placeHolder}
          className={clsx(
            'ltrInsert tracking-[10px] placeholder:tracking-normal text-center border border-L-gray-400 dark:border-D-gray-400 outline-none w-full h-[40px] rounded px-4  placeholder:text-L-gray-500 dark:placeholder:text-D-gray-500 bg-L-basic pl-[215px]',
            {
              '!border-L-error-150 outline-none': !!errors.captchaValue,
            }
          )}
          ref={ref}
          name={name}
          value={state}
          onChange={handleOnChange}
        />

        <div className="absolute top-[1px] left-[2px] flex items-center bg-transparent w-[180px] h-full select-none">
          {
            !captcha?.base64String || getSessionCaptcha ? (
              <p className='bg-gray-100 w-full h-[37px] mb-[1px] flex justify-center items-center rounded text-sm'>
                لطفا مجددا تلاش کنید.
              </p>
            ) : (
              <img
                src={captcha?.base64String}
                // src={"/assets/images/defaultCaptcha.png"}
                width="180px"
                height="100%"
                alt=""
                className="object-fill h-[37px] mb-1"
              />
            )
          }

        </div>
        <div className="absolute inset-y-0 left-[184px] flex items-center pl-1 cursor-pointer">
          <Refresh2Icon
            className="text-L-primary-50 dark:text-D-primary-50"
            onClick={(e) => {
              document.getElementById('captcha' + randomNum)?.focus()
              onRefresh()
            }}
          />
        </div>
      </div>

      {!!errors.captchaValue && (
        <p className="text-L-error-300 dark:text-D-error-300 transition-all text-xs pt-1">
          {errors.captchaValue.message}
        </p>
      )}
    </div>
  );
};

export default Captcha;