import * as yup from 'yup';
import i18next from 'i18next';

export const changePasswordValidate = () => {
  const { t } = i18next;

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .nullable()
      .when(['isForget'], {
        is: (e: any) => !e,
        then: yup.string().required(
          t('Errors.Input.Required', {
            n: t('FormSide.Input.CurrentPassword.Label'),
          })!
        ),
        otherwise: yup.string(),
      }),
    newPassword: yup
      .string()
      .required(
        t('Errors.Input.Required', {
          n: t('FormSide.Input.NewPassword.Label'),
        })!
      )
      .test(
        '',
        t(`Errors.OnlyEnglish`, {
          n: t('FormSide.Input.NewPassword.Label'),
        })!,
        (val: any) =>
          !/[^a-zA-Z0-9!@#$%^&*()[\]{};'\\/\-_+=.,<>|":;]/gi.test(val)
      )
      .matches(
        /[A-Z]/,
        t(`Errors.IncludeUppercase`, {
          n: t('FormSide.Input.NewPassword.Label'),
        })!
      )
      .matches(
        /[a-z]/,
        t(`Errors.IncludeLowercase`, {
          n: t('FormSide.Input.NewPassword.Label'),
        })!
      )
      .matches(
        /[0-9]/,
        t(`Errors.IncludeNumbers`, {
          n: t('FormSide.Input.NewPassword.Label'),
        })!
      )
      .matches(/\W/, t(`Errors.IncludeSpecificChar`)!)
      .min(
        8,
        t(`Errors.Min8Length`, {
          n: t('FormSide.Input.NewPassword.Label'),
        })!
      )
      .test(
        '',
        'رمز عبور جدید باید متفاوت از رمز عبور قدیمی باشد.',
        (val, c) => val !== c.parent.currentPassword
      ),
    newPasswordConfirm: yup
      .string()
      .required(
        t('Errors.Input.Required', {
          n: t('FormSide.Input.ConfirmNewPassword.Label'),
        })!
      )
      .oneOf([yup.ref('newPassword'), null], t('Errors.NotEqualPassword')!),
    captchaValue: yup
      .string()
      .required(
        t('Errors.Input.Required', {
          n: t('FormSide.Input.Captcha.Label'),
        })!
      )
      .test(
        'length',
        t('Errors.Input.Digits', { n: 5 })!,
        (val) => String(val ?? '').length === 5
      ),
  });

  return schema;
};

export const onlyEnglishAlphabetsRegex = (str: string) => {
  if (!/[^a-zA-Z0-9!@#$%^&*()[\]{};'\\/\-_+=.,<>|":;]/gi.test(str)) {
    return true;
  }
  return 'برای ورود رمزعبور، از صفحه کلید انگلیسی استفاده نمایید.';
};
