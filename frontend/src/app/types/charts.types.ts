import type { Chart, ChartData, ChartOptions, TooltipItem, TooltipModel } from 'chart.js';

export type TBarData = ChartData<'bar'>;
export type TBarOptions = ChartOptions<'bar'>;
export type TBarTooltipModel = TooltipModel<'bar'>;
export type TBarTooltipItem = TooltipItem<'bar'>;

export interface ICustomBarTooltip {
  chart: Chart;
  tooltip: TBarTooltipModel;
}

export type TDoughnutData = ChartData<'doughnut'>;
export type TDoughnutOptions = ChartOptions<'doughnut'>;
export type TDoughnutTooltipModel = TooltipModel<'doughnut'>;
export type TDoughnutTooltipItem = TooltipItem<'doughnut'>;

export interface ICustomDoughnutTooltip {
  chart: Chart;
  tooltip: TDoughnutTooltipModel;
}
