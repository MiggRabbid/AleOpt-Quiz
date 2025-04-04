import { Chart } from 'chart.js';
import type { ChartData, ChartOptions, TooltipItem, TooltipModel } from 'chart.js';

export type doughnutData = ChartData<'doughnut'>;
export type doughnutOptions = ChartOptions<'doughnut'>;
export type TypeTooltipModel = TooltipModel<'doughnut'>;
export type TypeTooltipItem = TooltipItem<'doughnut'>;

export interface ICustomDoughnutTooltip {
  chart: Chart;
  tooltip: TypeTooltipModel;
}
