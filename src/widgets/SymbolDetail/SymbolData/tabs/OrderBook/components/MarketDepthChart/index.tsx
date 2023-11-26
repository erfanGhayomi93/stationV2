import { useCallback, useEffect, useMemo, useRef } from 'react';
import ChartJs from 'src/libs/chart';
import { useAppSelector } from 'src/redux/hooks';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { externalTooltipHandler } from '../../../SymbolChart/components/helper';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useMarketDepthState } from '../../context';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { getTheme } from 'src/redux/slices/ui';

type PluginOptions = {
    yesterdayClosingPrice: number;
};

type HalfRowType = {
    price: number;
    volume: number;
    count: number;
    percent: number;
};

const MarketDepthChart = () => {
    const chart = useRef<ChartJs<'line', Array<any>> | undefined>(undefined);
    const theme = useAppSelector(getTheme)

    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const { data: symbolData } = useSymbolGeneralInfo<SymbolGeneralInfoType>(selectedSymbol);

    const {
        marketDepthData: { asks, bids, isLoading },
    } = useMarketDepthState();

    const buyData = useMemo(() => {
        if (!bids.data) return [];
        const data = Object.entries(bids.data).map(([key, value]) => ({ ...(value as HalfRowType) }));
        return data;
    }, [bids]);

    const sellData = useMemo(() => {
        if (!asks.data) return [];
        const data = Object.entries(asks.data).map(([key, value]) => ({ ...(value as HalfRowType) }));
        return data;
    }, [asks]);

    const updateChartData = (buyData: Array<any>, sellData: Array<any>) => {
        const chartAPI = chart.current;
        if (!chartAPI) return;

        const scales = chartAPI.options.scales;
        if (!(scales && scales.x && scales.y)) return;

        if (JSON.stringify(buyData) === JSON.stringify(sellData)) return;

        try {
            chartAPI.data.datasets[0].data = buyData;
            chartAPI.data.datasets[1].data = sellData;
            chartAPI.update();
        } catch (e) {
            //
        }
    };

    const updateChartColor = () => {
        const chartAPI = chart.current;
        if (!chartAPI) return;

        const scales = chartAPI.options.scales;
        if (!(scales && scales.x && scales.y)) return;

        try {
            const colors = {
                dark: {
                    ticksColor: 'rgb(205, 205, 205)',
                    gridColor: 'rgb(47, 51, 61)',
                    gridThickColor: 'rgb(47, 51, 61)',
                    gridBorderColor: 'rgb(77, 84, 106)',
                },

                light: {
                    ticksColor: 'rgb(30, 35, 41)',
                    gridColor: 'rgb(226, 229, 239)',
                    gridThickColor: 'rgb(226, 229, 239)',
                    gridBorderColor: 'rgb(193, 193, 193)',
                },
            };

            if (scales.x.ticks && scales.y.ticks) {
                scales.x.ticks.color = colors[theme].ticksColor;
                scales.y.ticks.color = colors[theme].ticksColor;
            }

            if (scales.x.grid && scales.y.grid) {
                scales.x.grid.color = colors[theme].gridColor;
                scales.y.grid.color = colors[theme].gridColor;

                scales.x.grid.tickColor = colors[theme].gridThickColor;
                scales.y.grid.tickColor = colors[theme].gridThickColor;

                if (scales.x.border && scales.y.border) {
                    scales.x.border.color = colors[theme].gridBorderColor;
                    scales.y.border.color = colors[theme].gridBorderColor;
                }
            }

            chartAPI.update();
        } catch (e) {
            //
        }
    };

    const setGradientColor = () => {
        if (!chart.current) return;

        try {
            const { ctx, chartArea } = chart.current;

            const greenGradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            greenGradient.addColorStop(0, 'rgba(21, 183, 97, 0.03)');
            greenGradient.addColorStop(1, 'rgba(21, 183, 97, 0.3)');

            chart.current.data.datasets[0].backgroundColor = greenGradient;

            const redGradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            redGradient.addColorStop(0, 'rgba(224, 64, 64, 0.03)');
            redGradient.addColorStop(1, 'rgba(224, 64, 64, 0.3)');

            chart.current.data.datasets[1].backgroundColor = redGradient;
        } catch (e) {
            //
        }
    };

    const { yesterdayClosingPrice, highThreshold, lowThreshold } = useMemo(() => {
        const initialData = { yesterdayClosingPrice: 0, highThreshold: 0, lowThreshold: 0 };

        if (!symbolData) return initialData;

        initialData.yesterdayClosingPrice = symbolData?.symbolData?.yesterdayClosingPrice ?? 0;
        initialData.highThreshold = symbolData?.symbolData?.highThreshold ?? 0;
        initialData.lowThreshold = symbolData?.symbolData?.lowThreshold ?? 0;

        return initialData;
    }, [symbolData]);

    const aggregateQuantity = (data: any, side: 'buy' | 'sell') => {
        const deepCopyOfData: any = JSON.parse(JSON.stringify(data));
        if (side === 'buy') deepCopyOfData.sort((a: any, b: any) => b[0] - a[0]);
        else deepCopyOfData.sort((a: any, b: any) => a[0] - b[0]);

        const result: any[] = [];
        const qty = new Map<number, number>();

        for (let i = 0; i < deepCopyOfData.length; i++) {
            const row = deepCopyOfData[i];
            const price = row[0];
            const volume = row[1];

            const obj: any = {
                price,
                volume: (qty.get(i - 1) ?? 0) + volume,
            };

            result.push(obj);
            qty.set(i, obj.volume);
        }

        return result;
    };

    const onCanvasLoad = useCallback((canvas: HTMLCanvasElement) => {
        if (chart.current instanceof ChartJs || !canvas) return;

        chart.current = new ChartJs<'line', Array<any>>(canvas, {
            type: 'line',

            data: {
                datasets: [
                    {
                        label: 'خرید',
                        data: aggregateQuantity(buyData, 'buy'),
                        borderColor: 'rgb(21, 183, 97)',
                        backgroundColor: 'rgb(21, 183, 97, 0.1)',
                        fill: true,
                        indexAxis: 'x',
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 2,
                        pointHoverBorderWidth: 2,
                        parsing: {
                            xAxisKey: 'price',
                            yAxisKey: 'volume',
                        },
                    },
                    {
                        label: 'فروش',
                        data: aggregateQuantity(sellData, 'sell'),
                        indexAxis: 'x',
                        borderColor: 'rgb(224, 64, 64)',
                        backgroundColor: 'rgba(224, 64, 64, 0.1)',
                        fill: true,
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 2,
                        pointHoverBorderWidth: 2,
                        parsing: {
                            xAxisKey: 'price',
                            yAxisKey: 'volume',
                        },
                    },
                ],
            },

            plugins: [
                {
                    id: 'chartAreaBorder',
                    afterDraw: (chart, _, options: PluginOptions) => {
                        const {
                            chartArea: { top, width },
                            scales: { y: yScale },
                            ctx,
                        } = chart;

                        ctx.save();

                        const centeredPixel = (width + yScale.width * 2) / 2;
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgb(136, 136, 136)';
                        ctx.lineWidth = 1;
                        ctx.setLineDash([12, 8]);
                        ctx.moveTo(centeredPixel, top + 27);
                        ctx.lineTo(centeredPixel, yScale.height + yScale.top);
                        ctx.stroke();

                        const txt = seprateNumber(options?.yesterdayClosingPrice ?? 0);
                        const txtWidth = txt.length * 3;
                        ctx.font = 'normal 14px IRANSansEnNum';
                        ctx.fillStyle = 'rgb(136, 136, 136)';
                        ctx.fillText(txt, centeredPixel + txtWidth, 23);

                        ctx.restore();
                    },
                },
            ],

            options: {
                indexAxis: 'y',
                animation: false,

                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            font: {
                                size: 10,
                            },
                        },
                    },

                    chartAreaBorder: { yesterdayClosingPrice },

                    tooltip: {
                        enabled: false,
                        position: 'nearest',
                        external: (context) => externalTooltipHandler(context, (value) => seprateNumber(+value)),
                    },
                },

                hover: {
                    intersect: false,
                },

                scales: {
                    x: {
                        offset: false,
                        bounds: 'data',
                        reverse: true,

                        ticks: {
                            source: 'data',
                            color: 'rgb(51, 51, 51)',
                            autoSkip: true,
                            maxRotation: 0,
                            maxTicksLimit: 6,
                            callback: (value) => `\u200E${seprateNumber(+value ?? 0)}`,
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
                        },

                        grid: {
                            tickColor: 'rgb(51, 51, 51)',
                            drawOnChartArea: false,
                        },
                    },

                    y: {
                        offset: false,
                        display: true,
                        type: 'linear',
                        position: 'left',

                        ticks: {
                            color: 'rgb(51, 51, 51)',
                            autoSkip: false,
                            maxRotation: 0,
                            maxTicksLimit: 10,
                            callback: (value) => `\u200E${abbreviateNumber(Number(value) || 0)}`,
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
                        },

                        grid: {
                            tickColor: 'rgb(51, 51, 51)',
                            drawOnChartArea: false,
                        },
                    },
                },
            },
        });

        updateChartColor();
        setGradientColor();
    }, []);

    useEffect(() => {
        updateChartColor();
    }, [theme]);

    useEffect(() => {
        if (!buyData.length && !sellData.length) return;

        updateChartData(aggregateQuantity(buyData, 'buy'), aggregateQuantity(sellData, 'sell'));
    }, [buyData, sellData]);

    useEffect(() => {
        const chartAPI = chart.current;
        if (!chartAPI || !yesterdayClosingPrice) return;
    }, [yesterdayClosingPrice]);

    return (
        <WidgetLoading spining={isLoading}>
            <div
                style={{
                    maxHeight: '15.5rem',
                }}
                className="relative overflow-hidden mt-3"
            >
                <canvas className="w-[97%] h-64 m-0" ref={onCanvasLoad} />
            </div>
        </WidgetLoading>
    );
};

export default MarketDepthChart;
