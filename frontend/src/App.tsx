import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { lessonUrl, lessonUrlById } from './constants/routes'
import { LessonsPage } from './pages/LessonsPage'

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path={lessonUrlById} element={<LessonsPage />} />
        <Route path={lessonUrl} element={<LessonsPage />} />
      </Routes>
    </div>
  )
}

export default App
