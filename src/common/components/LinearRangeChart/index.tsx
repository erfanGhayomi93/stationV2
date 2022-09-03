import "./build.css";
import Disabled from "./components/Disabled";
import Exchange from "./components/Exchange";
import Footer from "./components/Footer";
import FreeBoundary from "./components/FreeBoundary";
import Badge from "./components/FreeBoundary/badge";
import BoundaryIcons from "./components/FreeBoundary/boundaryIcons";
import Origin from "./components/Origin";
import Ruler from "./components/Ruler";
import ThresholdEnd from "./components/ThresholdEnd";
import ThresholdStart from "./components/ThresholdStart";


const LinearRangeChart = (props: ILinearRangeChartApi) => {
	const {
		thresholdData,
		originData,
		exchangeData,
		boundaryData,
		ruler,
		rulerSetting,
		originSetting,
		thresholdSetting,
		positiveColor,
		negativeColor,
		boundarySetting,
		exchangeSetting,
		footer,
		exchangeIcons,
		originIcons,
		thresholdIcons,
		gradient,
		boundaryIcons,
		footerSetting,
		rtl,
		badge,
	} = props;
	return (
		<div
			dir="ltr"
			style={{ minWidth: "280px" }}
			className=" lc-w-full lc-flex   lc-flex-col  "
		>
			{thresholdData &&
			thresholdData[0] < thresholdData[1] &&
			boundaryData[1] >= boundaryData[0] &&
			originData >= thresholdData[0] &&
			originData <= thresholdData[1] ? (
					<>
						{/* Upper numbers */}
						<div
							style={{ padding: "0 9px" }}
							className=" lc-w-full lc-h-full"
						>
							<div className=" lc-relative  lc-w-full  lc-inline-flex lc-h-9  lc-items-end    ">
								<ThresholdStart
									data={thresholdData[0]}
									className={
										thresholdSetting?.thresholdStartClassName
									}
									icon={thresholdIcons?.start}
								/>
								<Origin
									data={originData}
									thresholdData={thresholdData}
									{...originSetting}
									icon={originIcons}
								/>
								<ThresholdEnd
									data={thresholdData[1]}
									className={
										thresholdSetting?.thresholdEndClassName
									}
									icon={thresholdIcons?.end}
								/>
							</div>{" "}
						</div>
						{/*  */}
						{/* Ruler */}
						<div className=" lc-relative  lc-w-full  lc-inline-flex ">
							<Ruler
								thresholdData={thresholdData}
								ruler={ruler}
								{...rulerSetting}
							>
								<Exchange
									exchangeData={exchangeData}
									exchangeSetting={exchangeSetting}
									thresholdData={thresholdData}
									exchangeIcons={exchangeIcons}
								/>
								<FreeBoundary
									gradient={gradient}
									boundaryData={boundaryData}
									originData={originData}
									boundarySetting={boundarySetting}
									thresholdData={thresholdData}
									negativeColor={negativeColor}
									positiveColor={positiveColor}
								/>
								{badge ? (
									<Badge
										boundaryData={boundaryData}
										originData={originData}
										thresholdData={thresholdData}
										negativeColor={negativeColor}
										positiveColor={positiveColor}
									/>
								) : (
									<></>
								)}
								<BoundaryIcons
									boundaryData={boundaryData}
									originData={originData}
									thresholdData={thresholdData}
									boundaryIcons={boundaryIcons}
									negativeColor={negativeColor}
									positiveColor={positiveColor}
								/>
							</Ruler>
						</div>
						{/*  */}
						{/* Footer */}
						{footer ? (
							<Footer
								exchangeData={exchangeData}
								boundaryData={boundaryData}
								rtl={rtl}
								origin={originData}
								positiveColor={positiveColor}
								negativeColor={negativeColor}
								{...exchangeSetting}
								{...boundarySetting}
								className={footerSetting?.className}
								boundaryIcons={boundaryIcons}
								exchangeIcons={exchangeIcons}
							/>
						) : (
							""
						)}
					</>
				) : (
					<Disabled ruler={ruler} rulerSetting={rulerSetting} />
				)}
		</div>
	);
};

export default LinearRangeChart;
