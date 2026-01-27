import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pantograph',
  title: 'Pantograph (Stitch Pattern)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pattern Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Stitch Preview',
      type: 'image',
      options: {
        hotspot: true, // Allows smart cropping
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Style Category',
      type: 'string',
      options: {
        list: [
          { title: 'Modern / Geometric', value: 'modern' },
          { title: 'Floral / Organic', value: 'floral' },
          { title: 'Whimsical / Novelty', value: 'whimsical' },
          { title: 'Traditional / Feathers', value: 'traditional' },
        ],
      },
    }),
    defineField({
      name: 'density',
      title: 'Stitch Density',
      description: 'Used for "Explainable AI" suggestions (Dense = heavier quilting)',
      type: 'string',
      options: {
        list: [
          { title: 'Light (Open)', value: 'light' },
          { title: 'Medium (Standard)', value: 'medium' },
          { title: 'Heavy (Dense)', value: 'heavy' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Search Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
})