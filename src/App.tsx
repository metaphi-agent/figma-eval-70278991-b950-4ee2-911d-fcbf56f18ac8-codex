import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const LoginPage = lazy(() => import('./pages/LoginPage'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-black-100)]" />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
