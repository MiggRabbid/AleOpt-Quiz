import { iQuestion } from '../../interfaces';

const questions: iQuestion[] = [
  {
    id: 1,
    question: 'Покупатель выбрал 3 товара: силиконовый чехол в тех.паке - 200р, карту памяти "Smartbuy 32gb" - 670р, СЗУ "HOCO" - 250р. Общая стоимость покупки будет равна',
    answers:
    [
      {questionId: 1, id: 'a', answer: '930 рублей'},
      {questionId: 1, id: 'b', answer: ' 805 рублей'},
      {questionId: 1, id: 'c', answer: '860 рублей'},
      {questionId: 1, id: 'd', answer: '1120 рублей'}
    ],
    correctAnswerId: 'a',
  },
  {
    id: 2,
    question: 'Чем отличаются флеш-диски USB2.0 от USB3.0',
    answers:
    [
      {questionId: 2, id: 'a', answer: 'разное рабочее напряжение, 2V и 3V'},
      {questionId: 2, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 2, id: 'c', answer: 'используются в разных устройствах'},
      {questionId: 2, id: 'd', answer: 'отличаются размерами штекера'}
    ],
    correctAnswerId: 'b',
  },
  {
    id: 3,
    question: 'ФМ-модулятор - это',
    answers:
    [
      {questionId: 3, id: 'a', answer: 'передаёт ФМ-сигнал с автомагнитолы, вставляется в прикуриватель'},
      {questionId: 3, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 3, id: 'c', answer: 'устройство для лучшего приема ФМ-сигнала телефоном'},
      {questionId: 3, id: 'd', answer: 'устройство для лучшего приема ФМ-сигнала автомагнитолой'}
    ],
    correctAnswerId: 'c',
  },
  {
    id: 4,
    question: 'Главная идея АлёОпт',
    answers:
    [
      {questionId: 4, id: 'a', answer: 'Прибыль'},
      {questionId: 4, id: 'b', answer: 'Счастливый начальник'},
      {questionId: 4, id: 'c', answer: 'Счастливый продавец'},
      {questionId: 4, id: 'd', answer: 'Счастливый клиент'}
    ],
    correctAnswerId: 'd',
  },
  {
    id: 5,
    question: 'Что будет, если блоку питания 5V/2.4A и с 2я USB подключить 2 телефона, с потребляемой мощностью 2А',
    answers:
    [
      {questionId: 5, id: 'a', answer: 'Сила тока будет делиться примерно поровну'},
      {questionId: 5, id: 'b', answer: 'блок откажется их заряжать'},
      {questionId: 5, id: 'c', answer: 'оба телефона будут потреблять 2А'},
      {questionId: 5, id: 'd', answer: 'один телефон будет потреблять 2А, а второй не будет заряжаться'}
    ],
    correctAnswerId: 'a',
  },
  {
    id: 1,
    question: 'Покупатель выбрал 3 товара: силиконовый чехол в тех.паке - 200р, карту памяти "Smartbuy 32gb" - 670р, СЗУ "HOCO" - 250р. Общая стоимость покупки будет равна',
    answers:
    [
      {questionId: 1, id: 'a', answer: '930 рублей'},
      {questionId: 1, id: 'b', answer: ' 805 рублей'},
      {questionId: 1, id: 'c', answer: '860 рублей'},
      {questionId: 1, id: 'd', answer: '1120 рублей'}
    ],
    correctAnswerId: 'a',
  },
  {
    id: 2,
    question: 'Чем отличаются флеш-диски USB2.0 от USB3.0',
    answers:
    [
      {questionId: 2, id: 'a', answer: 'разное рабочее напряжение, 2V и 3V'},
      {questionId: 2, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 2, id: 'c', answer: 'используются в разных устройствах'},
      {questionId: 2, id: 'd', answer: 'отличаются размерами штекера'}
    ],
    correctAnswerId: 'b',
  },
  {
    id: 3,
    question: 'ФМ-модулятор - это',
    answers:
    [
      {questionId: 3, id: 'a', answer: 'передаёт ФМ-сигнал с автомагнитолы, вставляется в прикуриватель'},
      {questionId: 3, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 3, id: 'c', answer: 'устройство для лучшего приема ФМ-сигнала телефоном'},
      {questionId: 3, id: 'd', answer: 'устройство для лучшего приема ФМ-сигнала автомагнитолой'}
    ],
    correctAnswerId: 'c',
  },
  {
    id: 4,
    question: 'Главная идея АлёОпт',
    answers:
    [
      {questionId: 4, id: 'a', answer: 'Прибыль'},
      {questionId: 4, id: 'b', answer: 'Счастливый начальник'},
      {questionId: 4, id: 'c', answer: 'Счастливый продавец'},
      {questionId: 4, id: 'd', answer: 'Счастливый клиент'}
    ],
    correctAnswerId: 'd',
  },
  {
    id: 5,
    question: 'Что будет, если блоку питания 5V/2.4A и с 2я USB подключить 2 телефона, с потребляемой мощностью 2А',
    answers:
    [
      {questionId: 5, id: 'a', answer: 'Сила тока будет делиться примерно поровну'},
      {questionId: 5, id: 'b', answer: 'блок откажется их заряжать'},
      {questionId: 5, id: 'c', answer: 'оба телефона будут потреблять 2А'},
      {questionId: 5, id: 'd', answer: 'один телефон будет потреблять 2А, а второй не будет заряжаться'}
    ],
    correctAnswerId: 'a',
  },
  {
    id: 1,
    question: 'Покупатель выбрал 3 товара: силиконовый чехол в тех.паке - 200р, карту памяти "Smartbuy 32gb" - 670р, СЗУ "HOCO" - 250р. Общая стоимость покупки будет равна',
    answers:
    [
      {questionId: 1, id: 'a', answer: '930 рублей'},
      {questionId: 1, id: 'b', answer: ' 805 рублей'},
      {questionId: 1, id: 'c', answer: '860 рублей'},
      {questionId: 1, id: 'd', answer: '1120 рублей'}
    ],
    correctAnswerId: 'a',
  },
  {
    id: 2,
    question: 'Чем отличаются флеш-диски USB2.0 от USB3.0',
    answers:
    [
      {questionId: 2, id: 'a', answer: 'разное рабочее напряжение, 2V и 3V'},
      {questionId: 2, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 2, id: 'c', answer: 'используются в разных устройствах'},
      {questionId: 2, id: 'd', answer: 'отличаются размерами штекера'}
    ],
    correctAnswerId: 'b',
  },
  {
    id: 3,
    question: 'ФМ-модулятор - это',
    answers:
    [
      {questionId: 3, id: 'a', answer: 'передаёт ФМ-сигнал с автомагнитолы, вставляется в прикуриватель'},
      {questionId: 3, id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {questionId: 3, id: 'c', answer: 'устройство для лучшего приема ФМ-сигнала телефоном'},
      {questionId: 3, id: 'd', answer: 'устройство для лучшего приема ФМ-сигнала автомагнитолой'}
    ],
    correctAnswerId: 'c',
  },
  {
    id: 4,
    question: 'Главная идея АлёОпт',
    answers:
    [
      {questionId: 4, id: 'a', answer: 'Прибыль'},
      {questionId: 4, id: 'b', answer: 'Счастливый начальник'},
      {questionId: 4, id: 'c', answer: 'Счастливый продавец'},
      {questionId: 4, id: 'd', answer: 'Счастливый клиент'}
    ],
    correctAnswerId: 'd',
  },
  {
    id: 5,
    question: 'Что будет, если блоку питания 5V/2.4A и с 2я USB подключить 2 телефона, с потребляемой мощностью 2А',
    answers:
    [
      {questionId: 5, id: 'a', answer: 'Сила тока будет делиться примерно поровну'},
      {questionId: 5, id: 'b', answer: 'блок откажется их заряжать'},
      {questionId: 5, id: 'c', answer: 'оба телефона будут потреблять 2А'},
      {questionId: 5, id: 'd', answer: 'один телефон будет потреблять 2А, а второй не будет заряжаться'}
    ],
    correctAnswerId: 'a',
  },
]

export default questions;