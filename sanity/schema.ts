import { type SchemaTypeDefinition } from 'sanity'
import order from '../schemaTypes/order'
import pattern from '../schemaTypes/pattern'
import faq from '../schemaTypes/faq'
import material  from '../schemaTypes/material'
import pantograph from '../schemaTypes/pantograph'
import settings from '../schemaTypes/settings'

// We are defining this INLINE to force it to show up
const inventoryItem = {
  name: 'inventoryItem',
  title: 'Inventory Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Item Name', type: 'string' },
    { name: 'stockLevel', title: 'Stock', type: 'number' }
  ]
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    order,
    pattern,
    inventoryItem // 👈 It is right here!
    ,faq,
    material,
    pantograph,
    settings
  ],
}