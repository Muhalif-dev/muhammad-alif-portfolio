import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { RefObject } from 'react'
import type { ProjectDetail } from '../data/projectDetails'
import './ProjectModal.css'

type ProjectModalProps = {
  project: ProjectDetail
  onClose: () => void
  onProjectChange: (slug: string) => void
}

function resetVideo(video: HTMLVideoElement | null) {
  if (!video) return

  video.pause()
  video.currentTime = 0
}

function ProjectMedia({
  project,
  videoRef,
}: {
  project: ProjectDetail
  videoRef: RefObject<HTMLVideoElement | null>
}) {
  useEffect(() => {
    if (project.media.type !== 'video' || !project.media.src) return

    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.currentTime = 0
    void video.play().catch(() => undefined)

    return () => resetVideo(video)
  }, [project.media.src, project.media.type, project.slug, videoRef])

  if (project.media.type === 'video' && project.media.src) {
    return (
      <video
        ref={videoRef}
        className="project-modal__asset"
        src={project.media.src}
        poster={project.media.poster}
        autoPlay
        controls
        muted
        playsInline
        preload="metadata"
      />
    )
  }

  if (project.media.type === 'image' && project.media.src) {
    return (
      <img
        className="project-modal__asset"
        src={project.media.src}
        alt={project.media.alt ?? project.title}
      />
    )
  }

  return (
    <div className="project-modal__placeholder">
      <span>{project.media.label}</span>
      <strong aria-hidden="true">{project.number}</strong>
    </div>
  )
}

function ProjectModal({ project, onClose, onProjectChange }: ProjectModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<number | undefined>(undefined)
  const videoRef = useRef<HTMLVideoElement>(null)

  const requestClose = useCallback(() => {
    if (isClosing) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    resetVideo(videoRef.current)
    setIsClosing(true)
    closeTimerRef.current = window.setTimeout(onClose, reduceMotion ? 0 : 220)
  }, [isClosing, onClose])

  const changeProject = useCallback(
    (slug: string) => {
      resetVideo(videoRef.current)
      onProjectChange(slug)
    },
    [onProjectChange],
  )

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const scrollPosition = window.scrollY
    const body = document.body
    const originalStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      Object.assign(body.style, originalStyles)
      window.scrollTo(0, scrollPosition)
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [requestClose])

  useEffect(
    () => () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    },
    [],
  )

  return createPortal(
    <div
      className={`project-modal${isClosing ? ' is-closing' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose()
      }}
    >
      <section
        className="project-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${project.slug}`}
        aria-describedby={`modal-overview-${project.slug}`}
      >
        <div className="project-modal__media">
          <ProjectMedia project={project} videoRef={videoRef} />
        </div>

        <div className="project-modal__panel">
          <header className="project-modal__topline">
            <span>
              {project.number} / {project.totalProjects.toString().padStart(2, '0')}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close project details"
              onClick={requestClose}
            >
              ×
            </button>
          </header>

          <h2 id={`modal-title-${project.slug}`}>{project.title}</h2>

          <div className="project-modal__metadata">
            <div>
              {project.categories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <time>{project.year}</time>
          </div>

          <p
            className="project-modal__overview"
            id={`modal-overview-${project.slug}`}
          >
            {project.overview}
          </p>

          <div className="project-modal__scope">
            <p>Selected Scope</p>
            <ul>
              {project.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {project.confidentiality && (
            <div className="project-modal__confidentiality">
              <div className="project-modal__confidentiality-label">
                <span aria-hidden="true" />
                <strong>{project.confidentiality.label}</strong>
              </div>
              <p>{project.confidentiality.primaryText}</p>
              {project.confidentiality.supportingText && (
                <small>{project.confidentiality.supportingText}</small>
              )}
            </div>
          )}

          <nav className="project-modal__navigation" aria-label="Project navigation">
            <button
              type="button"
              onClick={() => changeProject(project.previousProject.slug)}
            >
              <span>← Previous</span>
              <strong>{project.previousProject.title}</strong>
            </button>
            <button
              type="button"
              onClick={() => changeProject(project.nextProject.slug)}
            >
              <span>Next →</span>
              <strong>{project.nextProject.title}</strong>
            </button>
          </nav>
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default ProjectModal
