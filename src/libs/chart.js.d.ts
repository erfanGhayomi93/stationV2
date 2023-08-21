import { ChartType } from 'chart.js/auto';
import { ChartConfiguration, ChartDataLabelsOptions } from 'chartjs-plugin-datalabels';

type CandlestickControllerDatasetOptions = Omit<LineControllerDatasetOptions & FillerControllerDatasetOptions, 'color' | 'borderColor'> & {
	color: Record<'up' | 'down' | 'unchanged', string>;
	borderColor: Record<'up' | 'down' | 'unchanged', string>;
}

declare module 'chart.js' {
	interface PluginOptionsByType<TType extends ChartType> {
		chartAreaBorder?: {
			yesterdayClosingPrice: number
		};
		datalabels?: ChartDataLabelsOptions | ChartConfiguration
		// yScaleText: {
		// 	id: string;
		// 	afterDraw(chart: ChartJs<"bar">): void;
		// }
	}

	interface ChartTypeRegistry {
		bar: {
			chartOptions: BarControllerChartOptions;
			datasetOptions: BarControllerDatasetOptions;
			defaultDataPoint: number;
			parsedDataType: BarParsedData,
			scales: keyof CartesianScaleTypeRegistry;
		};

		line: {
			chartOptions: LineControllerChartOptions;
			datasetOptions: LineControllerDatasetOptions & FillerControllerDatasetOptions;
			defaultDataPoint: ScatterDataPoint | number | null;
			parsedDataType: CartesianParsedData;
			scales: keyof CartesianScaleTypeRegistry;
		};

		scatter: {
			chartOptions: ScatterControllerChartOptions;
			datasetOptions: ScatterControllerDatasetOptions;
			defaultDataPoint: ScatterDataPoint | number | null;
			parsedDataType: CartesianParsedData;
			scales: keyof CartesianScaleTypeRegistry;
		};

		bubble: {
			chartOptions: unknown;
			datasetOptions: BubbleControllerDatasetOptions;
			defaultDataPoint: BubbleDataPoint;
			parsedDataType: BubbleParsedData;
			scales: keyof CartesianScaleTypeRegistry;
		};

		pie: {
			chartOptions: PieControllerChartOptions;
			datasetOptions: PieControllerDatasetOptions;
			defaultDataPoint: PieDataPoint;
			metaExtensions: PieMetaExtensions;
			parsedDataType: number;
			scales: keyof CartesianScaleTypeRegistry;
		};

		doughnut: {
			chartOptions: DoughnutControllerChartOptions;
			datasetOptions: DoughnutControllerDatasetOptions;
			defaultDataPoint: DoughnutDataPoint;
			metaExtensions: DoughnutMetaExtensions;
			parsedDataType: number;
			scales: keyof CartesianScaleTypeRegistry;
		};

		polarArea: {
			chartOptions: PolarAreaControllerChartOptions;
			datasetOptions: PolarAreaControllerDatasetOptions;
			defaultDataPoint: number;
			parsedDataType: RadialParsedData;
			scales: keyof RadialScaleTypeRegistry;
		};

		radar: {
			chartOptions: RadarControllerChartOptions;
			datasetOptions: RadarControllerDatasetOptions & FillerControllerDatasetOptions;
			defaultDataPoint: number | null;
			parsedDataType: RadialParsedData;
			scales: keyof RadialScaleTypeRegistry;
		};

		/* CUSTOMIZE */

		candlestick: {
			chartOptions: LineControllerChartOptions;
			datasetOptions: CandlestickControllerDatasetOptions;
			defaultDataPoint: ScatterDataPoint | number | null;
			parsedDataType: CartesianParsedData;
			scales: keyof CartesianScaleTypeRegistry;
		};
	}
}