import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Global Pricing & Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'baseRate',
      title: 'Base Quilting Rate ($)',
      type: 'number',
      description: 'Price per square inch (e.g., 0.025)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'minimumOrderFee',
      title: 'Minimum Order Fee ($)',
      type: 'number',
      description: 'Minimum charge if the quilt is too small (e.g., 50.00)',
    }),
    defineField({
      name: 'bindingRate',
      title: 'Binding Service Rate ($)',
      type: 'number',
      description: 'Price per linear inch for binding',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Intake Shipping Address',
      type: 'text',
      description: 'The address shown to customers after they pay',
    }),
  ],
})