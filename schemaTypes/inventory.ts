import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Thread', value: 'thread' },
          { title: 'Batting', value: 'batting' },
          { title: 'Backing', value: 'backing' },
        ],
      },
      validation: Rule => Rule.required()
    }),
    // 👇 NEW: The "Physics" of the item
    defineField({
      name: 'totalLength',
      title: 'Full Unit Length (yds or sq ft)',
      type: 'number',
      description: 'How long is a brand new spool/roll? (e.g. 5000 yds)',
    }),
    defineField({
      name: 'totalWeight',
      title: 'Full Unit Weight (grams)',
      type: 'number',
      description: 'How much does a brand new spool weigh? (e.g. 100g)',
    }),
    // 👇 Tracking the actual stock
    defineField({
      name: 'quantity',
      title: 'Current Stock Level (Total Units)',
      type: 'number',
      description: 'e.g., 2.5 spools remaining',
    }),
    defineField({
      name: 'lowStockThreshold',
      title: 'Low Stock Alert At',
      type: 'number',
      initialValue: 1
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})