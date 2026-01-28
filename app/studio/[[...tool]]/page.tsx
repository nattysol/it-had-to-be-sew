import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'
import Studio from './Studio'

// Set up metadata for the Studio route
export const metadata = {
  ...studioMetadata,
  title: 'Loading Studio...',
}

export const viewport = {
  ...studioViewport,
  interactiveWidget: 'resizes-content',
}

export default function StudioPage() {
  return <Studio />
}