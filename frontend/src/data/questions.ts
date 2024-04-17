
interface iQuestion {
  question: string;
  answers: { id: string; answer: string }[];
  correctAnswer: string[];
}

export const data: iQuestion[] = [
  {
    question: 'question 1',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['a'],
  },
  {
    question: 'question 2',
    answers: [
      {
        id: 'a',
        answer: 'aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaa',
      },
      {
        id: 'b',
        answer: 'bbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbb bbbbbbbbbbbbbbbb bbbbbbbbbbbb',
      },
      {
        id: 'c',
        answer: 'cccc  cccccccccccccccccccccccc cccc cccc cccc cccc cccccccccccc cccc cccc cccc cccc cccc cccc',
      },
      {
        id: 'd',
        answer: 'dddd dddd dddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd dddddddddddd',
      }],
    correctAnswer: ['b'],
  },
  {
    question: 'question 3',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['c'],
  },
  {
    question: 'question 4',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['d'],
  },
  {
    question: 'question 5',
    answers: [{id: 'a', answer: 'aaaa'}, {id: 'b', answer: 'bbbb'}, {id: 'c', answer: 'cccc'}, {id: 'd', answer: 'dddd'}],
    correctAnswer: ['a', 'b'],
  }
]