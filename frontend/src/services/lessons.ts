import { ILesson } from '../models/ILesson'

const BASE = 'https://localhost:5000/api/Lesson'

export const getLessonsAndFindByString = async (
  string: string,
): Promise<ILesson[] | undefined> => {
  let secondPartUrl = string === 'All' ? 'All' : `name:string?name=${string}`
  let requestString = [BASE, secondPartUrl].join('/')

  try {
    const response = await fetch(requestString)

    if (secondPartUrl !== 'All' && response.status === 404) {
      return []
    }
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = (await response.json()) as ILesson[]
    return data
  } catch (e){
		const error = e as Error
		console.error(error.message)
		throw error;
	}
}

export const createLesson = async (lesson: ILesson): Promise<ILesson> => {
	try {
    const response = await fetch([BASE, "Create"].join('/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    const result = await response.json() as ILesson;
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const deleteLesson = async (id: number): Promise<void> => {
  try {
    const response = await fetch([BASE, id].join('/'), { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Failed to delete lesson with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateLesson = async (lesson: ILesson): Promise<ILesson> => {
  try {
    const response = await fetch([BASE, `${lesson.id}/Update`].join('/'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json() as ILesson;
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};