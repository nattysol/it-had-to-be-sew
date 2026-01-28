import { type SchemaTypeDefinition } from 'sanity'

// 1. Import your schemas
import order from '../schemaTypes/order'
import { inventoryItem } from '../schemaTypes/inventory' // Note: check if your inventory export is 'default' or named
import pattern from '../schemaTypes/pattern'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // 2. Add them to this array
    order,
    inventoryItem, 
    pattern
  ],
}