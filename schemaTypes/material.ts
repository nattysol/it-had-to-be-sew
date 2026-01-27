import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'material',
  title: 'Material Options',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Material Name',
      type: 'string', // e.g. "80/20 Cotton Blend"
    }),
    defineField({
      name: 'type',
      title: 'Material Type',
      type: 'string',
      options: {
        list: [
          { title: 'Batting', value: 'batting' },
          { title: 'Thread', value: 'thread' },
          { title: 'Backing Fabric', value: 'backing' },
        ]
      }
    }),
    defineField({
      name: 'pricePerUnit',
      title: 'Price ($)',
      type: 'number',
      description: 'Cost per yard (for batting) or flat fee (for thread)',
    }),
    defineField({
      name: 'unit',
      title: 'Pricing Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Per Yard', value: 'yard' },
          { title: 'Per Linear Inch', value: 'inch' },
          { title: 'Flat Fee', value: 'flat' },
        ]
      }
    }),
    defineField({
      name: 'image',
      title: 'Swatch Image',
      type: 'image',
    }),
  ],
})