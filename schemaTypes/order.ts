import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Customer Orders',
  type: 'document',
  fields: [
    // --- 1. Customer Info (Nested Object) ---
    defineField({
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        { name: 'firstName', type: 'string', title: 'First Name' },
        { name: 'lastName', type: 'string', title: 'Last Name' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
      ]
    }),

    // --- 2. Project Details ---
    defineField({
      name: 'pattern',
      title: 'Pattern',
      type: 'reference',
      to: [{ type: 'pattern' }] // Assumes you have a 'pattern' schema
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions (Inches)',
      type: 'object',
      fields: [
        { name: 'width', type: 'number', title: 'Width' },
        { name: 'height', type: 'number', title: 'Height' }
      ]
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price ($)',
      type: 'number'
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime'
    }),

    // --- 3. Status Tracking ---
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Processing', value: 'processing' },
          { title: 'Ready for Longarm', value: 'ready' },
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'new'
    }),

    // --- 4. 🔴 NEW: Efficiency & History Fields (For the Dashboard) ---
    defineField({
      name: 'completedAt',
      title: 'Completion Date',
      type: 'datetime',
      hidden: ({document}) => document?.status !== 'completed'
    }),
    defineField({
      name: 'actualTimeSeconds',
      title: 'Actual Time (Seconds)',
      type: 'number',
      description: 'The total active quilting time recorded by the workspace timer.',
      readOnly: true // Should only be set by the App, not manually
    }),
    defineField({
      name: 'actualFabricUsed',
      title: 'Actual Fabric Used',
      type: 'string', 
    }),
    defineField({
      name: 'efficiencyMetrics',
      title: 'Efficiency Metrics',
      type: 'object',
      fields: [
        { name: 'speed', type: 'number', title: 'Speed (sq in/hr)' },
        { name: 'scrap', type: 'string', title: 'Batting Scrap' }
      ]
    })
  ],

  // Preview config helps it look nice in the Sanity Studio list
  preview: {
    select: {
      firstName: 'customer.firstName',
      lastName: 'customer.lastName',
      status: 'status',
      // If you want to show the pattern image in the list:
      media: 'pattern.image' 
    },
    prepare(selection) {
      const { firstName, lastName, status, media } = selection
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `Status: ${status}`,
        media: media
      }
    }
  }
})