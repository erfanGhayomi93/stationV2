import React, { useRef } from "react";
import { seprate } from "../../helper";

type Props = {
	data: number;
	icon?: JSX.Element;
	// color?: string;
};

const ThresholdStart: React.FC<
	Props & React.HTMLAttributes<HTMLDivElement>
> = ({ data, className = " lc-text-sm ", icon }) => {
	const textRef = useRef<HTMLDivElement>(null);
	return (
		<div className="lc-flex  lc-flex-col   lc-items-start  lc-absolute">
			<div ref={textRef} className={className}>
				{seprate(data)}
			</div>
			<div>{icon}</div>
		</div>
	);
};

export default ThresholdStart;
