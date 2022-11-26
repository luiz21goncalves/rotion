import { QueryClientProvider } from '@tanstack/react-query'

import { Routes } from './Routes'
import { queryClient } from './lib/react-query'

import './styles/global.css'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
