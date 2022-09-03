import React, { HTMLAttributes, useEffect, useState } from "react";
import { positionPercentage } from "../../helper";
import { boundaryNegative } from "./boundaryNegative";
import { boundaryPositive } from "./boundaryPositive";

interface Props {
  boundaryData: twoParameterArray;
  thresholdData: twoParameterArray;
  originData: number;
  boundarySetting?: BoundarySettingType;
  boundaryIcons?: StartEndIcon;
  negativeColor?: string;
  positiveColor?: string;
}

const Boundary: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  boundaryIcons,
  boundaryData,
  boundarySetting,
  originData,
  negativeColor = "#ff8282",
  positiveColor = "#2db5e0",
  thresholdData,
}) => {
  const [position, setPosition] = useState([1, 1]);
  const [origin, setOrigin] = useState(50);

  useEffect(() => {
    const originPosition = positionPercentage(thresholdData, originData);
    setOrigin(originPosition);
  }, [thresholdData, originData]);

  useEffect(() => {
    const NegativePosition =
      (100 -
        positionPercentage([thresholdData[0], originData], boundaryData[0])) /
      100;

    const PositivePosition =
      positionPercentage([originData, thresholdData[1]], boundaryData[1]) / 100;

    console.log([NegativePosition, PositivePosition]);
    setPosition([NegativePosition, PositivePosition]);
    // setPosition([
    //   NegativePosition > 1 ? 1 : NegativePosition <= 0 ? 0 : NegativePosition,
    //   PositivePosition > 1 ? 1 : PositivePosition <= 0 ? 0 : PositivePosition,
    // ]);
  }, [origin, boundaryData]);

  return (
    <div
      // style={{
      //   padding: "0 20px",
      // }}
      className={`  lc-absolute lc-top-0 lc-z-10  lc-w-full ${boundarySetting?.className}`}
    >
      {boundaryPositive(
        origin,
        position,
        positiveColor,
        boundarySetting,
        boundaryIcons,
        boundaryData,
        thresholdData,
        originData
      )}

      {boundaryNegative(
        origin,
        position,
        negativeColor,
        boundarySetting,
        boundaryIcons,
        boundaryData,
        thresholdData,
        originData
      )}
    </div>
  );
};

export default Boundary;
