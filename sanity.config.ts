import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'It Had To Be Sew',

  projectId: 'lx1vm0bm',
  dataset: 'production',
  basePath: '/studio', // <--- IMPORTANT: This must match your folder name

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
