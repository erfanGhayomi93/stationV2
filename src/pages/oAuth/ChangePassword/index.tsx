import { useNavigate } from 'react-router-dom'
import { useChangePasswordRequestMutate, useChangePasswordValidationMutate } from 'src/app/queries/oAuth'
import ipcMain from 'src/common/classes/IpcMain'
import OtpModule from 'src/widgets/otp'

const ChangePassword = () => {
    const navigate = useNavigate()

    const { mutate: mutateChangePasswordValidation } = useChangePasswordValidationMutate({
        onSuccess(data, variables) {
            if (data.succeeded) {
                navigate("/changePassword/setPassword", {
                    state: {
                        otp: variables.otp
                    }
                })
            } else {
                ipcMain.send("Refresh-captcha")
            }
        }, onError() {
            ipcMain.send("Refresh-captcha")
        },
    })

    const NavigateBack = () => {
        navigate("setting")
    }

    const { mutate: mutateSendCode } = useChangePasswordRequestMutate({
        onSuccess(data) {
            if (!data.succeeded) {
                NavigateBack()
            }
        },
        onError() {
            NavigateBack()
        },
    })

    const handleSubmitOtp = (data: ISubmitOtpModuleType) => {
        mutateChangePasswordValidation({
            captchaKey: data.captchaKey,
            captchaValue: data.captchaValue,
            otp: data.otp
        })
    }

    const SendCodeAgainApi = () => {
        mutateSendCode()
    }

    return <OtpModule {...{ handleSubmitOtp, SendCodeAgainApi }} />
}


export default ChangePassword


