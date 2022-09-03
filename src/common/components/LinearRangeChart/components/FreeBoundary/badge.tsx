import React, { HTMLAttributes, useEffect, useState } from "react";
import { positionPercentage, seprate } from "../../helper";
import { ReactComponent as TriangleIcon } from "./Triangle.svg";

interface Props {
	boundaryData: twoParameterArray;
	thresholdData: twoParameterArray;
	originData: number;
	negativeColor?: string;
	positiveColor?: string;
}

const Badge: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	boundaryData,
	originData,
	negativeColor = "#ff8282",
	positiveColor = "#2db5e0",
	thresholdData,
}) => {
	const [position, setPosition] = useState([50, 50]);
	const [compact, setCompact] = useState([false, false]);
	useEffect(() => {
		const positiveBadge = positionPercentage(
			[thresholdData[0], thresholdData[1]],
			boundaryData[1]
		);
		const negativeBadge = positionPercentage(
			[thresholdData[0], thresholdData[1]],
			boundaryData[0]
		);
		setPosition([negativeBadge, positiveBadge]);

		const compactPositive =
			boundaryData[0] >= originData &&
			Math.round(positiveBadge - negativeBadge) * 10 < 40
				? true
				: false;
		const compactNegative =
			boundaryData[0] <= originData &&
			Math.round(positiveBadge - negativeBadge) * 10 < 40
				? true
				: false;
		setCompact([compactNegative, compactPositive]);
	}, [boundaryData, originData]);

	return (
		<div
			className="lc-absolute lc-top-0 lc-w-full"
			style={{ padding: "0 10px" }}
		>
			<div
				className="lc-relative  -lc-translate-y-full lc-overflow-hidden"
				style={{ width: "100%", height: "32px" }}
			>
				{/*  */}
				<div
					className="lc-absolute lc-w-full lc-duration-300"
					style={{ transform: `translateX(${position[1]}%)` }} //
				>
					<div
						className={`lc-absolute ${
							(100 - position[1]) * 10 > 27
								? "-lc-translate-x-1/2 "
								: "-lc-translate-x-full"
						}`}
						style={{
							width: "40px",
						}}
					>
						<div
							style={{
								backgroundColor:
									boundaryData[1] >= originData
										? positiveColor
										: negativeColor,
								color: "white",
								opacity: `${compact[0] ? "0" : "100"}`,
								width: compact[1] ? "90px" : "40px",
								transform: compact[1]
									? boundaryData[1] === boundaryData[0] &&
									  (100 - position[1]) * 10 > 27
										? "translateX(-28%)"
										: "translateX(-50%)"
									: "none",
							}}
							className={`lc-font-semibold lc-text-sm lc-text-center   ${
								(100 - position[1]) * 10 > 27
									? "lc-rounded "
									: "lc-rounded lc-rounded-br-none"
							}`} // +- lc-translate-x-1/2
						>
							{compact[1]
								? `${seprate(boundaryData[0])} - ${seprate(
									boundaryData[1]
								  )} `
								: seprate(boundaryData[1])}
						</div>
						<div
							style={{ top: "-1px" }}
							className=" lc-relative lc-overflow-hidden lc-h-3"
						>
							<TriangleIcon
								className={`lc-rotate-180 lc-scale-x-125 lc-absolute -lc-top-0.5  -lc-translate-x-1/2 ${
									(100 - position[1]) * 10 > 27
										? "lc-left-1/2 "
										: "lc-left-full"
								}`}
								height={11}
								style={{
									color:
										boundaryData[1] >= originData
											? positiveColor
											: negativeColor,
								}}
							/>
						</div>
					</div>
				</div>
				{/*  */}
				{/*  */}
				<div
					className="lc-absolute lc-w-full lc-duration-300"
					style={{
						transform: `translateX(${position[0]}%)`,
					}} //
				>
					<div
						className={`lc-absolute ${
							position[0] * 10 < 27
								? "lc-translate-x-0"
								: "-lc-translate-x-1/2 "
						}`}
						style={{
							width: "40px",
						}}
					>
						<div
							style={{
								backgroundColor:
									boundaryData[0] >= originData
										? positiveColor
										: negativeColor,
								opacity: `${compact[1] ? "0" : "100"}`,
								color: "white",
								width: compact[0] ? "90px" : "40px",
								transform: compact[0]
									? boundaryData[1] === boundaryData[0] &&
									  position[0] * 10 > 27
										? "translateX(-28%)"
										: "none"
									: "none",
							}}
							className={`lc-font-semibold lc-text-sm lc-text-center  ${
								position[0] * 10 < 27
									? "lc-rounded lc-rounded-bl-none"
									: "lc-rounded "
							}`} // +- lc-translate-x-1/2
						>
							{compact[0]
								? `${seprate(boundaryData[0])} - ${seprate(
									boundaryData[1]
								  )} `
								: seprate(boundaryData[0])}
						</div>
						<div
							style={{ top: "-1px" }}
							className=" lc-relative lc-overflow-hidden lc-h-3"
						>
							<TriangleIcon
								className={`lc-rotate-180 lc-scale-x-125 lc-absolute -lc-top-0.5  -lc-translate-x-1/2 ${
									position[0] * 10 < 27
										? "lc-left-0"
										: "lc-left-1/2 "
								}`}
								height={11}
								style={{
									color:
										boundaryData[0] >= originData
											? positiveColor
											: negativeColor,
								}}
							/>
						</div>
					</div>
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default Badge;
