import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProjectDetailPage from './ProjectDetailPage.tsx'
import WorkPage from './WorkPage.tsx'
import { safetyBriefingProject } from './data/projectDetails.ts'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const page =
  pathname === '/work/safety-briefing' ? (
    <ProjectDetailPage project={safetyBriefingProject} />
  ) : pathname === '/work' ? (
    <WorkPage />
  ) : (
    <App />
  )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
