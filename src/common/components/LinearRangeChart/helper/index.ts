//seprate any string or number
export const seprate = (
	input: any,
	seprator: string = ",",
	scale: number = 3
): string => {
	const regex = `(\\d)(?=(\\d{${scale}})+(?!\\d))`;
	var rege = new RegExp(regex, "g");
	return input ? String(input).replace(rege, `$1${seprator}`) : String(input);
};

export const positionPercentage = (
	thresholdData: twoParameterArray,
	value: number
): number => {
	const position =
		Math.ceil(
			(((value - thresholdData[0]) * 100) /
				(thresholdData[1] - thresholdData[0])) *
			100
		) / 100;
	return position > 100 ? 100 : position;
};

export const RandomBetween = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
