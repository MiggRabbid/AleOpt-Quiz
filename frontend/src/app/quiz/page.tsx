import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SideMain } from '@/components/layouts/SideMain/SideMain';
import { SideSecond } from '@/components/layouts/SideSecond/SideSecond';
import { Box } from '@mui/material';
import { api } from '../api/api';

const QuizPage = async () => {
  const questions = await api.getAllQuestions();

  const currQuestion = 3;

  return (
    <Box id="QuizPage" className="m-3.5 flex grow gap-3.5">
      <SideSecond>
        <Box>SideSecond</Box>
      </SideSecond>
      <SideMain>
        <Box
          className="h-full overflow-y-auto!"
          sx={{
            height: 'calc(100dvh - 71px - 14px - 14px - 20px - 20px - 20px)',
          }}
        >
          {!questions && <Box>Нет данных</Box>}
          {!!questions &&
            questions.map((question, index: number) => {
              return (
                <Accordion
                  key={`question-${question.id}`}
                  disabled={index !== currQuestion}
                  expanded={index === currQuestion}
                  className={`${index === currQuestion ? 'rounded-xl! border-1! border-slate-200! shadow-md!' : 'bg-slate-100! shadow-none!'}`}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="QuizPage-content"
                    id="QuizPage-header"
                  >
                    <Typography component="span" className="pr-25! pl-4">
                      {question.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex flex-row flex-wrap">
                    {question.answers.map((answer) => {
                      return (
                        <Typography
                          component="span"
                          className="w-1/2 shrink-1 grow-0 p-4"
                          key={`question-${question.id}-answer-${answer.id}`}
                        >
                          {answer.answer}
                        </Typography>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Box>
      </SideMain>
    </Box>
  );
};

export default QuizPage;
