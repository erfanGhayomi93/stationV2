import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForgetPasswordRequestMutate, useForgetPasswordValidationMutate } from 'src/app/queries/oAuth'
import ipcMain from 'src/common/classes/IpcMain'
import OtpModule from 'src/widgets/otp'

const ValidationForgetPassword = () => {
    const navigate = useNavigate()
    const { pathname, state } = useLocation()
    const { mobile, userName, retryToken } = state || {}

    const { mutate } = useForgetPasswordValidationMutate({
        onSuccess(data, variables) {
            if (data.succeeded) {
                navigate("/forgetPassword/changePassword", {
                    state: {
                        mobile: variables.mobile,
                        userName: variables.userName,
                        otp: variables.otp
                    }
                })
            } else {
                ipcMain.send("Refresh-captcha")
            }
        },
        onError() {
            ipcMain.send("Refresh-captcha")
        }
    })

    const NavigateBack = () => {
        navigate("forgetPassword")
    }

    const { mutate: mutateSendCode } = useForgetPasswordRequestMutate({
        onSuccess(data) {
            if (data.succeeded) {
                const { result: { expireDate, retryToken, starredMessage } } = data;
                navigate(pathname, {
                    state: {
                        expireDate,
                        retryToken,
                        starredMessage,
                        mobile: mobile,
                        userName: userName,
                    }
                })
            } else {
                NavigateBack()
            }
        },
        onError() {
            NavigateBack()
        },
    })

    const SendCodeAgainApi = () => {
        mutateSendCode({
            retryToken,
            userName,
            mobile
        })
    }

    const handleSubmitOtp = (data: ISubmitOtpModuleType) => {
        const { token, ...other } = data
        mutate(other)
    }

    return (
        <div>
            <OtpModule {...{ handleSubmitOtp, SendCodeAgainApi }} />
        </div>
    )
}


export default ValidationForgetPassword
