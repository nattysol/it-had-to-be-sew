import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pattern',
  title: 'Quilt Patterns',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pattern Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Pattern Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'designer',
      title: 'Designer',
      type: 'string'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
})