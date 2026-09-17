import Header from './components/Header'
import type { ProjectDetail } from './data/projectDetails'
import './ProjectDetailPage.css'

type ProjectDetailPageProps = {
  project: ProjectDetail
}

function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <>
      <Header page="work" />

      <main className="project-detail">
        <section className="project-detail__hero" aria-labelledby="project-title">
          <div className="project-detail__topline">
            <p>Project {project.number}</p>
            {project.confidentiality && (
              <span>{project.confidentiality.label}</span>
            )}
          </div>

          <div className="project-detail__heading">
            <h1 id="project-title">{project.title}</h1>

            <div className="project-detail__meta">
              <div>
                <p>Discipline</p>
                {project.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
              <div>
                <p>Year</p>
                <time>{project.year}</time>
              </div>
            </div>
          </div>

          <div className="project-detail__overview">
            <p>Overview</p>
            <p>{project.overview}</p>
          </div>
        </section>

        <section className="project-detail__media" aria-label={project.media.label}>
          <span>{project.media.label}</span>
          <strong aria-hidden="true">{project.number}</strong>
        </section>

        <section className="project-detail__info" aria-labelledby="scope-title">
          <h2 id="scope-title">Scope</h2>
          <ol>
            {project.scope.map((item, index) => (
              <li key={item}>
                <span>{(index + 1).toString().padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="project-detail__notes" aria-labelledby="notes-title">
          <h2 id="notes-title">Selected Notes</h2>
          <div>
            <p>{project.notes}</p>
            {project.confidentiality && (
              <small>
                {project.confidentiality.primaryText}
                {project.confidentiality.supportingText && (
                  <> {project.confidentiality.supportingText}</>
                )}
              </small>
            )}
          </div>
        </section>

        <footer className="project-detail__footer">
          <a className="project-detail__back" href="/work">
            ← Back to All Work
          </a>

          <a className="project-detail__next" href={project.nextProject.href}>
            <span>Next Project →</span>
            <strong>{project.nextProject.title}</strong>
          </a>
        </footer>
      </main>
    </>
  )
}

export default ProjectDetailPage
