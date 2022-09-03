import React from "react";

interface Props {
	ruler?: boolean;
	rulerSetting?: RulerSettingType;
}

const Disabled: React.FC<Props> = ({ rulerSetting, ruler }) => {
	return (
		<div className={`  lc-w-full lc-mt-9 ${rulerSetting?.className}`}>
			<div className={` lc-w-full ${rulerSetting?.rulerClassName}`}>
				{ruler ? (
					<div className="lc-flex lc-justify-between  lc-pt-3">
						{Array(rulerSetting?.step! * rulerSetting?.degree! * 2)
							.fill(1)
							.map((x, inx) =>
								inx % rulerSetting?.degree! === 0 ? (
									<div key={inx}>|</div>
								) : (
									<div key={inx} className="lc-scale-50">|</div>
								)
							)}
						<div>|</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Disabled;
