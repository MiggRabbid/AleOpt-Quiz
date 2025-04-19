import { Box } from '@mui/material';
import { TopResultsListItem } from './TopResultsListItem';
import { iUserStats } from '@/types/stats';

interface ITopResultsListProps {
  sortedResults: iUserStats[];
}

const TopResultsList = ({ sortedResults }: ITopResultsListProps) => {
  const sortedResultsLength = sortedResults.length;

  const topResults = sortedResults
    .filter((result, index: number) => {
      if (sortedResultsLength > 4 && index >= sortedResultsLength - 2) return result;
      if (sortedResultsLength > 1 && index === sortedResultsLength - 1) return result;
    })
    .reverse();

  const bottomResults = sortedResults
    .filter((result, index: number) => {
      if (sortedResultsLength > 4 && index < 2) return result;
      if (sortedResultsLength > 1 && index === 0) return result;
    })
    .reverse();

  console.log('topResults -', topResults);
  console.log('bottomResults -', bottomResults);

  return (
    <Box className="flex min-h-fit grow flex-col justify-start gap-2">
      {topResults.map((result, index: number) => {
        return (
          <TopResultsListItem
            key={`${result.username}-${index}`}
            result={result}
            index={index}
            isEasiest={true}
          />
        );
      })}
      {bottomResults.map((result, index: number) => {
        return (
          <TopResultsListItem
            key={`${result.username}-${index}`}
            result={result}
            index={sortedResultsLength - bottomResults.length + index}
            isEasiest={false}
          />
        );
      })}
    </Box>
  );
};

export { TopResultsList };
