import React, { useEffect, useRef, useState } from "react";
import { positionPercentage, seprate } from "../../helper";
type Props = {
	data: number;
	icon?: JSX.Element;
	// color?: string;
	thresholdData: twoParameterArray;
};
const Origin: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	data,
	thresholdData,
	icon,
	className = " lc-text-sm ",
}) => {
	const textRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const [position, setPosition] = useState(50);

	useEffect(() => {
		/** find position of origin position in distance  */
		const position = positionPercentage(thresholdData, data);
		setWidth((textRef?.current?.clientWidth as number) / 2);
		setPosition(position);
	}, [thresholdData, data]);

	return (
		<div
			style={{ left: `calc(${position}% - ${width}px)` }}
			className="lc-flex lc-flex-col lc-items-center lc-absolute"
		>
			<div ref={textRef} className={className}>
				{seprate(data)}
			</div>
			<div>{icon}</div>
		</div>
	);
};

export default Origin;
