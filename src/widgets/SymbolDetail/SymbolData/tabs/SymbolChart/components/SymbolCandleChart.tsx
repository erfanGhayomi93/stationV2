import zoomPlugin from 'chartjs-plugin-zoom';
import dayjs from 'dayjs';
import 'src/libs/candlestick/index.js';

import { memo, useCallback, useEffect, useRef } from 'react';
import ChartJs from 'src/libs/chart';
import { useAppValues } from 'src/redux/hooks';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';

type SymbolCandleChartProps = {
    data?: any[];
    date: SymbolChartDate;
};

const SymbolCandleChart = ({ data, date }: SymbolCandleChartProps) => {
    const dateRef = useRef<typeof date>(date);

    const chart = useRef<ChartJs<'candlestick', Array<any>> | undefined>(undefined);

    const {
        ui: { theme },
    } = useAppValues();

    const xAxisCallback = (value: string | number): string => {
        const formats: Record<typeof dateRef.current, string> = {
            Today: 'HH:mm',
            Weekly: 'YYYY/MM/DD',
            Monthly: 'YYYY/MM/DD',
            Yearly: 'YYYY/MM/DD',
        };

        const d = new Date(value);
        const gmt = new Date(value).getTimezoneOffset() * 60000;
        return dayjs(d.getTime() + gmt)
            .calendar('jalali')
            .format(formats[dateRef.current]);
    };

    const updateChartData = (data: any[]) => {
        const chartAPI = chart.current;
        if (!chartAPI) return;

        const scales = chartAPI.options.scales;
        if (!(scales && scales.x && scales.y)) return;

        try {
            chartAPI.data.datasets[0].data = data;

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

    const onCanvasLoad = useCallback((canvas: HTMLCanvasElement) => {
        if (chart.current instanceof ChartJs || !canvas) return;

        const parentEl = canvas.parentElement;
        canvas.style.height = (parentEl?.clientHeight ?? 250) + 'px';

        chart.current = new ChartJs(canvas, {
            type: 'candlestick',

            data: {
                labels: [],
                datasets: [
                    {
                        label: 'قیمت',
                        risingColor: 'green',
                        fallingColor: 'red',
                        data: data ?? [],
                        color: {
                            up: 'rgb(88, 204, 182)',
                            down: 'rgb(237, 110, 114)',
                            unchanged: '#999',
                        },
                        borderColor: {
                            up: 'rgb(88, 204, 182)',
                            down: 'rgb(237, 110, 114)',
                            unchanged: '#999',
                        },
                    },
                ],
            },

            plugins: [zoomPlugin],

            options: {
                plugins: {
                    legend: {
                        display: false,
                    },

                    tooltip: {
                        displayColors: false,
                        position: 'nearest',
                        callbacks: {
                            // @ts-ignore
                            title: (tooltipItems) => {
                                try {
                                    const date = tooltipItems[0].raw.x;
                                    return xAxisCallback(date);
                                } catch (e) {
                                    return '';
                                }
                            },
                        },
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                        },
                        zoom: {
                            mode: 'x',
                            scaleMode: 'x',
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                        },
                    },
                },

                hover: {
                    intersect: false,
                },

                layout: {
                    autoPadding: true,
                    padding: 0,
                },

                scales: {
                    x: {
                        position: 'bottom',
                        bounds: 'data',

                        time: {
                            displayFormats: {
                                hour: 'yyyy/MM/dd HH:mm:ss',
                                minute: 'yyyy/MM/dd HH:mm:ss',
                                second: 'yyyy/MM/dd HH:mm:ss',
                                millisecond: 'yyyy/MM/dd HH:mm:ss',
                                quarter: 'yyyy/MM/dd HH:mm:ss',
                                day: 'yyyy/MM/dd HH:mm:ss',
                                week: 'yyyy/MM/dd HH:mm:ss',
                                month: 'yyyy/MM/dd HH:mm:ss',
                                year: 'yyyy/MM/dd HH:mm:ss',
                            },
                        },

                        ticks: {
                            color: 'rgb(136, 136, 136)',
                            padding: 4,
                            source: 'data',
                            autoSkip: true,
                            autoSkipPadding: 24,
                            maxTicksLimit: 8,
                            maxRotation: 0,
                            align: 'center',
                            callback: xAxisCallback,

                            font: {
                                size: 11,
                            },
                        },

                        border: {
                            display: false,
                        },

                        grid: {
                            color: 'rgb(237, 237, 237)',
                            tickColor: 'rgb(237, 237, 237)',
                            display: true,
                            drawOnChartArea: false,
                        },
                    },

                    y: {
                        offset: false,
                        position: 'left',

                        ticks: {
                            color: 'rgb(136, 136, 136)',
                            padding: 4,
                            source: 'data',
                            autoSkip: true,
                            maxTicksLimit: 5,
                            maxRotation: 0,
                            callback: (value: string | number) => {
                                value = String(value);
                                value = value.length > 4 ? abbreviateNumber(Number(value)) : seprateNumber(Number(value));

                                return `\u200E${value}`;
                            },

                            font: {
                                size: 11,
                            },
                        },

                        border: {
                            display: false,
                        },

                        grid: {
                            color: 'rgb(237, 237, 237)',
                            tickColor: 'rgb(237, 237, 237)',
                            display: true,
                        },
                    },
                },
            },
        }) as ChartJs<'candlestick', any[], number>;

        updateChartColor();
    }, []);

    useEffect(() => {
        updateChartColor();
    }, [theme]);

    useEffect(() => {
        dateRef.current = date;

        if (chart.current) chart.current.resetZoom();
    }, [date]);

    useEffect(() => {
        if (!data) return;

        updateChartData(data);
    }, [data]);

    return <canvas className="w-full h-full" ref={onCanvasLoad} />;
};

export default memo(SymbolCandleChart);
