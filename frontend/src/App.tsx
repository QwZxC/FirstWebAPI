import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { lessonUrl, lessonUrlById, startPage } from './constants/routes'
import { LessonsPage } from './pages/LessonsPage'
import { StartPage } from './pages/StartPage';

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path={lessonUrlById} element={<LessonsPage />} />
        <Route path={lessonUrl} element={<LessonsPage />} />
        <Route path={startPage} element={<StartPage />} />
      </Routes>
    </div>
  )
}

export default App
