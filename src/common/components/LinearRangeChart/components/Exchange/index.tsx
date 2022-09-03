import React, { HTMLAttributes, useEffect, useState } from "react";
import { positionPercentage } from "../../helper";
import { DotIcon, ExcludeDotIcon } from "../../Icons";

interface Props {
  exchangeData: twoParameterArray;
  thresholdData: twoParameterArray;
  exchangeSetting?: ExchangeSettingType;
  exchangeIcons?: StartEndIcon;
}

const Exchange: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	exchangeIcons = {
		start: <DotIcon className="-lc-translate-y-1" />,
		end: <ExcludeDotIcon className="-lc-translate-y-1" />,
	},
	exchangeData,
	exchangeSetting,
	thresholdData,
}) => {
	const [position, setPosition] = useState([0, 0]);
	useEffect(() => {
		const startPosition = positionPercentage(thresholdData, exchangeData[0]);
		const EndPosition = positionPercentage(thresholdData, exchangeData[1]);
		setPosition([startPosition, EndPosition]);
	}, [thresholdData, exchangeData]);

	return (
		<div className=" lc-relative  lc-w-full  lc-overflow-hidden  lc-h-12 -lc-mb-12 -lc-top-4 ">
			<span
				style={{
					transform: `translateX(${position[0] < 0 ? 0 : position[0]}%)`,
					width: "calc(100% - 20px)",
					marginLeft: "10px",
				}}
				className={` lc-absolute lc-duration-300 lc-top-0 lc-z-20 lc-left-0 ${exchangeSetting?.exchangeStartClassName}`}
			>
				<span
					className=" lc-absolute  lc-w-0  lc-h-6 lc-left-0"
					title={exchangeData[0].toString()}
				>
					{React.cloneElement(exchangeIcons.start, {
						className:
              exchangeIcons.start.props.className +
              "  lc-absolute lc-right-1/2 lc-translate-x-1/2 ",
					})}
				</span>
			</span>

			<span
				style={{
					transform: `translateX(${position[1] < 0 ? 0 : position[1]}%)`,
					width: "calc(100% - 20px)",
					marginLeft: "10px",
				}}
				className={` lc-absolute lc-duration-300 lc-top-7 lc-z-20 lc-left-0   lc-w-full ${exchangeSetting?.exchangeEndClassName}`}
			>
				<span
					className=" lc-absolute  lc-w-0  lc-h-6 lc-left-0"
					title={exchangeData[1].toString()}
				>
					{React.cloneElement(exchangeIcons.end, {
						className:
              exchangeIcons.end.props.className +
              "  lc-absolute lc-right-1/2 lc-translate-x-1/2 ",
					})}
				</span>
			</span>
		</div>
	);
};

export default Exchange;
