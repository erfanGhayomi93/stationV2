import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginFormSubmit } from './queries';

const Login = () => {
    //

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { t } = useTranslation();

    const { isLoading, mutate: loginFormSubmit } = useLoginFormSubmit();

    const onSubmitClick = useCallback(() => {
        loginFormSubmit({ userName, password });
    }, [userName, password]);

    return (
        <div className="w-1/3 flex flex-col mx-auto text-center pt-10">
            <div>{t('Login.title')}</div>
            <br />
            <input type="text" placeholder="username" value={userName} onChange={(e) => setUserName(e?.target?.value || '')} />
            <br />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e?.target?.value || '')} />
            <br />
            <button className="bg-gray-200 hover:bg-slate-300" onClick={onSubmitClick}>
                Submit
            </button>
        </div>
    );
};

export default Login;
