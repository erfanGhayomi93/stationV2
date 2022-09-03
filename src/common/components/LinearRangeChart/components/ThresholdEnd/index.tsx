import React, { useEffect, useRef, useState } from "react";
import { seprate } from "../../helper";

type Props = {
	data: number;
	icon?: JSX.Element;
	// color?: string;
};

const ThresholdEnd: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	data,
	icon,
	className = " lc-text-sm ",
}) => {
	const textRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(100);

	useEffect(() => {
		setWidth(textRef?.current?.clientWidth as number);
	}, [data]);

	return (
		<div
			style={{ left: `calc(100% - ${width}px)` }}
			// style={{ left: `100%` }}
			className="lc-flex  lc-flex-col   lc-items-end   lc-absolute lc-left-auto"
		>
			<div ref={textRef} className={className}>
				{seprate(data)}
			</div>
			<div>{icon}</div>
		</div>
	);
};

export default ThresholdEnd;
