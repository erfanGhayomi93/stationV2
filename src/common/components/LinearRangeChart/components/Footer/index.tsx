import React, { HTMLAttributes } from "react";
import { seprate } from "../../helper";
import { DotIcon, ExcludeDotIcon } from "../../Icons";

interface Props {
	exchangeData: twoParameterArray;
	boundaryData: twoParameterArray;
	positiveColor?: string;
	negativeColor?: string;
	boundaryIcons?: StartEndIcon;
	exchangeIcons?: StartEndIcon;
	rtl?: boolean;
	origin: number;
}

const Footer: React.FC<
	Props &
		ExchangeSettingType &
		BoundarySettingType &
		HTMLAttributes<HTMLDivElement>
> = ({
	className,
	exchangeIcons = { start: <DotIcon />, end: <ExcludeDotIcon /> },
	boundaryIcons,
	rtl,
	origin,
	positiveColor,
	negativeColor,
	exchangeEndLabel = "default_exchangeEndLabel",
	exchangeStartLabel = "default_exchangeStartLabel",
	boundaryStartLabel = "default_boundaryStartLabel",
	boundaryEndLabel = "default_boundaryEndLabel",
	boundaryData,
	exchangeData,
}) => {
	return (
		<div
			className={`lc-flex lc-justify-between  lc-p-2 lc-mt-7  lc-border-solid  lc-border-t lc-border-gray-100 ${className}`}
			dir={rtl ? "rtl" : "ltr"}
		>
			<div className="lc-flex  lc-flex-col ">
				<div className="lc-flex  lc-items-center  lc-gap-2 lc-justify-between ">
					{boundaryIcons ? (
						<span
							style={{
								color:
									boundaryData[0] >= origin
										? positiveColor
										: negativeColor,
							}}
						>
							{boundaryIcons.start}
						</span>
					) : (
						<></>
					)}
					<span
						style={{
							color:
								boundaryData[0] >= origin
									? positiveColor
									: negativeColor,
						}}
					>
						{boundaryStartLabel}
					</span>
					<span
						style={{
							color:
								boundaryData[0] >= origin
									? positiveColor
									: negativeColor,
						}}
					>
						({seprate(boundaryData[0])})
					</span>
				</div>
				<div className="lc-flex  lc-items-center  lc-gap-2 lc-justify-between ">
					{boundaryIcons ? (
						<span
							style={{
								color:
									boundaryData[1] >= origin
										? positiveColor
										: negativeColor,
							}}
						>
							{boundaryIcons.end}
						</span>
					) : (
						<></>
					)}
					<span
						style={{
							color:
								boundaryData[1] >= origin
									? positiveColor
									: negativeColor,
						}}
					>
						{boundaryEndLabel}
					</span>
					<span
						style={{
							color:
								boundaryData[1] >= origin
									? positiveColor
									: negativeColor,
						}}
					>
						({seprate(boundaryData[1])})
					</span>
				</div>
			</div>
			<div className="lc-flex  lc-flex-col  ">
				<div className="lc-flex  lc-items-center  lc-gap-2 lc-justify-between ">
					<span>{exchangeIcons.start}</span>
					<span>{exchangeStartLabel}</span>
					<span>({seprate(exchangeData[0])})</span>
				</div>
				<div className="lc-flex  lc-items-center  lc-gap-2 lc-justify-between ">
					<span>{exchangeIcons.end}</span>
					<span>{exchangeEndLabel}</span>
					<span>({seprate(exchangeData[1])})</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
