import { useState } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { addLesson } from './../actions/addLesson'

export const FormAddLesson = () => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState<string>('')

	const submitClickHandler = () => {
    if (name.length === 0) return
		dispatch(addLesson({ name, themes: [], courseId: 0 }))
		setName('')
	}

  return (
    <div>
      <input
        onChange={e => setName(e.target.value)}
				value={name}
        type='text'
        placeholder='Введите название занятия...'
      />
      <button onClick={submitClickHandler}>
        Добавить
      </button>
    </div>
  )
}
