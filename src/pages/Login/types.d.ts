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
