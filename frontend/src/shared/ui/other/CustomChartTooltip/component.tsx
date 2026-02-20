import type { Chart } from 'chart.js';
import type { ICustomBarTooltip, TBarTooltipItem } from '@app/types';
import { getIconColorForStyles } from '@/shared/lib/getChipColor';

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
  allTries: 'Всего попыток:',
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

const lastTenAttemptsTooltip = (context: ICustomBarTooltip) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  let tooltipValue: ITooltipValue = {
    correctCount: 0,
    incorrectCount: 0,
    all: 0,
  };

  if (!!tooltip.dataPoints) {
    tooltipValue = tooltip.dataPoints.reduce(
      (acc: ITooltipValue, item: TBarTooltipItem) => {
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

      const titleTextAnswersData = document.createElement('p');
      titleTextAnswersData.innerText = title;
      titleTextAnswersData.style.fontSize = '14px';
      titleTextAnswersData.style.lineHeight = '18px';
      titleTextAnswersData.style.color = 'oklch(70.4% 0.04 256.788)';

      titleContent.appendChild(titleTextMain);
      titleContent.appendChild(titleTextAnswersData);
      titleContainer.appendChild(titleContent);
    });

    const tooltipBody = document.createElement('tbody');
    tooltipBody.style.width = 'fit-content';
    tooltipBody.style.borderCollapse = 'collapse';
    tooltipBody.style.borderSpacing = '0';

    bodyLines.forEach((body: any) => {
      const label = body[0].split(': ')[0];

      // Строка таблицы
      const bodyRow = getBodyRow();
      // Ячейка контента
      const rowCell = getRowCell();
      // Обертка для контента ячейки
      const cellContentWrapper = getRowCellWrapper();

      // Иконка ответа
      const answerIcon = getAnswerIcon();
      // Ответы - лейбл
      const textAnswersLabel = getAnswerLabel();
      // Ответы  - дата
      const textAnswersData = getAnswerData();

      if (label.trim() === labelMaps.correct) {
        answerIcon.style.backgroundColor = getAnswersIconColor(true);
        textAnswersLabel.innerText = `${tooltipLabelMaps.correct}`;
        textAnswersData.innerText = `${tooltipValue.correctCount}`;
      }

      if (label.trim() === labelMaps.incorrect) {
        answerIcon.style.backgroundColor = getAnswersIconColor(false);
        textAnswersLabel.innerText = `${tooltipLabelMaps.incorrect}`;
        textAnswersData.innerText = `${tooltipValue.incorrectCount}`;
      }

      cellContentWrapper.appendChild(answerIcon);
      cellContentWrapper.appendChild(textAnswersLabel);
      cellContentWrapper.appendChild(textAnswersData);
      rowCell.appendChild(cellContentWrapper);
      bodyRow.appendChild(rowCell);
      tooltipBody.appendChild(bodyRow);
    });

    // Иконка для всех ответов
    const allAnswerIcon = getAnswerIcon();
    allAnswerIcon.style.backgroundColor = 'transparent';
    // все ответы - лейбл
    const allTextAnswersLabel = getAnswerLabel();
    allTextAnswersLabel.innerText = 'Всего вопросов:';
    // все ответы  - дата
    const allTextAnswersData = getAnswerData();
    const answerCounter =
      Number(tooltipValue.correctCount) + Number(tooltipValue.incorrectCount) || 0;
    allTextAnswersData.innerText = `${answerCounter}`;
    // Обертка для контента ячейки
    const allCellContentWrapper = getRowCellWrapper();
    allCellContentWrapper.style.padding = `6px 0 2px 0`;
    // Строка таблицы
    const allBodyRow = getBodyRow();
    // Ячейка контента
    const allRowCell = getRowCell();

    allCellContentWrapper.appendChild(allAnswerIcon);
    allCellContentWrapper.appendChild(allTextAnswersLabel);
    allCellContentWrapper.appendChild(allTextAnswersData);
    allRowCell.appendChild(allCellContentWrapper);
    allBodyRow.appendChild(allRowCell);
    tooltipBody.appendChild(allBodyRow);

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

const questionStatsForAllUsersTooltip = (context: ICustomBarTooltip) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  let tooltipValue: ITooltipValue = {
    correctCount: 0,
    incorrectCount: 0,
    all: 0,
  };

  if (!!tooltip.dataPoints) {
    tooltipValue = tooltip.dataPoints.reduce(
      (acc: ITooltipValue, item: TBarTooltipItem) => {
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
      titleTextMain.innerText = 'Сотрудник:';
      titleTextMain.style.fontFamily = 'Roboto, sans-serif';
      titleTextMain.style.fontSize = '12px';
      titleTextMain.style.lineHeight = '16px';
      titleTextMain.style.color = 'oklch(70.4% 0.04 256.788)';

      const titleTextAnswersData = document.createElement('p');
      titleTextAnswersData.innerText = title;
      titleTextAnswersData.style.fontSize = '14px';
      titleTextAnswersData.style.lineHeight = '18px';
      titleTextAnswersData.style.color = 'oklch(70.4% 0.04 256.788)';

      titleContent.appendChild(titleTextMain);
      titleContent.appendChild(titleTextAnswersData);
      titleContainer.appendChild(titleContent);
    });

    const tooltipBody = document.createElement('tbody');
    tooltipBody.style.width = 'fit-content';
    tooltipBody.style.borderCollapse = 'collapse';
    tooltipBody.style.borderSpacing = '0';

    // Общее кол-во попыток
    const summaryRow = getBodyRow();
    const summaryRowCell = getRowCell();
    const summaryContentWrapper = getRowCellWrapper();
    summaryContentWrapper.style.padding = `8px 0 8px 0`;
    summaryContentWrapper.style.borderTop = `1px solid oklch(70.4% 0.04 256.788)`;

    const summaryIcon = getAnswerIcon();
    const summaryTextLabel = getAnswerLabel();
    const summaryTextData = getAnswerData();

    summaryIcon.style.backgroundColor = 'oklch(0.704 0.04 256.788)';
    summaryTextLabel.innerText = `${tooltipLabelMaps.allTries}`;
    summaryTextData.innerText = `${tooltipValue.all}`;

    summaryContentWrapper.appendChild(summaryIcon);
    summaryContentWrapper.appendChild(summaryTextLabel);
    summaryContentWrapper.appendChild(summaryTextData);
    summaryRowCell.appendChild(summaryContentWrapper);
    summaryRow.appendChild(summaryRowCell);
    tooltipBody.appendChild(summaryRow);

    bodyLines.forEach((body: any) => {
      const label = body[0].split(': ')[0];

      // Строка таблицы
      const bodyRow = getBodyRow();
      // Ячейка контента
      const rowCell = getRowCell();
      // Обертка для контента ячейки
      const cellContentWrapper = getRowCellWrapper();

      // Иконка ответа
      const answerIcon = getAnswerIcon();
      // Ответы - лейбл
      const textAnswersLabel = getAnswerLabel();
      // Ответы  - дата
      const textAnswersData = getAnswerData();

      if (label.trim() === labelMaps.correct) {
        answerIcon.style.backgroundColor = getAnswersIconColor(true);
        textAnswersLabel.innerText = `${tooltipLabelMaps.correct}`;
        textAnswersData.innerText = `${tooltipValue.correctCount}`;
      }

      if (label.trim() === labelMaps.incorrect) {
        answerIcon.style.backgroundColor = getAnswersIconColor(false);
        textAnswersLabel.innerText = `${tooltipLabelMaps.incorrect}`;
        textAnswersData.innerText = `${tooltipValue.incorrectCount}`;
      }

      cellContentWrapper.appendChild(answerIcon);
      cellContentWrapper.appendChild(textAnswersLabel);
      cellContentWrapper.appendChild(textAnswersData);
      rowCell.appendChild(cellContentWrapper);
      bodyRow.appendChild(rowCell);
      tooltipBody.appendChild(bodyRow);
    });

    // Иконка для всех ответов
    const allAnswerIcon = getAnswerIcon();
    allAnswerIcon.style.backgroundColor = 'transparent';
    // Средний результат - лейбл
    const allTextAverageResLabel = getAnswerLabel();
    allTextAverageResLabel.innerText = 'Средний результат:';
    // все ответы  - дата
    const allTextAverageResData = getAnswerData();
    const answerCounter = Math.round(
      (Number(tooltipValue.correctCount) / tooltipValue.all) * 100,
    );
    allAnswerIcon.style.backgroundColor = getIconColorForStyles(answerCounter);
    allTextAverageResData.innerText = `${answerCounter}%`;
    // Обертка для контента ячейки
    const allCellContentWrapper = getRowCellWrapper();
    allCellContentWrapper.style.marginTop = `4px`;
    allCellContentWrapper.style.borderTop = `1px solid oklch(70.4% 0.04 256.788)`;
    allCellContentWrapper.style.padding = `8px 0 4px 0`;
    // Строка таблицы
    const allBodyRow = getBodyRow();
    // Ячейка контента
    const allRowCell = getRowCell();

    allCellContentWrapper.appendChild(allAnswerIcon);
    allCellContentWrapper.appendChild(allTextAverageResLabel);
    allCellContentWrapper.appendChild(allTextAverageResData);
    allRowCell.appendChild(allCellContentWrapper);
    allBodyRow.appendChild(allRowCell);
    tooltipBody.appendChild(allBodyRow);

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

const getAnswerIcon = (): HTMLDivElement => {
  const answerIcon = document.createElement('div');
  answerIcon.style.height = '16px';
  answerIcon.style.width = '16px';
  answerIcon.style.padding = '0px';
  answerIcon.style.borderRadius = '50%';
  return answerIcon;
};

const getAnswerLabel = (): HTMLDivElement => {
  const textAnswersLabel = document.createElement('p');
  textAnswersLabel.style.minWidth = '170px';
  textAnswersLabel.style.width = 'fit-content';
  textAnswersLabel.style.height = 'fit-content';
  textAnswersLabel.style.fontFamily = 'Roboto, sans-serif';
  textAnswersLabel.style.fontSize = '14px';
  textAnswersLabel.style.lineHeight = '18px';
  textAnswersLabel.style.fontWeight = '600';
  textAnswersLabel.style.textAlign = 'start';
  textAnswersLabel.style.textWrap = 'nowrap';
  textAnswersLabel.style.color = 'oklch(0.554 0.046 257.417)';
  return textAnswersLabel;
};

const getAnswerData = (): HTMLDivElement => {
  const textAnswersData = document.createElement('p');
  textAnswersData.style.minWidth = '20px';
  textAnswersData.style.width = 'fit-content';
  textAnswersData.style.height = 'fit-content';
  textAnswersData.style.fontFamily = 'Roboto, sans-serif';
  textAnswersData.style.fontSize = '14px';
  textAnswersData.style.lineHeight = '18px';
  textAnswersData.style.fontWeight = '600';
  textAnswersData.style.textAlign = 'end';
  textAnswersData.style.textWrap = 'nowrap';
  textAnswersData.style.color = 'oklch(0.554 0.046 257.417)';
  return textAnswersData;
};

const getBodyRow = (): HTMLDivElement => {
  const bodyRow = document.createElement('tr');
  // bodyRow.style.width = 'fit-content';
  bodyRow.style.borderWidth = `${0}`;
  return bodyRow;
};

const getRowCell = (): HTMLDivElement => {
  const rowCell = document.createElement('td');
  rowCell.style.width = '100%';
  rowCell.style.height = 'fit-content';
  rowCell.style.borderWidth = `${0}`;
  return rowCell;
};

const getRowCellWrapper = (): HTMLDivElement => {
  const cellContentWrapper = document.createElement('div');
  cellContentWrapper.style.width = '100%';
  cellContentWrapper.style.height = 'fit-content';
  cellContentWrapper.style.display = 'flex';
  cellContentWrapper.style.padding = `2px 0`;
  cellContentWrapper.style.justifyContent = 'space-between';
  cellContentWrapper.style.alignItems = 'center';
  cellContentWrapper.style.gap = '8px';
  return cellContentWrapper;
};

const getAnswersIconColor = (isCorrect: boolean): string => {
  return isCorrect ? 'oklch(76.5% 0.177 163.223)' : 'oklch(71.2% 0.194 13.428)';
};

export { lastTenAttemptsTooltip, questionStatsForAllUsersTooltip };
