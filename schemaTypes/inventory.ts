import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventoryItem',
  title: 'Inventory Item',
  type: 'document',
  fieldsets: [
    { 
      name: 'calibration', 
      title: '📏 Unit Calibration (Manufacturer Specs)',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    // --- BASIC INFO ---
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
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true }
    }),

    // --- ⚖️ CURRENT STOCK ---
    defineField({
      name: 'stockLevel',
      title: 'Current Stock Remaining',
      type: 'number',
      description: 'Current measured weight (oz) for thread, or length (inches) for batting.',
      validation: Rule => Rule.min(0)
    }),

    // --- 📏 CALIBRATION FIELDS (New) ---
    // These belong to the "fieldset" defined at the top
    
    // 1. FOR THREAD: Total Length vs Weight
    defineField({
      name: 'fullConeLength',
      title: 'Full Cone Length (Yards)',
      type: 'number',
      description: 'How many yards are on a brand new cone? (e.g. 5000)',
      fieldset: 'calibration',
      hidden: ({document}) => document?.category !== 'thread',
    }),
    defineField({
      name: 'fullConeWeight',
      title: 'Full Cone Weight (oz)',
      type: 'number',
      description: 'Weight of the thread itself (minus the plastic cone) when new.',
      fieldset: 'calibration',
      hidden: ({document}) => document?.category !== 'thread',
    }),
    
    // 2. FOR BATTING: Area
    defineField({
      name: 'battWidth',
      title: 'Roll Width (Inches)',
      type: 'number',
      description: 'e.g. 90, 108, or 120',
      fieldset: 'calibration',
      hidden: ({document}) => document?.category !== 'batting',
    }),
    defineField({
      name: 'fullRollLength',
      title: 'Full Roll Length (Yards)',
      type: 'number',
      description: 'Total length of a new roll',
      fieldset: 'calibration',
      hidden: ({document}) => document?.category !== 'batting',
    }),
    defineField({
      name: 'totalSqFt',
      title: 'Total Area (Sq Ft)',
      type: 'number',
      description: 'Calculated automatically if you enter Width & Length, or enter manually.',
      fieldset: 'calibration',
      hidden: ({document}) => document?.category !== 'batting',
    }),

    // --- METADATA ---
    defineField({
      name: 'threadWeight',
      title: 'Thread Thickness (wt)',
      type: 'number',
      description: 'e.g. 40, 50, or 60. (Only for threads)',
      hidden: ({document}) => document?.category !== 'thread',
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
      stock: 'stockLevel',
      media: 'image'
    },
    prepare(selection) {
      const { title, stock, media } = selection
      return {
        title: title,
        subtitle: `Stock: ${stock}`,
        media: media
      }
    }
  }
})