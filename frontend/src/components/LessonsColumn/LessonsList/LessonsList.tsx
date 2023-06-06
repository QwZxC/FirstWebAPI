import { Box, List, Skeleton, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useLesson } from '../../../context/lessons';

import { LessonsItem } from './LessonsItem.tsx/LessonsItem';


const LessonsList: FC = () => {
  const { isError, isLoading, isSuccess, lessons } = useLesson();
  const lessonsIsEmpty = isSuccess && lessons && !lessons.length; 

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
            <LessonsItem lesson={lesson} key={lesson.id} />
          )}
        </List>
      )}
    </div>
  );
};

export default memo(LessonsList);
