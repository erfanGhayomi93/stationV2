import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { base64 } from 'src/utils/helpers';
import { useCaptcha, useLoginFormSubmit } from './queries';

const Login = () => {
    //
    const [userString, setUserString] = useState('');
    const [passString, setPassString] = useState('');

    const [captchaValue, setCaptchaValue] = useState('');

    const { t } = useTranslation();

    const { data: captchaData, isFetching } = useCaptcha();
    const { isLoading, mutate: loginFormSubmit } = useLoginFormSubmit();

    const onSubmitClick = () => {
        loginFormSubmit({
            productType: 'Local',
            requestUri: '',
            token: '',
            captchaValue: captchaValue,
            captchaKey: captchaData?.key,
            password: base64.encode(passString),
            term: userString,
        });
    };

    return (
        <div className="w-1/3 flex flex-col mx-auto text-center pt-10">
            <div>{t('Login.title')}</div>
            <br />
            <input
                name="username"
                placeholder="username"
                className="border"
                type="text"
                value={userString}
                onChange={(e) => setUserString(e.target.value)}
            />
            <br />
            <input
                name="password"
                placeholder="password"
                className="border"
                type="text"
                value={passString}
                onChange={(e) => setPassString(e.target.value)}
            />
            <br />
            <input
                className="border"
                type="text"
                placeholder="captcha"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e?.target?.value || '')}
            />
            <br />
            <div>
                <img className="mr-2" style={{ height: '30px' }} src={captchaData?.base64String || ''} alt="captcha" />
            </div>
            <br />
            <button className="bg-gray-200 hover:bg-slate-300" onClick={onSubmitClick}>
                Submit
            </button>
        </div>
    );
};

export default Login;
