// import { CloseRoundIcon, ErrorRoundIcon, SuccessRoundIcon } from 'common/Icons';

import { CloseRoundIcon, ErrorRoundIcon, SuccessRoundIcon } from "src/common/icons";

interface RadioValidateType {
  value: string;
}

export const RadioValidate = ({ value }: RadioValidateType) => {

  const roundIcon = (reg1: RegExp) => {
    if (value === '') {
      return <CloseRoundIcon />;
    }
    else if (!reg1?.test(value)) {
      return <ErrorRoundIcon />;
    } else {
      return <SuccessRoundIcon />;
    }
  };

  return (
    <div className="flex justify-start gap-x-10 gap-y-2 row flex-wrap mt-1">
      <div className="flex justify-start items-center gap-1 mt-1 max-[390px]:ml-[21px]">
        {roundIcon(/^[×a-zA-Z0-9!@#$%^&*()[\]{};'\\/\-_+=.,<>|":;]+$/gi)}
        <span className="text-1">فقط حروف انگلیسی</span>
      </div>
      <div className="flex justify-start items-center gap-1 mt-1 mr-[21px] max-[390px]:mr-0">
        {roundIcon(/(?=.*[a-z])(?=.*[A-Z])/g)}
        <span className="text-1">شامل حروف بزرگ و کوچک انگلیسی</span>
      </div>
      <div className="flex justify-start items-center gap-1 mt-1">
        {roundIcon(/(?=.*[1-9])(?=.*[!@#$%^&*(),.?":{}|<>])/g)}
        <span className="text-1">شامل عدد و کاراکتر خاص</span>
      </div>
      <div className="flex justify-start items-center gap-1 mt-1">
        {roundIcon(/.{8,}/i)}
        <span className="text-1 ml-4">حداقل ۸ کاراکتر</span>
      </div>
    </div>
  );
};
