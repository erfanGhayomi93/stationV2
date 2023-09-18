import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ChartJs from 'src/libs/chart';
import { useAppSelector } from 'src/redux/hooks';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { externalTooltipHandler } from '../../../SymbolChart/components/helper';
import { useMarketDepthState } from '../../context';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getTheme } from 'src/redux/slices/ui';

type KucoinChartProps = {
    yesterdayClosingPrice: number;
    highThreshold: number;
    lowThreshold: number;
};

type ChartDataType = Record<'price' | 'volume', number>;

type PluginOptions = {
    yesterdayClosingPrice: number;
};

const KucoinChart = ({ yesterdayClosingPrice, highThreshold, lowThreshold }: KucoinChartProps) => {
    //
    const { t } = useTranslation();
    const chart = useRef<ChartJs<'line', Array<ChartDataType>> | undefined>(undefined);

    const {
        marketDepthData: { asks, bids, isLoading },
    } = useMarketDepthState();

    const buyData = useMemo(() => {
        if (!bids.data) return [];
        const data = Object.entries(bids.data).map(([key, value]) => ({ ...(value as any) }));
        return data;
    }, [bids]);

    const sellData = useMemo(() => {
        if (!asks.data) return [];
        const data = Object.entries(asks.data).map(([key, value]) => ({ ...(value as any) }));
        return data;
    }, [asks]);

    const theme = useAppSelector(getTheme)

    const updateChartData = (buyData: Array<ChartDataType>, sellData: Array<ChartDataType>) => {
        const chartAPI = chart.current;
        if (!chartAPI) return;

        const scales = chartAPI.options.scales;
        if (!(scales && scales.x && scales.y)) return;

        if (JSON.stringify(buyData) === JSON.stringify(sellData)) return;

        try {
            chartAPI.data.datasets[0].data = buyData;
            chartAPI.data.datasets[1].data = sellData;
            chartAPI.update('none');
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

    const aggregateQuantity = (data: any, side: 'buy' | 'sell') => {
        const deepCopyOfData: any = JSON.parse(JSON.stringify(data));
        if (side === 'buy') deepCopyOfData.sort((a: any, b: any) => b[0] - a[0]);
        else deepCopyOfData.sort((a: any, b: any) => a[0] - b[0]);

        const result: ChartDataType[] = [];
        const qty = new Map<number, number>();

        for (let i = 0; i < deepCopyOfData.length; i++) {
            const row = deepCopyOfData[i];
            const price = row[0];
            const volume = row[1];

            const obj: ChartDataType = {
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

        chart.current = new ChartJs(canvas, {
            type: 'line',

            data: {
                labels: [],
                datasets: [
                    {
                        label: 'خرید',
                        data: aggregateQuantity(buyData, 'buy'),
                        borderColor: 'rgb(36, 174, 100)',
                        backgroundColor: 'rgba(36, 174, 100, 0.1)',
                        fill: true,
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 2,
                        pointHoverBorderWidth: 2,
                        parsing: {
                            xAxisKey: 'volume',
                            yAxisKey: 'price',
                        },
                    },
                    {
                        label: 'فروش',
                        data: aggregateQuantity(sellData, 'sell'),
                        borderColor: 'rgb(224, 64, 64)',
                        backgroundColor: 'rgba(224, 64, 64, 0.1)',
                        fill: true,
                        borderWidth: 1,
                        pointRadius: 0,
                        pointHoverRadius: 2,
                        pointHoverBorderWidth: 2,
                        parsing: {
                            xAxisKey: 'volume',
                            yAxisKey: 'price',
                        },
                    },
                ],
            },

            plugins: [
                {
                    id: 'chartAreaBorder',
                    afterDraw: (chart, _, options: PluginOptions) => {
                        const {
                            chartArea: { left, height },
                            scales: { x: xScale, y: yScale },
                            ctx,
                        } = chart;

                        ctx.save();

                        const centeredPixel = (height + xScale.height * 2) / 2;
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgb(136, 136, 136)';
                        ctx.lineWidth = 1;
                        ctx.setLineDash([12, 8]);
                        ctx.moveTo(left + 32, centeredPixel);
                        ctx.lineTo(xScale.width + xScale.left, centeredPixel);
                        ctx.stroke();

                        const txt = String(abbreviateNumber(options.yesterdayClosingPrice / 2));
                        ctx.font = 'normal 12px IRANSansEnNum';
                        ctx.fillStyle = 'rgba(136, 136, 136)';
                        ctx.translate(yScale.width + 16, centeredPixel - txt.length * 3);
                        ctx.rotate(-Math.PI / 2);
                        ctx.fillText(txt, 0, 6);

                        ctx.restore();
                    },
                },
            ],

            options: {
                responsive: false,
                maintainAspectRatio: false,
                animation: {
                    duration: 1000,
                    easing: 'easeInElastic',
                },
                indexAxis: 'y',

                interaction: {
                    axis: 'y',
                },

                plugins: {
                    legend: {
                        display: false,
                    },

                    chartAreaBorder: { yesterdayClosingPrice },

                    tooltip: {
                        enabled: false,
                        position: 'nearest',
                        external: (context) => externalTooltipHandler(context, (value) => `\u200E${seprateNumber(+value ?? 0)}`),
                    },
                },

                hover: {
                    intersect: false,
                },

                scales: {
                    x: {
                        offset: false,
                        reverse: true,
                        position: 'top',

                        ticks: {
                            z: 50,
                            padding: 6,
                            source: 'auto',
                            color: 'rgb(51, 51, 51)',
                            maxRotation: 0,
                            maxTicksLimit: 10,
                            mirror: true,
                            callback: (value, index, context) => {
                                if ([0, context.length - 1].includes(index)) return undefined;

                                return `\u200E${abbreviateNumber(Number(value) || 0)}`;
                            },
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
                        },

                        grid: {
                            tickColor: 'rgb(51, 51, 51)',
                            drawOnChartArea: false,
                            tickLength: -8,
                            z: 50,
                        },
                    },

                    y: {
                        offset: false,
                        type: 'linear',
                        bounds: 'data',

                        ticks: {
                            color: 'rgba(51, 51, 51)',
                            maxRotation: 0,
                            maxTicksLimit: 10,
                            callback: (value, index, context) => {
                                if ([0, context.length - 1].includes(index)) return undefined;

                                return abbreviateNumber(Number(value));
                            },
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
                        },

                        grid: {
                            tickColor: 'rgb(51, 51, 51)',
                            drawOnChartArea: false,
                            z: 0,
                        },
                    },

                    z: {
                        offset: false,
                        bounds: 'data',
                        reverse: true,
                        type: 'linear',
                        axis: 'x',
                        position: 'bottom',

                        ticks: {
                            display: false,
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
                        },

                        grid: {
                            tickColor: 'rgb(51, 51, 51)',
                            drawOnChartArea: false,
                            drawTicks: false,
                            z: 50,
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
        if (!asks && !bids) return;

        updateChartData(aggregateQuantity(buyData, 'buy'), aggregateQuantity(sellData, 'sell'));
    }, [asks, bids]);

    useEffect(() => {
        const chartAPI = chart.current;
        if (!chartAPI || !yesterdayClosingPrice) return;
    }, [yesterdayClosingPrice]);

    return (
        <WidgetLoading spining={isLoading}>
            <div className="h-full flex flex-col flex-1 ">
                <div className="border-b mb-1 flex px-2 py-1">
                    <span className="text-xs font-bold text-L-gray-500 dark:text-D-gray-500 dark:border-D-gray-400">{t('OrderBook.depthChart')}</span>
                </div>

                <div className="flex-1 relative h-full border-l">
                    <canvas style={{ width: '100%', height: '96%' }} className="w-full" ref={onCanvasLoad} />
                </div>
            </div>
        </WidgetLoading>
    );
};

export default KucoinChart;
