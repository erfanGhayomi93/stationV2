import ChartJs from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJs.register(zoomPlugin);

ChartJs.defaults.font.weight = 'normal';
ChartJs.defaults.font.family = 'IRANSansEnNum';
ChartJs.defaults.font.size = 12;
ChartJs.defaults.layout.padding = { top: 0, left: 0, bottom: 0, right: 0 };
ChartJs.defaults.responsive = false;
ChartJs.defaults.maintainAspectRatio = true;
ChartJs.defaults.interaction.intersect = false;
ChartJs.defaults.interaction.axis = 'x';
ChartJs.defaults.interaction.mode = 'nearest';
ChartJs.defaults.plugins.legend.display = false;
ChartJs.defaults.plugins.legend.rtl = true;
ChartJs.defaults.plugins.legend.labels.boxHeight = 4;
ChartJs.defaults.plugins.legend.labels.boxWidth = 16;
ChartJs.defaults.plugins.legend.labels.boxPadding = 8;
ChartJs.defaults.plugins.legend.textDirection = 'rtl';

ChartJs.defaults.plugins.legend.labels.color = 'rgb(51, 51, 51)';
ChartJs.defaults.scale.grid.tickColor = 'rgb(193, 193, 193)';
ChartJs.defaults.scale.grid.color = 'rgb(193, 193, 193)';

ChartJs.defaults.animation = false;

export default ChartJs;