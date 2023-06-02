import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { LessonsPage } from './pages/LessonsPage'

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        
        <Route path='/lessons/:id' element={<LessonsPage />} />
      </Routes>
    </div>
  )
}

export default App
