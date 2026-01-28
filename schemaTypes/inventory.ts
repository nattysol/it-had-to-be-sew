import { defineField, defineType } from 'sanity'

export const inventoryItem = defineType({
  name: 'inventoryItem',
  title: 'Inventory Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string', // e.g., "Glide - Cool Grey"
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
          { title: 'Backing Fabric', value: 'fabric' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true }
    }),
    // 📦 Stock Tracking
    defineField({
      name: 'stockLevel',
      title: 'Current Stock Level',
      type: 'number',
      description: 'Threads in OZ, Batting in Linear Inches',
      validation: Rule => Rule.min(0)
    }),
    // ⚖️ Calibration (Crucial for Thread)
    defineField({
      name: 'yardsPerOz',
      title: 'Yards Per Ounce (Calibration)',
      type: 'number',
      hidden: ({document}) => document?.category !== 'thread',
      initialValue: 1000,
      description: 'Used to convert weight to length. Standard 40wt thread is ~1000 yds/oz.'
    }),
    // 🎨 Client Facing?
    defineField({
      name: 'isPublic',
      title: 'Show to Client?',
      type: 'boolean',
      initialValue: true,
      description: 'If unchecked, clients cannot select this option on the website.'
    })
  ]
})