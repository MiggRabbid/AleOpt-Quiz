import { Chart } from 'chart.js';
import {
  ICustomBarTooltip,
  TypeTooltipItem,
} from '../../../features/CustomBar/types/CustomBar';

interface ITooltipValue {
  correctCount: number;
  incorrectCount: number;
  all: number;
}

const labelMaps = {
  correct: 'Правильные',
  incorrect: 'Неправильные',
};

const tooltipLabelMaps = {
  correct: 'Правильных ответов:',
  incorrect: 'Неправильных ответов:',
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

export const lastTenAttemptsTooltip = (context: ICustomBarTooltip) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  let tooltipValue: ITooltipValue = {
    correctCount: 0,
    incorrectCount: 0,
    all: 0,
  };

  if (!!tooltip.dataPoints) {
    tooltipValue = tooltip.dataPoints.reduce(
      (acc: ITooltipValue, item: TypeTooltipItem) => {
        const updatedAcc = { ...acc };
        const label = item.dataset.label;
        const value = item.raw as number;
        if (label === labelMaps.correct) {
          updatedAcc.correctCount = value;
        } else if (label === labelMaps.incorrect) {
          updatedAcc.incorrectCount = value;
        }

        updatedAcc.all += value;
        return updatedAcc;
      },
      tooltipValue,
    );
  }

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    // Кастомный title тултипа
    const titleContainer = document.createElement('div');
    titleContainer.style.width = '100%';
    titleContainer.style.minWidth = 'fit-content';
    titleContainer.style.height = 'fit-content';
    titleContainer.style.marginBottom = '4px';

    titleLines.forEach((title: any) => {
      const titleContent = document.createElement('div');
      titleContent.style.width = '100%';
      titleContent.style.height = 'fit-content';
      titleContent.style.display = 'flex';
      titleContent.style.justifyContent = 'space-between';
      titleContent.style.gap = '16px';
      titleContent.style.alignItems = 'center';

      const titleTextMain = document.createElement('p');
      titleTextMain.innerText = 'Дата:';
      titleTextMain.style.fontFamily = 'Roboto, sans-serif';
      titleTextMain.style.fontSize = '12px';
      titleTextMain.style.lineHeight = '16px';
      titleTextMain.style.color = 'oklch(70.4% 0.04 256.788)';

      const titleTextSecond = document.createElement('p');
      titleTextSecond.innerText = title;
      titleTextSecond.style.fontSize = '14px';
      titleTextSecond.style.lineHeight = '18px';
      titleTextSecond.style.color = 'oklch(70.4% 0.04 256.788)';

      titleContent.appendChild(titleTextMain);
      titleContent.appendChild(titleTextSecond);
      titleContainer.appendChild(titleContent);
    });

    const tooltipBody = document.createElement('tbody');
    tooltipBody.style.width = 'fit-content';
    tooltipBody.style.borderCollapse = 'collapse';
    tooltipBody.style.borderSpacing = '0';

    bodyLines.forEach((body: any) => {
      const label = body[0].split(': ')[0];

      // Строка таблицы
      const bodyRow = document.createElement('tr');
      // bodyRow.style.width = 'fit-content';
      bodyRow.style.borderWidth = `${0}`;
      // Ячейка контента
      const rowCell = document.createElement('td');
      rowCell.style.width = 'fit-content';
      rowCell.style.height = 'fit-content';
      rowCell.style.borderWidth = `${0}`;
      // Обертка для контента ячейки
      const cellContentWrapper = document.createElement('div');
      cellContentWrapper.style.width = 'fit-content';
      cellContentWrapper.style.height = 'fit-content';
      cellContentWrapper.style.display = 'flex';
      cellContentWrapper.style.padding = `2px 0`;
      cellContentWrapper.style.justifyContent = 'center';
      cellContentWrapper.style.alignItems = 'center';
      cellContentWrapper.style.gap = '8px';
      // Иконка гендера
      const genderIcon = document.createElement('div');
      genderIcon.style.height = '16px';
      genderIcon.style.width = '16px';
      genderIcon.style.padding = '0px';
      genderIcon.style.borderRadius = '50%';

      // Значение гендера
      const textMain = document.createElement('p');
      textMain.style.minWidth = '170px';
      textMain.style.height = 'fit-content';
      textMain.style.fontFamily = 'Roboto, sans-serif';
      textMain.style.fontSize = '14px';
      textMain.style.lineHeight = '18px';
      textMain.style.fontWeight = '600';
      textMain.style.textAlign = 'start';
      textMain.style.textWrap = 'nowrap';
      textMain.style.color = 'oklch(55.4% 0.046 257.417)';
      // Процент гендера
      const textSecond = document.createElement('p');
      textSecond.style.minWidth = '20px';
      textSecond.style.width = 'fit-content';
      textSecond.style.height = 'fit-content';
      textSecond.style.fontFamily = 'Roboto, sans-serif';
      textSecond.style.fontSize = '14px';
      textSecond.style.lineHeight = '18px';
      textSecond.style.fontWeight = '600';
      textSecond.style.textAlign = 'end';
      textSecond.style.textWrap = 'nowrap';
      textSecond.style.color = 'oklch(12.9% 0.042 264.695)';

      if (label.trim() === labelMaps.correct) {
        genderIcon.style.backgroundColor = 'oklch(84.5% 0.143 164.978)';
        textMain.innerText = `${tooltipLabelMaps.correct}`;
        textSecond.innerText = `${tooltipValue.correctCount}`;
      }
      if (label.trim() === labelMaps.incorrect) {
        genderIcon.style.backgroundColor = 'oklch(71.2% 0.194 13.428)';
        textMain.innerText = `${tooltipLabelMaps.incorrect}`;
        textSecond.innerText = `${tooltipValue.incorrectCount}`;
      }

      cellContentWrapper.appendChild(genderIcon);
      cellContentWrapper.appendChild(textMain);
      cellContentWrapper.appendChild(textSecond);
      rowCell.appendChild(cellContentWrapper);
      bodyRow.appendChild(rowCell);
      tooltipBody.appendChild(bodyRow);
    });

    const tableRoot = tooltipEl.querySelector('table');

    if (!!tableRoot) {
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(titleContainer);
      tableRoot.appendChild(tooltipBody);
    }
  }

  const { offsetLeft: positionX, offsetTop: positionY, offsetHeight } = chart.canvas;

  const x =
    positionX + tooltip.caretX - tooltip.width > positionX
      ? positionX + tooltip.caretX - tooltip.width + 10
      : positionX + tooltip.caretX + tooltip.width;
  const y =
    positionY + tooltip.caretY + tooltip.height < offsetHeight
      ? positionY + tooltip.caretY
      : positionY + tooltip.caretY - tooltip.height * 1.5;
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
