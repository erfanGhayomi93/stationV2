interface IGTAuthorizationRequestType {
     password: string;
     captchaValue: string;
     captchaKey: string;
     term: string;
}

interface IGTAuthorizationResultType {
     message: string;
     token: string;
     expireDate: number;
     loginResultType:
          | 'Successful'
          | 'ChangePassword'
          | 'ForceForgetPassword'
          | 'ForceChangePassword'
          | 'TwoFactor'
          | 'UserOrPasswordNotValid'
          | 'InvalidRequest'
          | 'CookieRemove'
          | 'InvalidCaptcha'
          | 'OtpIsNotValid'
          | 'OtpTooRequest'
          | 'UserIsLock'
          | 'UserIsNotApproved'
          | 'OtpExpired'
          | 'TooRequestAttempt';
}

interface IGetCaptchaType {
     key: string;
     base64String: string;
     result: 'TooRequest' | 'Success';
}

type ISubmitOtpModuleType = {
     otp: string;
     captchaValue: string;
     captchaKey: string;
     token: string;
     mobile: string;
     userName: string;
};

interface IFormForgetPasswordRequest {
     userName?: string;
     mobile?: string;
     captchaValue?: string;
     retryToken?: string;
}

interface ISubmitForgetPasswordRequest extends IFormForgetPasswordRequest {
     captchaKey?: string;
}

interface IResultForgetPasswordRequest {
     expireDate: number;
     retryToken: string;
     starredMessage: string;
}

interface ISubmitForgetPasswordValidation {
     otp: string;
     captchaValue: string;
     captchaKey: string;
     mobile: string;
     userName: string;
}

interface ISubmitForgetPasswordChange {
     otp: string;
     captchaValue: string;
     captchaKey: string;
     mobile: string;
     userName: string;
     newPassword: string;
}

interface ISubmitChangePasswordValidation {
     otp: string;
     captchaValue: string;
     captchaKey: string;
}

interface ISubmitChangePasswordSetPassword {
     otp: string;
     captchaValue: string;
     captchaKey: string;
     currentPassword: string;
     newPassword: string;
}
