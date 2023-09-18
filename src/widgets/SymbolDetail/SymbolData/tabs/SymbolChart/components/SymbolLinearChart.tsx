import type { TooltipModel } from 'chart.js';
import dayjs from 'dayjs';

import { memo, useCallback, useEffect, useRef } from 'react';
import ChartJs from 'src/libs/chart';
import { useAppSelector } from 'src/redux/hooks';
import { abbreviateNumber, getAverageDates, seprateNumber } from 'src/utils/helpers';
import { externalTooltipHandler } from './helper';
import { getTheme } from 'src/redux/slices/ui';

type SymbolLinearChartProps = {
    data?: any;
    date: SymbolChartDate;
};

const SymbolLinearChart = ({ data, date }: SymbolLinearChartProps) => {
    const dateRef = useRef<typeof date>(date);

    const chart = useRef<ChartJs<'line', Array<any>> | undefined>(undefined);

    const theme = useAppSelector(getTheme)

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

    const getChartLabels = (data: any, n = 8) => {
        try {
            return getAverageDates(data[0].x, data[data.length - 1].x, n);
        } catch (e) {
            return [];
        }
    };

    const updateChartData = (data: Array<any>) => {
        const chartAPI = chart.current;
        if (!chartAPI) return;

        const scales = chartAPI.options.scales;
        if (!(scales && scales.x && scales.y)) return;

        try {
            chartAPI.data.labels = getChartLabels(data, date === 'Today' ? 8 : 5);
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

        const chartApi = new ChartJs(canvas, {
            type: 'line',
            data: {
                labels: getChartLabels(data),
                datasets: [
                    {
                        label: 'قیمت',
                        data: data ?? [],
                        borderColor: 'rgb(0, 155, 198)',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 3,
                        pointHoverBorderWidth: 3,
                        parsing: {
                            xAxisKey: 'x',
                            yAxisKey: 'c',
                        },
                    },
                ],
            },

            options: {
                plugins: {
                    legend: {
                        display: false,
                    },

                    tooltip: {
                        enabled: false,
                        position: 'nearest',
                        external: (context: { chart: ChartJs; tooltip: TooltipModel<'line'> }) => externalTooltipHandler(context, (value) => xAxisCallback(value))
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
                    autoPadding: false,
                    padding: 0,
                },

                scales: {
                    x: {
                        offset: false,
                        position: 'bottom',
                        bounds: 'data',
                        type: 'time',

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
                            source: 'labels',
                            autoSkip: true,
                            autoSkipPadding: 8,
                            maxTicksLimit: 8,
                            maxRotation: 0,
                            align: 'center',
                            callback: xAxisCallback,

                            font: {
                                size: 11,
                            },
                        },

                        border: {
                            color: 'rgb(193, 193, 193)',
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
                            autoSkip: false,
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
        }) as ChartJs<'line', any[], number>;

        chart.current = chartApi;
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

    return <canvas style={{ height: '100%' }} className="w-full" ref={onCanvasLoad} />;
};

export default memo(SymbolLinearChart);

const mockData = [
    {
        o: 121000,
        h: 121005,
        l: 120503,
        c: 120959,
        x: 1688947200000,
        v: 111394,
    },
    {
        o: 121900,
        h: 121900,
        l: 118526,
        c: 119053,
        x: 1689033600000,
        v: 118671,
    },
    {
        o: 118059,
        h: 119989,
        l: 117400,
        c: 119898,
        x: 1689120000000,
        v: 974235,
    },
    {
        o: 119900,
        h: 120998,
        l: 119900,
        c: 120480,
        x: 1689379200000,
        v: 967166,
    },
    {
        o: 119459,
        h: 119459,
        l: 117500,
        c: 118000,
        x: 1689465600000,
        v: 197341,
    },
    {
        o: 118799,
        h: 118799,
        l: 116601,
        c: 118399,
        x: 1689552000000,
        v: 169925,
    },
    {
        o: 118388,
        h: 120000,
        l: 118388,
        c: 119158,
        x: 1689638400000,
        v: 254835,
    },
    {
        o: 118440,
        h: 118800,
        l: 117900,
        c: 118099,
        x: 1689724800000,
        v: 97380,
    },
    {
        o: 118004,
        h: 118600,
        l: 116965,
        c: 117149,
        x: 1689984000000,
        v: 143958,
    },
    {
        o: 116800,
        h: 116800,
        l: 114831,
        c: 115800,
        x: 1690070400000,
        v: 296151,
    },
    {
        o: 115800,
        h: 118600,
        l: 115013,
        c: 116835,
        x: 1690156800000,
        v: 278863,
    },
    {
        o: 116840,
        h: 119620,
        l: 116840,
        c: 118705,
        x: 1690243200000,
        v: 232889,
    },
    {
        o: 120020,
        h: 122000,
        l: 120000,
        c: 120750,
        x: 1690329600000,
        v: 172560,
    },
    {
        o: 119939,
        h: 120900,
        l: 119800,
        c: 120779,
        x: 1690588800000,
        v: 232250,
    },
    {
        o: 121700,
        h: 121700,
        l: 117610,
        c: 119100,
        x: 1690675200000,
        v: 581208,
    },
    {
        o: 119450,
        h: 121800,
        l: 119450,
        c: 121400,
        x: 1690761600000,
        v: 260380,
    },
    {
        o: 124500,
        h: 127800,
        l: 123000,
        c: 127700,
        x: 1690848000000,
        v: 603845,
    },
    {
        o: 126980,
        h: 126980,
        l: 122980,
        c: 123690,
        x: 1691193600000,
        v: 426484,
    },
    {
        o: 124700,
        h: 124700,
        l: 122803,
        c: 123338,
        x: 1691280000000,
        v: 161697,
    },
    {
        o: 123020,
        h: 124000,
        l: 122952,
        c: 123301,
        x: 1691366400000,
        v: 151415,
    },
    {
        o: 122900,
        h: 122990,
        l: 122101,
        c: 122925,
        x: 1691452800000,
        v: 95673,
    },
    {
        o: 122950,
        h: 123790,
        l: 122800,
        c: 123705,
        x: 1691539200000,
        v: 157549,
    },
    {
        o: 120040,
        h: 120040,
        l: 117470,
        c: 119793,
        x: 1691798400000,
        v: 323926,
    },
    {
        o: 120200,
        h: 121850,
        l: 120200,
        c: 120901,
        x: 1691884800000,
        v: 254612,
    },
    {
        o: 121920,
        h: 121920,
        l: 120100,
        c: 120788,
        x: 1691971200000,
        v: 265353,
    },
    {
        o: 120788,
        h: 121300,
        l: 120210,
        c: 120322,
        x: 1692057600000,
        v: 216199,
    },
    {
        o: 121480,
        h: 121480,
        l: 119990,
        c: 120042,
        x: 1692144000000,
        v: 95763,
    },
    {
        o: 118999,
        h: 119499,
        l: 118171,
        c: 118250,
        x: 1692403200000,
        v: 272833,
    },
    {
        o: 118400,
        h: 121000,
        l: 118121,
        c: 118739,
        x: 1692489600000,
        v: 183768,
    },
];
