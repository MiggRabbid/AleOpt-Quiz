import { Chart, ChartData, ChartOptions, TooltipItem, TooltipModel } from 'chart.js';

export type barData = ChartData<'bar'>;
export type barOptions = ChartOptions<'bar'>;
export type TypeTooltipModel = TooltipModel<'bar'>;
export type TypeTooltipItem = TooltipItem<'bar'>;

export interface ICustomBarTooltip {
  chart: Chart;
  tooltip: TypeTooltipModel;
}
