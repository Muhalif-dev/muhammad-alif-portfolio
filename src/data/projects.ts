export type ProjectMedia = {
  type: 'placeholder' | 'image' | 'video'
  orientation?: 'landscape' | 'portrait'
  label: string
  src?: string
  poster?: string
  alt?: string
}

export type ProjectConfidentiality = {
  label: string
  primaryText: string
  supportingText?: string
}

export type Project = {
  slug: string
  number: string
  title: string
  year: string
  categories: string[]
  overview: string
  scope: string[]
  confidentiality: ProjectConfidentiality | null
  media: ProjectMedia
  featured: boolean
  primary: boolean
  series?: string
  note?: string
  selectedNotes?: string
}

const projectMediaPlaceholder: ProjectMedia = {
  type: 'placeholder',
  label: 'Project Media',
}

const detailsComingSoon =
  'Selected project details and media will be added later.'

export const projects: Project[] = [
  {
    slug: 'safety-briefing-film',
    number: '01',
    title: 'Safety Briefing Film',
    year: '2026',
    categories: [
      'Safety Explainer',
      'Motion Design',
      'Corporate Communication',
    ],
    overview:
      'A motion-led safety briefing designed to communicate essential information clearly, consistently, and visually across multiple locations and environments.',
    scope: [
      'Motion Design',
      'Visual Storytelling',
      'Safety Communication',
      'Editing',
      'Multi-location Delivery',
    ],
    confidentiality: {
      label: 'Confidentiality note',
      primaryText: 'This video preview contains selected excerpts only.',
      supportingText:
        'The original film includes internal and branded material, so only selected motion sequences are shown publicly.',
    },
    media: {
      type: 'video',
      label: 'Project Media',
      src: '/media/projects/safety-briefing/preview.mp4',
      orientation: 'landscape',
      poster: '/media/projects/safety-briefing/poster.png',
    },
    featured: true,
    primary: true,
    note: 'Corporate project, selected excerpts only',
    selectedNotes:
      'The project required a consistent visual system that could adapt across different spaces and operational contexts while keeping the communication easy to follow.',
  },
  {
    slug: 'digital-service-explainer',
    number: '02',
    title: 'Digital Service Explainer',
    year: '2026',
    categories: ['Product Motion', 'Explainer Film', 'Digital Product'],
    overview:
      'A motion-driven explainer created to translate a digital service into a clear and approachable visual story.',
    scope: [
      'Motion Design',
      'Product Communication',
      'UI Visualization',
      'Visual Storytelling',
      'Editing',
    ],
    confidentiality: {
      label: 'Confidentiality note',
      primaryText: 'This video preview contains selected excerpts only.',
      supportingText:
        'The original film includes internal and branded material, so only selected motion sequences are shown publicly.',
    },
    media: {
      type: 'video',
      label: 'Project Media',
      src: '/media/projects/digital-service-explainer/preview.mp4',
      orientation: 'landscape',
      poster: '/media/projects/digital-service-explainer/poster.png',
    },
    featured: true,
    primary: true,
    series: 'PC PROVE',
    note: 'Corporate confidential project',
  },
  {
    slug: 'innovation-explainer',
    number: '03',
    title: 'Innovation Explainer',
    year: '2026',
    categories: ['Innovation', 'Motion Graphics', 'Corporate Communication'],
    overview:
      'An animated explainer developed to communicate an innovation concept through clear visual storytelling and structured motion graphics.',
    scope: [
      'Motion Design',
      'Explainer Animation',
      'Visual Storytelling',
      'Corporate Communication',
      'Editing',
    ],
    confidentiality: {
      label: 'Confidentiality note',
      primaryText: 'This video preview contains selected excerpts only.',
      supportingText:
        'The original film includes internal and branded material, so only selected motion sequences are shown publicly.',
    },
    media: {
      type: 'video',
      label: 'Project Media',
      src: '/media/projects/innovation-explainer/preview.mp4',
      orientation: 'landscape',
      poster: '/media/projects/innovation-explainer/poster.png',
    },
    featured: true,
    primary: true,
    series: 'PC PROVE',
    note: 'Corporate confidential project',
  },
  {
    slug: 'policy-program-explainer',
    number: '04',
    title: 'Policy & Program Explainer',
    year: '2026',
    categories: [
      'Corporate Communication',
      'Explainer Film',
      'Motion Design',
    ],
    overview:
      'A visual explainer designed to simplify program and policy information into an accessible and engaging motion piece.',
    scope: [
      'Motion Design',
      'Information Design',
      '2D Animation',
      'Visual Storytelling',
      'Editing',
    ],
    confidentiality: {
      label: 'Confidentiality note',
      primaryText: 'This video preview contains selected excerpts only.',
      supportingText:
        'The original film includes internal and branded material, so only selected motion sequences are shown publicly.',
    },
    media: {
      type: 'video',
      label: 'Project Media',
      src: '/media/projects/policy-program-explainer/preview.mp4',
      orientation: 'landscape',
      poster: '/media/projects/policy-program-explainer/poster.png',
    },
    featured: true,
    primary: true,
    series: 'PC PROVE',
    note: 'Corporate confidential project',
  },
  {
    slug: 'independence-day-motion',
    number: '05',
    title: 'Independence Day Motion',
    year: '2026',
    categories: ['Campaign Motion', 'Social Content', 'Motion Graphics'],
    overview:
      'A short-form motion piece created for an Independence Day campaign, combining graphic composition, typography, and animated visual elements.',
    scope: [
      'Motion Design',
      'Campaign Visuals',
      'Typography Animation',
      'Social Content',
    ],
    confidentiality: null,
    media: {
      type: 'video',
      label: 'Project Media',
      src: '/media/projects/independence-day-motion/preview.mp4',
      orientation: 'portrait',
      poster: '/media/projects/independence-day-motion/poster.png',
    },
    featured: true,
    primary: true,
  },
  {
    slug: 'event-visuals',
    number: '06',
    title: 'Event Visuals',
    year: '2026',
    categories: ['Event Visuals', 'Stage Motion', 'Motion Graphics'],
    overview:
      'A collection of motion and visual assets created for live event environments, including stage screens, animated sequences, and supporting event graphics.',
    scope: [
      'Stage Visuals',
      'Motion Design',
      'Event Graphics',
      'Looping Animation',
      'Visual Direction',
    ],
    confidentiality: null,
    media: projectMediaPlaceholder,
    featured: false,
    primary: true,
  },
  {
    slug: 'corporate-event-motion',
    number: '07',
    title: 'Corporate Event Motion',
    year: '—',
    categories: ['Stage Visuals', 'Motion Graphics'],
    overview: detailsComingSoon,
    scope: ['Stage Visuals', 'Motion Graphics'],
    confidentiality: null,
    media: projectMediaPlaceholder,
    featured: false,
    primary: false,
  },
  {
    slug: '3d-room-visualization',
    number: '08',
    title: '3D Room Visualization',
    year: '—',
    categories: ['3D Visualization', 'Safety Communication'],
    overview: detailsComingSoon,
    scope: ['3D Visualization', 'Safety Communication'],
    confidentiality: null,
    media: projectMediaPlaceholder,
    featured: false,
    primary: false,
  },
  {
    slug: 'brand-graphic-work',
    number: '09',
    title: 'Brand & Graphic Work',
    year: '—',
    categories: ['Branding', 'Graphic Design'],
    overview: detailsComingSoon,
    scope: ['Branding', 'Graphic Design'],
    confidentiality: null,
    media: projectMediaPlaceholder,
    featured: false,
    primary: false,
  },
  {
    slug: 'event-campaign-visuals',
    number: '10',
    title: 'Event Campaign Visuals',
    year: '—',
    categories: ['Event Branding', 'Social Content'],
    overview: detailsComingSoon,
    scope: ['Event Branding', 'Social Content'],
    confidentiality: null,
    media: projectMediaPlaceholder,
    featured: false,
    primary: false,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
