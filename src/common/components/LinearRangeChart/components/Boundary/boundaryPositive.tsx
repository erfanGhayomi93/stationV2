import React from "react";
import { TriangleIcon } from "../../Icons";

export function boundaryPositive(
  origin: number,
  position: number[],
  positiveColor: string,
  boundarySetting: BoundarySettingType | undefined,
  boundaryIcons: StartEndIcon | undefined,
  boundaryData: twoParameterArray,
  thresholdData: twoParameterArray,
  originData: number
) {
  return (
    <div
      style={{
        width: `${100 - origin}%`,
        left: `${origin}%`,
      }}
      className=" lc-w-full  lc-h-full  lc-absolute lc-left-1/2"
    >
      <div
        className=" lc-w-full lc-h-full"
        style={
          (((originData - thresholdData[0]) * 100) /
            (thresholdData[1] - thresholdData[0])) *
            10 <
          6
            ? {
                paddingRight: "10px",
                paddingLeft: "10px",
              }
            : {
                paddingRight: "10px",
              }
        }
      >
        <div
          style={{
            transform: `scaleX(${position[1]})`,
            backgroundColor: positiveColor,
          }}
          className={` lc-w-full  lc-h-full   lc-opacity-90  lc-duration-300  lc-origin-left   ${boundarySetting?.boundaryEndClassName} `}
        ></div>
      </div>

      <div className=" lc-relative  lc-w-full  lc-overflow-hidden  lc-h-6 -lc-top-3 ">
        {boundaryIcons ? (
          <div
            className={` lc-absolute lc-z-20  lc-w-full lc-left-0 lc-h-3 lc-top-0 ${
              position[1] * 100 === 0 ? " lc-opacity-0 " : ""
            }`}
          >
            <div
              style={{
                transform: `translateX(${position[1] * 100 - 50}%)`,
                color: positiveColor,
                marginRight: "10px",
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
            className={` lc-absolute lc-z-20  lc-w-full lc-left-0 lc-h-2 lc-duration-300 lc-top-0 lc-translate-y-10 ${
              position[1] * 100 === 0 ? " lc-opacity-0 " : ""
            }`}
          >
            <div
              style={{
                transform: `translateX(${position[1] * 100 - 50}%)`,
                marginRight: "10px",
              }}
              className=" lc-origin-right  lc-duration-300 "
            >
              <div
                datatype={`${position[1] * 100}`}
                style={{
                  backgroundColor: positiveColor,
                  transform: `translateX(${
                    position[1] * 100 > 97 ? "0" : "50"
                  }%)`,
                }}
                className={` lc-absolute lc-right-1/2 lc-translate-x-1/2 -lc-top-8 after:lc-z-0  lc-text-white  lc-font-semibold  lc-text-sm   lc-rounded lc-px-1 ${
                  position[1] * 100 > 97 ? "lc-rounded-br-none " : ""
                } `}
              >
                {boundaryData[1]}
                <div className=" lc-absolute lc-left-0 lc-flex    lc-w-full  lc-justify-center  lc-overflow-hidden  -lc-mb-2">
                  <TriangleIcon
                    style={{
                      color: positiveColor,
                    }}
                    className={` lc-rotate-180 lc-scale-75 lc-scale-x-110  -lc-mt-1 ${
                      position[1] * 100 > 97
                        ? " -lc-mr-3.5 lc-translate-x-full "
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
    </div>
  );
}
