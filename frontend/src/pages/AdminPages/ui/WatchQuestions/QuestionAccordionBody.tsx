import React from 'react';
import { Accordion } from 'react-bootstrap';

import ChangeButtonsGroup from '../../../../shared/components/buttons/ChangeButtonsGroup';

import { iQuestion } from '../../../../types/iQuiz';

interface iQuestionAccordionBodyProps {
  question: iQuestion;
}

const QuestionAccordionBody: React.FC<iQuestionAccordionBodyProps> = (props) => {
  const { question } = props;

  return (
    <Accordion.Body className="d-flex flex-column flex-lg-row justify-content-between align-items-end align-items-lg-start gap-2 ">
      <div className="w-100 d-flex flex-wrap rounded overflow-hidden border me-2">
        {question.answers.map((answer) => {
          return (
            <p
              key={answer.id}
              className={`col-12 col-lg-6 border p-4 m-0 ${question.correctAnswerId === answer.id ? ' bg-primary-subtle' : ''}`}
            >
              {`${answer.id.toLocaleUpperCase()})  ${answer.answer}`}
            </p>
          );
        })}
      </div>
      <ChangeButtonsGroup data={question} />
    </Accordion.Body>
  );
};

export default React.memo(QuestionAccordionBody);
