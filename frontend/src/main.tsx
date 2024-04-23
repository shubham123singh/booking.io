import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/appContext'

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      retry : 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <App></App>
    </AppContextProvider>
    </QueryClientProvider>
    
  </React.StrictMode>,
)
