import { useEffect, useId, useRef, useState } from 'react'
import './ConfidentialStatus.css'

export default function ConfidentialStatus() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tooltipId = useId()

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div
      className={`confidential-status${open ? ' is-open' : ''}`}
      ref={rootRef}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setOpen(true)
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse' && !rootRef.current?.contains(document.activeElement)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={tooltipId}
        onFocus={() => {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
        onClick={(event) => {
          event.stopPropagation()
          setOpen((current) => !current)
        }}
      >
        Confidential
      </button>
      <div id={tooltipId} role="tooltip" className="confidential-status__tooltip">
        Selected excerpts only.
        <br />
        Some original project material is not shown publicly.
      </div>
    </div>
  )
}
