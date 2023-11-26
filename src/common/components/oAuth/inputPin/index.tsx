import clsx from 'clsx';
import { FC, useState, useRef } from 'react';
import { PatternFormat } from 'react-number-format';
import Timer from '../Timer';
import { useTranslation } from 'react-i18next';
import { calcExpireDate } from 'src/utils/helpers';

type InputPinType = {
  sendCodeAgain: () => void;
  value: string;
  onChange: (val: string) => void;
  expireDate: any;
};

const InputPin: FC<InputPinType> = ({
  sendCodeAgain,
  value,
  onChange,
  expireDate,
}) => {
  const [inTime, setInTime] = useState<boolean>(true);
  const [isFocus, setIsFocus] = useState(true);
  const { minutes, seconds } = calcExpireDate(expireDate)

  let refInputPin = useRef<any>();

  const { t } = useTranslation()


  const timeIsDown = () => {
    setInTime(false);
  };

  const clickSendCode = () => {
    sendCodeAgain();
    setInTime(true);
    const clear = setTimeout(() => {
      clearTimeout(clear)
    }, 2000);
  };

  const handleClickRetryOtp = () => {
    if (inTime) {
      return null;
    } else {
      clickSendCode();
      onChange('');
      refInputPin?.current.focus();
      setIsFocus(true);
    }
  };

  return (
    <div>
      <div className="flex flex-row-reverse items-center">
        <div
          onClick={handleClickRetryOtp}
          data-actived={isFocus}
          className={clsx(
            'actived:border-L-info-100 inset-y-0 left-0 border border-r-0  h-[42px] leading-[42px] px-4 border-L-gray-400 rounded-l bg-L-basic whitespace-nowrap inline-block text-sm text-L-gray-500 dark:text-D-gray-500',
            {
              'border-L-info-100': isFocus,
            }
          )}
        >
          {inTime ? (
            <Timer
              initialMinute={minutes}
              initialSeconds={seconds}
              timeIsDown={timeIsDown}
            />
          ) : (
            t(`FormSide.ResendCode`)
          )}
        </div>
        <PatternFormat
          className="border grow text-center ltr border-L-gray-400 outline-none w-full h-[42px] rounded-r rounded-l-none px-4 placeholder:text-xs placeholder:text-L-gray-500 bg-L-basic focus:border-L-info-100"
          format="# # # # # #"
          allowEmptyFormatting
          mask="_"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          getInputRef={refInputPin}
          autoFocus
          autoComplete='one-time-code'
          type='text'
          inputMode='numeric'
        />
      </div>
      <span className="text-L-gray-600 dark:text-D-gray-600 text-1 mt-1 inline-block">
        {/* (مدت اعتبار کد یکبار مصرف ارسال شده {(minutes ? minutes : "1") + (seconds ? "." + seconds : "")} دقیقه است) */}
        (مدت اعتبار کد یکبار مصرف ارسال شده 2 دقیقه است)
      </span>
    </div>
  );
};

export default InputPin;
