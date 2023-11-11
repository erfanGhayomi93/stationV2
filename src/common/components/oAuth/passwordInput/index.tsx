import { forwardRef, useEffect, useRef, useState } from 'react';

import { VirtualKeyboard } from '../VirtualKeyboard';
import {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { EyeOffOutlineSVG, EyeOutlineSVG, KeyboardHide, KeyboardIcon, KeyboardShow } from 'src/common/icons';
import Input from '../../Input';
import { onlyEnglishAlphabetsRegex } from '../validations/changePassword';

interface passwordInputType {
    register: UseFormRegister<any>;
    error: any;
    setValues: UseFormSetValue<any>;
    name: string;
    labelInput: string;
    watch: UseFormWatch<any>;
    className?: string;
    placeHolder?: any;
    strech?: boolean;
}

export const PasswordInput = forwardRef(
    (
        {
            register,
            error,
            name,
            labelInput,
            setValues,
            watch,
            placeHolder,
            className = '',
            strech,
        }: passwordInputType,
        _ref
    ) => {
        const [isShowCurrentPassword, setIsShowCurrentPassword] =
            useState<boolean>(false);
        const [isVisibleCurrentKeypad, setIsVisibleCurrentKeypad] =
            useState<boolean>(false);

        const keyboardRef = useRef<any>(null);

        useEffect(() => {
            keyboardRef.current.setInput(watch(name));
        }, [watch(name)]);

        const { t } = useTranslation();

        const handleChangeKeyboard = (input: string) => {
            setValues(name, input, { shouldValidate: true });
        };

        return (
            <>
                <Input
                    id={name + "-changePassword"}
                    {...register(`${name}`, {
                        validate: onlyEnglishAlphabetsRegex,
                        required: {
                            value: true,
                            message: t('Errors.Input.Required', {
                                n: t(`${labelInput}`),
                            }),
                        },
                    })}
                    name={name}
                    placeholder={placeHolder}
                    inputClassName="ltrInsert"
                    containerClassName='mt-2 !h-10'
                    type={!isShowCurrentPassword ? 'password' : 'text'}
                    data-cy="password"
                    addonAfter={
                        <div className='flex items-center'>
                            {isShowCurrentPassword ? (
                                <EyeOffOutlineSVG
                                    className="text-L-gray-500 dark:text-D-gray-500 cursor-pointer"
                                    onClick={() => setIsShowCurrentPassword((prev) => !prev)}
                                    width={17}
                                    height={17}
                                />
                            ) : (
                                <EyeOutlineSVG
                                    className="text-L-gray-500 dark:text-D-gray-500 cursor-pointer"
                                    onClick={() => setIsShowCurrentPassword((prev) => !prev)}
                                    width={17}
                                    height={17}
                                />
                            )}

                            {isVisibleCurrentKeypad ? (
                                <KeyboardHide
                                    className="text-L-gray-500 dark:text-D-gray-500 mr-2 cursor-pointer"
                                    onClick={() => setIsVisibleCurrentKeypad(false)}
                                    width={15}
                                    height={15}
                                />
                            ) : (
                                <KeyboardShow
                                    className="text-L-gray-500 dark:text-D-gray-500 mr-2 cursor-pointer"
                                    onClick={() => setIsVisibleCurrentKeypad(true)}
                                    width={15}
                                    height={15}
                                />
                            )}
                        </div>
                    }
                    textError={error?.message}
                />

                <VirtualKeyboard
                    visibleKeypad={isVisibleCurrentKeypad}
                    setVisibleKeypad={setIsVisibleCurrentKeypad}
                    onChange={handleChangeKeyboard}
                    ref={keyboardRef}
                    strech={strech}
                />
            </>
        );
    }
);

PasswordInput.displayName = "PasswordInput"