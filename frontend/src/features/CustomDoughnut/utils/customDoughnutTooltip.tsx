import { iQuestionStatsForDoughnut } from '@/types/stats';
import { Chart } from 'chart.js';
import { ICustomDoughnutTooltip } from '../types/CustomDoughnut';

export const customTooltipTitle = (
  questionsStats: iQuestionStatsForDoughnut | null,
  context: any,
) => {
  if (!questionsStats) return 'Нет данных';
  const tooltipData = context[0];
  const questionId = tooltipData.label;
  const currentQuestion = questionsStats[questionId];
  return `${currentQuestion.question}`;
};

export const customTooltipLabel = (context: any) => {
  return `Верных ответов: ${context.formattedValue}`;
};

export const customTooltipFooter = (
  questionsStats: iQuestionStatsForDoughnut | null,
  context: any,
) => {
  if (!questionsStats) return 'Нет данных';
  const tooltipData = context[0];
  const questionId = tooltipData.label;
  const currentQuestion = questionsStats[questionId];
  return `Всего попыток: ${currentQuestion.attemptCount}`;
};

const getOrCreateTooltip = (chart: Chart): HTMLDivElement => {
  let tooltipEl = chart.canvas.parentNode?.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.width = '140px';
    tooltipEl.style.height = '120px';
    tooltipEl.style.padding = '16px 16px';
    tooltipEl.style.borderRadius = '16px';
    tooltipEl.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    tooltipEl.style.boxShadow = '0px 0px 8px 0px rgba(159, 179, 200, 0.5)';
    tooltipEl.style.opacity = '1';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const customDoughnutTooltip = (context: ICustomDoughnutTooltip) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);
  const { title, body, footer } = tooltip;

  if (tooltip.opacity === 0) {
    return;
  }

  // Кастомный title тултипа
  const tooltipTitle = document.createElement('div');
  tooltipTitle.style.width = 'fit-content';
  tooltipTitle.style.height = 'fit-content';
  tooltipTitle.style.marginBottom = '4px';
  if (title) {
    const titleContent = document.createElement('div');
    titleContent.style.width = '300px';
    titleContent.style.minWidth = 'fit-content';
    titleContent.style.height = 'fit-content';
    titleContent.style.display = 'flex';
    titleContent.style.justifyContent = 'start';
    titleContent.style.gap = '16px';
    titleContent.style.alignItems = 'start';

    const titleTextMain = document.createElement('p');
    titleTextMain.innerText = 'Вопрос:';
    titleTextMain.style.fontFamily = 'Roboto, sans-serif';
    titleTextMain.style.fontSize = '14px';
    titleTextMain.style.lineHeight = '16px';
    titleTextMain.style.fontWeight = '600';
    titleTextMain.style.color = 'oklch(12.9% 0.042 264.695)';

    const titleTextSecond = document.createElement('p');
    titleTextSecond.innerText = title[0] || 'Нет данных';
    titleTextSecond.style.fontSize = '14px';
    titleTextSecond.style.lineHeight = '18px';
    titleTextSecond.style.color = 'oklch(12.9% 0.042 264.695)';

    titleContent.appendChild(titleTextMain);
    titleContent.appendChild(titleTextSecond);
    tooltipTitle.appendChild(titleContent);
  }

  // Кастомный body тултипа
  const tooltipBody = document.createElement('tbody');
  if (body) {
    const bodyLines = body || [];
    tooltipBody.style.width = '100%';
    tooltipBody.style.borderCollapse = 'collapse';
    tooltipBody.style.borderSpacing = '0';
    // Строка таблицы
    const bodyRow = document.createElement('tr');
    bodyRow.style.borderWidth = `${0}`;
    // Ячейка контента
    const rowCell = document.createElement('td');
    rowCell.style.width = 'fit-content';
    rowCell.style.height = 'fit-content';
    rowCell.style.borderWidth = `${0}`;
    // Обертка для контента ячейки
    const cellContentWrapper = document.createElement('div');
    cellContentWrapper.style.width = '100%';
    cellContentWrapper.style.height = 'fit-content';
    cellContentWrapper.style.display = 'flex';
    cellContentWrapper.style.padding = `2px 0`;
    cellContentWrapper.style.justifyContent = 'space-between';
    cellContentWrapper.style.alignItems = 'center';
    cellContentWrapper.style.gap = '8px';

    // Значение гендера
    const textMain = document.createElement('p');
    textMain.style.width = '100%';
    textMain.style.height = 'fit-content';
    textMain.style.fontFamily = 'Roboto, sans-serif';
    textMain.style.fontSize = '14px';
    textMain.style.lineHeight = '16px';
    textMain.style.fontWeight = '600';
    textMain.style.textAlign = 'start';
    textMain.style.textWrap = 'nowrap';
    textMain.style.color = 'oklch(50.8% 0.118 165.612)';
    // Процент гендера
    const textSecond = document.createElement('p');
    textSecond.style.minWidth = '20px';
    textSecond.style.width = '100%';
    textSecond.style.height = 'fit-content';
    textSecond.style.fontFamily = 'Roboto, sans-serif';
    textSecond.style.fontSize = '14px';
    textSecond.style.lineHeight = '16px';
    textSecond.style.fontWeight = '600';
    textSecond.style.textAlign = 'end';
    textSecond.style.textWrap = 'nowrap';
    textSecond.style.color = 'oklch(70.4% 0.04 256.788)';

    textMain.innerText = bodyLines[0].lines[0] || 'Верных ответов: -';
    textSecond.innerText = footer[0] || 'Всего попыток: -';

    cellContentWrapper.appendChild(textMain);
    cellContentWrapper.appendChild(textSecond);
    rowCell.appendChild(cellContentWrapper);
    bodyRow.appendChild(rowCell);
    tooltipBody.appendChild(bodyRow);

    const tableRoot = tooltipEl.querySelector('table');

    if (!!tableRoot) {
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(tooltipTitle);
      tableRoot.appendChild(tooltipBody);
    }
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  const x = positionX + tooltip.caretX - 50;
  const y = positionY + tooltip.caretY - tooltip.height * 1.5 - 10;
  tooltipEl.style.opacity = '1';
  tooltipEl.style.zIndex = '999';
  tooltipEl.style.width = 'fit-content';
  tooltipEl.style.height = 'fit-content';
  tooltipEl.style.left = x + 'px';
  tooltipEl.style.top = y + 'px';
  tooltipEl.style.padding = '16px 16px';
  tooltipEl.style.borderRadius = '16px';
  tooltipEl.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  tooltipEl.style.boxShadow = '0px 0px 8px 0px rgba(159, 179, 200, 0.5)';
};
