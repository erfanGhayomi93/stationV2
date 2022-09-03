import React, { HTMLAttributes, useEffect, useState } from "react";
import { seprate } from "../../helper";

interface Props extends RulerSettingType {
	thresholdData: twoParameterArray;
	ruler?: boolean;
}

const Ruler: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
	className = "lc-border-dashed lc-border-gray-400 lc-border-t-2",
	rulerClassName = " lc-text-gray-400 lc-h-8 lc-bg-slate-200",
	thresholdData,
	degree,
	ruler,
	step,
	threshold,
	children,
}) => {
	const [degrees, setDegrees] = useState([]);
	const [steps, setSteps] = useState([]);
	useEffect(() => {
		if (ruler && degree && degree > 1) {
			const distance =
				Math.ceil(
					((thresholdData[1] - thresholdData[0]) / degree) * 100
				) / 100;
			const stepArray = Array(step).fill(1);
			const degreeArray = Array(degree)
				.fill(null)
				.map((value, index) => Math.floor(distance * index));
			degreeArray.shift();

			setDegrees(degreeArray as []);
			step && setSteps(stepArray as []);
		}
	}, [thresholdData, ruler, degree, step]);

	return (
		<div className=" lc-w-full">
			<div>{children}</div>
			<div style={{ padding: "0 10px" }}>
				<div className={`  lc-w-full ${className}`}>
					{ruler && degree ? (
						<>
							{step ? (
								<div>
									<div
										className={`lc-flex  lc-relative  lc-w-full  lc-items-end   lc-justify-evenly  lc-text-xs  lc-overflow-hidden  ${rulerClassName}`}
									>
										{[0, ...degrees].map(
											(degreeValue, degreeIndex) => (
												<React.Fragment
													key={degreeIndex}
												>
													{steps.map(
														(
															stepValue,
															stepIndex
														) => (
															<div
																key={`${degreeIndex}-${stepIndex}`}
																className=" lc-text-center  lc-flex  -lc-mb-1"
															>
																|
															</div>
														)
													)}
													{degreeIndex !==
													degrees.length ? (
															<div className=" lc-text-center  lc-flex   lc-font-bold ">
															|
															</div>
														) : (
															""
														)}
												</React.Fragment>
											)
										)}
									</div>
								</div>
							) : (
								""
							)}
							<div>
								<div className="lc-flex  lc-relative  lc-w-full lc-h-full  lc-items-start   lc-justify-evenly  lc-text-xs  lc-text-gray-400 ">
									{threshold ? (
										<div className=" lc-absolute lc-left-0 lc-top-0 lc-flex   lc-justify-start">
											<div className=" lc-text-center  lc-flex   lc-font-bold   lc-absolute -lc-top-full">
												|
											</div>
											{seprate(thresholdData[0])}
										</div>
									) : (
										<></>
									)}
									{[0, ...degrees].map((value, index) => {
										return index ? (
											<div
												key={index}
												className="lc-flex  lc-w-full  lc-justify-center "
											>
												{seprate(value + thresholdData[0])}
											</div>
										) : (
											<div
												key={index}
												className="lc-flex lc-w-1/2 "
											></div>
										);
									})}
									<div className="lc-flex lc-w-1/2 "></div>
									{threshold ? (
										<div className=" lc-absolute lc-right-0 lc-top-0 lc-flex   lc-justify-end">
											<div className=" lc-text-center  lc-flex   lc-font-bold   lc-absolute -lc-top-full">
												|
											</div>
											{seprate(thresholdData[1])}
										</div>
									) : (
										<></>
									)}
								</div>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default Ruler;
