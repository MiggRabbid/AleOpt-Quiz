import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { questionsType } from '../../../types';

import { getQuestionIndex, getQuestions } from '../../../selectors/quizSelectors'
import useActions from "../../../hooks/useActions";
import useAuth from "../../../hooks/useAuth";
import routes from "../../../routes";

import QuestionsFinished from "./templates/QuestionsFinished";
import QuestionsSection from "./templates/QuestionsSection";

const QuizPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { changeQuizState } = useActions();

  const questionsIndex = useSelector(getQuestionIndex);
  const questions = useSelector(getQuestions) as questionsType;
  const quantityQuestions = Object.keys(questions).length;

  useEffect(() => {
    if (!user || quantityQuestions === 0) navigate(routes.MainPagePath())
  }, [user]);

  useEffect(() => {;
    changeQuizState(true);
  }, []);



  return (
    <main className="container-xl h-auto min-h-100 d-flex">
      <div className="h-100 col-12 row justify-content-center align-content-center ">
        { (questionsIndex < quantityQuestions)
        ? <QuestionsSection questions={questions} quantityQuestions={quantityQuestions}/>
        : <QuestionsFinished />
        }

      </div>
    </main>
  );
}

export default QuizPage;