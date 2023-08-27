import { useCallback, useEffect, useMemo, useRef } from 'react';
import ChartJs from 'src/libs/chart';
import { useAppValues } from 'src/redux/hooks';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { externalTooltipHandler } from '../../../SymbolChart/components/helper';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import useMarketDepth from '../MarketDepth/useMarketDepth';

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

    const {
        ui: { theme },
    } = useAppValues();

    const {
        option: { selectedSymbol },
    } = useAppValues();

    const {
        data: { bids, asks },
        actions: { fetch, subscribe, unsubscribe, reset },
    } = useMarketDepth();
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol);

    useEffect(() => {
        fetch(selectedSymbol);
    }, [selectedSymbol]);

    const buyData = useMemo(() => {
        const data: HalfRowType[] = [];
        if (bids.data) {
            for (const key in bids.data) {
                if (Array.isArray(bids.data?.[key])) {
                    const tempObj: HalfRowType = { price: 0, volume: 0, count: 0, percent: 0 };
                    tempObj['price'] = bids.data[key][0];
                    tempObj['volume'] = bids.data[key][1];
                    tempObj['count'] = bids.data[key][2];
                    tempObj['percent'] = Number(bids.data[key][1]) / Number(bids.totalQuantity) || 0;
                    data.push(tempObj);
                }
            }
        }
        
        return data.sort((a, b) => +b.price - +a.price);
    }, [bids]);

    const sellData = useMemo(() => {
        const data: HalfRowType[] = [];

        if (asks.data) {
            for (const key in asks.data) {
                if (Array.isArray(asks.data?.[key])) {
                    const tempObj: HalfRowType = { price: 0, volume: 0, count: 0, percent: 0 };
                    tempObj['price'] = asks.data[key][0];
                    tempObj['volume'] = asks.data[key][1];
                    tempObj['count'] = asks.data[key][2];
                    tempObj['percent'] = Number(asks.data[key][1]) / Number(asks.totalQuantity) || 0;
                    data.push(tempObj);
                }
            }
        }

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

        //@ts-ignore
        initialData.yesterdayClosingPrice = symbolData?.symbolData?.yesterdayClosingPrice ?? 0;
        //@ts-ignore
        initialData.highThreshold = symbolData?.symbolData?.highThreshold ?? 0;
        //@ts-ignore
        initialData.lowThreshold = symbolData?.symbolData?.lowThreshold ?? 0;

        return initialData;
    }, [symbolData]);

    const aggregateQuantity = (data: any, side: 'buy' | 'sell') => {
        const deepCopyOfData: any = JSON.parse(JSON.stringify(data));
        if (side === 'buy') deepCopyOfData.sort((a: any, b: any) => b.items[0] - a.items[0]);
        else deepCopyOfData.sort((a: any, b: any) => a.items[0] - b.items[0]);

        const result: any[] = [];
        const qty = new Map<number, number>();

        for (let i = 0; i < deepCopyOfData.length; i++) {
            const row = deepCopyOfData[i];
            const price = row.items[0];
            const volume = row.items[1];

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
                        data: buyData,
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
                        data: sellData,
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
        if (!buyData && !sellData) return;

        updateChartData(buyData, sellData);
    }, [buyData, sellData]);

    useEffect(() => {
        const chartAPI = chart.current;
        if (!chartAPI || !yesterdayClosingPrice) return;

        try {
            // @ts-ignore
            // chartAPI.options.plugins.chartAreaBorder?.yesterdayClosingPrice = yesterdayClosingPrice;
            // chartAPI.update();
        } catch (e) {
            //
        }
    }, [yesterdayClosingPrice]);

    return (
        <div
            style={{
                minHeight: '250px',
                maxHeight: '250px',
            }}
            className="relative overflow-hidden mt-8"
        >
            <canvas style={{ height: '250px' }} className="w-full m-0" ref={onCanvasLoad} />
        </div>
    );
};

export default MarketDepthChart;
