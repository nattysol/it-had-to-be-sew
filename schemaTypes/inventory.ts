import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventoryItem',
  title: 'Inventory Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Item Name',
      type: 'string', 
      description: 'e.g. Glide - Cool Grey',
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
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    
    // 📸 1. THE IMAGE FIELD
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true }
    }),

    // ⚖️ 2. QUANTITY / WEIGHT (The Stock)
    defineField({
      name: 'stockLevel',
      title: 'Current Quantity / Weight',
      type: 'number',
      description: 'For Thread: Enter OUNCES (e.g. 4.5). For Batting: Enter INCHES.',
      validation: Rule => Rule.min(0)
    }),

    // 🧵 3. THREAD SPECIFICS (Thickness)
    defineField({
      name: 'threadWeight',
      title: 'Thread Thickness (wt)',
      type: 'number',
      description: 'e.g. 40, 50, or 60. (Only for threads)',
      hidden: ({document}) => document?.category !== 'thread',
    }),

    // ⚙️ CALIBRATION (Hidden Advanced Field)
    defineField({
      name: 'yardsPerOz',
      title: 'Yards Per Ounce',
      type: 'number',
      hidden: ({document}) => document?.category !== 'thread',
      initialValue: 1000,
      description: 'Standard 40wt thread is ~1000 yds/oz.'
    }),

    defineField({
      name: 'isPublic',
      title: 'Show to Client?',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'stockLevel',
      media: 'image'
    }
  }
})