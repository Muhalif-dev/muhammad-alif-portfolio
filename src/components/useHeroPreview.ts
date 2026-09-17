import { useEffect, useRef, useState } from 'react'
import { featuredProjects } from '../data/projects'

const selectorLabels: Record<string, string> = {
  'safety-briefing-film': 'Safety Communication',
  'digital-service-explainer': 'Digital Product',
  'innovation-explainer': 'Innovation',
  'policy-program-explainer': 'Policy & Program',
  'independence-day-motion': 'Campaign Motion',
}

export const heroProjects = featuredProjects.filter((project) => selectorLabels[project.slug])
export const heroSelectorLabel = (slug: string) => selectorLabels[slug]

type Mode = 'auto' | 'hover' | 'selected' | 'resume'

export default function useHeroPreview(paused: boolean) {
  const [selection, setSelection] = useState({ index: 0, revision: 0, mode: 'auto' as Mode })
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hidden, setHidden] = useState(() => document.hidden)
  const [muted, setMuted] = useState(true)
  const audioPreferenceRef = useRef(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const project = heroProjects[selection.index]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setHidden(document.hidden)
    preference.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      preference.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (paused || hidden || reducedMotion || selection.mode === 'hover' || selection.mode === 'selected') return
    const delay = selection.mode === 'resume' ? 700 : 5000
    const timer = window.setTimeout(() => {
      setSelection((current) => ({
        index: (current.index + 1) % heroProjects.length,
        revision: current.revision + 1,
        mode: 'auto',
      }))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [selection, paused, hidden, reducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let cancelled = false
    video.muted = audioPreferenceRef.current
    if (!paused && !hidden) {
      void video.play().catch(() => {
        if (cancelled) return
        video.muted = true
        audioPreferenceRef.current = true
        setMuted(true)
        void video.play().catch(() => undefined)
      })
    }
    else video.pause()
    return () => {
      cancelled = true
      video.pause()
      video.currentTime = 0
    }
  }, [selection.index, selection.revision, paused, hidden])

  const select = (index: number, mode: Mode) => {
    videoRef.current?.pause()
    setSelection((current) => ({ index, revision: current.revision + 1, mode }))
  }
  const release = () => setSelection((current) => (
    current.mode === 'hover' || current.mode === 'selected' ? { ...current, mode: 'resume' } : current
  ))
  const enter = () => setSelection((current) => (
    current.mode === 'selected' ? current : { ...current, mode: 'hover' }
  ))

  useEffect(() => {
    const leaveTouchZone = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return
      const target = event.target as Element | null
      if (!target?.closest('.disciplines, #project-preview')) release()
    }
    document.addEventListener('pointerdown', leaveTouchZone)
    return () => document.removeEventListener('pointerdown', leaveTouchZone)
  }, [])

  const toggleAudio = () => {
    const nextMuted = !audioPreferenceRef.current
    audioPreferenceRef.current = nextMuted
    setMuted(nextMuted)
    if (videoRef.current) videoRef.current.muted = nextMuted
  }

  const pause = () => videoRef.current?.pause()

  return { project, selection, videoRef, select, release, enter, pause, muted, toggleAudio }
}
