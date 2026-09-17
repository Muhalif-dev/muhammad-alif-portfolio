import { useState } from 'react'
import Header from './components/Header'
import ProjectModal from './components/ProjectModal'
import useHeroPreview, { heroProjects, heroSelectorLabel } from './components/useHeroPreview'
import { getProjectDetail } from './data/projectDetails'
import { featuredProjects } from './data/projects'
import './App.css'

const contactEmail = 'muhammadalif199767@gmail.com'
const projectInquirySubject = 'Project Inquiry — Muhammad Alif'
const projectInquiryBody = "Hi Alif,\r\n\r\nI'd like to discuss a project with you."
const projectInquiryHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
  projectInquirySubject,
)}&body=${encodeURIComponent(projectInquiryBody).replace(/'/g, '%27')}`

// Temporarily archived. Set to true to restore both original hero CTAs.
const showHeroActions = false

const contactLinks = [
  { label: 'Email', detail: contactEmail, href: `mailto:${contactEmail}` },
  { label: 'Upwork', detail: 'See my profile', href: 'https://www.upwork.com/freelancers/muhalif?mp_source=share' },
  {
    label: 'LinkedIn',
    detail: 'Connect with me',
    href: 'https://www.linkedin.com/in/alifdev',
  },
]

type SelectedWorkProps = {
  onOpenProject: (slug: string) => void
}

function SelectedWork({ onOpenProject }: SelectedWorkProps) {
  return (
    <section className="selected-work" aria-labelledby="work-title">
      <header className="selected-work__header" id="selected-work">
        <p>Selected projects</p>
        <h2 id="work-title">Selected Work</h2>
      </header>

      <div className="work-list">
        {featuredProjects.map((project) => (
          <article className="work-item" key={project.slug}>
            <button
              className="work-item__trigger"
              type="button"
              aria-label={`View ${project.title}`}
              aria-haspopup="dialog"
              onClick={() => onOpenProject(project.slug)}
            />

            <span className="work-item__number">
              {project.number}
            </span>

            <div className="work-item__media" aria-hidden="true">
              {project.media.poster ? (
                <img src={project.media.poster} alt="" />
              ) : (
                <>
                  <span>Preview</span>
                  <strong>{project.number}</strong>
                </>
              )}
            </div>

            <h3>{project.title}</h3>
            <div className="work-item__meta">
              <p>{project.categories.join(' / ')}</p>
              {project.series && <span>Series — {project.series}</span>}
              {project.note && <span>{project.note}</span>}
            </div>
            <time>{project.year}</time>
          </article>
        ))}
      </div>

      {/*
        View All Work is intentionally archived for now. Remove this JSX
        comment to restore the existing homepage CTA later.

        <div className="selected-work__cta">
          <a href="/work">
            View All Work <span aria-hidden="true">→</span>
          </a>
        </div>
      */}
    </section>
  )
}

function AboutContact() {
  const selectedDisciplines = [
    'Motion Design',
    'Explainer Films',
    'Event Visuals',
    'Product Motion',
    '2D Animation',
    '3D Visualization',
  ]

  return (
    <section className="about-contact" aria-label="About and contact">
      <div className="about-contact__grid" id="about">
        <article className="about-panel" aria-labelledby="about-title">
          <p className="about-contact__label">About</p>

          <div className="about-panel__intro">
            <p className="about-panel__meta">
              Based in Indonesia — Available Worldwide
            </p>

            <h2 id="about-title">
              <span>Muhammad Alif is a</span>
              <span>motion designer focused on</span>
              <span>visual storytelling.</span>
            </h2>

            <p className="about-panel__supporting">
              I help brands, organizations, and agencies bring ideas to life
              through motion design, explainer films, event visuals, and digital
              content.
            </p>
          </div>

          <div className="about-panel__disciplines">
            <p>Selected Disciplines</p>
            <ul>
              {selectedDisciplines.map((discipline, index) => (
                <li key={discipline}>
                  <span>{(index + 1).toString().padStart(2, '0')}</span>
                  {discipline}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="contact-panel" id="contact" aria-labelledby="contact-title">
          <p className="about-contact__label">Contact</p>

          <h2 id="contact-title">
            <span>Let&apos;s work</span>
            <span>Together.</span>
          </h2>

          <p className="contact-panel__prompt">
            Have a project, idea, or story to bring to life?
          </p>

          <nav className="contact-panel__links" aria-label="Contact links">
            {contactLinks.map((link) => {
              const isExternal = link.href.startsWith('http')

              return (
                <a
                  href={link.href}
                  key={link.label}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <span>
                    <strong>{link.label}</strong>
                    <small>{link.detail}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              )
            })}
          </nav>

          <a className="contact-panel__cta" href={projectInquiryHref}>
            Start a project <span aria-hidden="true">→</span>
          </a>
        </article>
      </div>
    </section>
  )
}

function App() {
  const [isShowreelActive, setIsShowreelActive] = useState(false)
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)

  const heroPreview = useHeroPreview(isShowreelActive || activeProjectSlug !== null)
  const { videoRef } = heroPreview
  const previewTitle = isShowreelActive ? 'Showreel' : heroPreview.project.title
  const activeProject = activeProjectSlug
    ? getProjectDetail(activeProjectSlug)
    : null

  return (
    <>
      <Header />

      <main>
        <div className="hero" id="home">
          <section className="hero__content" aria-labelledby="hero-title">
            <div className="hero__heading">
              <p className="hero__eyebrow">
                Motion Designer &amp; Visual Storyteller
              </p>
              <h1 id="hero-title">Muhammad Alif</h1>
            </div>

            <p className="hero__intro">
              I create motion, video and visual experiences that make ideas clear,
              engaging and memorable.
            </p>

            <div className="hero__meta" aria-label="Location and availability">
              <span>Based in Indonesia</span>
              <span>Available Worldwide</span>
            </div>

            {showHeroActions && (
              <div className="hero__actions">
                <a href="#selected-work">View Selected Work</a>
                <button
                  type="button"
                  aria-pressed={isShowreelActive}
                  onClick={() => setIsShowreelActive((isActive) => !isActive)}
                >
                  {isShowreelActive ? 'Close Showreel' : 'Play Showreel'}
                </button>
              </div>
            )}

            <nav
              className="disciplines"
              aria-label="Project previews"
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') heroPreview.enter()
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === 'mouse') heroPreview.release()
              }}
              onBlur={(event) => {
                if (!(event.relatedTarget instanceof Element) ||
                    !event.relatedTarget.closest('.disciplines, #project-preview')) heroPreview.release()
              }}
            >
              {heroProjects.map((project, index) => (
                <button
                  className={index === heroPreview.selection.index ? 'is-active' : ''}
                  type="button"
                  key={project.slug}
                  aria-pressed={index === heroPreview.selection.index}
                  aria-controls="project-preview"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse') return
                    heroPreview.select(index, 'hover')
                    setIsShowreelActive(false)
                  }}
                  onFocus={(event) => {
                    if (event.currentTarget.matches(':focus-visible')) {
                      heroPreview.select(index, 'hover')
                      setIsShowreelActive(false)
                    }
                  }}
                  onClick={() => {
                    heroPreview.select(index, heroPreview.selection.mode === 'hover' ? 'hover' : 'selected')
                    setIsShowreelActive(false)
                  }}
                >
                  <span>0{index + 1}</span>
                  {heroSelectorLabel(project.slug)}
                </button>
              ))}
            </nav>
          </section>

          <section
            className={`project-preview${isShowreelActive ? ' is-showreel' : ' has-project-media'}`}
            id="project-preview"
            aria-label={`${previewTitle} project preview`}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') heroPreview.enter()
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') heroPreview.release()
            }}
            onFocus={heroPreview.enter}
            onBlur={(event) => {
              if (!(event.relatedTarget instanceof Element) ||
                  !event.relatedTarget.closest('.disciplines, #project-preview')) heroPreview.release()
            }}
          >
            {!isShowreelActive && (
              <button
                type="button"
                className="project-preview__trigger"
                aria-label={`View ${heroPreview.project.title}`}
                aria-haspopup="dialog"
                onClick={() => {
                  heroPreview.pause()
                  setActiveProjectSlug(heroPreview.project.slug)
                }}
              />
            )}
            <div className="project-preview__topline">
              <span>Selected preview</span>
              <span>{heroPreview.project.year}</span>
            </div>

            <div className="project-preview__visual">
              {isShowreelActive ? (
                <>
                  <span className="project-preview__index">SR</span>
                  <span className="project-preview__mark" />
                </>
              ) : (
                <div
                  className="project-preview__media"
                  data-orientation={heroPreview.project.media.orientation ?? 'landscape'}
                >
                  <video
                  key={`${heroPreview.project.slug}-${heroPreview.selection.revision}`}
                  ref={videoRef}
                  className="project-preview__video"
                  data-orientation={heroPreview.project.media.orientation ?? 'landscape'}
                  src={heroPreview.project.media.src}
                  poster={heroPreview.project.media.poster}
                  onLoadedMetadata={(event) => {
                    const video = event.currentTarget
                    if (video.videoWidth && video.videoHeight) {
                      video.parentElement?.style.setProperty(
                        '--media-ratio',
                        String(video.videoWidth / video.videoHeight),
                      )
                    }
                  }}
                  muted={heroPreview.muted}
                  playsInline
                  preload="metadata"
                />
                  <button
                    type="button"
                    className="project-preview__audio"
                    aria-label={heroPreview.muted ? 'Unmute preview' : 'Mute preview'}
                    aria-pressed={!heroPreview.muted}
                    onClick={(event) => {
                      event.stopPropagation()
                      heroPreview.toggleAudio()
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
                      {heroPreview.muted ? <path d="m16 9 6 6m0-6-6 6" /> : (
                        <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>
                      )}
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="project-preview__caption">
              <p>{previewTitle}</p>
              <span>
                {isShowreelActive ? 'Preview mode' : heroSelectorLabel(heroPreview.project.slug)}
              </span>
            </div>
          </section>
        </div>

        <SelectedWork onOpenProject={setActiveProjectSlug} />
        <AboutContact />
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

export default App
