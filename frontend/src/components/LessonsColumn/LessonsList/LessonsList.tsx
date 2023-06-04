import { Box, List, Skeleton, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { ILesson } from '../../../models/ILesson';
import { LessonsItem } from './LessonsItem.tsx/LessonsItem';

interface LessonsListProps {
  search: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentLessonId?: number; 
  lessons?: ILesson[];
}

const LessonsList: FC<LessonsListProps> = ({
  search,
  isLoading,
  isSuccess,
  lessons = [],
  isError,
  currentLessonId,
}) => {
  const lessonsIsEmpty = isSuccess && !lessons.length; 

  return (
    <div>
      {isLoading && (
        <Box display="flex" flexDirection="column" gap="10px">
          <Skeleton variant='rectangular' sx={{ height: 40 }}/>
          <Skeleton variant='rectangular' sx={{ height: 40 }}/>
          <Skeleton variant='rectangular' sx={{ height: 40 }}/>
          <Skeleton variant='rectangular' sx={{ height: 40 }}/>
        </Box>
      )}
      {isError && <Typography>Ошибка!</Typography>}
      {lessonsIsEmpty && <Typography variant='h5'>Занятий нет</Typography>}

      {!lessonsIsEmpty && (
        <List>
          {lessons?.map(lesson => 
            <LessonsItem lesson={lesson} key={lesson.id} currentLessonId={currentLessonId} />
          )}
        </List>
      )}
    </div>
  );
};

export default memo(LessonsList);
