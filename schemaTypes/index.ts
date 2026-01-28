import pantograph from './pantograph'
import material from './material'
import settings from './settings'
import order from './order' // <--- Import it
import faq from './faq'
import pattern from './pattern'

// We export a simple array named 'schemaTypes'
export const schemaTypes = [pantograph, material, settings, order, faq, pattern] // <--- Include 'order' here