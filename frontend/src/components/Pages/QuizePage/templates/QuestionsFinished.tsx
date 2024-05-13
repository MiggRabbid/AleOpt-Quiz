import { useSelector } from "react-redux";

import { questionsType } from "../../../../types";
import { iQuestion, iUserAnswer } from "../../../../interfaces";

import { getCurrentResult, getQuestions } from "../../../../selectors/quizSelectors";

import QuestionsResultVariant from "./QuestionsResultVariant";

const getQuestion = (questions: questionsType, id: string): iQuestion => {
  const result = questions.filter((item) => {
    console.log(item.id, id)
    return item.id === Number(id)});
  return result[0];
}

const QuestionsFinished = () => {
  const questions = useSelector(getQuestions) as questionsType;
  const currentResult = useSelector(getCurrentResult);

  return (
    <section className="col-10 col-md-8 col-xxl-6 my-5 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm my-3 px-2">
        <h3 className="mx-auto text-uppercase text-center pt-4 pb-2">Ваши результаты</h3>
        {
          currentResult.map((userAnswer: iUserAnswer) => {
            const currQuestion = getQuestion(questions, userAnswer.id)
            console.log(JSON.stringify(currQuestion));
            return (
            <div key={currQuestion.id} className="py-2">
              <QuestionsResultVariant
                currQuestion={currQuestion}
                  userAnswer={userAnswer}
              />
              </div>
          )})
        }
      </div>
    </section>
  )
}

export default QuestionsFinished