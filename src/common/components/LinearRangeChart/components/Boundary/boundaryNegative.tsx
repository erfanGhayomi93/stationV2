import React from "react";
import { TriangleIcon } from "../../Icons";

export function boundaryNegative(
  origin: number,
  position: number[],
  negativeColor: string,
  boundarySetting: BoundarySettingType | undefined,
  boundaryIcons: StartEndIcon | undefined,
  boundaryData: twoParameterArray,
  thresholdData: twoParameterArray,
  originData: number
) {
  return (
    <div
      style={{ width: `${origin}%`, right: `${100 - origin}%` }}
      className=" lc-w-full  lc-h-full   lc-absolute lc-right-1/2"
    >
      <div
        className=" lc-w-full lc-h-full"
        style={
          (((thresholdData[1] - originData) * 100) /
            (thresholdData[1] - thresholdData[0])) *
            10 <
          6
            ? {
                paddingLeft: "10px",
                paddingRight: "10px",
              }
            : {
                paddingLeft: "10px",
              }
        }
      >
        <div
          style={{
            transform: `scaleX(${position[0]})`,
            backgroundColor: negativeColor,
          }}
          className={` lc-w-full  lc-h-full   lc-opacity-90  lc-duration-300  lc-origin-right  ${boundarySetting?.boundaryStartClassName}`}
        ></div>
      </div>
      <div className=" lc-relative  lc-w-full  lc-overflow-hidden  lc-h-6 -lc-top-3">
        {boundaryIcons ? (
          <div
            className={` lc-absolute lc-z-20  lc-w-full lc-right-0 lc-h-3 lc-top-0  ${
              position[0] * 100 === 0 ? " lc-opacity-0 " : ""
            }`}
          >
            <div
              style={{
                transform: `translateX(${-(position[0] * 100) + 50}%)`,
                color: negativeColor,
                marginLeft: "10px",
              }}
              className=" lc-origin-right  lc-duration-300 "
            >
              {React.cloneElement(boundaryIcons?.end, {
                className:
                  boundaryIcons?.end.props.className +
                  "  lc-absolute lc-right-1/2 lc-translate-x-1/2 ",
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className=" lc-relative  lc-w-full  lc-overflow-hidden  lc-h-20 -lc-top-10 -lc-translate-y-8 ">
        {boundarySetting?.badge ? (
          <div
            className={` lc-absolute lc-z-20  lc-w-full lc-right-0  lc-duration-300 lc-h-2 lc-top-0  lc-translate-y-10 ${
              position[0] * 100 === 0 ? " lc-opacity-0 " : ""
            }`}
          >
            <div
              style={{
                transform: `translateX(${-(position[0] * 100) + 50}%)`,
                color: negativeColor,
                marginLeft: "10px",
              }}
              className=" lc-origin-right  lc-duration-300 "
            >
              <div
                style={{
                  backgroundColor: negativeColor,
                  transform: `translateX(${
                    position[0] * 100 > 97 ? "100" : "50"
                  }%)`,
                }}
                className={` lc-absolute lc-right-1/2 lc-translate-x-1/2 -lc-top-8 after:lc-z-0  lc-text-white  lc-font-semibold  lc-text-sm  lc-px-1  lc-rounded ${
                  position[0] * 100 > 97 ? "lc-rounded-bl-none " : ""
                } `}
              >
                {boundaryData[0]}
                <div className=" lc-absolute lc-left-0 lc-flex   lc-w-full lc-justify-center -lc-mb-2  lc-overflow-hidden ">
                  <TriangleIcon
                    style={{
                      color: negativeColor,
                    }}
                    className={` lc-rotate-180 lc-scale-75 lc-scale-x-110 -lc-mt-1 ${
                      position[0] * 100 > 97
                        ? " -lc-ml-3 -lc-translate-x-full "
                        : " "
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/*  */}
    </div>
  );
}
