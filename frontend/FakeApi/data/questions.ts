import { iQuestion } from '../../';

const questions: { [key: string]: iQuestion } = {
  '0': {
    question: 'Покупатель выбрал 3 товара: силиконовый чехол в тех.паке - 200р, карту памяти "Smartbuy 32gb" - 670р, СЗУ "HOCO" - 250р. Общая стоимость покупки будет равна',
    answers:
    [
      {id: 'а', answer: '930 рублей'},
      {id: 'b', answer: ' 805 рублей'},
      {id: 'c', answer: '860 рублей'},
      {id: 'd', answer: '1120 рублей'}
    ],
    correctAnswer: 'a',
  },
  '1': {
    question: 'Чем отличаются флеш-диски USB2.0 от USB3.0',
    answers:
    [
      {id: 'а', answer: 'разное рабочее напряжение, 2V и 3V'},
      {id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {id: 'c', answer: 'используются в разных устройствах'},
      {id: 'd', answer: 'отличаются размерами штекера'}
    ],
    correctAnswer: 'b',
  },
  '2': {
    question: 'ФМ-модулятор - это',
    answers:
    [
      {id: 'а', answer: 'передаёт ФМ-сигнал с автомагнитолы, вставляется в прикуриватель'},
      {id: 'b', answer: 'разные поколения, отличаются по скорости чтения и записи'},
      {id: 'c', answer: 'устройство для лучшего приема ФМ-сигнала телефоном'},
      {id: 'd', answer: 'устройство для лучшего приема ФМ-сигнала автомагнитолой'}
    ],
    correctAnswer: 'c',
  },
  '3': {
    question: 'Главная идея АлёОпт',
    answers:
    [
      {id: 'а', answer: 'Прибыль'},
      {id: 'b', answer: 'Счастливый начальник'},
      {id: 'c', answer: 'Счастливый продавец'},
      {id: 'd', answer: 'Счастливый клиент'}
    ],
    correctAnswer: 'd',
  },
  '4': {
    question: 'Что будет, если блоку питания 5V/2.4A и с 2я USB подключить 2 телефона, с потребляемой мощностью 2А',
    answers:
    [
      {id: 'а', answer: 'Сила тока будет делиться примерно поровну'},
      {id: 'b', answer: 'блок откажется их заряжать'},
      {id: 'c', answer: 'оба телефона будут потреблять 2А'},
      {id: 'd', answer: 'один телефон будет потреблять 2А, а второй не будет заряжаться'}
    ],
    correctAnswer: 'd',
  },
}

export default questions;