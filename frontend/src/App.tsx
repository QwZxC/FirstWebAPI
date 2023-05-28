import { LessonsPage } from './pages/LessonsPage';
import { QueryClientProvider, QueryClient } from 'react-query'

const App = () => {
  const client = new QueryClient()
  
  return (
    <QueryClientProvider client={client}>
      <div>
        <LessonsPage />
      </div>
    </QueryClientProvider>
  )
}

export default App