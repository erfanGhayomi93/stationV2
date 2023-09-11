import { Chart as ChartJs, TooltipModel, ChartType } from "chart.js";
import { rgbToRgba, seprateNumber } from "src/utils/helpers";

const createBorder = () => {
	const border = document.createElement('span');
	border.style.border = `0.5px dashed`;
	border.style.position = 'absolute';
	border.style.pointerEvents = 'none';

	return border;
};

const createNodeText = (text: string) => {
	const span = document.createElement('span');
	span.innerText = text;
	span.style.zIndex = '99';
	span.style.position = 'absolute';
	span.style.pointerEvents = 'none';
	span.style.fontSize = '11px';
	span.style.fontWeight = '500';
	span.style.padding = '2px 4px 0 4px';
	span.style.borderRadius = '4px';
	span.style.height = '24px';
	span.style.display = 'flex';
	span.style.alignItems = 'center';
	span.style.justifyContent = 'center';

	span.classList.add('bg-L-basic', 'dark:bg-D-basic');

	return span;
};

const removeChildren = (children: HTMLElement[] | NodeListOf<HTMLElement>) => {
	for (let i = 0; i < children.length; i++) children[i].remove();
};

export const externalTooltipHandler = <T extends ChartType>(
	context: { chart: ChartJs; tooltip: TooltipModel<T> },
	format: (value: string | number) => string
) => {
	try {
		const { chart, tooltip } = context;
		const { chartArea: { top, width, height, left } } = chart;
		const canvas = chart.canvas;

		const { offsetLeft: positionX, offsetTop: positionY } = canvas;

		const chartClassName = `marketDepthTooltip_${chart.id}`;
		let tooltipEl = document.querySelector(`.${chartClassName}`) as HTMLElement | null;

		if (tooltip.opacity === 0 && tooltipEl) return tooltipEl.style.opacity = '0';

		const dataPoints = tooltip.dataPoints;
		if (!dataPoints?.length) return;

		// @ts-ignore
		const xValue: string | number = dataPoints[0].parsed.x;

		let borderX: HTMLElement | null,
			borderY: HTMLElement[] = [],
			nodeX: HTMLElement | null,
			nodeY: HTMLElement[] = [];
		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.classList.add(chartClassName);
			tooltipEl.style.maxWidth = '0';
			tooltipEl.style.maxHeight = '0';

			/* X border */
			borderX = createBorder();
			borderX.classList.add('x');
			borderX.style.width = '1px';

			/* Y border / Y Text */
			for (let i = 0; i < dataPoints.length; i++) {
				/* Border */
				const borderYEl = createBorder();
				borderYEl.classList.add('y');
				borderYEl.style.height = '1px';
				borderY.push(borderYEl);
				tooltipEl.appendChild(borderYEl);

				/* Text */
				const nodeYEl = createNodeText(dataPoints[i].label);
				nodeYEl.classList.add('y-node');
				tooltipEl.appendChild(nodeYEl);

				nodeY.push(nodeYEl);
			}

			tooltipEl.appendChild(borderX);

			/* X text */
			nodeX = createNodeText(String(xValue));
			nodeX.classList.add('x-node');

			tooltipEl.appendChild(nodeX);

			const parent = canvas.parentElement as HTMLElement;
			parent.appendChild(tooltipEl);
		} else {
			tooltipEl.style.opacity = '1';
			borderX = tooltipEl.querySelector('.x');
			borderY = Array.from(tooltipEl.querySelectorAll('.y'));
			nodeX = tooltipEl.querySelector('.x-node');
			nodeY = Array.from(tooltipEl.querySelectorAll('.y-node'));

			if (borderY.length !== dataPoints.length || nodeY.length !== dataPoints.length) {
				removeChildren(borderY);
				borderY = [];

				removeChildren(nodeY);
				nodeY = [];

				for (let i = 0; i < dataPoints.length; i++) {
					/* Border */
					const borderYEl = createBorder();
					borderYEl.classList.add('y');
					borderYEl.style.height = '1px';
					borderY.push(borderYEl);
					tooltipEl.appendChild(borderYEl);

					/* Text */
					const nodeYEl = createNodeText(dataPoints[i].formattedValue);
					nodeYEl.classList.add('y-node');
					tooltipEl.appendChild(nodeYEl);

					nodeY.push(nodeYEl);
				}
			}
		}

		const currentColor = String(tooltip.labelColors[0].borderColor);

		// ? node width
		if (!nodeX || !nodeY || !borderX || !borderY) return;

		nodeX.innerText = format(xValue);
		let nodeXWidth: string | number = window.getComputedStyle(nodeX, null).width.slice();
		nodeXWidth = Number(nodeXWidth.slice(0, nodeXWidth.length - 2));

		// ? borderX
		const borderXTop = positionY + top;
		const borderXLeft = positionX + tooltip.caretX - 1;
		borderX.style.top = `${borderXTop + tooltip.caretY - 8}px`;
		borderX.style.height = `${height - tooltip.caretY + 8}px`;
		borderX.style.left = `${borderXLeft}px`;
		borderX.style.borderColor = currentColor;

		// ? borderY
		const borderYLeft = positionX + left;
		for (let i = 0; i < dataPoints.length; i++) {
			if (borderY[i]) {
				borderY[i].style.top = `${positionY + dataPoints[i].element.y}px`;
				borderY[i].style.left = `${borderYLeft}px`;
				borderY[i].style.width = `${tooltip.caretX - left}px`;
				borderY[i].style.borderColor = String(tooltip.labelColors[i].borderColor);
			}
		}

		// ? noteX
		let nodeXLeft = borderXLeft - (nodeXWidth / 2);
		if (nodeXLeft < borderYLeft) nodeXLeft = borderYLeft;
		else if (nodeXLeft > borderYLeft + width - nodeXWidth) nodeXLeft = borderYLeft + width - nodeXWidth;
		nodeX.style.left = `${nodeXLeft}px`;
		nodeX.style.top = `${borderXTop + height + 8}px`;
		nodeX.style.color = currentColor;
		nodeX.style.backgroundColor = rgbToRgba(currentColor, 0.2);

		// ? noteY
		for (let i = 0; i < dataPoints.length; i++) {
			if (nodeY[i]) {
				const pointY = dataPoints[i].element.y;
				const value = dataPoints[i].formattedValue;
				const color = String(tooltip.labelColors[i].borderColor);

				nodeY[i].innerText = isNaN(Number(value)) ? value : seprateNumber(+value);
				let nodeYWidth: string | number = window.getComputedStyle(nodeY[i], null).width;
				nodeYWidth = Number(nodeYWidth.slice(0, nodeYWidth.length - 2));

				let nodeYTop = positionY + pointY - 12;
				if (nodeYTop > borderXTop + height - 24) nodeYTop = borderXTop + height - 24;
				else if (nodeYTop < 12) nodeYTop = 12;
				let nodeYLeft = borderYLeft - nodeYWidth - 8;
				if (nodeYLeft < 4) nodeYLeft = 4;
				nodeY[i].style.left = `${nodeYLeft}px`;
				nodeY[i].style.top = `${nodeYTop}px`;
				nodeY[i].style.color = color;
				nodeY[i].style.backgroundColor = rgbToRgba(color, 0.2);
			}
		}
	} catch (e) {
		console.log(e);
	}
};
