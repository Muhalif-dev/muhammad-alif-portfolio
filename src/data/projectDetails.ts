import { featuredProjects, projects, type Project } from './projects'

export type ProjectNavigationItem = {
  title: string
  slug: string
  href?: string
}

export type ProjectDetail = Project & {
  totalProjects: number
  notes: string
  previousProject: ProjectNavigationItem
  nextProject: ProjectNavigationItem
}

const defaultNotes = 'Selected project details and media will be added later.'

export function getProjectDetail(slug: string): ProjectDetail | null {
  const project = projects.find((item) => item.slug === slug)
  if (!project) return null

  const navigationProjects = project.featured ? featuredProjects : projects
  const index = navigationProjects.findIndex((item) => item.slug === slug)
  const previousProject =
    navigationProjects[(index - 1 + navigationProjects.length) % navigationProjects.length]
  const nextProject = navigationProjects[(index + 1) % navigationProjects.length]

  return {
    ...project,
    number: project.featured ? (index + 1).toString().padStart(2, '0') : project.number,
    totalProjects: navigationProjects.length,
    notes: project.selectedNotes ?? defaultNotes,
    previousProject: {
      title: previousProject.title,
      slug: previousProject.slug,
    },
    nextProject: {
      title: nextProject.title,
      slug: nextProject.slug,
      href: '/work',
    },
  }
}

export const safetyBriefingProject = getProjectDetail('safety-briefing-film')!
