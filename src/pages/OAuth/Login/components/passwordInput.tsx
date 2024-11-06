import { forwardRef, useEffect, useRef, useState } from 'react';

import { EyeIcon, EyeSlashIcon, KeyboardIcon, KeyboardSlashIcon, LockIcon } from '@assets/icons';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { VirtualKeyboard } from './VirtualKeyboard';

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
     ({ register, error, name, labelInput, setValues, watch, placeHolder, className = '', strech }: passwordInputType, _ref) => {
          const [isShowCurrentPassword, setIsShowCurrentPassword] = useState<boolean>(false);
          const [isVisibleCurrentKeypad, setIsVisibleCurrentKeypad] = useState<boolean>(false);

          const keyboardRef = useRef<any>(null);

          const onlyEnglishAlphabetsRegex = (str: string) => {
               if (!/[^a-zA-Z0-9!@#$%^&*()[\]{};'\\/\-_+=.,<>|":;]/gi.test(str)) {
                    return true;
               }
               return 'برای ورود رمزعبور، از صفحه کلید انگلیسی استفاده نمایید.';
          };

          useEffect(() => {
               keyboardRef.current.setInput(watch(name));
          }, [watch(name)]);

          const { t } = useTranslation();

          const handleChangeKeyboard = (input: string) => {
               setValues(name, input, { shouldValidate: true });
          };

          return (
               <div className="group relative">
                    <Input
                         id={name + '-changePassword'}
                         {...register(`${name}`, {
                              validate: onlyEnglishAlphabetsRegex,
                              required: {
                                   value: true,
                                   message: t('validation.InputRequired', {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        //@ts-expect-error
                                        n: t(`${labelInput}`),
                                   }),
                              },
                         })}
                         name={name}
                         placeholder={placeHolder}
                         inputClassName="ltrInsert"
                         type={!isShowCurrentPassword ? 'password' : 'text'}
                         data-cy="password"
                         addonAfter={
                              <div className="flex items-center gap-2 pl-4">
                                   {isShowCurrentPassword ? (
                                        <EyeIcon
                                             className="cursor-pointer text-icon-default"
                                             onClick={() => setIsShowCurrentPassword(prev => !prev)}
                                             width={17}
                                             height={17}
                                        />
                                   ) : (
                                        <EyeSlashIcon
                                             className="cursor-pointer text-icon-default"
                                             onClick={() => setIsShowCurrentPassword(prev => !prev)}
                                             width={17}
                                             height={17}
                                        />
                                   )}

                                   {isVisibleCurrentKeypad ? (
                                        <KeyboardSlashIcon
                                             className="cursor-pointer text-icon-default"
                                             onClick={() => setIsVisibleCurrentKeypad(false)}
                                             width={15}
                                             height={15}
                                        />
                                   ) : (
                                        <KeyboardIcon
                                             className="cursor-pointer text-icon-default"
                                             onClick={() => setIsVisibleCurrentKeypad(true)}
                                             width={15}
                                             height={15}
                                        />
                                   )}
                              </div>
                         }
                         textError={error?.message}
                         icon={<LockIcon />}
                    />

                    <VirtualKeyboard
                         visibleKeypad={isVisibleCurrentKeypad}
                         setVisibleKeypad={setIsVisibleCurrentKeypad}
                         onChange={handleChangeKeyboard}
                         ref={keyboardRef}
                         strech={strech}
                    />
               </div>
          );
     }
);

PasswordInput.displayName = 'PasswordInput';
