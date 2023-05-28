import { ITheme } from '../models/ITheme'

const BASE = 'https://localhost:5000/api/Theme'

export const getLessonsAndFindByString = async (
  string: string,
): Promise<ITheme[] | undefined> => {
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
    const data = (await response.json()) as ITheme[]
    return data
  } catch (e){
		const error = e as Error
		console.error(error.message)
		throw error;
	}
}

export const createLesson = async (theme: ITheme): Promise<ITheme> => {
	try {
    const response = await fetch([BASE, "Create"].join('/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theme)
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    const result = await response.json() as ITheme;
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
      throw new Error(`Failed to delete theme with ID ${id}`);
    }
  } catch (error) {
    console.error(error);
  }
};