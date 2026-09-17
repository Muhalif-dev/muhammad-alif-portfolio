import { useState } from 'react'
import Header from './components/Header'
import ProjectModal from './components/ProjectModal'
import { getProjectDetail } from './data/projectDetails'
import { projects } from './data/projects'
import './WorkPage.css'

function WorkPage() {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)
  const activeProject = activeProjectSlug
    ? getProjectDetail(activeProjectSlug)
    : null

  return (
    <>
      <Header page="work" />

      <main className="work-page">
        <section className="work-page__intro" aria-labelledby="archive-title">
          <div className="work-page__topline">
            <p>All Work</p>
            <a href="/#home">Back to Home ←</a>
          </div>

          <div className="work-page__heading">
            <h1 id="archive-title">
              Selected projects,
              <span>experiments &amp; visual work.</span>
            </h1>
            <p>
              A broader collection of motion, film, event visuals, product
              explainers and selected design work.
            </p>
          </div>
        </section>

        <section className="work-archive" aria-label="Project archive">
          <div className="work-archive__grid">
            {projects.map((project) => (
              <article className="archive-item" id={project.slug} key={project.slug}>
                <button
                  className="archive-item__trigger"
                  type="button"
                  aria-label={`View ${project.title}`}
                  aria-haspopup="dialog"
                  onClick={() => setActiveProjectSlug(project.slug)}
                />

                <div className="archive-item__topline">
                  <span>{project.number}</span>
                  <span>{project.year}</span>
                </div>

                <div className="archive-item__media" aria-hidden="true">
                  {project.media.poster ? (
                    <img src={project.media.poster} alt="" />
                  ) : (
                    <>
                      <span>Project preview</span>
                      <strong>{project.number}</strong>
                    </>
                  )}
                </div>

                <div className="archive-item__details">
                  <h2>{project.title}</h2>
                  <p>{project.categories.join(' / ')}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProjectSlug(null)}
          onProjectChange={setActiveProjectSlug}
        />
      )}
    </>
  )
}

export default WorkPage
