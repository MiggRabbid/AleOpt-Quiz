export const getFormattedDate = (): string => {
  const date: Date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  };
  return date.toLocaleDateString('ru-RU', options).replace(' г.', '');
};
